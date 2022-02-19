import GameItem from "./GameItem";

const GamesGrid = ({ games }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {games.map((game, index) => {
        return <GameItem key={game.id} game={game} />;
      })}
    </div>
  );
};

export default GamesGrid;
