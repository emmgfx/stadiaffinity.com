import classNames from "classnames";
import Link from "next/link";

import { encodeId } from "../utils/hashids";

import Cover from "./Cover";
import Stars from "./Stars";
import AffinityBar from "./AffinityBar";

const GameItem = ({ game, showAffinity = false, className }) => {
  return (
    <Link href={`/game/${encodeId(game.id)}`}>
      <a className={classNames("flex flex-col", className)}>
        <article className="rounded overflow-hidden flex flex-col h-full">
          <Cover game={game} />
          <div className="px-4 py-6 flex-auto flex flex-col bg-gradient-to-r from-gray-medium to-[#363740]">
            <h3 className="font-medium mb-2 line-clamp-2">{game.name}</h3>
            {showAffinity && (
              <>
                <div className="grow" />
                <div className="font-bold">
                  <AffinityBar gameId={game.id} />
                </div>
              </>
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
      </a>
    </Link>
  );
};

export default GameItem;
