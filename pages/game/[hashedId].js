import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Cover from "../../components/Cover";
import AffinityPercentage from "../../components/AffinityPercentage";
import SaveGameButton from "../../components/SaveGameButton";
import BlogPosts from "../../components/BlogPosts";
import TextGradient from "../../components/TextGradient";

import { supabase } from "../../utils/supabaseClient";
import { decodeId } from "../../utils/hashids";
import { useSession } from "../../contexts/user";
import { formatTitle } from "../../utils/title";
import AffinityBar from "../../components/AffinityBar";
import RatingBar from "../../components/RatingBar";

import IconStarFilled from "../../public/images/icons/star-filled.svg";
import Metascore from "../../components/Metascore";
import Button from "../../components/Button";

import IconStadiaLogo from "../../public/images/icons/logo-stadia.svg";

const GameDetails = ({ game }) => {
  return (
    <>
      <Head>
        <title>{formatTitle(game.id + " - " + game.name)}</title>
      </Head>
      <Header />
      <main>
        <Container>
          <section className="grid gap-10 grid-cols-1 md:grid-cols-[300px_auto] lg:grid-cols-[400px_auto] xl:items-center">
            <div className="w-1/2 mx-auto md:w-full">
              <Cover game={game} />
            </div>
            <div>
              <SaveGameButton gameId={game.id} />
              <div className="h-4" />
              <h1 className="text-5xl">{game.name}</h1>
              <div className="h-4" />
              <Metadata game={game} />
              <div className="h-12" />
              <Ratings game={game} />
              <div className="h-12" />
              <AffinityBar gameId={game.id} />
              <div className="h-12" />
              <div className="flex flex-col sm:flex-row gap-6 wrap">
                <Button
                  tagName="a"
                  href="https://www.stadia.com"
                  target="_blank"
                >
                  <IconStadiaLogo width="24" height="24" />
                  <TextGradient>Play on Stadia</TextGradient>
                </Button>
                {/* <Button tagName="a" href="#" variant="white-outline">
                  Read the review on <TextGradient>StadiaHoy</TextGradient>
                </Button> */}
              </div>
            </div>
          </section>
          <div className="h-16" />
          <BlogPosts term={game.name} />
        </Container>
        <div className="h-20" />
      </main>
      <Footer />
    </>
  );
};

const Metadata = ({ game }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-10 text-sm">
      <div>
        <strong>Release date:</strong>{" "}
        {game.release_date
          ? new Date(game.release_date).toLocaleDateString()
          : "Unknown"}
      </div>
      <div>
        <strong>Developer:</strong> {game.developer || "Unknown"}
      </div>
      <div>
        <strong>Game editor:</strong> {game.editor || "Unknown"}
      </div>
    </div>
  );
};

const Ratings = ({ game }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-16 text-sm">
      <div>
        <h3 className="mb-4 uppercase text-lg">Your rating</h3>
        <RatingBar gameId={game.id} currentScore={game.user_rating} />
      </div>
      <div>
        <h3 className="mb-4 uppercase text-lg">Stadiaffinity score</h3>
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
      <div>
        <h3 className="mb-4 uppercase text-lg">Metascore</h3>
        <Metascore score={game.metacritic_score} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  const { hashedId } = context.params;
  const gameId = decodeId(hashedId);

  const { data: game, error } = await supabase
    .rpc("get_game_by_user", {
      id_user_input: user?.id || null,
      id_game_input: gameId,
    })
    .limit(1)
    .single();

  if (error) return { notFound: true };

  return {
    props: {
      game,
    },
  };
}

export default GameDetails;
