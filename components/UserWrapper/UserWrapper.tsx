import { Container } from "@mui/system";
import { VideoBackground } from "../VideoBackground/VideoBackground";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

export const UserWrapper = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const [storedUser, setStoredUser] = useLocalStorage<any>("user", null);

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
    </Container>
  );
};
