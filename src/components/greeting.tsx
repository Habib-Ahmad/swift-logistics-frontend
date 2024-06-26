"use client";
import { useAuth } from "@/context/authContext";
import { Typography } from "@mui/material";

const Greeting = () => {
  const { user } = useAuth();

  if (!user) return;

  return <Typography variant="h1">Hello, {user.firstName}</Typography>;
};

export default Greeting;
