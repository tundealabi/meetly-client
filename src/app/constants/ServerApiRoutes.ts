export const SERVER_API_ROUTES = {
  AUTH: {
    SIGNIN: 'users/auth/signin',
  },
  ROOM: {
    CREATE: 'rooms',
    INFO: (id: string) => `rooms/${id}`,
    JOIN: (id: string) => `rooms/${id}/join`,
    GUEST_JOIN: (id: string) => `rooms/${id}/guest-join`,
  },
  USER: {
    UPDATE_PROFILE: 'me/profile',
  },
};
