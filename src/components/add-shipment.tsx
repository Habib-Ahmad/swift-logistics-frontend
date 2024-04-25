"use client";
import { useState } from "react";
import { AddBox } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  addShipment,
  getAllDrivers,
  getAllStations,
  getAllVehicles,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateShipment, IDriver, IStation, IVehicle } from "@/interfaces";
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

  const { data: driversData, isPending: isDriversPending } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
    staleTime: 1000 * 60 * 10,
  });

  const { data: vehiclesData, isPending: isVehiclesPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
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

  const submit = async (values: ICreateShipment) => {
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

  if (isStationsPending || isDriversPending || isVehiclesPending) {
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
              frequency: "",
              interval: null,
              dayOfWeek: "",
              timesPerDay: null,
              dayOfMonth: null,
            },
            vehicleId: null,
            driverId: null,
            status: "active",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("This field is required"),
            startPoint: Yup.string().required("This field is required"),
            destination: Yup.string().required("This field is required"),

            schedule: Yup.object().shape({
              frequency: Yup.string()
                .required("Frequency is required")
                .oneOf(["daily", "weekly", "monthly"]),
              interval: Yup.number()
                .required("This field is required")
                .positive("Interval must be a positive number")
                .integer("Interval must be an integer"),
              timesPerDay: Yup.number().when("frequency", {
                is: "daily",
                then: () =>
                  Yup.number()
                    .required("This field is required")
                    .positive("Times Per Day must be a positive number"),
                otherwise: () => Yup.number().notRequired(),
              }),
              dayOfWeek: Yup.string().when("frequency", {
                is: "weekly",
                then: () =>
                  Yup.string()
                    .required("Day of Week is required")
                    .oneOf([
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ]),
                otherwise: () => Yup.string().notRequired(),
              }),
              dayOfMonth: Yup.number().when("frequency", {
                is: "monthly",
                then: () =>
                  Yup.number()
                    .required("Day of Month is required")
                    .min(1, "Day of Month must be between 1 and 31")
                    .max(31, "Day of Month must be between 1 and 31"),
                otherwise: () => Yup.number().notRequired(),
              }),
            }),
            status: Yup.string()
              .required("Status is required")
              .oneOf(["active", "inactive"]),
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
                    const destName = getStationName(
                      values.destination as string
                    );
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

                    const startName = getStationName(
                      values.startPoint as string
                    );
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
                  value={values.schedule.interval || ""}
                  onChange={handleChange}
                  error={
                    touched.schedule?.interval && !!errors.schedule?.interval
                  }
                  helperText={
                    touched.schedule?.interval && errors.schedule?.interval
                  }
                />

                {values.schedule.frequency === "daily" && (
                  <TextField
                    name="schedule.timesPerDay"
                    label="How many times per day"
                    size="small"
                    type="number"
                    fullWidth
                    value={values.schedule.timesPerDay || ""}
                    onChange={handleChange}
                    error={
                      touched.schedule?.timesPerDay &&
                      !!errors.schedule?.timesPerDay
                    }
                    helperText={
                      touched.schedule?.timesPerDay &&
                      errors.schedule?.timesPerDay
                    }
                  />
                )}

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

                {values.schedule.frequency === "monthly" && (
                  <TextField
                    name="schedule.dayOfMonth"
                    label="Day of the Month"
                    size="small"
                    type="number"
                    fullWidth
                    value={values.schedule.dayOfMonth || ""}
                    onChange={handleChange}
                    error={
                      touched.schedule?.dayOfMonth &&
                      !!errors.schedule?.dayOfMonth
                    }
                    helperText={
                      touched.schedule?.dayOfMonth &&
                      errors.schedule?.dayOfMonth
                    }
                  />
                )}

                <Autocomplete
                  options={driversData}
                  getOptionLabel={(driver: IDriver) =>
                    `${driver.firstName} ${driver.lastName}`
                  }
                  value={
                    driversData.find(
                      (driver: IDriver) => driver.id === values.driverId
                    ) || null
                  }
                  onChange={(e, newValue) => {
                    setFieldValue("driverId", newValue?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Driver"
                      size="small"
                      error={touched.driverId && !!errors.driverId}
                      helperText={touched.driverId && errors.driverId}
                    />
                  )}
                />

                <Autocomplete
                  options={vehiclesData}
                  getOptionLabel={(vehicle: IVehicle) =>
                    `${vehicle.brand} ${vehicle.carModel} - ${vehicle.registrationNumber}`
                  }
                  value={
                    vehiclesData.find(
                      (vehicle: IVehicle) => vehicle.id === values.vehicleId
                    ) || null
                  }
                  onChange={(e, newValue) => {
                    setFieldValue("vehicleId", newValue?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle"
                      size="small"
                      error={touched.vehicleId && !!errors.vehicleId}
                      helperText={touched.vehicleId && errors.vehicleId}
                    />
                  )}
                />
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
