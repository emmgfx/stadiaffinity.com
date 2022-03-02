import Link from "next/link";

import TextGradient from "../components/TextGradient";

import Logotype from "../public/images/logotype.svg";
import Isotype from "../public/images/isotype.svg";

const SignUpComplete = () => {
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
        <h1 className="font-medium text-4xl sm:text-5xl">
          <TextGradient>New</TextGradient> account
        </h1>
        <div className="h-6" />
        <p>Sign up complete.</p>
        <div className="h-3" />
        <p>
          Please, look in your inbox for the email we&apos;ve just sent you.
        </p>
      </main>
    </>
  );
};

export default SignUpComplete;
