"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const ThemeSwitch: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={() => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
      }}
    >
      {resolvedTheme == "dark" ? (
        <DarkModeOutlined className="text-gray-300" />
      ) : (
        <LightModeOutlined className="text-yellow-500" />
      )}
    </IconButton>
  );
};

export default ThemeSwitch;
