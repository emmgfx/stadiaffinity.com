import Head from "next/head";
import Link from "next/link";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";

import DecorativeCovers from "../components/Home/DecorativeCovers";
import HomeHeader from "../components/Home/Header";
import GamesGrid from "../components/GamesGrid";
import Divider from "../components/Divider";
import Steps from "../components/Home/Steps";
import Button from "../components/Button";

const Home = ({ topGames }) => {
  return (
    <>
      <Head>
        <title>Stadiaffinity</title>
        <meta
          name="description"
          content="Your ideal game is just a step away from you. Stadiaffinity helps you find your next game."
        />
        <meta
          property="og:image"
          content="https://www.stadiaffinity.com/screenshot.png"
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://www.stadiaffinity.com/screenshot.png"
        />
      </Head>
      <DecorativeCovers />
      <Header />
      <Container>
        <HomeHeader />
        <Divider className="mb-12" />
        <GamesGrid
          phantoms={topGames.length === 0 ? 10 : null}
          games={topGames}
        />
        <div className="h-16" />
        <div className="text-center">
          <Link href="/games">
            <Button variant="white-outline">View all Games</Button>
          </Link>
        </div>
      </Container>
      <Steps />
      <Footer />
    </>
  );
};

export async function getStaticProps() {
  const { data } = await supabaseClient.rpc("get_top_10");

  return {
    props: {
      topGames: data ?? [],
    },
    revalidate: 60 * 10, // In seconds, 10 minutes.
  };
}

export default Home;
