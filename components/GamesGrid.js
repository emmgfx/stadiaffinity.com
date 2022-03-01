import classNames from "classnames";

import GameItem from "./GameItem";
import GameItemPhantom from "./GameItemPhantom";

const GamesGrid = ({ games = [], phantoms = 0, className }) => {
  return (
    <div
      className={classNames(
        className,
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6"
      )}
    >
      {phantoms > 0
        ? [...Array(phantoms).keys()].map((v, i) => <GameItemPhantom key={i} />)
        : games.map((game) => <GameItem key={game.id} game={game} />)}
    </div>
  );
};

export default GamesGrid;
