import Link from "next/link";

import { supabase } from "../utils/supabaseClient";
import { useSession } from "../contexts/user";
import Container from "./Container";

const Header = () => {
  return (
    <header className="py-8">
      <Container className="grid gap-4 grid-cols-3 items-center">
        <Logo />
        <Form />
        <Navigation />
      </Container>
    </header>
  );
};

const Logo = () => {
  return (
    <div className="flex gap-4 items-center font-medium text-2xl">
      <Link href="/">
        <>
          <div className="inline-block w-8 h-8 bg-white rounded-md "></div>
          Stadiaffinity
        </>
      </Link>
    </div>
  );
};

const Form = () => {
  return (
    <form className="w-full">
      <input
        type="text"
        className="w-full p-4 text-center rounded-full bg-white/10 backdrop-blur-lg font-light focus:outline-none"
        placeholder="Search games and rate them"
      />
    </form>
  );
};

const Navigation = () => {
  const { session } = useSession();

  return (
    <nav className="">
      <ul className="flex gap-8 justify-end">
        <li>
          <Link href="/all-games">All</Link>
        </li>
        {session && (
          <>
            <li>
              <Link href="/rated-games">Rated</Link>
            </li>
            <li>
              <Link href="/" passRef>
                <a onClick={() => supabase.auth.signOut()}>Logout</a>
              </Link>
            </li>
          </>
        )}
        {!session && (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
