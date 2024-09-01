import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#AD7A99",
      // solidHoverBg: '#F9FAFC',
      // solidColor: '#F9FAFC',
      // softBg: '#F9FAFC',
      // softColor: '#AD7A99',
      // outlinedBorder: '#AD7A99',
      // outlinedHoverBg: '#AD7A99',
      // outlinedColor: '#AD7A99',
    },
    secondary: {
      main: "#3C6060",
      // solidHoverBg: '#F9FAFC',
      // solidColor: '#F9FAFC',
      // softBg: '#F9FAFC',
      // softColor: '#3C6060',
      // outlinedBorder: '#3C6060',
      // outlinedHoverBg: '#3C6060',
      // outlinedColor: '#3C6060',
    },
    background: {
      default: "#f9f9f9",
    },
    text: {
      primary: "#434144",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      color: "#AD7A99",
      fontSize: "32px",
    },
    h2: {
      color: "#3C6060",
      fontSize: "28px",
      fontWeight: "600",
    },
    h3: {
      color: "#AD7A99",
      fontSize: "24px",
    },
    h4: {
      color: "#3C6060",
      fontSize: "20px",

      fontWeight: "600",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
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
          backgroundColor: "#e7f5f6",
          color: "#8ddcd8",
          "&:hover": {
            backgroundColor: "#d0ecef",
          },
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
          borderRadius: "6px", // Apply rounded corners to all buttons
          textTransform: "none", // Remove uppercase transformation
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            textTransform: "uppercase",
            backgroundColor: "#AD7A99",
            color: "#F9FAFC",
            "&:hover": {
              backgroundColor: "#F9FAFC",
              color: "#AD7A99",
              border: "1px solid #AD7A99",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "#F9FAFC",
            textTransform: "uppercase",
            color: "#AD7A99",
            border: "1px solid #AD7A99",
            "&:hover": {
              backgroundColor: "#AD7A99",
              color: "#F9FAFC",
            },
          },
        },
      ],
    },
  },
  // components: {
  //   JoySvgIcon: {
  //     styleOverrides: {
  //       root: {
  //         color: 'var(--joy-palette-primary-solidColor)',
  //       },
  //     },
  //   },
  //   JoyButton: {
  //     styleOverrides: {
  //       root: ({ ownerState, theme }) => ({
  //         ...(ownerState.variant === 'outlined' && {
  //           color: theme.vars.palette.primary.outlinedColor,
  //           backgroundColor: 'rgba(255, 255, 255, 0.14)',
  //           backdropFilter: 'blur(5px)',
  //           border: `1px solid ${theme.vars.palette.primary.outlinedBorder}`,
  //           boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  //           '&:hover': {
  //             backgroundColor: theme.vars.palette.primary.outlinedHoverBg,
  //             color: theme.vars.palette.primary.solidColor,
  //             borderColor: theme.vars.palette.primary.outlinedBorder,
  //           },
  //         }),
  //         ...(ownerState.variant === 'solid' && {
  //           backgroundColor: theme.vars.palette.primary.solidBg,
  //           color: theme.vars.palette.primary.solidColor,
  //           '&:hover': {
  //             backgroundColor: theme.vars.palette.primary.solidHoverBg,
  //           },
  //         }),
  //       }),
  //     },
  //   },
  // },
});

export default theme;
