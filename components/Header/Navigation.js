import { forwardRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { usePopper } from "react-popper";

import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../contexts/user";

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
          <li>
            <UserButton
              ref={setPopperReference}
              setPopperVisible={setPopperVisible}
            />
          </li>
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
      {session && popperVisible && (
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

const UserButton = forwardRef(function UserButton(props, ref) {
  // Using function instead of arrow function because of:
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md

  const { setPopperVisible } = props;
  const { session } = useSession();

  return (
    <button
      className="flex items-center gap-2 rounded-full p-2 pr-4 bg-white/10 hover:bg-white/20"
      ref={ref}
      onClick={() => setPopperVisible((current) => !current)}
    >
      <Avatar />
      <span className="hidden md:block text-sm">{session.user.email}</span>
      <Image src="/images/icons/chevron-down.svg" width={16} height={16} />
    </button>
  );
});

const Avatar = () => {
  const { session } = useSession();
  const avatar = session?.user?.user_metadata?.avatar_url || "/images/anon.svg";
  return (
    <img
      src={avatar}
      className="block w-9 h-9 bg-[#FF4C10] rounded-full"
      referrerPolicy="no-referrer"
    />
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
            <Link href="/rated-games">Rated games</Link>
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

export default Navigation;
