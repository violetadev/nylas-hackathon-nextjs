"use client";

import { onAuthStateChanged, getIdToken, User, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { auth } from "../lib/firebase.config";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { UserLogin, UserSignup } from "../components/UserRegistration/";
import { useGlobalContext } from "../context/globalContext";
import { Queue } from "../components/Queue";
import { UserWrapper } from "../components/UserWrapper";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<string>("signin");
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage(
    "user",
    ""
  );

  const { setGlobalContext, globalContext } = useGlobalContext();

  const handleLogout = async () => {
    try {
      removeStoredUser();
      setGlobalContext((prev) => ({ ...prev, user: null }));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    console.log(storedUser, "val");
    if (storedUser) {
      router.push("/event");
    }
  }, [storedUser]);
  return (
    <UserWrapper>
      <>
        <Box>
          <Typography variant="h1">Welcome</Typography>
          <Typography variant="body1">
            Identify yourself to start your journey.
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
          {storedUser ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ margin: "0 auto" }}>
              {step === "signin" ? (
                <UserLogin
                  storedUser={storedUser}
                  setStoredUser={setStoredUser}
                />
              ) : (
                <UserSignup />
              )}
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
    </UserWrapper>
  );
}
