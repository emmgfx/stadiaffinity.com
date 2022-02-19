import { useState } from "react";
import Image from "next/image";

import { getGameCover } from "../utils/images";

const Cover = ({ game }) => {
  const [error, setError] = useState(false);
  return (
    <div className="relative aspect-[3/4] bg-white/10 flex items-center justify-center overflow-hidden">
      {error ? (
        <span className="p-8 text-center text-ellipsis overflow-hidden">
          {game.name}
        </span>
      ) : (
        <Image
          className="object-cover"
          src={getGameCover(game.id)}
          alt={game.name || null}
          layout="fill"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default Cover;
