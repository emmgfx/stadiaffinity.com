import { useState } from "react";
import Router from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import TextGradient from "../components/TextGradient";
import InputFloatingLabel from "../components/Form/InputFloatingLabel";

import GoogleLogo from "../public/images/icons/logo-google.svg";
import { toast } from "react-toastify";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    emailSignUp()
      .then(() => Router.push("/register-complete"))
      .catch(({ message }) => toast.error(message));
  };

  const emailSignUp = () =>
    new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        supabaseClient.auth
          .signUp({ email, password })
          .then(({ user, session, error }) => {
            if (error) reject(error);
            if (user) resolve(user);
          })
          .finally(() => setLoading(false));
      }, 1000);
    });

  const loginGoogle = async () => {
    const { user, session, error } = await supabaseClient.auth.signIn(
      { provider: "google" },
      { redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO }
    );
    if (error) toast.error(error.message);
  };

  return (
    <div className="w-full max-w-[400px] text-center px-10 py-10">
      <h1 className="font-medium text-4xl sm:text-5xl">
        <TextGradient>New</TextGradient> account
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
      <p>or create new account</p>
      <div className="h-6" />

      <form onSubmit={submit}>
        <InputFloatingLabel
          name="email"
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <div className="h-4" />
        <InputFloatingLabel
          name="password"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <div className="h-8" />
        <button
          type="submit"
          className="bg-primary-500 color-white font-semibold w-full p-4 disabled:opacity-50"
          disabled={loading}
        >
          Create new account
        </button>
      </form>
    </div>
  );
};

export default Register;
