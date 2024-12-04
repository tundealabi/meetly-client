'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

type AuthProviderProps = {
  session: Session | null;
};

const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
  session
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
