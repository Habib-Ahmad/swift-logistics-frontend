import { Box, Typography } from "@mui/material";
import { LoginForm } from "@/components";
import React from "react";

const Login: React.FC = () => {
  return (
    <Box
      className="bg-no-repeat bg-cover h-[100dvh] flex flex-col justify-center items-center"
      sx={{
        backgroundImage:
          "url('https://m.foolcdn.com/media/dubs/original_images/Global_business_logistics_with_container_cargo_freight_ship.jpg')",
      }}
    >
      <Box className="w-11/12 max-w-lg py-8 px-12 backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-200 shadow-md rounded-md">
        <Typography variant="h1" className="mb-5">
          Welcome back
        </Typography>

        <LoginForm />
      </Box>
    </Box>
  );
};
export default Login;
