import {
  useContext,
  createContext,
  useRef,
  useCallback,
  useState,
} from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export const SuggestionsContext = createContext(null);

export function SuggestionsContextProvider(props) {
  const { user } = useUser();
  const [suggestions, setSuggestions] = useState([]);
  const updating = useRef(false);

  const updateSuggestions = useCallback(() => {
    if (!user || updating.current) return;
    updating.current = true;
    supabaseClient
      .rpc("get_game_recommendations", {
        id_user_input: user.id,
      })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setSuggestions(data);
      })
      .finally(() => (updating.current = false));
  }, [user]);

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
