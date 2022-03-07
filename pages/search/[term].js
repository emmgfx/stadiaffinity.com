import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { supabase } from "../../utils/supabaseClient";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GamesGrid from "../../components/GamesGrid";
import Container from "../../components/Container";
import TextGradient from "../../components/TextGradient";

const Search = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!router.query.term) return;
    const search = async (term) => {
      const { data, error } = await supabase.rpc("get_search", {
        term_input: term,
      });
      if (data) setResults(data);
      if (error) console.error(error);
    };
    search(router.query.term);
  }, [router.query.term]);

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-4xl my-10">
            <TextGradient>{results.length} results</TextGradient> for{" "}
            <strong>{router.query.term}</strong>
          </h1>
          <GamesGrid games={results} />
          <div className="h-40" />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Search;
