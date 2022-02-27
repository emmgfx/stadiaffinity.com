import { supabase } from "../utils/supabaseClient";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";

import DecorativeCovers from "../components/Home/DecorativeCovers";
import HomeHeader from "../components/Home/Header";
import GamesGrid from "../components/GamesGrid";
import Divider from "../components/Divider";
import Steps from "../components/Home/Steps";

const Home = ({ topGames }) => {
  return (
    <>
      <DecorativeCovers />
      <Header />
      <Container>
        <HomeHeader />
        <Divider className="mb-12" />
        <GamesGrid games={topGames} />
      </Container>
      <Steps />
      <Footer />
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
