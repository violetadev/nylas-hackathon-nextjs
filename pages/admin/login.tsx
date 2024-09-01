import { onAuthStateChanged, getIdToken, User, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { auth } from "../../lib/firebase.config";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Login as LoginForm, Signup } from "../../components/Auth/";
import { AdminWrapper } from "../../components/AdminWrapper";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<string>("signin");
  const [value, setValue, remove] = useLocalStorage("admin", "");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await getIdToken(currentUser);
        document.cookie = `token=${token}; path=/; secure; samesite=strict`;
        setValue(currentUser.toString());
      } else {
        setUser(null);
        remove();
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
      }
    });
    return () => unsubscribe();
  }, [setValue, remove]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      remove();
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AdminWrapper>
      <>
        <Box>
          <Typography variant="h1">Welcome back</Typography>
          <Typography variant="body1">
            Enter your e-mail and password to start managing your events
          </Typography>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "60vw",
            },
            margin: "0 auto",
            marginTop: "48px",
          }}
        >
          {user ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ margin: "0 auto" }}>
              {step === "signin" ? <LoginForm /> : <Signup />}
              <Button
                variant="outlined"
                onClick={() => setStep(step === "signin" ? "signup" : "signin")}
                sx={{ width: "100%", marginTop: "8px" }}
              >
                {step === "signin" ? "Sign Up" : "Sign In"}
              </Button>
            </Box>
          )}
        </Box>
      </>
    </AdminWrapper>
  );
}
