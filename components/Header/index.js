import Link from "next/link";

import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../contexts/user";

const Header = () => {
  const { session } = useSession();
  if (!session) {
    return (
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login (sign in)</Link>
        </li>
        <li>
          <Link href="/register">Register (sign up)</Link>
        </li>
      </ul>
    );
  }

  if (session) {
    return (
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/rated-games">Rated games</Link>
        </li>
        <li>
          <Link href="/" passRef>
            <a onClick={() => supabase.auth.signOut()}>Logout {session.user.email}</a>
          </Link>
        </li>
      </ul>
    );
  }
};

export default Header;
