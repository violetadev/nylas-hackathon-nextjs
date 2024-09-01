"use client";

import { DotLoader } from "react-spinners";
import theme from "../../styles";
import { Container } from "@mui/system";

export const Loading = () => {
  return (
    <Container
      sx={{
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      {" "}
      <DotLoader color={theme.palette.primary.main} />
    </Container>
  );
};
