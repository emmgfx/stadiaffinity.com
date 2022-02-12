import Link from "next/link";

import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../contexts/user";

import styles from "./Header.module.scss";

const Header = () => {
  console.log(styles);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Form />
        <Navigation />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">Stadiaffinity</Link>
    </div>
  );
};

const Form = () => {
  return (
    <form className={styles.search}>
      <input type="text" />
    </form>
  );
};

const Navigation = () => {
  const { session } = useSession();

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link href="/all-games">All games</Link>
        </li>
        {session && (
          <>
            <li>
              <Link href="/rated-games">Rated games</Link>
            </li>
            <li>
              <Link href="/" passRef>
                <a onClick={() => supabase.auth.signOut()}>
                  Logout {session.user.email}
                </a>
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
