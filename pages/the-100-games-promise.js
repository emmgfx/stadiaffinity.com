import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TextGradient from "../components/TextGradient";
import PageTitle from "../components/PageTitle";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import GamesGrid from "../components/GamesGrid";
import diffDays from "../utils/diffDays";

const The100GamesPromise = ({ games = [] }) => {
  // const remainingDays =
  // const oneDay = ; // hours*minutes*seconds*milliseconds
  // const firstDate = new Date(2008, 1, 12);
  // const secondDate = new Date(2008, 1, 22);

  const remainingDays = diffDays(new Date(), new Date(2022, 11, 31));
  const missingGames = 100 - games.length;
  return (
    <>
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
          <p>Today, it looks like is going to break his promise.</p>
          <div className="h-20" />
          <p className="text-3xl font-bold text-center">
            To keep his promise,
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
        <GamesGrid games={games} />
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
