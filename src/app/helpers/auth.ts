import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';

import { getServerSession } from 'next-auth';

import { authConfig } from '../configs';

// Use it in server contexts
export function getSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
