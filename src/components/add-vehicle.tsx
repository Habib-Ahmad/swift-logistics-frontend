"use client";

import { useState } from "react";
import { AddBox } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { addVehicle, getAllVehicles } from "@/api";
import { IVehicle } from "@/interfaces";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomModal } from ".";

const transmissionOptions = [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" },
];

const vehicleTypes = [
  { label: "Saloon", value: "saloon" },
  { label: "Bus", value: "bus" },
  { label: "Bike", value: "bike" },
];

const AddVehicle: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationKey: ["vehicles"],
    mutationFn: addVehicle,
    onSuccess: getAllVehicles,
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submit = async (values: IVehicle) => {
    mutateAsync(values);
  };

  return (
    <>
      <IconButton onClick={openModal}>
        <AddBox className="dark:text-white" />
      </IconButton>
      <CustomModal open={modalOpen} onClose={closeModal}>
        <Formik
          initialValues={{
            id: "",
            brand: "",
            carModel: "",
            year: "",
            color: "",
            registrationNumber: "",
            type: "saloon",
            transmission: "manual",
            status: "idle",
          }}
          validationSchema={Yup.object().shape({
            brand: Yup.string().required("This is a required field"),
            carModel: Yup.string().required("This is a required field"),
            year: Yup.string().required("This is a required field"),
            color: Yup.string().required("This is a required field"),
            registrationNumber: Yup.string().required(
              "This is a required field"
            ),
            type: Yup.string().required("This is a required field"),
            status: Yup.string().required("This is a required field"),
          })}
          onSubmit={submit}
          enableReinitialize
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Typography variant="h2">Add Vehicle</Typography>

              <Box className="grid grid-cols-3 gap-6 my-6">
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
                  error={
                    touched.registrationNumber && !!errors.registrationNumber
                  }
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
                    <MenuItem
                      key={transmission.value}
                      value={transmission.value}
                    >
                      {transmission.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              {error && (
                <Typography className="text-center text-red-600 font-semibold mb-3">
                  {error.message}
                </Typography>
              )}

              {isSuccess && (
                <Typography className="text-center text-green-600 font-semibold mb-3">
                  Vehicle added successfully!
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                className="block m-aut0 w-1/2"
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

export default AddVehicle;
