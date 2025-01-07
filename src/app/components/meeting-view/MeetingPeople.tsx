import { Avatar, Box, Stack, Typography } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import { FC } from 'react';
import { UID, useRemoteUsers } from 'agora-rtc-react';

type UserAttribute = {
  name: string;
  profilePicture?: string;
};

type UserMediaStatus = {
  isCameraOn: boolean;
  isMicOn: boolean;
};

type MeetingPeopleProps = {
  hostUid: UID;
  localUsername: string;
  localUserHasMicOn: boolean;
  localUserProfilePicture: string;
  localUserUid: UID;
  remoteUsersDetailsMap: Record<string, UserAttribute>;
  usersMediaTypeStatusMap: Record<string, UserMediaStatus>;
};

const MeetingPeople: FC<MeetingPeopleProps> = ({
  hostUid,
  localUsername,
  localUserHasMicOn,
  localUserProfilePicture,
  localUserUid,
  remoteUsersDetailsMap,
  usersMediaTypeStatusMap
}) => {
  const remoteUsers = useRemoteUsers();

  const users: {
    hasMicOn: boolean;
    profilePicture: string;
    uid: UID;
    username: string;
  }[] = [
    {
      hasMicOn: localUserHasMicOn,
      profilePicture: localUserProfilePicture,
      uid: localUserUid,
      username: localUsername
    }
  ];

  remoteUsers.forEach((user) => {
    const details = {
      hasMicOn: usersMediaTypeStatusMap[user.uid]?.isMicOn ?? false,
      profilePicture: remoteUsersDetailsMap[user.uid]?.profilePicture ?? '',
      uid: user.uid,
      username: remoteUsersDetailsMap[user.uid]?.name || 'Fetching username...'
    };
    if (user.uid === hostUid) {
      users.unshift(details);
    } else {
      users.push(details);
    }
  });

  return (
    <Box>
      <Typography>Contributors ({users.length})</Typography>

      <Stack sx={{ gap: 2, mt: 2 }}>
        {users.map((user) => (
          <Box
            key={user.uid}
            sx={{
              alignItems: 'center',
              borderBlock: '1px solid#808080',
              display: 'flex',
              gap: 4,
              py: 1
            }}
          >
            <Avatar {...stringAvatar(user.username)} />
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: 1
                }}
              >
                <Typography>{user.username}</Typography>
                {user.uid === localUserUid ? (
                  <Typography>(You)</Typography>
                ) : null}
              </Box>
              {user.uid === hostUid ? (
                <Typography fontSize="0.7rem">Meeting host</Typography>
              ) : (
                <Typography fontSize="0.7rem">Member</Typography>
              )}
            </Box>
            {user.hasMicOn ? (
              <Mic color="secondary" />
            ) : (
              <MicOff color="secondary" />
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const splitName = name.split(' ');
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: 30,
      width: 30
    },
    children: `${splitName[0][0]}${splitName.length > 1 ? splitName[1][0] : ''}`
  };
}

export default MeetingPeople;
