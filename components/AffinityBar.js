import useGameAffinity from "../hooks/useGameAffinity";

import Icon from "../public/images/icons/badge-check.svg";

const AffinityBar = ({ gameId }) => {
  const affinity = useGameAffinity(gameId);
  return (
    <div className="relative w-full max-w-[400px] h-8 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-8 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all ease-out duration-1000 absolute top-0 left-0 rounded-full`}
        style={{ width: `${affinity || 0}%` }}
      />
      {affinity ? (
        <CenteredMessage message={`${affinity}% affinity`} />
      ) : (
        <CenteredMessage message={`Affinity not aplicable`} />
      )}
    </div>
  );
};

const CenteredMessage = ({ message = "" }) => {
  return (
    <div className="absolute top-1/2 left-2 font-semibold text-sm -translate-y-1/2 flex gap-1 items-center">
      <Icon width="18" height="18" />
      {message}
    </div>
  );
};

export default AffinityBar;
