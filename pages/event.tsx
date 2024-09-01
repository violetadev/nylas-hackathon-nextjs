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
import { VideoBackground } from "../components/VideoBackground/VideoBackground";
import { UserWrapper } from "../components/UserWrapper";

export default function Login() {
  const router = useRouter();
  const { setGlobalContext, globalContext } = useGlobalContext();
  const [storedUser, setStoredUser, removeStoredUser] = useLocalStorage(
    "user",
    globalContext?.user || ""
  );

  const handleLogout = async () => {
    try {
      removeStoredUser();
      setGlobalContext((prev) => ({ ...prev, user: null }));
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexFlow: "column",
          minHeight: "90vh",
        }}
      >
        <Queue />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={handleLogout}
            aria-label="LOGOUT"
            sx={{ color: "white", backgroundColor: "black" }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </UserWrapper>
  );
}
