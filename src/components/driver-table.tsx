"use client";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getAllDrivers } from "@/api";
import { IDriver } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { CustomModal, DriverDetails, Table } from ".";

const DriverTable: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<IDriver | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
  });

  const columns: GridColDef<IDriver>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 40,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "dob",
      headerName: "Date of Birth",
      flex: 1,
      renderCell: (params) =>
        new Date(params.row.dob).toUTCString().slice(5, 16),
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
  ];

  const handleRowClick = (params: any) => {
    setSelectedDriver(params?.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDriver(null);
  };

  if (isPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <>
      <Table rows={data} columns={columns} onRowClick={handleRowClick} />

      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {selectedDriver ? (
          <DriverDetails
            data={selectedDriver}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <></>
        )}
      </CustomModal>
    </>
  );
};

export default DriverTable;
