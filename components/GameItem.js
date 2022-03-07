import Link from "next/link";
import { encodeId } from "../utils/hashids";
import { useSelector } from "react-redux";

import Cover from "./Cover";
import Stars from "./Stars";
import TextGradient from "./TextGradient";
import AffinityPercentage from "./AffinityPercentage";

const GameItem = ({ game, showAffinity = false }) => {
  return (
    <article className="rounded overflow-hidden flex flex-col">
      <Link href={`/game/${encodeId(game.id)}`}>
        <a>
          <Cover game={game} />
        </a>
      </Link>
      <div className="px-4 py-6 bg-gradient-to-r from-gray-medium to-[#363740] flex-auto">
        <h3 className="font-medium mb-2">
          <Link href={`/game/${encodeId(game.id)}`}>{game.name}</Link>
        </h3>
        {showAffinity && (
          <div className="font-bold">
            <TextGradient>Affinity:</TextGradient>{" "}
            <AffinityPercentage gameId={game.id} />
          </div>
        )}
        {"average" in game && (
          <div className="flex items-center gap-0.5">
            <Stars amount={game.average} />
            {"counter" in game && (
              <span className="ml-2 text-[#95949B] text-sm">
                ({game.counter})
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default GameItem;
