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
      <AppBar sx={{ bgcolor: '#161b21' }} position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <MuiLink
            component={NextLink}
            href="/"
            underline="none"
            // sx={{ color: 'white' }}
            sx={{color: "#15e8d8"}}
          >
            <Stack alignItems="center" direction="row" spacing={0}>
              <Image
                alt="logo"
                height={30}
                // src="/web-app-manifest-192x192.png"
                src="/image/svg/meetly-logo.svg"
                style={{ borderRadius: 10 }}
                width={40}
              />
              <Typography component="span" color="#15e8d8">Meetly</Typography>
            </Stack>
          </MuiLink>
          <Stack alignItems="center" direction="row" spacing={0.5} color="#15e8d8">
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
