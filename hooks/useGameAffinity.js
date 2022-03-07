import { useEffect } from "react";
import { useSuggestions } from "../contexts/suggestions";
import { useSession } from "../contexts/user";

const useGameAffinity = (gameId) => {
  const { session } = useSession();
  const { suggestions, updateSuggestionsIfNeeded } = useSuggestions();
  useEffect(() => {
    if (session) updateSuggestionsIfNeeded();
  }, [gameId, session]);
  const maxAffinityPoints = Math.max(...suggestions.map((o) => o.intensity));
  const game = suggestions.find((o) => o.id === gameId);
  if (!game) return null;
  return Math.round((game.intensity * 100) / maxAffinityPoints);
};

export default useGameAffinity;
