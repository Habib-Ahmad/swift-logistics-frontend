"use client";
import { useState } from "react";
import { AddBox } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { addShipment, getAllStations } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IShipment, IStation } from "@/interfaces";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomModal } from ".";

const frequency = ["daily", "weekly", "monthly"];
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const AddShipment: React.FC = () => {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  const { data: stationsData, isPending: isStationsPending } = useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations,
    staleTime: 1000 * 60 * 10,
  });

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: addShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"], exact: true });
    },
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submit = async (values: IShipment) => {
    mutate(values);
  };

  const removeStationSuffix = (name: string) => {
    return name.replace(/ Station/i, "");
  };

  const getStationName = (id: string) => {
    const name =
      stationsData.find((station: IStation) => station.id === id)?.name || "";

    return removeStationSuffix(name);
  };

  if (isStationsPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <>
      <Button onClick={openModal} className="flex ml-auto">
        <Typography className="dark:text-white">Create Shipment</Typography>
        <AddBox className="dark:text-white ml-1" />
      </Button>
      <CustomModal open={modalOpen} onClose={closeModal}>
        <Formik
          initialValues={{
            id: "",
            name: "",
            startPoint: "",
            destination: "",
            schedule: {
              frequency: "daily",
              interval: 1,
            },
            status: "active",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            startPoint: Yup.string().required("Start Point is required"),
            destination: Yup.string().required("Destination is required"),
          })}
          onSubmit={submit}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Typography variant="h2">Add Shipment</Typography>

              <Box className="grid sm:grid-cols-2 gap-6 my-6">
                <TextField
                  name="startPoint"
                  label="Start Point"
                  select
                  size="small"
                  fullWidth
                  value={values.startPoint}
                  onChange={(e) => {
                    setFieldValue("startPoint", e.target.value);

                    const startName = getStationName(e.target.value);
                    const destName = getStationName(values.destination);
                    setFieldValue("name", `${startName}-${destName}`);
                  }}
                  error={touched.startPoint && !!errors.startPoint}
                  helperText={touched.startPoint && errors.startPoint}
                >
                  {stationsData.map((station: IStation) => (
                    <MenuItem key={station.id} value={station.id}>
                      {station.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="destination"
                  label="Destination"
                  select
                  size="small"
                  fullWidth
                  value={values.destination}
                  onChange={(e) => {
                    setFieldValue("destination", e.target.value);

                    const startName = getStationName(values.startPoint);
                    const destName = getStationName(e.target.value);
                    setFieldValue("name", `${startName}-${destName}`);
                  }}
                  error={touched.destination && !!errors.destination}
                  helperText={touched.destination && errors.destination}
                >
                  {stationsData.map((station: IStation) => (
                    <MenuItem key={station.id} value={station.id}>
                      {station.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="name"
                  label="Name"
                  size="small"
                  fullWidth
                  value={values.name}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  name="schedule.frequency"
                  label="Frequency"
                  select
                  size="small"
                  fullWidth
                  value={values.schedule.frequency}
                  onChange={handleChange}
                  error={
                    touched.schedule?.frequency && !!errors.schedule?.frequency
                  }
                  helperText={
                    touched.schedule?.frequency && errors.schedule?.frequency
                  }
                >
                  {frequency.map((freq) => (
                    <MenuItem key={freq} value={freq}>
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="schedule.interval"
                  label="Interval"
                  size="small"
                  type="number"
                  fullWidth
                  value={values.schedule?.interval}
                  onChange={handleChange}
                  error={
                    touched.schedule?.interval && !!errors.schedule?.interval
                  }
                  helperText={
                    touched.schedule?.interval && errors.schedule?.interval
                  }
                />

                {values.schedule.frequency === "weekly" && (
                  <TextField
                    name="schedule.dayOfWeek"
                    label="Day of the week"
                    select
                    size="small"
                    fullWidth
                    value={values.schedule.dayOfWeek}
                    onChange={handleChange}
                    error={
                      touched.schedule?.dayOfWeek &&
                      !!errors.schedule?.dayOfWeek
                    }
                    helperText={
                      touched.schedule?.dayOfWeek && errors.schedule?.dayOfWeek
                    }
                  >
                    {days.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Box>

              {error && (
                <Typography className="text-center text-red-600 font-semibold mb-3">
                  {error.message}
                </Typography>
              )}

              {isSuccess && (
                <Typography className="text-center text-green-600 font-semibold mb-3">
                  Shipment added successfully!
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                className="block m-auto w-1/2"
              >
                {isPending ? (
                  <CircularProgress size={25} className="text-white" />
                ) : (
                  "Add"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </CustomModal>
    </>
  );
};

export default AddShipment;
