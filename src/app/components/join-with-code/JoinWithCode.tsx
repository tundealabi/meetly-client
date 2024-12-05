'use client';

import { Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const JoinWithCode = () => {
  const router = useRouter();
  const [code, setCode] = useState('');
  return (
    <Stack direction="row" gap={4}>
      <TextField
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter a code"
        size="small"
        sx={{
            '& .MuiInputBase-root': {
              color: 'whitesmoke',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#15c3b5', 
              },
              '&:hover fieldset': {
                borderColor: '#15c3b58d',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#15c3b532', 
              },
            },
          }}
        value={code}
        variant="outlined"
      />
      <Button
        variant="text"
     
        disabled={!code}
        onClick={() => router.push(`/${code}`)}
        sx={{ '&.Mui-disabled': { color: '#15e8d8' }}}
      >
        Join
      </Button>
    </Stack>
  );
};

export default JoinWithCode;


//fix: cursor should be on the join button