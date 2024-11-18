import { User as AppUser, Token } from '.';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    tokens: Token;
    user: AppUser;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    error?: string;
    token: Token;
    user: AppUser;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    error?: string;
    token: Token;
    user: AppUser;
  }
}
