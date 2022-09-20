import classNames from "classnames";

import GameItem from "./GameItem";
import GameItemPhantom from "./GameItemPhantom";

const GamesGrid = ({
  games = [],
  phantoms = 0,
  showAffinity = false,
  showReleaseDate = false,
  className,
  small = false,
}) => {
  return (
    <div
      className={classNames(
        className,
        !small &&
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6",
        small &&
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 md:gap-3"
      )}
    >
      {phantoms > 0
        ? [...Array(phantoms).keys()].map((v, i) => <GameItemPhantom key={i} />)
        : games.map((game) => (
            <GameItem
              key={game.id}
              game={game}
              showAffinity={showAffinity}
              showReleaseDate={showReleaseDate}
            />
          ))}
    </div>
  );
};

export default GamesGrid;
