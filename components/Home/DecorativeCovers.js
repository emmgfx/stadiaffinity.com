import Image from "next/future/image";

import { getGameCover } from "../../utils/images";

const DecorativeCovers = () => {
  return (
    <>
      <Image
        src={getGameCover(301)} // Little Nightmares
        width="148"
        height="202"
        className="hidden lg:block absolute rounded top-[389px] left-[18%] blur-sm opacity-60"
        alt=""
      />
      <Image
        src={getGameCover(269)} // Hitman II
        width="180"
        height="246"
        className="hidden lg:block absolute rounded top-[170px] left-[3%] xl:left-[10%]"
        alt=""
      />
      <Image
        src={getGameCover(207)} // Celeste
        width="148"
        height="201"
        className="hidden lg:block absolute rounded top-[-89px] left-[45%] blur-sm"
        alt=""
      />
      <Image
        src={getGameCover(400)} // The Gardens Between
        width="148"
        height="201"
        className="hidden lg:block absolute rounded top-[189px] right-[10%] blur-sm opacity-60"
        alt=""
      />
      <Image
        src={getGameCover(297)} // Life is Strange Remastered
        width="180"
        height="246"
        className="hidden lg:block absolute rounded top-[324px] right-[5%] xl:right-[15%]"
        alt=""
      />
    </>
  );
};

export default DecorativeCovers;
