import { useEffect, useState } from "react";

import { supabase } from "../utils/supabaseClient";

import GamesGrid from "../components/GamesGrid";
import Layout from "../components/Layout";

const Home = () => {
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const { data, error } = await supabase.from("games").select().limit(10);
      if (data) setTopGames(data);
      if (error) console.error(error);
    };
    getGames();
  }, []);

  return (
    <Layout>
      <h1 className="text-6xl font-medium text-center max-w-2xl mx-auto my-24">
        Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF4C10] to-[#B903E7]">
          ideal game
        </span>{" "}
        just a step away from you
      </h1>
      <GamesGrid games={topGames} />
    </Layout>
  );
};

export default Home;
