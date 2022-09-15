import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import GamesGrid from "../../components/GamesGrid";
import Header from "../../components/Header";
import TextGradient from "../../components/TextGradient";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import Link from "next/link";

const Games = ({ games = [], page = 1 }) => {
  return (
    <>
      <Header />
      <Container>
        <PageTitle>
          Know all the <TextGradient>Stadia Games</TextGradient>
        </PageTitle>
        <div className="h-8" />
        <GamesGrid games={games} />
        <div className="h-16" />
        <div className="flex justify-center gap-4">
          {page > 0 && (
            <Link
              passHref
              href={{ pathname: "/games", query: { page: parseInt(page) - 1 } }}
            >
              <Button minWidth>Previous</Button>
            </Link>
          )}
          <Link
            passHref
            href={{ pathname: "/games", query: { page: parseInt(page) + 1 } }}
          >
            <Button minWidth>Next</Button>
          </Link>
        </div>
        <div className="h-16" />
      </Container>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page ? query.page : 0;
  const { data: games } = await supabaseClient.rpc("get_games", {
    limit_input: 40,
    offset_input: page * 40,
  });

  return {
    props: {
      games,
      page,
    },
  };
}

export default Games;
