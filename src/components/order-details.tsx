"use client";
import { Box, Typography } from "@mui/material";
import { IOrder } from "@/interfaces";
import { CustomTabs, EditOrder } from ".";

interface IProps {
  data: IOrder;
  handleCloseModal: () => void;
}

const OrderDetails: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const tabData = [
    {
      label: "Shipment Details",
      component: (
        <Box>
          <Typography className="font-semibold text-center">
            Order is currently not on any shipment
          </Typography>
        </Box>
      ),
    },
    {
      label: "Order Details",
      component: <EditOrder data={data} handleCloseModal={handleCloseModal} />,
    },
  ];

  return (
    <Box>
      <Typography id="modal-title" component="h2" className="mb-3">
        Order Details
      </Typography>

      <CustomTabs data={tabData} />
    </Box>
  );
};

export default OrderDetails;
