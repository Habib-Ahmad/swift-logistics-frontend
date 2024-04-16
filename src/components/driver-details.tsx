"use client";
import { Box, Typography } from "@mui/material";
import { IDriver } from "@/interfaces";
import { EditDriver } from ".";

interface IProps {
  data: IDriver;
  handleCloseModal: () => void;
}

const DriverDetails: React.FC<IProps> = ({ data, handleCloseModal }) => {
  return (
    <Box>
      <Typography id="modal-title" component="h2" className="mb-3">
        Driver Details
      </Typography>

      <EditDriver data={data} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default DriverDetails;
