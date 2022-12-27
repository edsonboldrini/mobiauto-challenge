import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme, { roboto } from '../src/config/theme';

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en" className={roboto.className}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="icon" sizes="16x16" href="https://www.mobiauto.com.br/tabela-fipe/icons/favicon-16x16.png"></link>
          <link rel="icon" sizes="32x32" href="https://www.mobiauto.com.br/tabela-fipe/icons/favicon-32x32.png"></link>
          <link rel="icon" sizes="96x96" href="https://www.mobiauto.com.br/tabela-fipe/icons/favicon-96x96.png"></link>
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}