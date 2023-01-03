import { Roboto } from '@next/font/google';
import { createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey, red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          main: '#6551bf'
        },
        divider: '#2a29a5',
        background: {
          default: red[50],
          paper: '#dff3f2',
        },
        text: {
          primary: '#454357',
          secondary: '#87859a',
        },
        success: {
          main: '#43a48d',
        }
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#6551bf'
        },
        divider: '#2a29a5',
        background: {
          default: grey[900],
          paper: grey[900],
        },
        text: {
          primary: '#fff',
          secondary: grey[500],
        },
        success: {
          main: '#43a48d',
        }
      }),
  },
});

// Create a theme instance.
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#6551bf',
//     },
//     success: {
//       main: '#43a48d',
//       light: '#dff3f2'
//     },
//     grey: {
//       '500': '#454357',
//       '200': '#87859a'
//     }
//   },
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
// });

// export default theme;
