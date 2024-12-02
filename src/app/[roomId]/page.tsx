import { Typography } from '@mui/material';
import { Room } from '@/components/room';
import { getRoomInfo, joinRoom } from '@/services';
import { notFound } from 'next/navigation';

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const roomId = (await params).roomId;
  const room = await getRoomInfo(roomId);
  // console.log('room', room);
  if (room.state === 'error') {
    return notFound();
  }
  const joinRoomResponse = await joinRoom(roomId);

  // console.log('joinRoomResponse', joinRoomResponse);

  if (joinRoomResponse.type === 'error')
    return <Typography>Something went wrong!!. Please try again 🍻</Typography>;

  return <Room data={joinRoomResponse.data} roomId={roomId} />;
}
