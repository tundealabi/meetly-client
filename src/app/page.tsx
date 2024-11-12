import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

import { Header, JoinWithCode } from '@/components';

export default function Home() {
  return (
    <Stack minHeight="100vh">
      <Header />
      <Stack component="main" flex={1} justifyContent="center">
        <Container maxWidth="md">
          <Box mb={10} textAlign="center">
            <Typography
              component="h1"
              sx={{ fontSize: { xs: '2.125rem', md: '4rem' }, mb: 2 }}
            >
              Video calls and meetings for everyone
            </Typography>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Connect, collaborate, and celebrate from anywhere with Meetly
            </Typography>
          </Box>
          <Stack
            alignItems="center"
            direction={{ md: 'row' }}
            gap={4}
            justifyContent="center"
          >
            <Button startIcon={<VideoCallIcon />} variant="contained">
              New meeting
            </Button>
            <JoinWithCode />
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
}
