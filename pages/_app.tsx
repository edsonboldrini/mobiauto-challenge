
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { getDesignTokens } from '../src/configs/theme';
import createEmotionCache from '../src/configs/createEmotionCache';
import ColorModeProvider, { ColorModeContext } from '../src/contexts/ColorModeProvider';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function ProviderWrapper(props: any) {
  return (
    <ColorModeProvider initialMode="light">
      {props.children}
    </ColorModeProvider>
  )
}

function Root(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { mode } = React.useContext(ColorModeContext)
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default function _App(props: any) {
  return (
    <ProviderWrapper>
      <Root {...props} />
    </ProviderWrapper>
  )
}