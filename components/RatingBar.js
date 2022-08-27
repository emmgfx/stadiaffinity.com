import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import classNames from "classnames";

import { useGame } from "../contexts/game";
import { useSuggestions } from "../contexts/suggestions";

import IconStarEmpty from "../public/images/icons/star-empty.svg";
import IconStarFilled from "../public/images/icons/star-filled.svg";

const RatingBar = ({ gameId }) => {
  const { user } = useUser();
  const { game, fetchUserRelatedData } = useGame();
  const { updateSuggestions } = useSuggestions();

  const [hover, setHover] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setHover(game.user_rating);
  }, [game, setHover]);

  const removeRating = async () => {
    if (!user) {
      toast("Login to rate games 😅 ");
      return;
    }
    setUpdating(true);
    const { data, error } = await supabaseClient
      .from("ratings")
      .delete()
      .match({ id_game: game.id, id_user: user.id });
    setUpdating(false);
    updateSuggestions();
    fetchUserRelatedData();
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-2 items-center">
        <div
          className="flex leading-4"
          onMouseLeave={() => setHover(game.user_rating)}
        >
          <RatingButton
            gameId={gameId}
            score={1}
            onMouseEnter={() => setHover(1)}
            onMouseLeave={() => setHover(null)}
            active={hover >= 1}
            updating={updating}
            setUpdating={setUpdating}
          />
          <RatingButton
            gameId={gameId}
            score={2}
            onMouseEnter={() => setHover(2)}
            onMouseLeave={() => setHover(null)}
            active={hover >= 2}
            updating={updating}
            setUpdating={setUpdating}
          />
          <RatingButton
            gameId={gameId}
            score={3}
            onMouseEnter={() => setHover(3)}
            onMouseLeave={() => setHover(null)}
            active={hover >= 3}
            updating={updating}
            setUpdating={setUpdating}
          />
          <RatingButton
            gameId={gameId}
            score={4}
            onMouseEnter={() => setHover(4)}
            onMouseLeave={() => setHover(null)}
            active={hover >= 4}
            updating={updating}
            setUpdating={setUpdating}
          />
          <RatingButton
            gameId={gameId}
            score={5}
            onMouseEnter={() => setHover(5)}
            onMouseLeave={() => setHover(null)}
            active={hover >= 5}
            updating={updating}
            setUpdating={setUpdating}
          />
        </div>
        <button
          className={classNames(
            "flex text-white/50 text-sm leading-4 transition",
            { "opacity-0": !game.user_rating }
          )}
          onClick={removeRating}
          disabled={updating}
        >
          Remove rating
        </button>
      </div>
    </div>
  );
};

const RatingButton = ({
  gameId,
  score,
  active,
  onMouseEnter,
  onMouseLeave,
  updating,
  setUpdating,
}) => {
  const { user } = useUser();
  const { updateSuggestions } = useSuggestions();
  const { fetchUserRelatedData } = useGame();

  const onClick = async () => {
    if (!user) {
      toast("Login to rate games 😅 ");
      return;
    }
    setUpdating(true);
    const { data, error } = await supabaseClient.from("ratings").upsert(
      {
        id_user: user.id,
        id_game: gameId,
        rating: score,
      },
      { onConflict: "id_game,id_user" }
    );
    setUpdating(false);
    updateSuggestions();
    fetchUserRelatedData();

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Rated with ${score} stars`);
    }
  };

  return (
    <button
      className="w-6 h-6 disabled:opacity-50 transition"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={updating}
    >
      {active ? (
        <IconStarFilled width={24} height={24} />
      ) : (
        <IconStarEmpty width={24} height={24} />
      )}
    </button>
  );
};

export default RatingBar;
