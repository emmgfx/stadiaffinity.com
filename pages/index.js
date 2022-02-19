import { supabase } from "../utils/supabaseClient";

import GamesGrid from "../components/GamesGrid";

const Home = ({ topGames }) => {
  return (
    <>
      <h1 className="text-6xl font-medium text-center max-w-2xl mx-auto my-24">
        Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF4C10] to-[#B903E7]">
          ideal game
        </span>{" "}
        just a step away from you
      </h1>
      <GamesGrid games={topGames} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { data: topGames, error } = await supabase
    .from("games")
    .select()
    .limit(10);

  if (error) console.error(error);

  return {
    props: {
      topGames,
    },
  };
};

export default Home;
