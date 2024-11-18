'use client';

import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';

import { signIn } from 'next-auth/react';

const SignInWithGoogle = () => {
  return (
    <Button
      onClick={() => signIn('google', { redirect: false })}
      startIcon={<GoogleIcon />}
      variant="contained"
    >
      Sign in with Google
    </Button>
  );
};

export default SignInWithGoogle;
