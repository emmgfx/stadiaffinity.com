import { useRouter } from "next/router";

import { supabase } from "../../utils/supabaseClient";
import { decodeId } from "../../utils/hashids";
import { useSession } from "../../contexts/user";
import { updateRating } from "../../utils/api";

import Cover from "../../components/Cover";

const GameDetails = ({ game }) => {
  return (
    <section className="">
      <div className="flex justify-center mt-16 mb-24">
        <h1 className="inline-block text-4xl font-bold">{game.name}</h1>
      </div>
      <div className="flex gap-8">
        <div className="w-[200px]">
          <Cover game={game} />
        </div>
        <pre>{JSON.stringify(game, null, 2)}</pre>
        <GameStars gameId={game.id} currentRating={game.rating} />
      </div>
    </section>
  );
};

const GameStars = ({ gameId, currentRating }) => {
  return (
    <div>
      <RatingButton gameId={gameId} rating={1} disabled={currentRating === 1} />
      <RatingButton gameId={gameId} rating={2} disabled={currentRating === 2} />
      <RatingButton gameId={gameId} rating={3} disabled={currentRating === 3} />
      <RatingButton gameId={gameId} rating={4} disabled={currentRating === 4} />
      <RatingButton gameId={gameId} rating={5} disabled={currentRating === 5} />
    </div>
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

export async function getServerSideProps(context) {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  const { hashedId } = context.params;
  const gameId = decodeId(hashedId);

  const { data: game, error } = user
    ? await supabase
        .rpc("get_game_by_user", {
          id_user_input: user.id,
          id_game_input: gameId,
        })
        .limit(1)
        .single()
    : await supabase
        .from("games")
        .select("id, name, created_at")
        .eq("id", gameId)
        .limit(1)
        .single();

  return {
    props: {
      game,
    },
  };
}

export default GameDetails;
