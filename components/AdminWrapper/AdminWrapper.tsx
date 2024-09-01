import { Container } from "@mui/system";
import { Navbar } from "../Navbar";

export const AdminWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <Container sx={{ maxWidth: "99vw", overflow: "hidden" }}>
      <Navbar />
      <Container>{children}</Container>
    </Container>
  );
};
