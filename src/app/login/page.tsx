import { Box, Typography } from "@mui/material";
import { LoginForm } from "@/components";

const Login: React.FC = () => {
  return (
    <Box className="bg-slate-100 dark:bg-slate-900 bg-no-repeat bg-cover h-[100dvh] flex flex-col justify-center items-center">
      <Box className="w-11/12 max-w-lg py-8 px-12 backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-200 shadow-md rounded-md bg-white dark:bg-gray-800">
        <Typography variant="h1" className="mb-5">
          Welcome back
        </Typography>

        <LoginForm />
      </Box>
    </Box>
  );
};
export default Login;
