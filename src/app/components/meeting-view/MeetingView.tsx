// 'use client';

import { JoinRoomOptions, RoomInfoType } from '@/types';
import {
  CallEnd,
  Mic,
  MicOff,
  PhoneAndroidRounded,
  PresentToAll,
  Videocam,
  VideocamOff
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import AgoraRTC, {
  LocalUser,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  useJoin,
  usePublish,
  useRemoteUsers,
  RemoteUser,
  ILocalVideoTrack,
  useRTCClient
} from 'agora-rtc-react';
import { FC, useState } from 'react';
import InfoDialog from './InfoDialog';
// import { createClient } from 'agora-rtm-react';

type MeetingViewProps = {
  joinRoomOptions: JoinRoomOptions;
  username: string;
};

// const useClient = createClient(process.env.NEXT_PUBLIC_AGORA_APP_ID!);
// const useChannel = createChannel('channelName');

const MeetingView: FC<MeetingViewProps> = ({
  joinRoomOptions: { channel, token, uid },
  username
}) => {
  console.debug(channel, token, uid);
  // const client = useClient();

  // client.login({ uid: uid.toString(), token });
  // client.addOrUpdateLocalUserAttributes({ name: username });
  useJoin({
    appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    channel,
    uid,
    token
  });

  const client = useRTCClient();

  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [infoType, setInfoType] = useState<RoomInfoType>(null);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const [screenTrack, setScreenTrack] = useState<ILocalVideoTrack | null>(null);

  usePublish([localMicrophoneTrack, localCameraTrack]);

  console.debug('remoteUsers-before', useRemoteUsers());

  // const remoteUsers = useRemoteUsers().filter((user) => user.uid !== uid);
  const remoteUsers = useRemoteUsers();

  console.debug('remoteUsers-after', remoteUsers);

  const toggleCamera = () => setCamera((prev) => !prev);
  const toggleMicrophone = () => setMic((prev) => !prev);
  // const toggleScreenShare = () => setIsSharingScreen((prev) => !prev);

  const startScreenShare = async () => {
    try {
      const track = await AgoraRTC.createScreenVideoTrack({
        systemAudio: 'exclude'
      });
      setScreenTrack(track as ILocalVideoTrack);
      await client.publish(track);
      setIsSharingScreen(true);
      console.debug('Screen sharing started');
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = async () => {
    if (screenTrack) {
      await client.unpublish(screenTrack);
      screenTrack.close();
      setScreenTrack(null);
      setIsSharingScreen(false);
      console.debug('Screen sharing stopped');
    }
  };

  const toggleScreenShare = () => {
    if (isSharingScreen) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          px: { xs: 2, lg: 10 }
        }}
      >
        <Box sx={{ flex: 1, py: 4 }}>
          <Box
            sx={{
              border: '1px solid red',
              height: '100%',
              position: 'relative',
              width: '100%'
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
                zIndex: 2
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
          {remoteUsers.map((user) => {
            return (
              <Box
                key={user.uid}
                sx={{
                  border: '1px solid green',
                  height: 300,
                  position: 'relative',
                  width: 300
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
              justifyContent: 'center'
            }}
          >
            <IconButton onClick={toggleMicrophone}>
              {micOn ? <Mic color="secondary" /> : <MicOff color="secondary" />}
            </IconButton>
            <IconButton onClick={toggleCamera}>
              {cameraOn ? (
                <Videocam color="secondary" />
              ) : (
                <VideocamOff color="secondary" />
              )}
            </IconButton>
            <IconButton onClick={toggleScreenShare}>
              <PresentToAll color={isSharingScreen ? 'warning' : 'secondary'} />
            </IconButton>
            <IconButton>
              <CallEnd color="secondary" />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={() => setInfoType('details')}>
              <PhoneAndroidRounded color="secondary" />
            </IconButton>
            <IconButton onClick={() => setInfoType('people')}>
              <PhoneAndroidRounded color="primary" />
            </IconButton>
            <IconButton onClick={() => setInfoType('chat')}>
              <PhoneAndroidRounded color="success" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <InfoDialog handleClose={() => setInfoType(null)} type={infoType} />
    </>
  );
};

export default MeetingView;
