import { useEffect } from "react";
import { useSuggestions } from "../contexts/suggestions";
import { useUser } from "@supabase/auth-helpers-react";

const useGameAffinity = (gameId) => {
  const { user } = useUser();
  const { suggestions, updateSuggestionsIfNeeded } = useSuggestions();
  useEffect(() => {
    if (user) updateSuggestionsIfNeeded();
  }, [gameId, user]);
  const maxAffinityPoints = Math.max(...suggestions.map((o) => o.intensity));
  const game = suggestions.find((o) => o.id === gameId);
  if (!game) return null;
  return Math.round((game.intensity * 100) / maxAffinityPoints);
};

export default useGameAffinity;
