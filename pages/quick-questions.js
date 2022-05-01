import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Papa from "papaparse";

import { supabase } from "../utils/supabaseClient";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import Cover from "../components/Cover";
import InputFloatingLabel from "../components/Form/InputFloatingLabel";
import Button from "../components/Button";

import IconBadgeCheck from "../public/images/icons/badge-check.svg";

const getCSV = async () => {
  const url =
    "https://nddyfchsgrewkdbjnwcz.supabase.in/storage/v1/object/public/csvs/db-20220203.csv";

  const response = await fetch(url);
  const csv = await response.text();
  const { data } = Papa.parse(csv, { header: true });
  return data;
};

const getCSVGame = async (title) => {
  const csv = await getCSV();
  return csv.find((object) => object.Title === title);
};

const QuickQuestions = ({ game, totalGames, incompleteGames }) => {
  const router = useRouter();
  const [developer, setDeveloper] = useState("");
  const [editor, setEditor] = useState("");
  const [metascore, setMetascore] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    setDeveloper(game.developer || "");
    setEditor(game.editor || "");
    setMetascore(game.metacritic_score || "");
    setReleaseDate(game.releaseDate || "");

    (async () => {
      const csvGame = await getCSVGame(game.name);
      if (csvGame) {
        setSuggestions({
          title: csvGame["Title"],
          releaseDate: csvGame["Release Date"],
          developer: csvGame["Developers"],
          editor: csvGame["Publishers"],
        });
      } else {
        setSuggestions(null);
      }
    })();
  }, [game]);

  const refresh = async () => {
    if (loading) return;
    setLoading(true);
    await router.replace(router.asPath);
    setLoading(false);
  };

  const copySuggestions = () => {
    const dateParts = suggestions.releaseDate.split("/");
    console.log(suggestions.releaseDate);
    console.log(dateParts);
    console.log(
      `${dateParts[2]}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(
        2,
        "0"
      )}`
    );
    setReleaseDate(
      `${dateParts[2]}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(
        2,
        "0"
      )}`
    );
    setDeveloper(suggestions.developer);
    setEditor(suggestions.editor);
  };

  const update = async (e) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    let { data, error } = await supabase.rpc("update_game_metadata", {
      id_game_input: game.id,
      release_date_input: releaseDate,
      developer_input: developer,
      editor_input: editor,
      metacritic_score_input: parseInt(metascore),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Update correct");
      refresh();
    }
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="bg-white/10 p-4 px-5 rounded flex items-center gap-4 font-light">
            <IconBadgeCheck width={20} height={20} className="shrink-0" />
            <div>
              Games with metadata complete:{" "}
              <strong>{totalGames - incompleteGames}</strong> of {totalGames}.{" "}
              {`${Math.round((incompleteGames * 100) / totalGames)}%`}{" "}
              remaining, 😅
            </div>
          </div>
          <div className="flex gap-4 my-10">
            <div className="w-32">
              <Cover game={game} />
            </div>
            <div>
              <p>Quick questions about:</p>
              <h1 className="text-4xl font-semibold">{game.name}</h1>
              <div className="h-4" />
              {suggestions && (
                <pre className="text-xs bg-white/10 p-2 rounded">
                  CSV suggestions:{"\n"}
                  {JSON.stringify(suggestions, null, 2)}
                </pre>
              )}
            </div>
          </div>
          <form onSubmit={update}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <InputFloatingLabel
                type="date"
                label="Release date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
              <InputFloatingLabel
                type="text"
                label="Developer"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
              />
              <InputFloatingLabel
                type="text"
                label="Editor"
                value={editor}
                onChange={(e) => setEditor(e.target.value)}
              />
              <InputFloatingLabel
                type="number"
                label="Metacritic score"
                min="0"
                max="100"
                steps="1"
                value={metascore}
                onChange={(e) => setMetascore(e.target.value)}
              />
            </div>
            <div className="h-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="orange" disabled={loading} type="submit">
                Save data
              </Button>
              <Button
                variant="white"
                disabled={loading}
                type="button"
                onClick={copySuggestions}
              >
                Copy suggestions
              </Button>
              <Button
                variant="white-outline"
                disabled={loading}
                onClick={refresh}
              >
                Skip (see other game)
              </Button>
            </div>
          </form>
          {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
        </Container>
        <div className="h-40" />
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (!user) return { notFound: true };

  const { count: totalGames, error: errorTotal } = await supabase
    .from("games")
    .select("id", { count: "exact", head: true });

  const { count: incompleteGames, error: errorIncomplete } = await supabase.rpc(
    "get_games_with_missing_meta",
    {},
    { count: "exact", head: true }
  );

  const { data: game, error } = await supabase
    .rpc("get_games_with_missing_meta")
    // .eq("name", "Far Cry 5")
    .limit(1)
    .maybeSingle();

  if (error) return { notFound: true };
  if (!game) return { notFound: true };

  return {
    props: {
      game,
      totalGames,
      incompleteGames,
    },
  };
}

export default QuickQuestions;
