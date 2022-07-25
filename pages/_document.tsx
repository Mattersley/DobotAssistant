import {
  Html, Head, Main, NextScript,
} from 'next/document'

const Document = () => (
  <Html>
    <Head>
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link href="/site.webmanifest" rel="manifest" />
      <link color="#800080" href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#9f00a7" name="msapplication-TileColor" />
      <meta content="#ffffff" name="theme-color" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
