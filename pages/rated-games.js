import { supabase } from "../utils/supabaseClient";

import { useSession } from "../contexts/user";

import Header from "../components/Header";
import { useRouter } from "next/router";

const RatedGames = ({ ratedGames }) => {
  const { session } = useSession();
  const router = useRouter();

  const updateRating = async (gameId, rating) => {
    const values = {
      id_user: session.user.id,
      id_game: gameId,
      rating: rating,
    };
    const options = { onConflict: "id_game,id_user" };
    const { data, error } = await supabase
      .from("ratings")
      .upsert(values, options);
    router.replace(router.asPath); // Refresh data
    console.log({ data, error });
  };

  return (
    <>
      <Header />
      <h1>Rated games</h1>
      <Table games={ratedGames} updateRating={updateRating} />
    </>
  );
};

const Table = ({ games, updateRating }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Your rating</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => {
          return (
            <tr key={game.id_game}>
              <td>{game.id_game}</td>
              <td>{game.name}</td>
              <td>
                <button
                  onClick={() => updateRating(game.id_game, 1)}
                  disabled={game.rating === 1}
                >
                  1
                </button>
                <button
                  onClick={() => updateRating(game.id_game, 2)}
                  disabled={game.rating === 2}
                >
                  2
                </button>
                <button
                  onClick={() => updateRating(game.id_game, 3)}
                  disabled={game.rating === 3}
                >
                  3
                </button>
                <button
                  onClick={() => updateRating(game.id_game, 4)}
                  disabled={game.rating === 4}
                >
                  4
                </button>
                <button
                  onClick={() => updateRating(game.id_game, 5)}
                  disabled={game.rating === 5}
                >
                  5
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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

  let { data: ratedGames, error } = await supabase.rpc("get_user_ratings", {
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
