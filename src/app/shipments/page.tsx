import { Box, Typography } from "@mui/material";
import {
  CustomTabs,
  Shipments as ShipmentsComponent,
  Stations,
} from "@/components";

const tabData = [
  {
    label: "Today's shipments",
    component: <Box></Box>,
  },
  {
    label: "Manage shipments",
    component: <ShipmentsComponent />,
  },
  {
    label: "Stations",
    component: <Stations />,
  },
];

const Shipments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h1">Shipments</Typography>

      <Typography className="mb-10">Manage your shipment details</Typography>

      <CustomTabs data={tabData} large />
    </Box>
  );
};

export default Shipments;
