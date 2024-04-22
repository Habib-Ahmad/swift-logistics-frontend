"use client";
import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IShipment, IStation } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getAllShipments, getAllStations } from "@/api";
import { AddShipment, CustomModal, EditShipment, Table } from ".";

const Shipments: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["shipments"],
    queryFn: getAllShipments,
  });

  const { data: stationData, isPending: isStationDataPending } = useQuery<
    IStation[]
  >({
    queryKey: ["stations"],
    queryFn: getAllStations,
  });

  const columns: GridColDef<IShipment>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 80,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "startPoint",
      headerName: "Start Point",
      flex: 1,
      renderCell: (params) => {
        const id = params.row.startPoint;
        const name = stationData?.find((station) => station.id === id)?.name;
        return name;
      },
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      renderCell: (params) => {
        const id = params.row.destination;
        const name = stationData?.find((station) => station.id === id)?.name;
        return name;
      },
    },
    {
      field: "schedule",
      headerName: "Schedule",
      flex: 1,
      renderCell: (params) => {
        let { frequency, interval, dayOfWeek } = params.row.schedule;

        if (frequency === "daily") {
          if (interval > 1) {
            return `Every ${interval} days`;
          }
          return "Everyday";
        }
        if (frequency === "weekly") {
          if (interval > 1) {
            return `Every ${interval} ${dayOfWeek}s`;
          }
          return `Every ${dayOfWeek}`;
        }
        if (frequency === "monthly") {
          if (interval > 1) {
            return `Every ${interval} months`;
          }
          return `Every month`;
        }

        return "";
      },
    },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const handleRowClick = (params: any) => {
    setSelectedShipment(params?.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedShipment(null);
  };

  if (isPending || isStationDataPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <Box>
      <AddShipment />

      {data?.length ? (
        <Table rows={data} columns={columns} onRowClick={handleRowClick} />
      ) : (
        <Typography className="text-center text-lg font-semibold mt-5">
          You have no shipments
        </Typography>
      )}

      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {selectedShipment ? (
          <EditShipment
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

export default Shipments;
