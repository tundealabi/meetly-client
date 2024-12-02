import { Room as RoomData } from '@/types';
import { FC, useState } from 'react';
import dynamic from 'next/dynamic';
type RoomProps = {
  data: RoomData | null;
  roomId: string;
};

const AgoraProvider = dynamic(() => import('../../providers/AgoraProvider'), {
  ssr: false,
});
const MeetingView = dynamic(
  () => import('../meeting-view').then((module) => module.MeetingView),
  { ssr: false }
);
const WaitingRoom = dynamic(() => import('./WaitingRoom'), { ssr: false });

const Room: FC<RoomProps> = ({ data, roomId }) => {
  const [state, setState] = useState(() => data);

  const handleSetState = (payload: RoomData) => setState(payload);
  console.log('state', state);
  return (
    <AgoraProvider>
      {state ? (
        <MeetingView
          joinRoomOptions={{
            channel: state.roomName,
            token: state.token,
            uid: state.uid,
          }}
          username={state.username}
        />
      ) : (
        <WaitingRoom roomId={roomId} setRoomData={handleSetState} />
      )}
    </AgoraProvider>
  );
};

export default Room;
