// 'use client';

import { JoinRoomOptions, RoomInfoType } from '@/types';
import {
  CallEnd,
  Info,
  Mic,
  MicOff,
  // PhoneAndroidRounded,
  People,
  PresentToAll,
  Videocam,
  VideocamOff
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import AgoraRTC, {
  LocalUser,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  RemoteUser,
  ILocalVideoTrack,
  useRTCClient,
  useClientEvent
} from 'agora-rtc-react';
import { FC, useEffect, useState } from 'react';
import { InfoDialog, MeetingDetails, MeetingPeople, UserCard } from '.';
import { createClient } from 'agora-rtm-react';

type MeetingViewProps = {
  joinRoomOptions: JoinRoomOptions;
  profilePicture?: string;
  username: string;
};

type UserAttribute = {
  name: string;
  profilePicture?: string;
};

type UserMediaStatus = {
  isCameraOn: boolean;
  isMicOn: boolean;
};

const useRtmClient = createClient(process.env.NEXT_PUBLIC_AGORA_APP_ID!);
// const useChannel = createChannel('channelName');

const MeetingView: FC<MeetingViewProps> = ({
  joinRoomOptions: {
    channel,
    host,
    rtcToken,
    rtmToken,
    screenShareRtcToken,
    screenShareUid,
    uid
  },
  profilePicture,
  username
}) => {
  console.debug(
    channel,
    rtcToken,
    rtmToken,
    screenShareRtcToken,
    screenShareUid,
    uid
  );
  const rtcClient = useRTCClient();
  const rtmClient = useRtmClient();

  const rtmChannel = rtmClient.createChannel(channel);
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [infoType, setInfoType] = useState<RoomInfoType>(null);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  // const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  const [localCameraTrack, setLocalCameraTrack] =
    useState<ILocalVideoTrack | null>(null);
  const [screenTrack, setScreenTrack] = useState<ILocalVideoTrack | null>(null);
  const [remoteUsersNameMap, setRemoteUsersNameMap] = useState<
    Record<string, UserAttribute>
  >({});
  const [usersMediaTypeStatusMap, setUsersMediaTypeStatusMap] = useState<
    Record<string, UserMediaStatus>
  >({});
  useClientEvent(rtcClient, 'user-published', (user, mediaType) => {
    setUsersMediaTypeStatusMap((prev) => {
      const userMediaTypeStatus = prev[user.uid] || {
        isCameraOn: false,
        isMicOn: false
      };
      if (mediaType === 'audio') {
        userMediaTypeStatus.isMicOn = true;
      } else if (mediaType === 'video') {
        userMediaTypeStatus.isCameraOn = true;
      }
      return { ...prev, [user.uid]: userMediaTypeStatus };
    });
  });
  useClientEvent(rtcClient, 'user-unpublished', (user, mediaType) => {
    setUsersMediaTypeStatusMap((prev) => {
      const userMediaTypeStatus = prev[user.uid] || {
        isCameraOn: false,
        isMicOn: false
      };
      if (mediaType === 'audio') {
        userMediaTypeStatus.isMicOn = false;
      } else if (mediaType === 'video') {
        userMediaTypeStatus.isCameraOn = false;
      }
      return { ...prev, [user.uid]: userMediaTypeStatus };
    });
  });

  useEffect(() => {
    let isMounted = true;
    const initializeRtm = async () => {
      try {
        if (isMounted) {
          await rtmClient.login({ uid: uid.toString(), token: rtmToken });
          await rtmChannel.join();
          const userAttrs: Partial<UserAttribute> = { name: username };
          if (profilePicture) userAttrs.profilePicture = profilePicture;
          await rtmClient.addOrUpdateLocalUserAttributes(userAttrs);
          await rtcClient.join(
            process.env.NEXT_PUBLIC_AGORA_APP_ID!,
            channel,
            rtcToken,
            uid
          );
        }
      } catch (error) {
        console.error('Error initializing RTM client:', error);
      }
    };
    setTimeout(() => {
      initializeRtm();
    }, 2000);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePublish([localMicrophoneTrack]);

  console.debug('remoteUsers-before', useRemoteUsers());

  // const remoteUsers = useRemoteUsers().filter((user) => user.uid !== uid);
  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const newMap: Record<string, UserAttribute> = {};
        for (const user of remoteUsers) {
          const { name, profilePicture } =
            await rtmClient.getUserAttributesByKeys(user.uid.toString(), [
              'name',
              'profilePicture'
            ]);
          newMap[user.uid] = {
            name: name || 'Unknown User',
            profilePicture
          };
        }
        setRemoteUsersNameMap((prev) => ({ ...prev, ...newMap }));
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, [remoteUsers, rtmClient]);

  console.debug('remoteUsers-after', remoteUsers);

  const toggleCamera = async () => {
    if (cameraOn) {
      await stopCamera();
    } else {
      await startCamera();
    }
  };
  const toggleMicrophone = () => setMic((prev) => !prev);
  // const toggleScreenShare = () => setIsSharingScreen((prev) => !prev);

  const startCamera = async () => {
    const cameraTrack = await AgoraRTC.createCameraVideoTrack();
    setLocalCameraTrack(cameraTrack);
    setCamera(true);
    await rtcClient.publish(cameraTrack);
  };

  const stopCamera = async () => {
    if (localCameraTrack) {
      await rtcClient.unpublish(localCameraTrack);
      setCamera(false);
      localCameraTrack.stop();
      // localCameraTrack.close();
      setLocalCameraTrack(null);
    }
  };

  const startScreenShare = async () => {
    try {
      const track = (await AgoraRTC.createScreenVideoTrack({
        systemAudio: 'exclude'
      })) as ILocalVideoTrack;
      setScreenTrack(track as ILocalVideoTrack);
      // await rtcClient.unpublish(localCameraTrack!);
      await stopCamera();
      await rtcClient.publish(track);
      setIsSharingScreen(true);
      track.on('track-ended', async () => {
        await rtcClient.unpublish(track);
        track.close();
        setIsSharingScreen(false);
      });
      console.debug('Screen sharing started');
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = async () => {
    if (screenTrack) {
      await rtcClient.unpublish(screenTrack);
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
          px: { xs: 2, lg: 10 },
          py: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(auto-fit, minmax(150px, 1fr))'
              },
              overflowY: 'auto',
              py: 4
            }}
          >
            <Box>
              <UserCard
                isCameraOn={cameraOn}
                isMicOn={micOn}
                profilePicture={profilePicture ?? ''}
                uid={uid}
                username={`${username} ${uid === host.uid ? '(Host)' : ''}`}
              >
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  playAudio={false}
                  // playVideo={true}
                  videoTrack={localCameraTrack}
                  cover={
                    profilePicture ||
                    'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                  }
                />
              </UserCard>
            </Box>

            <Box>
              {remoteUsers.map((user) => {
                return (
                  <UserCard
                    key={user.uid}
                    isCameraOn={
                      usersMediaTypeStatusMap[user.uid]?.isCameraOn ?? false
                    }
                    isMicOn={
                      usersMediaTypeStatusMap[user.uid]?.isMicOn ?? false
                    }
                    profilePicture={
                      remoteUsersNameMap[user.uid]?.profilePicture ?? ''
                    }
                    uid={user.uid}
                    username={
                      remoteUsersNameMap[user.uid]?.name ||
                      'Fetching username...'
                    }
                  >
                    <RemoteUser
                      cover={
                        remoteUsersNameMap[user.uid]?.profilePicture ||
                        'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                      }
                      user={user}
                      videoPlayerConfig={{ fit: 'fill' }}
                    />
                  </UserCard>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            alignItems: { xs: 'center' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            rowGap: 4,
            width: '100%'
          }}
        >
          <Box
            sx={{
              border: '0px solid green',
              display: 'flex',
              flex: 1,
              gap: 4,
              justifyContent: 'center'
            }}
          >
            <IconButton
              onClick={toggleMicrophone}
              sx={{
                backgroundColor: '#1f8ef1',
                ':hover': { backgroundColor: '#5fa6f5' }
              }}
            >
              {micOn ? (
                <Mic sx={{ color: '#fff' }} />
              ) : (
                <MicOff sx={{ color: '#fff' }} />
              )}
            </IconButton>
            <IconButton
              disabled={isSharingScreen}
              onClick={toggleCamera}
              sx={{
                backgroundColor: '#1f8ef1',
                ':disabled': { backgroundColor: '#484848' },
                ':hover': { backgroundColor: '#5fa6f5' }
              }}
            >
              {cameraOn ? (
                <Videocam sx={{ color: '#fff' }} />
              ) : (
                <VideocamOff sx={{ color: '#fff' }} />
              )}
            </IconButton>
            <IconButton
              onClick={toggleScreenShare}
              sx={{
                backgroundColor: '#1f8ef1',
                ':hover': { backgroundColor: '#5fa6f5' }
              }}
            >
              <PresentToAll
                sx={{ color: isSharingScreen ? '#aa6600' : '#fff' }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location.assign('/');
              }}
              sx={{
                backgroundColor: '#dc3545',
                ':hover': { backgroundColor: '#ea7580' }
              }}
            >
              <CallEnd sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
          <Box sx={{ flex: { xs: 'block', md: 'block' } }}>
            <IconButton onClick={() => setInfoType('details')}>
              <Info color="secondary" />
            </IconButton>
            <IconButton onClick={() => setInfoType('people')}>
              <People color="secondary" />
            </IconButton>
            {/* <IconButton onClick={() => setInfoType('people')}>
              <PhoneAndroidRounded color="primary" />
            </IconButton>
            <IconButton onClick={() => setInfoType('chat')}>
              <PhoneAndroidRounded color="success" />
            </IconButton> */}
          </Box>
        </Box>
      </Box>
      <InfoDialog handleClose={() => setInfoType(null)} type={infoType}>
        {infoType === 'details' ? <MeetingDetails roomId={channel} /> : null}
        {infoType === 'people' ? (
          <MeetingPeople
            hostUid={host.uid}
            localUserHasMicOn={micOn}
            localUserProfilePicture={profilePicture ?? ''}
            localUserUid={uid}
            localUsername={username}
            remoteUsersDetailsMap={remoteUsersNameMap}
            usersMediaTypeStatusMap={usersMediaTypeStatusMap}
          />
        ) : null}
      </InfoDialog>
    </>
  );
};

export default MeetingView;
