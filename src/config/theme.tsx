import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6551bf',
    },
    success: {
      main: '#43a48d',
      light: '#dff3f2'
    },
    grey: {
      '500': '#454357',
      '200': '#87859a'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
