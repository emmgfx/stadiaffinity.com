import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { supabase } from "../../utils/supabaseClient";
import GamesGrid from "../../components/GamesGrid";

const Search = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!router.query.term) return;
    const search = async (term) => {
      const { data, error } = await supabase
        .from("games")
        .select()
        .ilike("name", `%${term}%`);
      if (data) setResults(data);
      if (error) console.error(error);
    };
    search(router.query.term);
  }, [router.query.term]);

  return (
    <>
      <h1 className="text-4xl my-10">
        Results for <strong>{router.query.term}</strong>
      </h1>
      <GamesGrid games={results} />
    </>
  );
};

export default Search;
