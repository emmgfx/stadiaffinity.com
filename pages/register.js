import Link from "next/link";

import Register from "../components/Register";

import Logotype from "../public/images/logotype.svg";
import Isotype from "../public/images/isotype.svg";

const SignUp = () => {
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
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-primary-500">Login</a>
          </Link>
        </p>
      </header>

      <main className="flex items-center flex-col">
        <Register />
        <p className="block sm:hidden width-full text-right text-gray-light">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-primary-500">Login</a>
          </Link>
        </p>
      </main>
    </>
  );
};

export default SignUp;
