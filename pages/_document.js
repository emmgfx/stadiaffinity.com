import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <title>Stadiaffinity</title>
          <meta
            name="description"
            content="Your ideal game just a step away from you. Stadiaffinity helps you find your next game."
          />
          <meta
            property="og:image"
            content="https://www.stadiaffinity.com/screenshot.png"
          />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="800" />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:image"
            content="https://www.stadiaffinity.com/screenshot.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
