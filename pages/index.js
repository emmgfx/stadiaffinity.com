import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";

import DecorativeCovers from "../components/Home/DecorativeCovers";
import HomeHeader from "../components/Home/Header";
import GamesGrid from "../components/GamesGrid";
import Divider from "../components/Divider";
import Steps from "../components/Home/Steps";

const Home = () => {
  const [topGames, setTopGames] = useState([]);
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_top_10");
      if (error) console.error(error);
      else setTopGames(data);
    })();
  }, []);

  return (
    <>
      <DecorativeCovers />
      <Header />
      <Container>
        <HomeHeader />
        <Divider className="mb-12" />
        <GamesGrid
          phantoms={topGames.length === 0 ? 10 : null}
          games={topGames}
        />
      </Container>
      <Steps />
      <Footer />
    </>
  );
};

// export const getServerSideProps = async (context) => {

//   return {
//     props: {
//     },
//   };
// };

export default Home;
