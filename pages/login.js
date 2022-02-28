import Link from "next/link";

import Login from "../components/Login";

import Logotype from "../public/images/logotype.svg";
import Isotype from "../public/images/isotype.svg";

const SignIn = () => {
  return (
    <>
      <header className="p-10 flex justify-center sm:justify-between items-center">
        <Link href="/">
          <a className="flex gap-4 items-center justify-center">
            <Isotype className="block" />
            <Logotype className="block" />
          </a>
        </Link>
        <p className="hidden sm:block width-full text-right text-gray-light">
          Don’t have an account yet?{" "}
          <Link href="/register">
            <a className="text-primary-500">Register now</a>
          </Link>
        </p>
      </header>

      <main className="flex items-center flex-col">
        <Login />
        <p className="block sm:hidden width-full text-right text-gray-light">
          Don’t have an account yet?{" "}
          <Link href="/register">
            <a className="text-primary-500">Register now</a>
          </Link>
        </p>
      </main>
    </>
  );
};

export default SignIn;
