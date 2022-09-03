import { useEffect } from "react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";

import { useSuggestions } from "../contexts/suggestions";

import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GamesGrid from "../components/GamesGrid";
import PageTitle from "../components/PageTitle";

const GameSuggestions = () => {
  const { suggestions, updateSuggestions } = useSuggestions();

  useEffect(() => {
    updateSuggestions();
  }, [updateSuggestions]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="h-8" />
          <PageTitle>Game suggestions</PageTitle>
          <div className="h-8" />
          <div className="bg-white/10 p-4 px-6 rounded-xl max-w-4xl mx-auto">
            <p className="mb-2">
              <strong>How it works?</strong>
            </p>
            <p>
              This suggestions are calculated using the ratings you have given
              and crossing them with the data of the rest of the users. You can
              have most accurate suggestions the more ratings you give.
            </p>
          </div>
          <div className="h-10" />
          <GamesGrid
            games={suggestions}
            phantoms={!suggestions ? 5 : null}
            showAffinity={true}
          />
          {suggestions && suggestions.length === 0 && (
            <p>There are no suggestions for you. Rate some games.</p>
          )}
        </Container>
        <div className="h-20" />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default GameSuggestions;
