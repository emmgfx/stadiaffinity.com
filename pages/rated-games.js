import { supabase } from "../utils/supabaseClient";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import TextGradient from "../components/TextGradient";
import GamesGrid from "../components/GamesGrid";

const RatedGames = ({ ratedGames }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-4xl my-10 font-semibold">
            <TextGradient>{ratedGames.length} rated</TextGradient> games
          </h1>
          <GamesGrid
            games={ratedGames.map((game) => {
              return {
                id: game.id_game,
                ...game,
              };
            })}
          />
        </Container>
        <div className="h-40" />
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context) => {
  // get the user using the "sb:token" cookie
  // if a user is not authenticated, redirect to the signin page
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: ratedGames, error } = await supabase.rpc("get_user_ratings", {
    id_user_input: user.id,
  });

  if (error) {
    // Return 404 response.
    // No games found or something went wrong with the query
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ratedGames,
    },
  };
};

export default RatedGames;
