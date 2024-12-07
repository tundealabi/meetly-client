export type ServerApiResponse<T> =
  | {
      data: T;
      message: string;
      metadata: Record<string, string | number> | null;
      state: 'success';
    }
  | {
      errors: Record<string, string[]> | null;
      message: string;
      state: 'error';
    };

export type SignInResponse = {
  tokens: Token;
  user: User;
};

// AUTH

export type Token = {
  accessToken: string;
};

export type User = {
  email: string;
  profilePicture: string;
  username: string;
};

//  ROOM
export type RoomInfo = {
  createdBy: { _id: string; username: string };
  roomName: string;
};
export type Room = RoomInfo & {
  profilePicture?: string;
  rtcToken: string;
  rtmToken: string;
  screenShareRtcToken: string;
  screenShareUid: number;
  uid: number;
  userId: string;
  username: string;
};
export type CreatedRoom = Pick<RoomInfo, 'roomName'>;
export type JoinRoomOptions = {
  channel: string;
  rtcToken: string;
  rtmToken: string;
  screenShareRtcToken: string;
  screenShareUid: number;
  uid: number;
};

export type RoomInfoType = 'details' | 'people' | 'chat' | null;
