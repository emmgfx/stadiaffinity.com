import Link from "next/link";

import { supabase } from "../utils/supabaseClient";
import { usePopper } from "react-popper";
import { useSession } from "../contexts/user";
import Container from "./Container";
import { forwardRef, useState } from "react";
import classNames from "classnames";

const Header = () => {
  return (
    <header className="py-8">
      <Container className="grid gap-4 grid-cols-[auto_auto_auto] md:grid-cols-3 items-center">
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
          <span className="hidden md:block">Stadiaffinity</span>
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
  const [popperReference, setPopperReference] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [popperVisible, setPopperVisible] = useState(false);

  const { styles, attributes } = usePopper(popperReference, popperElement, {
    placement: "bottom-end",
  });

  return (
    <nav className="">
      <ul className="flex items-center gap-8 justify-end list-none">
        {session && (
          <>
            <li>
              <button
                className="flex items-center gap-4"
                ref={setPopperReference}
                onClick={() => setPopperVisible((current) => !current)}
              >
                <span className="hidden md:block">{session.user.email}</span>
                <div className="block w-9 h-9 bg-white rounded-full"></div>
              </button>
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
      {popperVisible && (
        <DropDown
          ref={setPopperElement}
          visible={popperVisible}
          styles={styles}
          attributes={attributes}
        />
      )}
    </nav>
  );
};

const DropDown = forwardRef(function DropDown(props, ref) {
  // Using function instead of arrow function because of:
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
  return (
    <div
      ref={ref}
      style={props.styles.popper}
      {...props.attributes.popper}
      className={classNames("absolute", {
        hidden: !props.visible,
      })}
    >
      <div className=" w-72 bg-black my-3 p-4 z-10 overflow-hidden rounded animate-[popup_200ms] ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)]">
        <ul>
          <li>
            <Link href="/all-games">All</Link>
          </li>

          <li>
            <Link href="/rated-games">Rated</Link>
          </li>
          <li>
            <Link href="/" passRef>
              <a onClick={() => supabase.auth.signOut()}>Logout</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

// DropDown.displayName = "DropDown";

export default Header;
