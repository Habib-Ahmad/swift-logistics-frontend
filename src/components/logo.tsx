"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Box } from "@mui/material";
import logo from "@/assets/logo.svg";
import logoDark from "@/assets/logo-dark.svg";

const Logo: React.FC = () => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box className="flex w-min md:mx-auto md:mt-4 md:mb-8">
      {mounted ? (
        <Image
          src={resolvedTheme == "dark" ? logoDark : logo}
          alt="Swift Logistics"
          className="w-24 md:w-auto"
        />
      ) : (
        <Box className="h-16" />
      )}
    </Box>
  );
};

export default Logo;
