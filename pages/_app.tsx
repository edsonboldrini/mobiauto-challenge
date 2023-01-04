
import * as React from 'react';
import Head from 'next/head';
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { getDesignTokens } from '../src/configs/theme';
import createEmotionCache from '../src/configs/createEmotionCache';
import ColorModeProvider, { ColorModeContext } from '../src/contexts/ColorModeProvider';
import { getColorModeCookie } from '../src/services/ColorModeService';

const clientSideEmotionCache = createEmotionCache();

type AppOwnProps = {
  emotionCache?: EmotionCache
};

type AppOwnInitialProps = {
  colorMode: string
};

function ProviderWrapper(props: any) {
  return (
    <ColorModeProvider initialMode={props.colorMode}>
      {props.children}
    </ColorModeProvider>
  )
}

function Root(props: AppProps & AppOwnInitialProps & AppOwnProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const { colorMode } = React.useContext(ColorModeContext)
  const theme = React.useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export function _App(props: AppProps & AppOwnInitialProps & AppOwnProps) {
  return (
    <ProviderWrapper {...props}>
      <Root {...props} />
    </ProviderWrapper>
  )
}

_App.getInitialProps = async (appContext: AppContext): Promise<AppOwnInitialProps & AppInitialProps> => {
  const initialProps = await App.getInitialProps(appContext);

  const colorModeCookie = getColorModeCookie(appContext.ctx);

  return { ...initialProps, colorMode: colorModeCookie ?? 'light' };
};

export default _App