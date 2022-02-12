import Head from "next/head";

import { UserContextProvider } from "../contexts/user";

import "../styles/globals.css";

// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
