import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';

import AgoraRTC, {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-react';

import { FC, useEffect, useState } from 'react';
import { Header } from '../header';
import LoadingButton from '@mui/lab/LoadingButton';
import { SERVER_API_ROUTES, USERNAME_LENGTH } from '@/constants';
import { SERVER_API } from '@/libs';
import { Room } from '@/types';

type WaitingRoomProps = {
  roomId: string;
  setRoomData: (payload: Room) => void;
};

const WaitingRoom: FC<WaitingRoomProps> = ({ roomId, setRoomData }) => {
  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(
    null
  );
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Create video and audio tracks
    const initTracks = async () => {
      const [video, audio] = await Promise.all([
        AgoraRTC.createCameraVideoTrack(),
        AgoraRTC.createMicrophoneAudioTrack(),
      ]);
      setVideoTrack(video);
      setAudioTrack(audio);
    };

    initTracks();

    // Cleanup on component unmount
    return () => {
      videoTrack?.close();
      audioTrack?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCamera = () => {
    if (videoTrack) {
      if (!cameraOn) {
        videoTrack.setEnabled(true);
      } else {
        videoTrack.setEnabled(false);
      }
      setCamera((prev) => !prev);
    }
  };
  const toggleMicrophone = () => {
    if (audioTrack) {
      if (!micOn) {
        audioTrack.setEnabled(true);
      } else {
        audioTrack.setEnabled(false);
      }
      setMic((prev) => !prev);
    }
  };

  const handleJoinMeeting = async () => {
    setIsLoading(true);
    const result = await SERVER_API.postRequest<Room>(
      SERVER_API_ROUTES.ROOM.GUEST_JOIN(roomId),
      { username }
    );
    setIsLoading(false);
    if (result.state === 'success') {
      setRoomData(result.data);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingX: { xs: 2, lg: 16 },
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-between',
          }}
        >
          {/* MEDIA */}
          <Box
            sx={{
              border: '2px solid grey',
              flexBasis: '60%',
              height: 400,
              position: 'relative',
            }}
          >
            {/* Render video preview */}
            {videoTrack && (
              <video
                ref={(ref) => {
                  if (ref) videoTrack.play(ref);
                }}
                autoPlay
                style={{ width: '100%', height: '100%' }}
              />
            )}
            <Box
              sx={{
                alignItems: 'center',
                bottom: 4,
                display: 'flex',
                gap: 8,
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: 3,
                }}
              >
                <IconButton
                  onClick={toggleMicrophone}
                  sx={{ backgroundColor: 'red' }}
                >
                  {micOn ? (
                    <Mic color="secondary" />
                  ) : (
                    <MicOff color="secondary" />
                  )}
                </IconButton>
                <IconButton
                  onClick={toggleCamera}
                  sx={{ backgroundColor: 'red' }}
                >
                  {cameraOn ? (
                    <Videocam color="secondary" />
                  ) : (
                    <VideocamOff color="secondary" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
          {/* FORM */}
          <Box
            sx={{
              alignItems: 'center',
              border: '1px solid green',
              display: 'flex',
              flexBasis: '30%',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Typography>What&apos;s your name ?</Typography>
            <Box>
              <TextField
                id="outlined-basic"
                slotProps={{
                  htmlInput: { maxLength: USERNAME_LENGTH },
                }}
                label="Your name"
                onChange={(ev) => setUsername(ev.target.value)}
                sx={{
                  border: '1px solid #635959',
                  '& .MuiInputBase-input': {
                    color: '#fff',
                  },
                }}
                value={username}
                variant="outlined"
              />
              <Typography sx={{ textAlign: 'right' }}>
                {username.length}/{USERNAME_LENGTH}
              </Typography>
            </Box>

            <LoadingButton
              loading={isLoading}
              onClick={handleJoinMeeting}
              sx={{
                borderRadius: '9999px',
                '&.Mui-disabled': { backgroundColor: '#404040' },
              }}
              variant="contained"
            >
              Ask to join
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WaitingRoom;
