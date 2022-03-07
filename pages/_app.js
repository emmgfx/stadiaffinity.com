import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import Head from "next/head";

import { UserContextProvider } from "../contexts/user";
import store from "../store/store";
import { formatTitle } from "../utils/title";

import IndeterminateProgressBar from "../components/IndeterminateProgressBar";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { SuggestionsContextProvider } from "../contexts/suggestions";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [routeChanging, setRouteChanging] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setRouteChanging(true);
    const handleRouteChangeComplete = () => setRouteChanging(false);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <UserContextProvider>
        <SuggestionsContextProvider>
          <ToastContainer
            transition={Slide}
            draggable={false}
            hideProgressBar={true}
            autoClose={3000}
          />
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>{formatTitle()}</title>
          </Head>
          {routeChanging && <IndeterminateProgressBar />}
          <Component {...pageProps} />
        </SuggestionsContextProvider>
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
