import { useState } from "react";

import { supabase } from "../utils/supabaseClient";

import AuthForm from "../components/AuthForm";
import Header from "../components/Header";

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
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
      redirectTo:
        process.env.VERCEL === "1"
          ? process.env.VERCEL_URL
          : process.env.NEXT_AUTH_REDIRECT_TO,
    });

    if (error) alert(error.message);
    console.log({ user, session, error });
  };

  console.log({
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_AUTH_REDIRECT_TO: process.env.NEXT_AUTH_REDIRECT_TO,
  });
  return (
    <>
      <Header />
      <h1>Login (sign in)</h1>
      <AuthForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={submit}
      />
      <button onClick={loginGoogle}>Login with Google</button>
    </>
  );
};

export default SignIn;
