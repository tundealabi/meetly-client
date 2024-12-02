import { SERVER_API } from '@/libs';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SERVER_API_ROUTES } from '../constants';
import { SignInResponse } from '@/types';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ], // rest of your config
  callbacks: {
    async signIn({ account, user }) {
      const result = await SERVER_API.postRequest<SignInResponse>(
        SERVER_API_ROUTES.AUTH.SIGNIN,
        { idToken: account?.id_token ?? '' }
      );
      if (result.state === 'error') {
        return false;
      }
      user.tokens = result.data.tokens;
      user.user = result.data.user;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.tokens;
        token.user = user.user;
      }
      return token;
    },
    session({ token }) {
      return {
        expires: '',
        user: token.user,
        token: token.token,
      };
    },
  },
  jwt: {
    maxAge: 29 * 24 * 60 * 60, // 29 days
  },
  pages: {
    error: '/',
    signOut: '/',
  },
} satisfies NextAuthOptions;
