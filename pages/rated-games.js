import { supabase } from "../utils/supabaseClient";
import { getRatedGames, updateRating } from "../utils/api";
import { useSession } from "../contexts/user";
import { useRouter } from "next/router";

const RatedGames = ({ ratedGames }) => {
  return (
    <>
      <h1>Rated games</h1>
      <Table games={ratedGames} updateRating={updateRating} />
    </>
  );
};

const Table = ({ games }) => {
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
          const { rating, id_game: gameId, name } = game;
          return (
            <tr key={gameId}>
              <td>{gameId}</td>
              <td>{game.name}</td>
              <td>
                <RatingButton
                  gameId={gameId}
                  rating={1}
                  disabled={rating === 1}
                />
                <RatingButton
                  gameId={gameId}
                  rating={2}
                  disabled={rating === 2}
                />
                <RatingButton
                  gameId={gameId}
                  rating={3}
                  disabled={rating === 3}
                />
                <RatingButton
                  gameId={gameId}
                  rating={4}
                  disabled={rating === 4}
                />
                <RatingButton
                  gameId={gameId}
                  rating={5}
                  disabled={rating === 5}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const RatingButton = ({ gameId, rating, disabled }) => {
  const { session } = useSession();
  const router = useRouter();

  return (
    <button
      className="p-2 rounded bg-teal-500 disabled:opacity-50"
      onClick={async () => {
        await updateRating(session.user.id, gameId, rating);
        router.replace(router.asPath); // Refresh data
      }}
      disabled={disabled}
    >
      {rating}
    </button>
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

  let { data: ratedGames, error } = await getRatedGames(user.id);

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
