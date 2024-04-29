import { Box, Typography } from "@mui/material";

export const renderSuccess = (text: string) => {
  return (
    <Box className="dark:bg-green-950 bg-green-200 text-green-700 dark:text-green-400 inline-flex items-center px-1 py-1 rounded-full capitalize">
      <Typography component="span" className="text-xs px-1">
        {text}
      </Typography>
    </Box>
  );
};

export const renderFailure = (text: string) => {
  return (
    <Box className="bg-red-300 dark:bg-red-950 text-red-600 dark:text-red-400 inline-flex items-center px-1 py-1 rounded-full capitalize">
      <Typography component="span" className="text-xs px-1">
        {text}
      </Typography>
    </Box>
  );
};

export const renderWarning = (text: string) => {
  return (
    <Box className="bg-yellow-200 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-600 inline-flex items-center px-1 py-1 rounded-full capitalize">
      <Typography component="span" className="text-xs px-1">
        {text}
      </Typography>
    </Box>
  );
};
