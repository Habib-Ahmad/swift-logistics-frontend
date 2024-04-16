"use client";
import { deleteDriver, updateDriver } from "@/api";
import { IDriver } from "@/interfaces";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import moment from "moment";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface IProps {
  data: IDriver;
  handleCloseModal: () => void;
}

const statusOptions = [
  { label: "Idle", value: "idle" },
  { label: "In Transit", value: "in transit" },
  { label: "Inactive", value: "inactive" },
  { label: "Terminated", value: "ternimated" },
];

const EditDriver: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const queryClient = useQueryClient();

  const updateDriverMutation = useMutation({
    mutationKey: ["drivers", data.id],
    mutationFn: updateDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"], exact: true });
    },
  });

  const deleteDriverMutation = useMutation({
    mutationKey: ["drivers", data.id],
    mutationFn: deleteDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"], exact: true });
    },
  });

  const submit = async (values: IDriver) => {
    updateDriverMutation.mutate(values);
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
        deleteDriverMutation.mutate(data.id);

        Swal.fire({
          title: "Deleted!",
          text: "Driver deleted.",
          icon: "success",
        }).then(() => {
          handleCloseModal();
        });
      }
    });
  };

  return (
    <Box>
      <Typography component="h2" className="mb-3">
        Driver Details
      </Typography>

      <Formik
        initialValues={data}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("This is a required field"),
          lastName: Yup.string().required("This is a required field"),
          email: Yup.string().required("This is a required field"),
          phone: Yup.string().required("This is a required field"),
          dob: Yup.string().required("This is a required field"),
          address: Yup.string().required("This is a required field"),
          status: Yup.string().required("This is a required field"),
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

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  name="dob"
                  value={moment(values.dob)}
                  onChange={(value) => {
                    setFieldValue("dob", moment(value).toISOString());
                  }}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      size: "small",
                      label: "Date of Birth",
                      error: touched.dob && !!errors.dob,
                      helperText: touched.dob && errors.dob,
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>

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

            {updateDriverMutation.error && (
              <Typography className="text-center text-red-600 font-semibold mb-3">
                {updateDriverMutation.error.message}
              </Typography>
            )}

            {updateDriverMutation.isSuccess && (
              <Typography className="text-center text-green-600 font-semibold mb-3">
                Driver updated successfully!
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              className="block m-auto w-full sm:w-1/2"
            >
              {updateDriverMutation.isPending ? (
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
    </Box>
  );
};

export default EditDriver;
