import Link from "next/link";

import { useSession } from "../../contexts/user";

import TextGradient from "../TextGradient";

const Header = () => {
  const session = useSession();
  return (
    <>
      <div className="relative text-center my-8 md:my-32">
        <h1 className="text-4xl sm:text-6xl font-medium max-w-2xl mx-auto my-6 md:my-12">
          Your <TextGradient>ideal game</TextGradient> just a step away from you
        </h1>
        <Link href={session ? "/game-suggestions" : "/login"}>
          <a className="inline-block bg-primary-500 text-white py-4 px-16">
            Discover now
          </a>
        </Link>
      </div>

      <h2 className="flex items-center justify-center text-2xl font-light mb-4">
        <img src="/images/star-glowing.svg" width={78} height={78} alt="" />
        <span>
          <strong className="font-semibold text-alert">TOP 10</strong> RATED
          GAMES
        </span>
      </h2>
    </>
  );
};

export default Header;
