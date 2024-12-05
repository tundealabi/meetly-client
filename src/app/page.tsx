import { Box, Container, Grid, Stack, Typography } from '@mui/material';
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
      <Grid
        container
        component="main"
        flex={1}
        justifyContent="center"
        alignItems="center"
        mt="4rem"
        mx="auto"
        spacing={4}
        sx={{
          maxWidth: '1200px',
          px: { xs: 2, md: 4 }
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          order={{ xs: 1, md: 2 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            width="100%"
            maxWidth={500}
            sx={{
              px: { xs: 2, md: 0 }
            }}
          >
            <Image
              alt="hero-img"
              height={600}
              src="/image/meetly-vector.png"
              style={{ borderRadius: 10, maxWidth: '100%', height: 'auto' }}
              width={600}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Container sx={{ maxWidth: '100%' }}>
            <Box
              mb={4}
              display="flex"
              gap="0.4rem"
              sx={{
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center'
              }}
            >
              <Image
                alt="logo"
                height={32}
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
                  fontSize: { xs: '2.125rem', md: '3rem', lg: '4rem' },
                  mb: 2,
                  lineHeight: { xs: '1.2', md: '1.4' }
                }}
                fontWeight="600"
              >
                Video calls and meetings for everyone, anywhere
              </Typography>
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Connect, collaborate, and celebrate with friends, family, and
                colleagues from anywhere with Meetly
              </Typography>
            </Box>
            <Stack
              sx={{
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
              direction={{ xs: 'column', md: 'row' }}
              gap={4}
            >
              {session ? <CreateMeeting /> : <SignInWithGoogle />}
              <JoinWithCode />
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </Stack>
  );
}
