import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Frontend Mentor Challenge" />
        <link rel="icon" type="iamge/png" href="/favicon-32x32.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
