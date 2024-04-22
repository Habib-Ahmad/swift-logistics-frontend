"use client";
import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IStation } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getAllStations } from "@/api";
import { AddStation, CustomModal, EditStation, Table } from ".";

const Stations: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<IStation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations,
  });

  const columns: GridColDef<IStation>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 80,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
  ];

  const handleRowClick = (params: any) => {
    setSelectedStation(params?.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStation(null);
  };

  if (isPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <Box>
      <AddStation />

      {data?.length ? (
        <Table rows={data} columns={columns} onRowClick={handleRowClick} />
      ) : (
        <Typography className="text-center text-lg font-semibold mt-5">
          You have no stations
        </Typography>
      )}

      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {selectedStation ? (
          <EditStation
            data={selectedStation}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <></>
        )}
      </CustomModal>
    </Box>
  );
};

export default Stations;
