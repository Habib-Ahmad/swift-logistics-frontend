"use client";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    primary: {
      main: "#127aff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1200,
      xl: 1536,
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
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === "dark" ? "#d1d5db" : "inherit",
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === "dark" ? "#d1d5db" : "inherit",
        }),
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#127aff",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeader: ({ theme }) => ({
          backgroundColor: theme.palette.mode === "dark" ? "#1f2937" : "white",
        }),
      },
    },
  },
});

export default theme;
