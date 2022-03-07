import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSuggestions, setUpdating } from "../store/slices/suggestions";
import { supabase } from "../utils/supabaseClient";
import { useSession } from "./user";

export const SuggestionsContext = createContext(null);

export function SuggestionsContextProvider(props) {
  const dispatch = useDispatch();
  const { session } = useSession();
  const { suggestions } = useSelector((state) => state.suggestions);
  const updating = useRef(false);

  const updateSuggestions = () => {
    if (!session || updating.current) return;
    updating.current = true;
    supabase
      .rpc("get_game_recommendations", {
        id_user_input: session.user.id,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          dispatch(setSuggestions(data));
        }
      })
      .finally(() => (updating.current = false));
  };

  const updateSuggestionsIfNeeded = () => {
    if (suggestions.length === 0) updateSuggestions();
  };

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
