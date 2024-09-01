import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#090b0b",
    },
    primary: {
      main: "#F3F7F0",
    },
    secondary: {
      main: "#7856FE",
    },
    background: {
      default: "#0C181D",
    },
    text: {
      primary: "#7856FE",
      secondary: "#7856FE",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      color: "#F3F7F0",
      fontSize: "32px",
    },
    h2: {
      color: "#F3F7F0",
      fontSize: "28px",
      fontWeight: "600",
    },
    h3: {
      color: "#7856FE",
      fontSize: "24px",
    },
    h4: {
      color: "#F3F7F0",
      fontSize: "20px",
      fontWeight: "600",
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          borderColor: "#7856FE",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#090b0b",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          margin: "4px",
          backgroundColor: "#7856FE",
          color: "#0C181D",
          "&:hover": {
            backgroundColor: "#d0ecef",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: "#7856FE",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "0 42px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            textTransform: "uppercase",
            backgroundColor: "#7856FE",
            color: "#F3F7F0",
            "&:hover": {
              backgroundColor: "#12242B",
              color: "#7856FE",
              border: "1px solid #7856FE",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "#12242B",
            textTransform: "uppercase",
            color: "#F3F7F0",
            border: "1px solid #7856FE",
            "&:hover": {
              backgroundColor: "#7856FE",
              color: "#F9FAFC",
            },
          },
        },
      ],
    },
  },
});

export default theme;
