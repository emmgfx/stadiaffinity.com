import { useState } from "react";

import { supabase } from "../utils/supabaseClient";

import TextGradient from "../components/TextGradient";
import InputFloatingLabel from "../components/Form/InputFloatingLabel";

import GoogleLogo from "../public/images/icons/logo-google.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) alert(error.message);
    console.log({ data, error });
  };

  const loginGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      { provider: "google" },
      { redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO }
    );
    if (error) alert(error.message);
    console.log({ user, session, error });
  };

  return (
    <>
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <div className="w-[400px] text-center px-10 py-14">
          <h1 className="font-medium text-5xl">
            <TextGradient>Welcome</TextGradient> back
          </h1>
          <div className="h-6" />
          <p>Login with your Google account</p>
          <div className="h-6" />
          <button
            className="bg-white text-black/50 block w-full p-4 rounded-sm flex items-center justify-center gap-4"
            onClick={loginGoogle}
          >
            <GoogleLogo width={24} height={24} />
            <span>Login with Google</span>
          </button>
          <div className="h-6" />
          <p>or</p>
          <div className="h-6" />

          <form onSubmit={submit}>
            <InputFloatingLabel
              name="email"
              type="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="h-4" />

            <InputFloatingLabel
              name="password"
              type="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="h-4" />

            <button
              type="submit"
              className="bg-primary-500 color-white font-semibold w-full p-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
