import { forwardRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { usePopper } from "react-popper";

import { supabase } from "../../utils/supabaseClient";
import { useSession } from "../../contexts/user";

import IconBadgeCheck from "../../public/images/icons/badge-check.svg";
import IconStarMenu from "../../public/images/icons/star.svg";
import IconBookmarkCheck from "../../public/images/icons/bookmark-check.svg";
import IconGear from "../../public/images/icons/gear.svg";
import IconPower from "../../public/images/icons/power.svg";

const Navigation = () => {
  const router = useRouter();
  const { session } = useSession();
  const [popperReference, setPopperReference] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [popperVisible, setPopperVisible] = useState(false);

  // Popover settings

  const { styles, attributes } = usePopper(popperReference, popperElement, {
    placement: "bottom-end",
  });

  // Hide the dropdowns if the route changes

  useEffect(() => {
    const handleRouteChange = () => setPopperVisible(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Hide the dropdowns if a click outside elements occurs

  const handleClickOutside = useCallback(
    (e) => {
      if (!popperElement) return;
      if (!popperReference) return;
      const clickedElement = popperElement.contains(e.target);
      const clickedReference = popperReference.contains(e.target);
      if (!clickedElement && !clickedReference) setPopperVisible(false);
    },
    [popperReference, popperElement, setPopperVisible]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleClickOutside]);

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
        >
          <ul>
            <li>
              <DropDownLink href="/game-suggestions" Icon={IconBadgeCheck}>
                Game suggestions
              </DropDownLink>
            </li>
            <li>
              <DropDownLink href="/rated-games" Icon={IconStarMenu}>
                Rated games
              </DropDownLink>
            </li>
            <li>
              <DropDownLink href="/" Icon={IconBookmarkCheck}>
                Saved games
              </DropDownLink>
            </li>
            <li>
              <DropDownLink href="/" Icon={IconGear}>
                Settings
              </DropDownLink>
            </li>
            <li>
              <DropDownLink
                href="/"
                passRef
                onClick={() => supabase.auth.signOut()}
                Icon={IconPower}
              >
                Logout
              </DropDownLink>
            </li>
          </ul>
        </DropDown>
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
      <Image
        src="/images/icons/chevron-down.svg"
        width={16}
        height={16}
        alt=""
      />
    </button>
  );
});

const Avatar = () => {
  const { session } = useSession();
  const avatar = session?.user?.user_metadata?.avatar_url || "/images/anon.svg";
  return (
    <img
      src={avatar}
      className="block w-[32px] h-[32px] bg-primary-500 rounded-full"
      referrerPolicy="no-referrer"
      alt=""
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
      className={classNames("absolute", { hidden: !props.visible })}
    >
      <div className="w-72 bg-white/10 my-3 p-2 z-10 overflow-hidden rounded-2xl backdrop-blur-xl animate-[popup_200ms] ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)]">
        {props.children}
      </div>
    </div>
  );
});

const DropDownLink = ({ onClick, Icon, children, ...props }) => {
  return (
    <Link {...props}>
      <a
        onClick={onClick}
        className="block px-4 py-3 flex items-center gap-4 hover:bg-white/10 rounded-lg"
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </a>
    </Link>
  );
};

export default Navigation;
