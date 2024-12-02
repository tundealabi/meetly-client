import { SERVER_API_ROUTES } from '@/constants';
import { getSession } from '@/helpers';
import { SERVER_API } from '@/libs';
import { Room, RoomInfo } from '@/types';

export const getRoomInfo = async (roomId: string) => {
  return SERVER_API.getRequest<RoomInfo>(SERVER_API_ROUTES.ROOM.INFO(roomId));
};

export const joinRoom = async (roomId: string) => {
  const session = await getSession();
  if (!session) return { data: null, type: 'guest' };
  const result = await SERVER_API.postRequest<Room>(
    SERVER_API_ROUTES.ROOM.JOIN(roomId),
    {},
    { headers: { Authorization: `Bearer ${session.token.accessToken}` } }
  );
  return result.state === 'success'
    ? { data: result.data, type: 'user' }
    : { data: null, type: 'error' };
};
