import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, Slide } from "react-toastify";

import { UserContextProvider } from "../contexts/user";
import { SuggestionsContextProvider } from "../contexts/suggestions";
import { formatTitle } from "../utils/title";

import IndeterminateProgressBar from "../components/IndeterminateProgressBar";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

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
    <UserContextProvider>
      <SuggestionsContextProvider>
        <ToastContainer
          transition={Slide}
          draggable={false}
          hideProgressBar={true}
          autoClose={3000}
        />
        <Head>
          <title>{formatTitle()}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {routeChanging && <IndeterminateProgressBar />}
        <Component {...pageProps} />
      </SuggestionsContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
