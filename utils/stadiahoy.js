export const getStadiaHoyPosts = async ({
  term = "",
  limit = 4,
  subtype = "post",
}) => {
  const baseUrl = "https://stadiahoy.com/wp-json/wp/v2/posts";
  const params = new URLSearchParams();
  params.append("search", term);
  params.append("subtype", subtype);
  params.append("per_page", limit);
  const response = await fetch(`${baseUrl}?${params.toString()}`);
  const json = await response.json();
  return json;
};
