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

export async function getStaticProps(context) {
  const { data } = await supabaseClient.rpc("get_top_10");

  return {
    props: {
      topGames: data,
    },
    revalidate: 60 * 10, // In seconds, 10 minutes.
  };
}

export default Home;
