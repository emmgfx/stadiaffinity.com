import { useRouter } from "next/router";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

import { supabase } from "../../utils/supabaseClient";
import { decodeId } from "../../utils/hashids";
import { useSession } from "../../contexts/user";
import { updateRating } from "../../utils/api";

import Cover from "../../components/Cover";

const GameDetails = ({ game }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <section className="">
            <div className="mt-16 mb-16">
              <h1 className="inline-block text-4xl font-bold">{game.name}</h1>
            </div>
            <div className="flex flex-col gap-8">
              <div className="w-full max-w-[150px]">
                <Cover game={game} />
              </div>
              {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
              <GameStars gameId={game.id} currentRating={game.rating} />
              <div className="h-32"></div>
              {game.id}
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
};

const GameStars = ({ gameId, currentRating }) => {
  return (
    <div className="flex gap-2">
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
      className="w-8 h-8 rounded bg-teal-500 disabled:opacity-50"
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
