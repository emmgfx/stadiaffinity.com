import { useState } from "react";

import { supabase } from "../utils/supabaseClient";

import AuthForm from "../components/AuthForm";
import Header from "../components/Header";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    }
    console.log({ data, error });
  };

  return (
    <>
      <Header />
      <h1>Register (sign up)</h1>

      <AuthForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={submit}
      />
    </>
  );
};

export default SignUp;
