"use client";
import { useTheme } from "next-themes";
import Error from "next/error";

export default function NotFound() {
  const { theme } = useTheme();

  return <Error statusCode={404} withDarkMode={theme === "dark"} />;
}
