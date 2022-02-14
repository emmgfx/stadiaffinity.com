import Link from "next/link";

import { supabase } from "../utils/supabaseClient";
import { usePopper } from "react-popper";
import { useSession } from "../contexts/user";
import Container from "./Container";
import { forwardRef, useRef, useState } from "react";
import classNames from "classnames";

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
  const [popperReference, setPopperReference] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [popperVisible, setPopperVisible] = useState(false);

  console.log("reference", popperReference);
  console.log("element", popperElement);

  const { styles, attributes } = usePopper(popperReference, popperElement, {
    placement: "bottom-end",
    // modifiers: [
    //   {
    //     name: "offset",
    //     options: {
    //       offset: ({ placement, reference, popper }) => {
    //         return [0, 0];
    //       },
    //     },
    //   },
    // ],
  });

  return (
    <nav className="">
      <ul className="flex items-center gap-8 justify-end list-none">
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
            <li>
              <button
                className="block"
                ref={setPopperReference}
                onClick={() => setPopperVisible((current) => !current)}
              >
                <div className="block w-9 h-9 bg-white rounded-full bg-[url('/img/hero-pattern.svg')]"></div>
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
      <DropDown
        ref={setPopperElement}
        visible={popperVisible}
        styles={styles}
        attributes={attributes}
      />
    </nav>
  );
};

const DropDown = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={props.styles.popper}
      {...props.attributes.popper}
      className={classNames(
        "absolute w-72 aspect-[3/4] bg-teal-500 my-3 p-4 z-10 overflow-hidden rounded",
        {
          hidden: !props.visible,
        }
      )}
    >
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
});

export default Header;
