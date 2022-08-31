import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import GamesGrid from "../../components/GamesGrid";
import Header from "../../components/Header";
import TextGradient from "../../components/TextGradient";
import Button from "../../components/Button";

const Games = ({ games: initialGames = [] }) => {
  const [games, setGames] = useState(initialGames);
  const [loading, setLoading] = useState(false);

  const loadMoreGames = async () => {
    setLoading(true);
    const { data } = await supabaseClient.rpc("get_games", {
      limit_input: 20,
      offset_input: games.length,
    });
    setGames((currentGames) => [...currentGames, ...data]);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Container>
        <h1 className="text-3xl">
          Know all the <TextGradient>Stadia Games</TextGradient>
        </h1>
        <div className="h-8" />
        <GamesGrid games={games} />
        <div className="h-16" />
        <div className="text-center">
          <Button onClick={loadMoreGames} disabled={loading}>
            {loading ? "Loading more..." : "Load more"}
          </Button>
        </div>
        <div className="h-16" />
      </Container>
      <Footer />
    </>
  );
};

export async function getStaticProps(context) {
  const { data, error } = await supabaseClient.rpc("get_games", {
    limit_input: 20,
    offset_input: 0,
  });

  return {
    props: {
      games: data,
    },
    revalidate: 60 * 60, // In seconds, 1 hour
  };
}

export default Games;
