import Link from "next/link";
import { encodeId } from "../utils/hashids";
import Cover from "./Cover";

const GameItem = ({ game }) => {
  return (
    <article>
      <Link href={`/game/${encodeId(game.id)}`}>
        <a>
          <Cover game={game} />
        </a>
      </Link>
      <div>
        <h3>
          <Link href={`/game/${encodeId(game.id)}`}>{game.name}</Link>
        </h3>
      </div>
    </article>
  );
};

export default GameItem;
