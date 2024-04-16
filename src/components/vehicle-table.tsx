"use client";
import { getAllVehicles } from "@/api";
import { IVehicle } from "@/interfaces";
import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CustomModal, Table, VehicleDetails } from ".";

const VehicleTable: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const columns: GridColDef<IVehicle>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 40,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "carModel", headerName: "Car Model", flex: 1 },
    { field: "year", headerName: "Year", flex: 1 },
    { field: "color", headerName: "Color", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const handleRowClick = (params: any) => {
    setSelectedVehicle(params?.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVehicle(null);
  };

  if (isPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <>
      <Table rows={data} columns={columns} onRowClick={handleRowClick} />

      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {selectedVehicle ? (
          <VehicleDetails
            data={selectedVehicle}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <></>
        )}
      </CustomModal>
    </>
  );
};

export default VehicleTable;
