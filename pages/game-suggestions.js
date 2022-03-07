import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GamesGrid from "../components/GamesGrid";
import { useEffect } from "react";
import { useSuggestions } from "../contexts/suggestions";
import { useSession } from "../contexts/user";

const GameSuggestions = () => {
  const { session } = useSession();
  const { suggestions, updateSuggestions } = useSuggestions();

  useEffect(() => {
    if (session) updateSuggestions();
  }, [session]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Game suggestions</h1>
          <GamesGrid
            games={suggestions}
            phantoms={!suggestions ? 5 : null}
            showAffinity={true}
          />
          {suggestions && suggestions.length === 0 && (
            <p>There are no suggestions for you. Rate some games.</p>
          )}
          {/* <pre>{JSON.stringify(suggestions, null, 4)}</pre> */}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default GameSuggestions;
