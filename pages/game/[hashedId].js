import { useState } from "react";
import { useRouter } from "next/router";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";

import { supabase } from "../../utils/supabaseClient";
import { decodeId } from "../../utils/hashids";
import { useSession } from "../../contexts/user";
import { formatTitle } from "../../utils/title";

import Cover from "../../components/Cover";
import Head from "next/head";
import { toast } from "react-toastify";
import { useEffect } from "react";
import classNames from "classnames";
import AffinityPercentage from "../../components/AffinityPercentage";

const GameDetails = ({ game }) => {
  return (
    <>
      <Head>
        <title>{formatTitle(game.id + " - " + game.name)}</title>
      </Head>
      <Header />
      <main>
        <Container>
          <section className="">
            <div className="mt-16 mb-16">
              <h1 className="inline-block text-4xl font-bold">{game.name}</h1>
              {!game.rating ? (
                <p>
                  Affinity: <AffinityPercentage gameId={game.id} />
                </p>
              ) : (
                <p>Affinity: Already rated</p>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <div className="w-full max-w-[150px]">
                <Cover game={game} />
              </div>
              {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
              <GameStars gameId={game.id} currentRating={game.rating} />
              <div className="h-8"></div>
              <GameSaved gameId={game.id} />
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
      <RatingButton
        gameId={gameId}
        rating={null}
        disabled={currentRating === null}
      />
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

  const onClick = async () => {
    if (!session) {
      toast("Login to rate games 😅 ");
      return;
    }
    const { data, error } = rating
      ? await supabase.from("ratings").upsert(
          {
            id_user: session.user.id,
            id_game: gameId,
            rating: rating,
          },
          { onConflict: "id_game,id_user" }
        )
      : await supabase
          .from("ratings")
          .delete()
          .match({ id_game: gameId, id_user: session.user.id });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Done!");
    }
    router.replace(router.asPath); // Refresh data
  };

  return (
    <button
      className="w-8 h-8 rounded bg-teal-500 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {rating ? rating : "X"}
    </button>
  );
};

const GameSaved = ({ gameId }) => {
  const { session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (!session) return;
    setLoading(true);
    const { data: saved, error } = await supabase
      .from("bookmarks")
      .select()
      .match({ id_game: gameId, id_user: session.user.id })
      .maybeSingle();

    if (error) toast.error(error.message);

    setSaved(!!saved);
    setLoading(false);
  }, [session]);

  const save = async () => {
    if (loading) return;
    if (!session) {
      toast.warn("Login first");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from("bookmarks").upsert(
      {
        id_user: session.user.id,
        id_game: gameId,
      },
      { onConflict: "id_game,id_user" }
    );
    if (error) toast.warn(error.message);
    else setSaved(true);
    setLoading(false);
  };

  const unsave = async () => {
    if (loading) return;
    if (!session) {
      toast.warn("Login first");
      return;
    }
    setLoading(true);
    console.log({ id_game: gameId, id_user: session.user.id });
    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .match({ id_game: gameId, id_user: session.user.id });
    if (error) toast.warn(error.message);
    else setSaved(false);
    setLoading(false);
  };

  return (
    <button
      onClick={saved ? unsave : save}
      className={classNames("p-3 bg-secondary-500 rounded", {
        "opacity-50": loading,
        "bg-secondary-500": saved,
        "bg-primary-500": !saved,
      })}
    >
      {saved ? "Unsave" : "Save"}
    </button>
  );
};
export async function getServerSideProps(context) {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  const { hashedId } = context.params;
  const gameId = decodeId(hashedId);

  // await new Promise((resolve) => setTimeout(resolve, 2000));

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

  console.log(game);

  return {
    props: {
      game,
    },
  };
}

export default GameDetails;
