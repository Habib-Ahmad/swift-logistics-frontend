"use client";
import { Box, Typography } from "@mui/material";
import { IVehicle } from "@/interfaces";
import { CustomTabs, EditVehicle } from ".";

interface IProps {
  data: IVehicle;
  handleCloseModal: () => void;
}

const VehicleDetails: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const tabData = [
    {
      label: "Shipment Details",
      component: (
        <Box>
          <Typography className="font-semibold text-center">
            Vehicle is currently not on any shipment
          </Typography>
        </Box>
      ),
    },
    {
      label: "Vehicle Details",
      component: (
        <EditVehicle data={data} handleCloseModal={handleCloseModal} />
      ),
    },
  ];

  return (
    <Box>
      <Typography id="modal-title" component="h2" className="mb-3">
        Vehicle Details
      </Typography>

      <CustomTabs data={tabData} />
    </Box>
  );
};

export default VehicleDetails;
