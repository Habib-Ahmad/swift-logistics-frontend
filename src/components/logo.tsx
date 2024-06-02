"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Box } from "@mui/material";
import logo from "@/assets/logo.svg";
import logoDark from "@/assets/logo-dark.svg";

interface IProps {
  variant?: "dark" | "light";
}

const Logo: React.FC<IProps> = ({ variant }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let theme;

  if (variant) {
    if (variant === "dark") {
      theme = logoDark;
    } else {
      theme = logo;
    }
  } else {
    if (resolvedTheme == "dark") {
      theme = logoDark;
    } else {
      theme = logo;
    }
  }

  return mounted ? (
    <Image src={theme} alt="Swift Logistics" className="w-24 md:w-auto" />
  ) : (
    <Box className="h-16" />
  );
};

export default Logo;
