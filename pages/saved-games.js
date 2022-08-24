import {
  withPageAuth,
  getUser,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import TextGradient from "../components/TextGradient";
import GamesGrid from "../components/GamesGrid";

const SavedGames = ({ savedGames }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-4xl my-10 font-semibold">
            <TextGradient>{savedGames.length} saved</TextGradient> games
          </h1>
          <GamesGrid
            games={savedGames.map((game) => {
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

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    // Access the user object
    const { user } = await getUser(ctx);
    const { data: savedGames, error } = await supabaseServerClient(ctx).rpc(
      "get_user_bookmarks",
      {
        id_user_input: user.id,
      }
    );

    return { props: { savedGames } };
  },
});

export default SavedGames;
