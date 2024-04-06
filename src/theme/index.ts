"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    primary: {
      main: "#127aff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

export default theme;
