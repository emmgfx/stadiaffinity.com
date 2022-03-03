import Link from "next/link";
import { encodeId } from "../utils/hashids";

import Cover from "./Cover";
import Stars from "./Stars";
import TextGradient from "./TextGradient";

const GameItem = ({ game }) => {
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
        {"intensity" in game && (
          <div className="font-bold">
            <TextGradient>Affinity points:</TextGradient> {game.intensity}
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
