"use client";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeSwitch: React.FC = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <IconButton
      onClick={() =>
        currentTheme == "dark" ? setTheme("light") : setTheme("dark")
      }
    >
      {currentTheme == "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeSwitch;
