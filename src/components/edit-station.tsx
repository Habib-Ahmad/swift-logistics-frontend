"use client";
import { deleteStation, updateStation } from "@/api";
import { IStation } from "@/interfaces";
import { states } from "@/utils";
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
  data: IStation;
  handleCloseModal: () => void;
}

const EditStation: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const queryClient = useQueryClient();

  const updateStationMutation = useMutation({
    mutationKey: ["stations", data.id],
    mutationFn: updateStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stations"], exact: true });
    },
  });

  const deleteStationMutation = useMutation({
    mutationKey: ["stations", data.id],
    mutationFn: deleteStation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stations"], exact: true });
    },
  });

  const submit = async (values: IStation) => {
    updateStationMutation.mutate(values);
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
        deleteStationMutation.mutate(data.id);

        Swal.fire({
          title: "Deleted!",
          text: "Station deleted.",
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
        name: Yup.string().required("This is a required field"),
        state: Yup.string().required("This is a required field"),
      })}
      onSubmit={submit}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
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

          {updateStationMutation.error && (
            <Typography className="text-center text-red-600 font-semibold mb-3">
              {updateStationMutation.error.message}
            </Typography>
          )}

          {updateStationMutation.isSuccess && (
            <Typography className="text-center text-green-600 font-semibold mb-3">
              Station updated successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="block m-auto w-full sm:w-1/2"
          >
            {updateStationMutation.isPending ? (
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

export default EditStation;
