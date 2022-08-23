import Link from "next/link";

import { useSession } from "../../contexts/user";

import TextGradient from "../TextGradient";
import IconStartGlowing from "../../public/images/star-glowing.svg";
import Button from "../Button";

const Header = () => {
  const session = useSession();
  return (
    <>
      <div className="relative text-center my-8 md:my-32">
        <h1 className="text-4xl sm:text-6xl font-medium max-w-2xl mx-auto my-6 md:my-12">
          Your <TextGradient>ideal game</TextGradient> just a step away from you
        </h1>
        <Link passHref href={session ? "/game-suggestions" : "/login"}>
          <Button variant="orange" minWidth={true} tagName="a">
            Discover now
          </Button>
        </Link>
      </div>

      <h2 className="flex items-center justify-center text-2xl font-light mb-4">
        <IconStartGlowing width={78} height={78} />
        <span>
          <strong className="font-semibold text-alert">TOP 10</strong> RATED
          GAMES
        </span>
      </h2>
    </>
  );
};

export default Header;
