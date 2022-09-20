import Head from "next/head";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import diffDays from "../utils/diffDays";
import { formatTitle } from "../utils/title";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import TextGradient from "../components/TextGradient";
import GamesGrid from "../components/GamesGrid";

const The100GamesPromise = ({ games = [] }) => {
  const remainingDays = diffDays(new Date(), new Date(2022, 11, 31));
  const missingGames = 100 - games.length;

  return (
    <>
      <Head>
        <title>{formatTitle("The one hundred games promise")}</title>
        <meta
          name="description"
          content="On february, the Stadia team promised 100 new games arriving to Stadia this 2022. Today, it looks like they're going to break this promise."
        />
        <meta
          property="og:image"
          content="https://www.stadiaffinity.com/screenshot-100-games.png"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://www.stadiaffinity.com/screenshot-100-games.png"
        />
      </Head>

      <Header />
      <section className="bg-[url('/images/bg-steps.svg')] bg-center bg-no-repeat bg-auto py-20">
        <Container className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            The <TextGradient>one hundred games</TextGradient> promise
          </h1>
          <div className="h-20" />
          <p>
            On february, the Stadia team{" "}
            <a
              href="https://blog.google/products/stadia/savepoint-january-2022-updates/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              promised 100 new games arriving to Stadia this 2022.
            </a>
          </p>
          <p>Today, it looks like they&apos;re going to break this promise.</p>
          <div className="h-20" />
          <p className="text-3xl font-bold text-center">
            To keep their promise,
            <br />
            they should release an average of <br />
            <TextGradient>
              one game each{" "}
              {Math.round((remainingDays / missingGames) * 100) / 100} days
            </TextGradient>
            .
          </p>
          <div className="h-20" />

          <p className="text-xl">
            Stadia released {games.length} games this year.
          </p>
          <p>
            They should release{" "}
            <TextGradient>
              {missingGames} games in the next {remainingDays} days
            </TextGradient>
            .
          </p>
        </Container>
      </section>
      <Container>
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          The games for this year
        </h1>
        <div className="h-20" />
        <GamesGrid small showReleaseDate games={games} />
      </Container>
      <div className="h-20" />
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const { data } = await supabaseClient
    .from("games")
    .select()
    .gte("release_date", "2022-01-01")
    .order("release_date", { ascending: false });

  return {
    props: {
      games: data ?? [],
    },
    revalidate: 60 * 10, // In seconds, 10 minutes.
  };
}

export default The100GamesPromise;
