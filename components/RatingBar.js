import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { supabase } from "../utils/supabaseClient";
import { useSession } from "../contexts/user";
import { useSuggestions } from "../contexts/suggestions";

import IconStarEmpty from "../public/images/icons/star-empty.svg";
import IconStarFilled from "../public/images/icons/star-filled.svg";
import classNames from "classnames";

const RatingBar = ({ gameId, currentScore, fetchUserRelatedData }) => {
  const router = useRouter();
  const { session } = useSession();
  const { updateSuggestions } = useSuggestions();

  const [hover, setHover] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setHover(currentScore);
  }, [currentScore, setHover]);

  const removeRating = async () => {
    if (!session) {
      toast("Login to rate games 😅 ");
      return;
    }
    setUpdating(true);
    const { data, error } = await supabase
      .from("ratings")
      .delete()
      .match({ id_game: gameId, id_user: session.user.id });
    setUpdating(false);
    // router.replace(router.asPath); // Refresh data
    fetchUserRelatedData();
    updateSuggestions();
  };

  return (
    <div>
      <div
        className="grid grid-cols-1 gap-y-2 items-center"
        onMouseLeave={() => setHover(currentScore)}
      >
        <div className="flex leading-4">
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
            { "opacity-0": !currentScore }
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
  const { session } = useSession();
  const router = useRouter();
  const { updateSuggestions } = useSuggestions();

  const onClick = async () => {
    if (!session) {
      toast("Login to rate games 😅 ");
      return;
    }
    setUpdating(true);
    const { data, error } = await supabase.from("ratings").upsert(
      {
        id_user: session.user.id,
        id_game: gameId,
        rating: score,
      },
      { onConflict: "id_game,id_user" }
    );
    setUpdating(false);
    updateSuggestions();

    if (error) {
      toast.error(error);
    } else {
      toast.success(`Rated with ${score} stars`);
    }
    router.replace(router.asPath); // Refresh data
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
