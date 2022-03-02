import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { toast } from "react-toastify";

import { supabase } from "../utils/supabaseClient";

import TextGradient from "../components/TextGradient";
import InputFloatingLabel from "../components/Form/InputFloatingLabel";

import GoogleLogo from "../public/images/icons/logo-google.svg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    toast.promise(emailSignIn, {
      pending: "Logging in...",
      success: {
        render(){
          Router.push("/");
          return 'Welcome!';
        }
      },
      error: {
        render({data: error}){
          return error.message;
        }
      }
    });
  }

  const emailSignIn = () => new Promise((resolve, reject) => {
    setLoading(true);
    setTimeout(() => {
      supabase.auth.signIn({
        email,
        password,
      }).then(({ user, session, error }) => {
        console.log({ user, session, error });
        if(error) reject(error);
        if(user) resolve(user);
      }).finally(() => setLoading(false));
    }, 1000);
  });


  // const submit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const { data, error } = await supabase.auth.signIn({
  //     email,
  //     password,
  //   });
  //   if (error) alert(error.message)
  //   else Router.push("/")
  //   setLoading(false);
  //   console.log({ data, error });
  // };

  const loginGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      { provider: "google" },
      { redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO }
    );
    if (error) alert(error.message);
    console.log({ user, session, error });
  };

  return (
    <div className="w-full max-w-[400px] text-center px-10 py-10">
      <h1 className="font-medium text-4xl sm:text-5xl">
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
        <div className="h-2" />

        <p className="width-full text-right text-gray-light text-sm">
          <Link href="/">Forgot password?</Link>
        </p>

        <div className="h-8" />
        <button
          type="submit"
          className="bg-primary-500 color-white font-semibold w-full p-4 disabled:opacity-50"
          disabled={loading}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
