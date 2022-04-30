import {
  useContext,
  createContext,
  useRef,
  useCallback,
  useState,
} from "react";
import { supabase } from "../utils/supabaseClient";

import { useSession } from "./user";

export const SuggestionsContext = createContext(null);

export function SuggestionsContextProvider(props) {
  const { session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  const updating = useRef(false);

  const updateSuggestions = useCallback(() => {
    if (!session || updating.current) return;
    updating.current = true;
    supabase
      .rpc("get_game_recommendations", {
        id_user_input: session.user.id,
      })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setSuggestions(data);
      })
      .finally(() => (updating.current = false));
  }, [session]);

  const updateSuggestionsIfNeeded = useCallback(() => {
    if (suggestions.length === 0) updateSuggestions();
  }, [suggestions, updateSuggestions]);

  const value = {
    suggestions,
    updateSuggestions,
    updateSuggestionsIfNeeded,
  };

  return <SuggestionsContext.Provider value={value} {...props} />;
}

// hook that can be used to get the session data
export function useSuggestions() {
  const context = useContext(SuggestionsContext);
  return context;
}
