import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Head from "next/head";

import { formatTitle } from "../../../../utils/title";

import Container from "../../../../components/Container";
import Footer from "../../../../components/Footer";
import GamesGrid from "../../../../components/GamesGrid";
import Header from "../../../../components/Header";
import PageTitle from "../../../../components/PageTitle";

const Games = ({ games, meta_value }) => {
  return (
    <>
      <Head>
        <title>{formatTitle(`${meta_value} games on Stadia`)}</title>
      </Head>
      <Header />
      <Container>
        <div className="h-8" />
        <PageTitle>
          Stadia has {games.length} games from {meta_value}
        </PageTitle>
        <div className="h-8" />
        <GamesGrid games={games} />
        <div className="h-16" />
      </Container>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  if (!context.params.meta_key) return { notFound: true };
  if (!context.params.meta_value) return { notFound: true };

  const { data: games, error } = await supabaseClient.rpc("get_games_by_meta", {
    meta_key_input: context.params.meta_key,
    meta_value_input: context.params.meta_value,
  });

  if (error) return { notFound: true };

  return {
    props: {
      games,
      meta_key: context.params.meta_key,
      meta_value: context.params.meta_value,
    },
    revalidate: 60 * 60, // In seconds, 1 hour
  };
}

export default Games;
