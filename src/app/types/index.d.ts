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
