import Link from "next/link";
import { encodeId } from "../utils/hashids";
import Cover from "./Cover";

const GameItem = ({ game }) => {
  return (
    <article className="rounded overflow-hidden flex flex-col">
      <Link href={`/game/${encodeId(game.id)}`}>
        <a>
          <Cover game={game} />
        </a>
      </Link>
      <div className="px-4 py-6 bg-gradient-to-r from-[#242531] to-[#363740] flex-auto">
        <h3 className="font-medium mb-2">
          <Link href={`/game/${encodeId(game.id)}`}>{game.name}</Link>
        </h3>
        <div className="flex gap-0.5">
          <img src="/images/icons/star-game-item.svg" />
          <img src="/images/icons/star-game-item.svg" />
          <img src="/images/icons/star-game-item.svg" />
          <img src="/images/icons/star-game-item.svg" />
          <img src="/images/icons/star-game-item.svg" />
          <span className="ml-2 text-[#95949B] text-sm">(128)</span>
        </div>
      </div>
    </article>
  );
};

export default GameItem;
