import TextGradient from "../TextGradient";
import Step from "./Step";

import IconStar from "../../public/images/icons/star.svg";
import IconUser from "../../public/images/icons/user.svg";
import IconBadgeCheck from "../../public/images/icons/badge-check.svg";
import Container from "../Container";

const Steps = () => {
  return (
    <section className="bg-[url('/images/bg-steps.svg')] bg-center bg-no-repeat bg-auto py-36">
      <Container className="flex flex-col items-center">
        <h3 className="text-5xl font-medium mb-24 text-center">
          Looking for <TextGradient>the perfect game</TextGradient>?
        </h3>
        <Step Icon={IconUser} title="Sign up now">
          Sign up for Stadiaffinity now, you can use your Gmail account for
          quick access
        </Step>
        <Step Icon={IconStar} title="Rate your games">
          Find the games you have played and rate them according to how much you
          liked them
        </Step>
        <Step Icon={IconBadgeCheck} title="Find your next game">
          Discover the list of games that best fit you based on the ratings of
          other players
        </Step>
      </Container>
    </section>
  );
};

export default Steps;
