import { conn } from '@/app/api';
import mysql from 'mysql2/promise';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }): Promise<Token> {
      if (account) {
        console.log({ token, account });
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = (account.expires_at ?? 0) * 1000;
      }

      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
        console.log('complete login');
        try {
          const db: mysql.Connection = await mysql.createConnection(conn);

          const [existingUser]: any = await db.execute('SELECT * FROM user WHERE email = ? LIMIT 1', [token.email]);

          if (!existingUser.length) {
            await db.execute(
              `INSERT INTO user (id, email, name, image, provider, createdAt)
                   VALUES (UUID(), ?, ?, ?, ?, NOW())`,
              [token.email, token.name || null, token.picture || null, 'kakao'],
            );
          }

          await db.end();

          return token as Token;
        } catch (error) {
          console.error('데이터베이스 오류:', error);
        }
      }

      return await refreshAccessToken(token as Token);
    },
  },
};

interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

async function refreshAccessToken(token: Token) {
  try {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.KAKAO_CLIENT_ID!,
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: (refreshedTokens.expires_at ?? 0) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Refresh Token Error', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}
