"use client";
import { getAllDrivers, getAllVehicles, updateShipmentInstance } from "@/api";
import { IDriver, IShipmentInstance, IVehicle } from "@/interfaces";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import moment from "moment";
import * as Yup from "yup";

interface IProps {
  data: IShipmentInstance;
  handleCloseModal?: () => void;
}

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const EditShipmentInstance: React.FC<IProps> = ({ data }) => {
  const queryClient = useQueryClient();

  const { data: driversData, isPending: isDriversPending } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDrivers,
  });

  const { data: vehiclesData, isPending: isVehiclesPending } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const updateShipmentMutation = useMutation({
    mutationKey: ["shipmentInstances", data.id],
    mutationFn: updateShipmentInstance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shipmentInstances"],
        exact: true,
      });
    },
  });

  const submit = async (values: IShipmentInstance) => {
    updateShipmentMutation.mutate(values);
  };

  if (isDriversPending || isVehiclesPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object().shape({})}
      onSubmit={submit}
      enableReinitialize
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
          <Box className="grid sm:grid-cols-2 gap-6 my-6">
            <TextField
              name="name"
              label="Name"
              size="small"
              fullWidth
              disabled
              value={values.name}
              onChange={handleChange}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                name="date"
                value={moment(values.date)}
                onChange={(value) => {
                  setFieldValue("date", moment(value).toISOString());
                }}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    label: "Shipment Date",
                    error: touched.date && !!errors.date,
                    helperText: touched.date && errors.date,
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>

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

            <TextField
              name="status"
              label="Status"
              select
              size="small"
              fullWidth
              value={values.status}
              onChange={handleChange}
              error={touched.status && !!errors.status}
              helperText={touched.status && errors.status}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {updateShipmentMutation.error && (
            <Typography className="text-center text-red-600 font-semibold mb-3">
              {updateShipmentMutation.error.message}
            </Typography>
          )}

          {updateShipmentMutation.isSuccess && (
            <Typography className="text-center text-green-600 font-semibold mb-3">
              Shipment updated successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="block m-auto w-full sm:w-1/2"
          >
            {updateShipmentMutation.isPending ? (
              <CircularProgress size={25} className="text-white" />
            ) : (
              "Update"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditShipmentInstance;
