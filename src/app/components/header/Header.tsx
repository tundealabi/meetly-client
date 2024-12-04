import CircleIcon from '@mui/icons-material/Circle';
import {
  AppBar,
  Box,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import AvatarMenu from './AvatarMenu';

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric'
};

const Header = () => {
  const date = new Date();

  return (
    <Box>
      <AppBar sx={{ bgcolor: '#1E1E1E' }} position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <MuiLink
            component={NextLink}
            href="/"
            underline="none"
            sx={{ color: 'white' }}
          >
            <Stack alignItems="center" direction="row" spacing={1}>
              <Image
                alt="logo"
                height={30}
                src="/web-app-manifest-192x192.png"
                style={{ borderRadius: 10 }}
                width={30}
              />
              <Typography component="span">Meetly</Typography>
            </Stack>
          </MuiLink>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Typography component="span">
              {date.toLocaleString('en-US', timeOptions)}
            </Typography>
            <CircleIcon sx={{ fontSize: 6 }} />
            <Typography component="span">
              {date.toLocaleString('en-US', dateOptions)}
            </Typography>
          </Stack>
          <AvatarMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default Header;
