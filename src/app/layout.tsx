import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';

import { roboto } from './fonts';
import './globals.css';
import theme from './theme';
import { AuthProvider } from './providers';
import { getSession } from './helpers';

export const metadata: Metadata = {
  title: 'Meetly',
  description: 'Bringing People Together, One Meeting at a Time',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider session={session}>{children}</AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
