import { useState, useEffect } from "react";

import { supabase } from "../utils/supabaseClient";
import { useSession } from "../contexts/user";

import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GamesGrid from "../components/GamesGrid";

const GameSuggestions = () => {
  const { session } = useSession();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data, error } = await supabase.rpc("get_game_recommendations", {
        id_user_input: session.user.id,
      });
      if (error) console.error(error);
      else setSuggestions(data);
    })();
  }, [session]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Game suggestions</h1>
          <GamesGrid
            games={suggestions}
            phantoms={suggestions.length === 0 ? 10 : null}
          />
          {/* <pre>{JSON.stringify(suggestions, null, 4)}</pre> */}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default GameSuggestions;
