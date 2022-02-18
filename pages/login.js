import { useState } from "react";

import { supabase } from "../utils/supabaseClient";

import AuthForm from "../components/AuthForm";

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

  console.log({ redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO });
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
