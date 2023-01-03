import * as React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { roboto } from '../src/configs/theme';

export default class _Document extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en" className={roboto.className}>
        <Head>
          <link rel="icon" sizes="16x16" href="/favicon-16x16.png"></link>
          <link rel="icon" sizes="32x32" href="/favicon-32x32.png"></link>
          <link rel="icon" sizes="96x96" href="/favicon-96x96.png"></link>
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