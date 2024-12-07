import { Mic, MicOff } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { UID } from 'agora-rtc-react';
import { FC, PropsWithChildren } from 'react';

type UserCardProps = {
  isCameraOn?: boolean;
  isMicOn?: boolean;
  profilePicture: string;
  uid: UID;
  username: string;
};

const UserCard: FC<PropsWithChildren<UserCardProps>> = ({
  children,
  // isCameraOn,
  isMicOn,
  // profilePicture,
  // uid,
  username
}) => {
  return (
    <Box
      sx={{
        border: '1px solid grey',
        height: 300,
        position: 'relative',
        width: '100%'
      }}
    >
      {children}
      {/* {!isCameraOn && !profilePicture ? (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#000',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: '100%'
          }}
        >
          <Avatar {...stringAvatar(username)} />
        </Box>
      ) : null} */}
      {/* {isCameraOn || profilePicture ? (
        children
      ) : (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: '#000',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Avatar {...stringAvatar(username)} />
        </Box>
      )} */}
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: 'gray',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          p: 0.6,
          position: 'absolute',
          right: 4,
          top: 4,
          zIndex: 2
        }}
      >
        {isMicOn ? <Mic color="secondary" /> : <MicOff color="secondary" />}
      </Box>
      <Box sx={{ bottom: 4, left: 4, position: 'absolute', zIndex: 2 }}>
        <Typography noWrap>{username}</Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
