import Head from "next/head";
import Link from "next/link";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import { GameContextProvider, useGame } from "../../contexts/game";
import { decodeId } from "../../utils/hashids";
import { formatTitle } from "../../utils/title";
import { getStadiaHoyPosts } from "../../utils/stadiahoy";

import Header from "../../components/Header";
import GamesGrid from "../../components/GamesGrid";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Cover from "../../components/Cover";
import SaveGameButton from "../../components/SaveGameButton";
import BlogPosts from "../../components/BlogPosts";
import TextGradient from "../../components/TextGradient";
import AffinityBar from "../../components/AffinityBar";
import RatingBar from "../../components/RatingBar";
import Button from "../../components/Button";

import IconStarFilled from "../../public/images/icons/star-filled.svg";
import IconStadiaLogo from "../../public/images/icons/logo-stadia.svg";

const GameDetails = ({
  game,
  developerGames = [],
  editorGames = [],
  stadiaHoyPosts = [],
}) => {
  const showDeveloperGames = developerGames.length > 0;
  const showEditorGames =
    editorGames.length > 0 &&
    (game.editor !== game.developer || !showDeveloperGames);

  return (
    <GameContextProvider game={game}>
      <Head>
        <title>{formatTitle(game.id + " - " + game.name)}</title>
      </Head>
      <Header />
      <main>
        <Container>
          <section className="grid gap-10 grid-cols-1 md:grid-cols-[300px_auto] lg:grid-cols-[400px_auto] xl:items-center">
            <div className="w-1/2 mx-auto md:w-full">
              <div className="rounded overflow-hidden">
                <Cover game={game} />
              </div>
            </div>
            <div className="text-center md:text-left">
              <SaveGameButton gameId={game.id} />
              <div className="h-4" />
              <h1 className="text-4xl sm:text-5xl">{game.name}</h1>
              <div className="h-4" />
              <div className="flex flex-col lg:flex-row gap-1 lg:gap-10 text-sm">
                <div>
                  <strong>Release date:</strong>{" "}
                  {game.release_date || "Unknown"}
                </div>
                <div>
                  <strong>Developer:</strong>{" "}
                  {game.developer ? (
                    <Link href={`/games/developer/${game.developer}`}>
                      {game.developer}
                    </Link>
                  ) : (
                    "Unknown"
                  )}
                </div>
                <div>
                  <strong>Game editor:</strong>{" "}
                  {game.editor ? (
                    <Link href={`/games/editor/${game.editor}`}>
                      {game.editor}
                    </Link>
                  ) : (
                    "Unknown"
                  )}
                </div>
              </div>
              <div className="h-8 sm:h-12" />
              <Ratings game={game} />
              <div className="h-8 sm:h-12" />
              <AffinityBar gameId={game.id} className="mx-auto md:mx-0" />
              <div className="h-12" />
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 wrap justify-center lg:justify-start">
                <Button href="https://www.stadia.com" target="_blank">
                  <IconStadiaLogo width="24" height="24" />
                  <TextGradient>Play on Stadia</TextGradient>
                </Button>
                <Button
                  href={`https://www.stadiahoy.com/?s=${encodeURIComponent(
                    game.name
                  )}`}
                  target="_blank"
                  variant="white-outline"
                >
                  <span>
                    More info on <TextGradient>StadiaHoy</TextGradient>
                  </span>
                </Button>
              </div>
            </div>
          </section>
          <div className="h-16" />
          <BlogPosts posts={stadiaHoyPosts} />

          {showDeveloperGames && (
            <>
              <div className="h-16" />

              <h3 className="uppercase font-light text-xl sm:text-2xl">
                More games from{" "}
                <strong className="font-bold">
                  <TextGradient>{game.developer}</TextGradient>
                </strong>
              </h3>
              <div className="h-8" />
              <GamesGrid games={developerGames} />
              {developerGames.length >= 5 && (
                <>
                  <div className="h-16" />
                  <div className="text-center">
                    <Link href={`/games/developer/${game.developer}`}>
                      <a>
                        <Button variant="white-outline">
                          View {game.developer} games
                        </Button>
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}

          {showEditorGames && (
            <>
              <div className="h-16" />

              <h3 className="uppercase font-light text-xl sm:text-2xl">
                More games by{" "}
                <strong className="font-bold">
                  <TextGradient>{game.editor}</TextGradient>
                </strong>
              </h3>
              <div className="h-8" />
              <GamesGrid games={editorGames} />
              {editorGames.length >= 5 && (
                <>
                  <div className="h-16" />
                  <div className="text-center">
                    <Link href={`/games/editor/${game.editor}`}>
                      <a>
                        <Button variant="white-outline">
                          View {game.editor} games
                        </Button>
                      </a>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </Container>
        <div className="h-20" />
      </main>
      <Footer />
    </GameContextProvider>
  );
};

const Ratings = ({ game: gameInitialData }) => {
  const { game } = useGame(gameInitialData.id);
  return (
    <div className="flex gap-5 lg:gap-16 text-sm text-left justify-center md:justify-start">
      <div className="min-w-0">
        <h3 className="mb-4 uppercase sm:text-lg truncate">Your rating</h3>
        <RatingBar gameId={game.id} />
      </div>
      <div className="min-w-0">
        <h3 className="mb-4 uppercase sm:text-lg truncate">
          Stadiaffinity score
        </h3>
        <div className="grid grid-cols-[24px_auto] gap-x-4 gap-y-2 items-center">
          <IconStarFilled width={24} height={24} />
          <span className="text-xl font-light leading-4">
            <strong className="font-bold">{game.rating_average}</strong> / 5
          </span>
          <span />
          <span className="text-sm font-normal text-white/50 leading-4">
            {game.ratings_counter} ratings
          </span>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { hashedId } = context.params;
  const gameId = decodeId(hashedId);

  const { data: game, error } = await supabaseClient
    .rpc("get_game_by_user", {
      id_user_input: null,
      id_game_input: gameId,
    })
    .limit(1)
    .single();

  if (error) return { notFound: true };

  const { data: developerGames } = await supabaseClient
    .rpc("get_games_by_meta", {
      meta_key_input: "developer",
      meta_value_input: game.developer,
    })
    .not("id", "eq", game.id)
    .limit(5);

  const { data: editorGames } = await supabaseClient
    .rpc("get_games_by_meta", {
      meta_key_input: "editor",
      meta_value_input: game.editor,
    })
    .not("id", "eq", game.id)
    .limit(5);

  const stadiaHoyPosts = await getStadiaHoyPosts({ term: game.name });

  return {
    props: {
      game,
      developerGames,
      editorGames,
      stadiaHoyPosts,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
}

export default GameDetails;
