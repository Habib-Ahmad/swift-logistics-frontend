import { Box, Typography } from "@mui/material";
import { AddDriver, DriverTable } from "@/components";

const Drivers: React.FC = () => {
  return (
    <Box>
      <Box className="flex items-center">
        <Typography variant="h1" className="mr-4">
          Drivers
        </Typography>
        <AddDriver />
      </Box>

      <Typography>Manage your drivers</Typography>

      <DriverTable />
    </Box>
  );
};

export default Drivers;
