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

export async function getStaticProps(context) {
  const { data, error } = await supabase.rpc("get_top_10");

  return {
    props: {
      topGames: data,
    },
    revalidate: 60 * 10, // In seconds, 10 minutes.
  };
}

export default Home;
