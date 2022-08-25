import {
  useContext,
  createContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export const GameContext = createContext(null);

export function GameContextProvider(props) {
  const { user } = useUser();
  const [userRating, setUserRating] = useState(null);

  const fetchUserRelatedData = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabaseClient
      .rpc("get_game_by_user", {
        id_user_input: user.id,
        id_game_input: props.game.id,
      })
      .limit(1)
      .single();
    if (error) return;
    setUserRating(data.user_rating);
  }, [props.game.id, user, setUserRating]);

  useEffect(() => {
    fetchUserRelatedData();
  }, [fetchUserRelatedData]);

  const value = {
    userRating,
    fetchUserRelatedData,
    setUserRating,
  };

  return <GameContext.Provider value={value} {...props} />;
}

// hook that can be used to get the session data
export function useGame() {
  const context = useContext(GameContext);
  return context;
}
