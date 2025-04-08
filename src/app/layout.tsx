import Header from '@/components/mains/Header';
import AuthProvider from '@/components/providers/AuthProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import { authOptions } from '@/utils/authUtil';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getServerSession } from 'next-auth';
import './globals.css';

export default async function RootLayout({ children, params: { ...params } }: { children: React.ReactNode; params: any }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {/* suppressHydrationWarning : "app-index.js:35 Warning: Extra attributes from the server: data-redeviation-bs-uid" warning 해결 */}
      <html lang='en' suppressHydrationWarning>
        <body>
          {/* 헤더 -> html 태그 바로 자식 영역에 다른 body 외의 다른 태그가 들어가면 hydration 에러가 발생 ! 반드시 body 내부에 작성 */}
          <AuthProvider session={session}>
            <Header />
            {/* 라우팅 될 다른 컴포넌트 들 */}
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
