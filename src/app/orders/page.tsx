import { AddOrder, OrderTable } from "@/components";
import { Box, Typography } from "@mui/material";

const Orders: React.FC = () => {
  return (
    <Box>
      <Box className="flex items-center">
        <Typography variant="h1" className="mr-4">
          Orders
        </Typography>
        <AddOrder />
      </Box>

      <Typography>Manage your orders</Typography>

      <OrderTable />
    </Box>
  );
};

export default Orders;
