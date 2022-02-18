import GameItem from "./GameItem";

const GamesGrid = ({ games }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {games.map((game, index) => {
        return <GameItem key={game.id} game={game} />;
      })}
    </div>
  );
};

export default GamesGrid;
