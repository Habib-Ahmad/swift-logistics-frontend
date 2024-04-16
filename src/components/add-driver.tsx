"use client";
import { useState } from "react";
import { AddBox } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriver } from "@/api";
import { IDriver } from "@/interfaces";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomModal } from ".";
import moment from "moment";

const AddDriver: React.FC = () => {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: addDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"], exact: true });
    },
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submit = async (values: IDriver) => {
    mutate(values);
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
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dob: "",
            address: "",
            status: "idle",
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("This is a required field"),
            lastName: Yup.string().required("This is a required field"),
            email: Yup.string().required("This is a required field"),
            phone: Yup.string().required("This is a required field"),
            dob: Yup.string().required("This is a required field"),
            address: Yup.string().required("This is a required field"),
          })}
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
              <Typography variant="h2">Add Driver</Typography>

              <Box className="grid sm:grid-cols-2 gap-6 my-6">
                <TextField
                  name="firstName"
                  label="First Name"
                  size="small"
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  name="lastName"
                  label="Last Name"
                  size="small"
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />

                <TextField
                  name="email"
                  label="E-mail"
                  size="small"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  name="phone"
                  label="Phone"
                  size="small"
                  fullWidth
                  value={values.phone}
                  onChange={handleChange}
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />

                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    name="dob"
                    value={values.dob ? moment(values.dob) : null}
                    onChange={(value) => {
                      setFieldValue("dob", moment(value).toISOString());
                    }}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: "small",
                        label: "Date of birth",
                        error: touched.dob && !!errors.dob,
                        helperText: touched.dob && errors.dob,
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  name="address"
                  label="Address"
                  size="small"
                  multiline
                  minRows={4}
                  fullWidth
                  value={values.address}
                  onChange={handleChange}
                  error={touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                />
              </Box>

              {error && (
                <Typography className="text-center text-red-600 font-semibold mb-3">
                  {error.message}
                </Typography>
              )}

              {isSuccess && (
                <Typography className="text-center text-green-600 font-semibold mb-3">
                  Driver added successfully!
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

export default AddDriver;
