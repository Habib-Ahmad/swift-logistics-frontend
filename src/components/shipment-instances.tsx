"use client";
import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllShipmentInstances } from "@/api";
import { IShipmentInstance } from "@/interfaces";
import { CustomModal, EditShipmentInstance, Table } from ".";

const ShipmentInstances: React.FC = () => {
  const [selectedShipment, setSelectedShipment] =
    useState<IShipmentInstance | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["shipmentInstances"],
    queryFn: getAllShipmentInstances,
  });

  const columns: GridColDef<IShipmentInstance>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 100,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => new Date(params.row.date).toDateString(),
    },
    { field: "vehicleId", headerName: "Vehicle", flex: 1 },
    { field: "driverId", headerName: "Driver", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.5 },
  ];

  const handleRowClick = (params: any) => {
    setSelectedShipment(params?.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedShipment(null);
  };

  if (isPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <Box>
      {data?.length ? (
        <Table rows={data} columns={columns} onRowClick={handleRowClick} />
      ) : (
        <Typography className="text-center text-lg font-semibold mt-5">
          You have no shipments
        </Typography>
      )}

      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {selectedShipment ? (
          <EditShipmentInstance
            data={selectedShipment}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <></>
        )}
      </CustomModal>
    </Box>
  );
};

export default ShipmentInstances;
