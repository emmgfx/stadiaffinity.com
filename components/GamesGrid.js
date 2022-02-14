import Cover from "./Cover";

const GamesGrid = ({ games }) => {
  return (
    <div className="grid grid-cols-5 gap-8">
      {games.map((game, index) => {
        return (
          <div key={index}>
            <Cover />
          </div>
        );
      })}
    </div>
  );
};

export default GamesGrid;
