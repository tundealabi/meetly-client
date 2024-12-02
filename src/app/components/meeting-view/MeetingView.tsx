// 'use client';

import { JoinRoomOptions } from '@/types';
import {
  CallEnd,
  KeyboardArrowUp,
  Mic,
  MicOff,
  PhoneAndroidRounded,
  Videocam,
  VideocamOff,
} from '@mui/icons-material';
import { Box, ButtonGroup, IconButton, Typography } from '@mui/material';
import {
  LocalUser,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  useJoin,
  usePublish,
  useRemoteUsers,
  RemoteUser,
} from 'agora-rtc-react';
import { FC, useState } from 'react';
// import { createClient } from 'agora-rtm-react';

type MeetingViewProps = {
  joinRoomOptions: JoinRoomOptions;
  username: string;
};

// const useClient = createClient(process.env.NEXT_PUBLIC_AGORA_APP_ID!);
// const useChannel = createChannel('channelName');

const MeetingView: FC<MeetingViewProps> = ({
  joinRoomOptions: { channel, token, uid },
  username,
}) => {
  console.log(channel, token, uid);
  // const client = useClient();

  // client.login({ uid: uid.toString(), token });
  // client.addOrUpdateLocalUserAttributes({ name: username });
  useJoin({
    appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    channel,
    uid,
    token,
  });

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  console.log('remoteUsers', remoteUsers);

  const toggleCamera = () => setCamera((prev) => !prev);
  const toggleMicrophone = () => setMic((prev) => !prev);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        px: { xs: 2, lg: 10 },
      }}
    >
      <Box sx={{ flex: 1, py: 4 }}>
        <Box
          sx={{
            border: '1px solid red',
            height: '100%',
            position: 'relative',
            width: '100%',
          }}
        >
          <LocalUser
            audioTrack={localMicrophoneTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={false}
            // playVideo={true}
            videoTrack={localCameraTrack}
            cover="https://images.pexels.com/photos/28987374/pexels-photo-28987374/free-photo-of-monochrome-view-of-historic-riga-architecture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
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
              zIndex: 2,
            }}
          >
            {micOn ? <Mic color="secondary" /> : <MicOff color="secondary" />}
          </Box>
          <Box sx={{ bottom: 4, left: 4, position: 'absolute', zIndex: 2 }}>
            <Typography noWrap>{username}</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        {remoteUsers.map(async (user) => {
          // const { name } = await client.getUserAttributes(user.uid.toString());
          return (
            <Box
              key={user.uid}
              sx={{
                border: '1px solid green',
                height: 300,
                position: 'relative',
                width: 300,
              }}
            >
              <RemoteUser
                cover="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-pm1cary85vjb1.jpg?width=755&format=pjpg&auto=webp&s=cb9b202f3307b50dc79ebcf33cb6c1277aee88b9"
                user={user}
              >
                <samp className="user-name">{user.uid}</samp>
              </RemoteUser>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ border: '1px solid blue', display: 'flex', width: '100%' }}>
        <Box
          sx={{
            border: '1px solid green',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ButtonGroup>
            <IconButton>
              <KeyboardArrowUp color="secondary" />
            </IconButton>
            <IconButton onClick={toggleMicrophone}>
              {micOn ? <Mic color="secondary" /> : <MicOff color="secondary" />}
            </IconButton>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton>
              <KeyboardArrowUp color="secondary" />
            </IconButton>
            <IconButton onClick={toggleCamera}>
              {cameraOn ? (
                <Videocam color="secondary" />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton>
          </ButtonGroup>
          <IconButton>
            <CallEnd color="secondary" />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <PhoneAndroidRounded color="secondary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MeetingView;
