import useGameAffinity from "../hooks/useGameAffinity";

const AffinityPercentage = ({ gameId }) => {
  const affinity = useGameAffinity(gameId);
  return <>{affinity || 0}%</>;
};

export default AffinityPercentage;
