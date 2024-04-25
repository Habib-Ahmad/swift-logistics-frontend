"use client";
import { getAllOrders } from "@/api";
import { IOrder } from "@/interfaces";
import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CustomModal, OrderDetails, Table } from ".";

const OrderTable: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const columns: GridColDef<IOrder>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 40,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "deliveryAddress",
      headerName: "Delivery Address",
      flex: 1,
      renderCell: (params) => params.row.recipient.address,
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 0.5,
      renderCell: (params) => `${params.row.weight}kg`,
    },
    { field: "status", headerName: "Status", flex: 0.5 },
  ];

  const handleRowClick = (params: any) => {
    setSelectedOrder(params?.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  if (isPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <>
      <Table rows={data} columns={columns} onRowClick={handleRowClick} />

      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {selectedOrder ? (
          <OrderDetails
            data={selectedOrder}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <></>
        )}
      </CustomModal>
    </>
  );
};

export default OrderTable;
