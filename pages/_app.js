import Head from "next/head";
import { Provider } from "react-redux";

import { UserContextProvider } from "../contexts/user";
import store from "../store/store";

import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
        <Header />
        <main className="pb-36">
          <Container>
            <Component {...pageProps} />
          </Container>
        </main>
        <Footer />
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
