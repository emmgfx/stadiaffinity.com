import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, Slide } from "react-toastify";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import { useSearchStore } from "../store/stores";
import { SuggestionsContextProvider } from "../contexts/suggestions";
import { formatTitle } from "../utils/title";

import IndeterminateProgressBar from "../components/IndeterminateProgressBar";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [routeChanging, setRouteChanging] = useState(false);
  const { setTerm } = useSearchStore((state) => state);

  useEffect(() => {
    if (router.pathname !== "/search/[term]") setTerm("");
  }, [router.pathname]);

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
    <UserProvider supabaseClient={supabaseClient}>
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
    </UserProvider>
  );
}

export default MyApp;
