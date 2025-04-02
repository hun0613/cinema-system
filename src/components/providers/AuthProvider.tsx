'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type SessionProviderProps = {
  session?: Session | null;
} & JSX.IntrinsicElements['div'];

const AuthProvider: React.FC<SessionProviderProps> = (props) => {
  const { session, children } = props;

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
