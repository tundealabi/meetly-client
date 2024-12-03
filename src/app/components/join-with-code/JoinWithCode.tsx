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
          '& fieldset': {
            borderColor: 'GrayText',
          },
        }}
        value={code}
        variant="outlined"
      />
      <Button
        disabled={!code}
        onClick={() => router.push(`/${code}`)}
        sx={{ '&.Mui-disabled': { color: 'grey' } }}
      >
        Join
      </Button>
    </Stack>
  );
};

export default JoinWithCode;
