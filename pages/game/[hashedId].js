import { supabase } from "../../utils/supabaseClient";
import { decodeId } from "../../utils/hashids";

import Cover from "../../components/Cover";

const GameDetails = ({ game }) => {
  return (
    <section className="">
      <div className="flex justify-center mt-16 mb-24">
        {/* text-transparent bg-clip-text bg-gradient-to-br from-[#FF4C10] to-[#B903E7] */}
        <h1 className="inline-block text-4xl font-bold">{game.name}</h1>
      </div>
      <div className="flex gap-8">
        <div className="w-[200px]">
          <Cover game={game} />
        </div>
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </section>
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
