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
            sx={{
              fontSize: "8pt",
              zIndex: "999",
              maxWidht: "100px",
              marginTop: "0",
              marginLeft: "20px",
              position: "fixed",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </UserWrapper>
  );
}
