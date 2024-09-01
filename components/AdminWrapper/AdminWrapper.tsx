import { Container } from "@mui/system";
import { Navbar } from "../Navbar";

export const AdminWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
