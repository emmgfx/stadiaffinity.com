import classNames from "classnames";

import GameItem from "./GameItem";

const GamesGrid = ({ games, className }) => {
  return (
    <div
      className={classNames(
        className,
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6"
      )}
    >
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesGrid;
