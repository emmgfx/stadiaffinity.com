import { supabase } from "../utils/supabaseClient";
import { getGameCover } from "../utils/images";

import GamesGrid from "../components/GamesGrid";
import Divider from "../components/Divider";
import Link from "next/link";
import { useEffect } from "react";

const Home = ({ topGames }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    console.log(body);
    body.setAttribute("home", true);
    return () => {
      body.removeAttribute("home");
    };
  });
  return (
    <>
      <DecorativeCovers />
      <div className="relative text-center my-8 md:my-32">
        <h1 className="text-4xl sm:text-6xl font-medium max-w-2xl mx-auto my-6 md:my-12">
          Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF4C10] to-[#B903E7]">
            ideal game
          </span>{" "}
          just a step away from you
        </h1>
        <Link href="/login">
          <a className="inline-block bg-[#FF4C10] text-white py-4 px-16">
            Discover now
          </a>
        </Link>
      </div>

      <h2 className="flex items-center justify-center text-2xl font-light mb-4">
        <img
          src="/images/icons/star-glowing.svg"
          width={78}
          height={78}
          alt=""
        />
        <span>
          <strong className="font-semibold text-[#FFE600]">TOP 10</strong> RATED
          GAMES
        </span>
      </h2>
      <Divider className="mb-12" />
      <GamesGrid games={topGames} />
    </>
  );
};

const DecorativeCovers = () => {
  return (
    <>
      <img
        src={getGameCover(367)} // Sekiro
        width="180"
        height="246"
        className="z-[1] hidden lg:block absolute rounded top-[170px] left-[3%] xl:left-[10%]"
      />
      <img
        src={getGameCover(301)} // Little Nightmares
        width="148"
        height="202"
        className="z-0 hidden lg:block absolute rounded top-[389px] left-[18%] blur-sm opacity-60"
      />
      <img
        src={getGameCover(207)} // Celeste
        width="148"
        height="201"
        className="z-0 hidden lg:block absolute rounded top-[-89px] left-[45%] blur-sm"
      />
      <img
        src={getGameCover(297)} // Life is Strange Remastered
        width="180"
        height="246"
        className="z-[1] hidden lg:block absolute rounded top-[324px] right-[5%] xl:right-[15%]"
      />
      <img
        src={getGameCover(400)} // The Gardens Between
        width="148"
        height="201"
        className="z-0 hidden lg:block absolute rounded top-[189px] right-[10%] blur-sm opacity-60"
      />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { data: topGames, error } = await supabase
    .from("games")
    .select()
    .limit(10);

  if (error) console.error(error);

  return {
    props: {
      topGames,
    },
  };
};

export default Home;
