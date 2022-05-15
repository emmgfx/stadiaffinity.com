import { useRouter } from "next/router";
import { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

// Create user context
export const UserContext = createContext(null);

// UserContextProvider is the parent element of the entire application
export function UserContextProvider(props) {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // get session for user
    const session = supabase.auth.session();
    setSession(session);

    // configure the auth state listener
    // if the auth state changes the session will be updated
    // and a POST request will be made to the /api/auth route
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        switch (event) {
          case "PASSWORD_RECOVERY":
            router.push("reset-password");
            break;
          default:
            setSession(session);
            await fetch("/api/auth", {
              method: "POST",
              body: JSON.stringify({ event, session }),
              headers: {
                "Content-Type": "application/json",
              },
            });
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    session,
  };

  return <UserContext.Provider value={value} {...props} />;
}

// hook that can be used to get the session data
export function useSession() {
  const context = useContext(UserContext);
  return context;
}
