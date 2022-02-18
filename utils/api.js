import { supabase } from "./supabaseClient";

const getGameDetails = async (gameId, userId = null) => {
  //   const { data, error } = await supabase
  //     .from("games")
  //     .select("id, name, created_at, ratings(rating)")
  //     .eq("id", gameId)
  //     .eq("ratings.id_user", userId)
  //     .limit(1)
  //     .single();
  //   return { data, error };
};

const getRatedGames = async (userId) => {
  const { data, error } = await supabase.rpc("get_user_ratings", {
    id_user_input: userId,
  });
  return { data, error };
};

const updateRating = async (userId, gameId, rating) => {
  const values = {
    id_user: userId,
    id_game: gameId,
    rating: rating,
  };
  const options = { onConflict: "id_game,id_user" };
  const { data, error } = await supabase
    .from("ratings")
    .upsert(values, options);
  return { data, error };
};

export { getRatedGames, updateRating, getGameDetails };
