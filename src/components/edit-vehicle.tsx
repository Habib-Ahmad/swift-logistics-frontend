"use client";
import { deleteVehicle, updateVehicle } from "@/api";
import { IVehicle } from "@/interfaces";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface IProps {
  data: IVehicle;
  handleCloseModal: () => void;
}

const statusOptions = [
  { label: "Idle", value: "idle" },
  { label: "In Transit", value: "in transit" },
  { label: "Inactive", value: "inactive" },
  { label: "Decommissioned", value: "decomissioned" },
];

const transmissionOptions = [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" },
];

const vehicleTypes = [
  { label: "Saloon", value: "saloon" },
  { label: "Bus", value: "bus" },
  { label: "Bike", value: "bike" },
];

const EditVehicle: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const queryClient = useQueryClient();

  const updateVehicleMutation = useMutation({
    mutationKey: ["vehicles", data.id],
    mutationFn: updateVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
    },
  });

  const deleteVehicleMutation = useMutation({
    mutationKey: ["vehicles", data.id],
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"], exact: true });
    },
  });

  const submit = async (values: IVehicle) => {
    updateVehicleMutation.mutate(values);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicleMutation.mutate(data.id);

        Swal.fire({
          title: "Deleted!",
          text: "Vehicle deleted.",
          icon: "success",
        }).then(() => {
          handleCloseModal();
        });
      }
    });
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={Yup.object().shape({
        brand: Yup.string().required("This is a required field"),
        carModel: Yup.string().required("This is a required field"),
        year: Yup.string().required("This is a required field"),
        color: Yup.string().required("This is a required field"),
        registrationNumber: Yup.string().required("This is a required field"),
        type: Yup.string().required("This is a required field"),
        status: Yup.string().required("This is a required field"),
      })}
      onSubmit={submit}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Box className="grid sm:grid-cols-3 gap-6 mb-10">
            <TextField
              name="brand"
              label="Brand"
              size="small"
              fullWidth
              value={values.brand}
              onChange={handleChange}
              error={touched.brand && !!errors.brand}
              helperText={touched.brand && errors.brand}
            />

            <TextField
              name="carModel"
              label="Model"
              size="small"
              fullWidth
              value={values.carModel}
              onChange={handleChange}
              error={touched.carModel && !!errors.carModel}
              helperText={touched.carModel && errors.carModel}
            />

            <TextField
              name="year"
              label="Year"
              size="small"
              fullWidth
              value={values.year}
              onChange={handleChange}
              error={touched.year && !!errors.year}
              helperText={touched.year && errors.year}
            />

            <TextField
              name="color"
              label="Color"
              size="small"
              fullWidth
              value={values.color}
              onChange={handleChange}
              error={touched.color && !!errors.color}
              helperText={touched.color && errors.color}
            />

            <TextField
              name="registrationNumber"
              label="Registration Number"
              size="small"
              fullWidth
              value={values.registrationNumber}
              onChange={handleChange}
              error={touched.registrationNumber && !!errors.registrationNumber}
              helperText={
                touched.registrationNumber && errors.registrationNumber
              }
            />

            <TextField
              name="type"
              label="Type"
              select
              size="small"
              fullWidth
              value={values.type}
              onChange={handleChange}
              error={touched.type && !!errors.type}
              helperText={touched.type && errors.type}
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="transmission"
              label="Transmission"
              select
              size="small"
              fullWidth
              value={values.transmission}
              onChange={handleChange}
              error={touched.transmission && !!errors.transmission}
              helperText={touched.transmission && errors.transmission}
            >
              {transmissionOptions.map((transmission) => (
                <MenuItem key={transmission.value} value={transmission.value}>
                  {transmission.label}
                </MenuItem>
              ))}
            </TextField>

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

          {updateVehicleMutation.error && (
            <Typography className="text-center text-red-600 font-semibold mb-3">
              {updateVehicleMutation.error.message}
            </Typography>
          )}

          {updateVehicleMutation.isSuccess && (
            <Typography className="text-center text-green-600 font-semibold mb-3">
              Vehicle updated successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="block m-auto w-full sm:w-1/2"
          >
            {updateVehicleMutation.isPending ? (
              <CircularProgress size={25} className="text-white" />
            ) : (
              "Update"
            )}
          </Button>

          <Button
            variant="contained"
            className="block m-auto w-full sm:w-1/2 mt-3 bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditVehicle;
