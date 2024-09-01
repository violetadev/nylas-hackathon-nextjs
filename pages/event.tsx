import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useGlobalContext } from "../context/globalContext";
import { Queue } from "../components/Queue";
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
        component="main"
        role="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "99vh",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Queue />
        <Button
          variant="outlined"
          onClick={handleLogout}
          aria-label="Logout"
          sx={{
            fontSize: "8pt",
            maxWidth: "100px",
            marginBottom: "8vh",
            right: "20px",
            bottom: "-32px",
            position: "fixed",
          }}
        >
          Logout
        </Button>
      </Box>
    </UserWrapper>
  );
}
