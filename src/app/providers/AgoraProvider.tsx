'use client';

import AgoraRTC, {
  AgoraRTCProvider
  // AgoraRTCScreenShareProvider
} from 'agora-rtc-react';
import { FC, PropsWithChildren } from 'react';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }) as never;
// const clientTwo = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }) as never;

const AgoraProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AgoraRTCProvider client={client}>
      {/* <AgoraRTCScreenShareProvider client={clientTwo}> */}
      {children}
      {/* </AgoraRTCScreenShareProvider> */}
    </AgoraRTCProvider>
  );
};

export default AgoraProvider;
