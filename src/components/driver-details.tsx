"use client";
import { Box, Typography } from "@mui/material";
import { IDriver } from "@/interfaces";
import { EditDriver } from ".";

interface IProps {
  data: IDriver;
}

const DriverDetails: React.FC<IProps> = ({ data }) => {
  return (
    <Box>
      <Typography id="modal-title" component="h2" className="mb-3">
        Driver Details
      </Typography>

      <EditDriver data={data} />
    </Box>
  );
};

export default DriverDetails;
