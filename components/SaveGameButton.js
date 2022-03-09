import { useState, useEffect } from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

import { useSession } from "../contexts/user";
import { supabase } from "../utils/supabaseClient";

import IconBookmarkEmpty from "../public/images/icons/bookmark-empty.svg";
import IconBookmarkFilled from "../public/images/icons/bookmark-filled.svg";

const SaveGameButton = ({ gameId }) => {
  const { session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;
    if (!gameId) return;

    setLoading(true);

    supabase
      .from("bookmarks")
      .select()
      .match({ id_game: gameId, id_user: session.user.id })
      .maybeSingle()
      .then(({ data: saved, error }) => {
        if (error) toast.error(error.message);
        else setSaved(!!saved);
      })
      .finally(() => setLoading(false));
  }, [gameId, session, setSaved, setLoading]);

  const save = async () => {
    if (loading) return;
    if (!session) {
      toast.warn("Login first");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from("bookmarks").upsert(
      {
        id_user: session.user.id,
        id_game: gameId,
      },
      { onConflict: "id_game,id_user" }
    );
    if (error) toast.warn(error.message);
    else setSaved(true);
    setLoading(false);
  };

  const unsave = async () => {
    if (loading) return;
    if (!session) {
      toast.warn("Login first");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .match({ id_game: gameId, id_user: session.user.id });
    if (error) toast.warn(error.message);
    else setSaved(false);
    setLoading(false);
  };

  return (
    <button
      onClick={saved ? unsave : save}
      className={classNames(
        "p-1 pr-2 text-xs rounded inline-flex gap-2 items-center",
        {
          "opacity-50": loading,
          "bg-primary-500 font-bold": saved,
          "bg-white/10": !saved,
        }
      )}
    >
      {saved ? (
        <IconBookmarkFilled width="24" height="24" />
      ) : (
        <IconBookmarkEmpty width="24" height="24" />
      )}
      {saved ? "SAVED" : "SAVE THE GAME"}
    </button>
  );
};

export default SaveGameButton;
