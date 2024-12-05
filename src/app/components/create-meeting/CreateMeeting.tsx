'use client';

import { SERVER_API_ROUTES } from '@/constants';
import { SERVER_API } from '@/libs';
import { CreatedRoom } from '@/types';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateMeeting = () => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMeeting = async () => {
    setIsLoading(true);
    if (session.data?.token) {
      const result = await SERVER_API.postRequest<CreatedRoom>(
        SERVER_API_ROUTES.ROOM.CREATE,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.data?.token.accessToken}`
          }
        }
      );
      if (result.state === 'success') {
        router.push(`/${result.data.roomName}`);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <LoadingButton
      loading={isLoading}
      onClick={handleCreateMeeting}
      startIcon={<VideoCallIcon />}
      sx={{ '&.Mui-disabled': { backgroundColor: '#404040' } }}
      variant="contained"
    
    >
      New meeting
    </LoadingButton>
  );
};

export default CreateMeeting;
