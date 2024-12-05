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
       sx={{
        backgroundColor: 'rgba(21, 232, 214, 0.82)', 
        color: '#fff', 
        '&:hover': {
          backgroundColor: 'rgba(21, 232, 214, 0.592)',
         },
        //  padding: '2px 18px',  
        // fontSize: '1rem',   
        // minWidth: '200px',    
        // minHeight: '42px',     
        // borderRadius: '8px',   
   

      }}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInWithGoogle;
