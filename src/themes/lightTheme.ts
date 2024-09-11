import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#F8C005",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#333196",
      contrastText: "#ffffff",
    },
  },
  spacing: 5,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.8rem",
          fontWeight: "bold",
        },
      },
    },
  },
});
