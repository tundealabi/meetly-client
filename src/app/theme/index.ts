'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: 'none'
        }
      }
    }
  },
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)'
  }
});

export default theme;
