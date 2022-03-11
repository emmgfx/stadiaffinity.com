import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { useSession } from "../contexts/user";
import { supabase } from "../utils/supabaseClient";
import Cover from "../components/Cover";

const QuickQuestions = () => {
  const session = useSession();
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!session) return;

    supabase.rpc("get_games_with_missing_meta").then(({ data, error }) => {
      console.log({ data, error });
      if (data) setGame(data);
    });
  }, [setGame]);

  if (!game) return null;
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-4xl my-10 font-semibold">
            Quick questions about {game.name}
          </h1>
          <div className="w-32">
            <Cover game={game} />
          </div>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </Container>
        <div className="h-40" />
      </main>
      <Footer />
    </>
  );
};

export default QuickQuestions;
