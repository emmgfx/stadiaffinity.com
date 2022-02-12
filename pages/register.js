import { useState } from "react";

import { supabase } from "../utils/supabaseClient";

import AuthForm from "../components/AuthForm";
import Layout from "../components/Layout";

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
    <Layout>
      <h1>Register (sign up)</h1>

      <AuthForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={submit}
      />
    </Layout>
  );
};

export default SignUp;
