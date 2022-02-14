import Cover from "./Cover";

const GamesGrid = ({ games }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {games.map((game, index) => {
        return (
          <div key={index}>
            <Cover game={game} />
          </div>
        );
      })}
    </div>
  );
};

export default GamesGrid;
