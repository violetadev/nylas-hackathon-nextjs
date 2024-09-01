import { Container } from "@mui/system";
import { VideoBackground } from "../VideoBackground/VideoBackground";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import { Button } from "@mui/material";

export const UserWrapper = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const [storedUser, setStoredUser] = useLocalStorage<any>("user", null);
  const [admin, setAdmin] = useLocalStorage<any>("admin", null);

  useEffect(() => {
    if (!storedUser && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router]);

  return (
    <Container
      sx={{
        minWidth: "100vw",
        margin: "0 !important",
        padding: "0 !important",
      }}
    >
      <VideoBackground>{children}</VideoBackground>
      {typeof admin !== "undefined" && (
        <Button
          sx={{
            fontSize: "8pt",
            zIndex: "999",
            maxWidht: "100px",
            marginTop: "-8vh",
            marginLeft: "20px",
            position: "fixed",
          }}
          variant="outlined"
          onClick={() => router.push("/admin")}
        >
          Admin Panel
        </Button>
      )}
    </Container>
  );
};
