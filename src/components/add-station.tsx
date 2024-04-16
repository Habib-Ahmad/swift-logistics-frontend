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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IStation } from "@/interfaces";
import { CustomModal } from ".";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { states } from "@/utils";
import { addStation } from "@/api";

const AddStation: React.FC = () => {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: addStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stations"], exact: true });
    },
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submit = async (values: IStation) => {
    mutate(values);
  };

  return (
    <>
      <Button onClick={openModal} className="flex ml-auto">
        <Typography className="dark:text-white">Create Station</Typography>
        <AddBox className="dark:text-white ml-1" />
      </Button>
      <CustomModal open={modalOpen} onClose={closeModal}>
        <Formik
          initialValues={{
            id: "",
            name: "",
            state: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("This is a required field"),
            state: Yup.string().required("This is a required field"),
          })}
          onSubmit={submit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Typography variant="h2">Add Driver</Typography>

              <Box className="grid sm:grid-cols-2 gap-6 my-6">
                <TextField
                  name="name"
                  label="Name"
                  size="small"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  name="state"
                  label="State"
                  select
                  size="small"
                  fullWidth
                  value={values.state}
                  onChange={handleChange}
                  error={touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
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
                  Station added successfully!
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

export default AddStation;
