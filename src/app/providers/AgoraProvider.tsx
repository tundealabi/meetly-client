'use client';

import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import { FC, PropsWithChildren } from 'react';

const AgoraProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AgoraRTCProvider
      client={AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }) as never}
    >
      {children}
    </AgoraRTCProvider>
  );
};

export default AgoraProvider;
