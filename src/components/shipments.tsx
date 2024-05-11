"use client";
import { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IShipment } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getAllShipments } from "@/api";
import {
  AddShipment,
  CustomModal,
  EditShipment,
  Table,
  renderFailure,
  renderSuccess,
} from ".";

const Shipments: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["shipments"],
    queryFn: getAllShipments,
  });

  const columns: GridColDef<IShipment>[] = [
    {
      field: "id",
      headerName: "S/N",
      width: 50,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params?.id) + 1,
    },
    { field: "name", headerName: "Name", flex: 0.8 },
    {
      field: "startPoint",
      headerName: "Start Point",
      flex: 1,
      renderCell: (params) =>
        typeof params.row.startPoint === "string"
          ? params.row.startPoint
          : `${params.row.startPoint.name}, ${params.row.startPoint.state}`,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      renderCell: (params) =>
        typeof params.row.destination === "string"
          ? params.row.destination
          : `${params.row.destination.name}, ${params.row.destination.state}`,
    },
    {
      field: "schedule",
      headerName: "Schedule",
      flex: 1,
      renderCell: (params) => {
        let { frequency, interval, dayOfWeek, timesPerDay } =
          params.row.schedule;

        if (frequency === "daily") {
          if (interval > 1) {
            if (!timesPerDay || timesPerDay <= 1) {
              return `Every ${interval} days`;
            } else {
              return `Every ${interval} days, ${timesPerDay} times a day`;
            }
          }
          if (timesPerDay && timesPerDay > 1) {
            return `${timesPerDay} times a day`;
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
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      renderCell: (params) => {
        const status = params.row.status;
        if (status === "active") return renderSuccess(status);

        return renderFailure(status);
      },
    },
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
