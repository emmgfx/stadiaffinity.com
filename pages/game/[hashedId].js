import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Cover from "../../components/Cover";
import AffinityPercentage from "../../components/AffinityPercentage";
import SaveGameButton from "../../components/SaveGameButton";

import { supabase } from "../../utils/supabaseClient";
import { decodeId } from "../../utils/hashids";
import { useSession } from "../../contexts/user";
import { formatTitle } from "../../utils/title";

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
              <h1 className="inline-block text-5xl">{game.name}</h1>
              {!game.rating ? (
                <p>
                  Affinity: <AffinityPercentage gameId={game.id} />
                </p>
              ) : (
                <p>Affinity: Already rated</p>
              )}
            </div>
            <SaveGameButton gameId={game.id} />
            <div className="h-8" />
            <div className="flex flex-col gap-8 justify-center items-start">
              <div className="w-full max-w-[150px]">
                <Cover game={game} />
              </div>
              <pre>{JSON.stringify(game, null, 2)}</pre>
              <GameStars gameId={game.id} currentRating={game.rating} />
              <div className="h-8" />
              <BlogPosts term={game.name} />
              <div className="h-32"></div>
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

const BlogPosts = ({ term = "", limit = 4, subtype = "post" }) => {
  const [posts, setPosts] = useState([]);
  const baseUrl = "https://stadiahoy.com/wp-json/wp/v2/";

  useEffect(() => {
    fetch(`${baseUrl}posts?search=${term}&subtype=${subtype}&per_page=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, [setPosts, term, limit, subtype]);
  return (
    <div>
      <h3>Related posts by StadiaHoy</h3>
      <div className="h-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const BlogPost = ({ post }) => {
  return (
    <article>
      <h1 className="truncate mb-2">
        <Link href={post.link}>
          <a target="_blank">{post.title.rendered}</a>
        </Link>
      </h1>
      <img
        src={post.jetpack_featured_media_url}
        className="w-full mb-2 rounded"
      />
      <div className="text-xs text-gray-500">{post.date}</div>
    </article>
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

  return {
    props: {
      game,
    },
  };
}

export default GameDetails;
