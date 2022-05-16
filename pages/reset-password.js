import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { supabase } from "../utils/supabaseClient";

import Header from "../components/Header";
import Container from "../components/Container";
import Footer from "../components/Footer";
import InputFloatingLabel from "../components/Form/InputFloatingLabel";
import Button from "../components/Button";

const ResetPassword = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const performReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword1 !== newPassword2) {
      toast.error("Passwords don't match");
      return;
    }
    console.log("query", router.query);
    const { error, data } = await supabase.auth.api.updateUser(
      router.query.access_token,
      { password: newPassword1 }
    );
    setLoading(false);
    if (!error) {
      router.push("/login");
      toast.success("Password updated");
    }
    console.log("response", { error, data });
  };
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-4xl my-10 font-semibold text-center">
            What&apos;s your new password?
          </h1>
          <form onSubmit={performReset} className="max-w-xs mx-auto">
            <InputFloatingLabel
              label="New password"
              type="password"
              value={newPassword1}
              onChange={(e) => setNewPassword1(e.target.value)}
            />
            <div className="h-4" />
            <InputFloatingLabel
              label="Confirm new password"
              type="password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
            />
            <div className="h-4" />
            <Button type="submit" className="w-full" disabled={loading}>
              Change password
            </Button>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ResetPassword;
