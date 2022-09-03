import { useState, useEffect } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import TextGradient from "../components/TextGradient";
import GamesGrid from "../components/GamesGrid";
import PageTitle from "../components/PageTitle";

const RatedGames = ({ user }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    supabaseClient
      .rpc("get_user_ratings", {
        id_user_input: user.id,
      })
      .then(({ data, error }) => {
        if (error) alert(error.message);
        else setGames(data);
      });
  }, [user.id, setGames]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="h-8" />
          <PageTitle>
            <TextGradient>{games.length} rated</TextGradient> games
          </PageTitle>
          <div className="h-8" />
          <GamesGrid
            games={games.map((game) => {
              return {
                id: game.id_game,
                ...game,
              };
            })}
          />
        </Container>
        <div className="h-40" />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default RatedGames;
