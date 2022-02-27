import Head from "next/head";
import { Provider } from "react-redux";

import { UserContextProvider } from "../contexts/user";
import store from "../store/store";

import "../styles/globals.css";

// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Stadiaffinity</title>
        </Head>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
