import { Box, Typography } from "@mui/material";
import { LoginForm, Logo } from "@/components";

const Login: React.FC = () => {
  return (
    <Box className="flex h-[100dvh]">
      <Box className="bg-green-500 w-2/3 bg-login pt-4 pl-4">
        <Logo variant="dark" />
      </Box>

      <Box className="grid place-items-center w-1/3 px-12">
        <Box className="w-full">
          <Typography variant="h1" className="text-xl font-semibold">
            Welcome to Swift Logistics dashboard!
          </Typography>
          <Typography className="mb-6">Please sign-in to continue</Typography>

          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
