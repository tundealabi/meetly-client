import { Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import {
  CreateMeeting,
  Header,
  JoinWithCode,
  SignInWithGoogle
} from '@/components';
import { getSession } from '@/helpers';

export default async function Home() {
  const session = await getSession();
  return (
    <Stack minHeight="100vh">
      <Header />
      <Stack
        component="main"
        flex={1}
        justifyContent="space-between"
        mt="4rem"
        mx="auto"
        // sx={{
        //   direction: { xs: 'column', md: 'row' }
        //   // mx: { xs: 'none', md: 'auto' }
        // }}
        direction="row"
      >
        <Container sx={{ maxWidth: { xs: 'md', md: 'sm' } }}>
          <Box
            mb={4}
            display="flex"
            gap="0.4rem"
            sx={{
              justifyContent: { xs: 'center', md: 'left' },
              alignItems: 'center'
            }}
          >
            <Image
              alt="logo"
              height={32}
              // src="/web-app-manifest-192x192.png"
              src="/image/png/color-video.png"
              style={{ borderRadius: 10 }}
              width={32}
            />

            <Typography
              component="h3"
              sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
              color="#5f6368"
            >
              Meetly
            </Typography>
          </Box>
          <Box mb={10} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              component="h6"
              sx={{
                fontSize: { xs: '2.125rem', md: '4rem' },
                mb: 2,
                lineHeight: { xs: '1.2', md: '1.4' }
              }}
              fontWeight="600"
            >
              Video calls and meetings for everyone, anywhere
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Connect, collaborate, and celebrate with friends, family and
              colleagues from anywhere with Meetly
            </Typography>
          </Box>
          <Stack
            sx={{
              alignItems: { xs: 'center', md: 'left' },
              justifyContent: { xs: 'center', md: 'left' }
            }}
            direction={{ md: 'row' }}
            gap={4}
          >
            {session ? <CreateMeeting /> : <SignInWithGoogle />}
            <JoinWithCode />
          </Stack>
        </Container>
        <Container maxWidth="md">
          <Box
            width={600}
            justifyContent="center"
            alignItems="center"
            sx={{ display: { xs: 'hide', md: 'flex' } }}
          >
            <Image
              alt="hero-img"
              height={600}
              src="/image/meetly-vector.png"
              style={{ borderRadius: 10 }}
              width={600}
            />
          </Box>
        </Container>
      </Stack>
    </Stack>
  );
}
