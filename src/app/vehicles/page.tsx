import { AddVehicle, VehicleTable } from "@/components";
import { Box, Typography } from "@mui/material";

const Vehicles = () => {
  return (
    <Box>
      <Box className="flex items-center">
        <Typography variant="h1" className="mr-4">
          Vehicles
        </Typography>
        <AddVehicle />
      </Box>

      <Typography>Manage your vehicles</Typography>

      <VehicleTable />
    </Box>
  );
};

export default Vehicles;
