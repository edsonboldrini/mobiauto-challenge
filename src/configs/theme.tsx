import { Roboto } from '@next/font/google';
import { grey, red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    customBackground: {
      red: string;
      green: string;
    };
  }
  interface PaletteOptions {
    customBackground: {
      red: string;
      green: string;
    };
  }
}

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
          main: '#6551bf',
          light: '#c9c1e7',
          dark: '#2a29a5'
        },
        text: {
          primary: '#454357',
          secondary: '#87859a',
        },
        success: {
          main: '#43a48d',
        },
        customBackground: {
          red: red[50],
          green: '#dff3f2',
        },
      }
      : {
        // palette values for dark mode
        primary: {
          main: '#6551bf',
          light: '#c9c1e7',
          dark: '#2a29a5'
        },
        background: {
          default: grey[900],
          paper: grey[900],
        },
        text: {
          primary: '#fff',
          secondary: '#eee',
        },
        success: {
          main: '#43a48d',
        },
        customBackground: {
          red: '#454357',
          green: '#454357',
        },
      }),
  },
});
