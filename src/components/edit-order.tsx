"use client";
import { deleteOrder, getAllShipments, updateOrder } from "@/api";
import { IOrder, IShipment } from "@/interfaces";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface IProps {
  data: IOrder;
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

const orderTypes = [
  { label: "Saloon", value: "saloon" },
  { label: "Bus", value: "bus" },
  { label: "Bike", value: "bike" },
];

const EditOrder: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const queryClient = useQueryClient();

  const { data: shipmentData, isPending: isShipmentDataPending } = useQuery<
    IShipment[]
  >({
    queryKey: ["stations"],
    queryFn: getAllShipments,
  });

  const updateOrderMutation = useMutation({
    mutationKey: ["orders", data.id],
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"], exact: true });
    },
  });

  const deleteOrderMutation = useMutation({
    mutationKey: ["orders", data.id],
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"], exact: true });
    },
  });

  const submit = async (values: IOrder) => {
    updateOrderMutation.mutate(values);
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
        deleteOrderMutation.mutate(data.id);

        Swal.fire({
          title: "Deleted!",
          text: "Order deleted.",
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
        sender: Yup.object().shape({
          name: Yup.string().required("This is a required field"),
          phone: Yup.string().required("This is a required field"),
        }),
        recipient: Yup.object().shape({
          name: Yup.string().required("This is a required field"),
          phone: Yup.string().required("This is a required field"),
          address: Yup.string().required("This is a required field"),
        }),
        weight: Yup.number()
          .moreThan(0, "This is a required field")
          .required("This is a required field"),
        description: Yup.string().required("This is a required field"),
        transactionId: Yup.string().required("This is a required field"),
        shipmentId: Yup.string().required("This is a required field"),
      })}
      onSubmit={submit}
      enableReinitialize
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Typography className="mt-4">Sender Details</Typography>
          <Box className="grid sm:grid-cols-2 gap-6 mt-2">
            <TextField
              name="sender.name"
              label="Sender Name"
              size="small"
              fullWidth
              value={values.sender.name}
              onChange={handleChange}
              error={touched.sender?.name && !!errors.sender?.name}
              helperText={touched.sender?.name && errors.sender?.name}
            />

            <TextField
              name="sender.phone"
              label="Sender Phone Number"
              size="small"
              fullWidth
              value={values.sender.phone}
              onChange={handleChange}
              error={touched.sender?.phone && !!errors.sender?.phone}
              helperText={touched.sender?.phone && errors.sender?.phone}
            />
          </Box>

          <Typography className="mt-6">Recipient Details</Typography>
          <Box className="grid sm:grid-cols-2 gap-6 mt-2">
            <TextField
              name="recipient.name"
              label="Recipient Name"
              size="small"
              fullWidth
              value={values.recipient.name}
              onChange={handleChange}
              error={touched.recipient?.name && !!errors.recipient?.name}
              helperText={touched.recipient?.name && errors.recipient?.name}
            />

            <TextField
              name="recipient.phone"
              label="Recipient Phone Number"
              size="small"
              fullWidth
              value={values.recipient.phone}
              onChange={handleChange}
              error={touched.recipient?.phone && !!errors.recipient?.phone}
              helperText={touched.recipient?.phone && errors.recipient?.phone}
            />

            <TextField
              name="recipient.address"
              label="Recipient Address"
              size="small"
              className="col-span-full"
              fullWidth
              multiline
              rows={4}
              value={values.recipient.address}
              onChange={handleChange}
              error={touched.recipient?.address && !!errors.recipient?.address}
              helperText={
                touched.recipient?.address && errors.recipient?.address
              }
            />
          </Box>

          <Typography className="mt-6">Order Details</Typography>
          <Box className="grid sm:grid-cols-2 gap-6 mt-2 mb-6">
            <TextField
              name="transactionId"
              label="Transaction ID"
              size="small"
              fullWidth
              value={values.transactionId}
              onChange={handleChange}
              error={touched.transactionId && !!errors.transactionId}
              helperText={touched.transactionId && errors.transactionId}
            />

            <TextField
              name="description"
              label="Description"
              size="small"
              fullWidth
              value={values.description}
              onChange={handleChange}
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />

            <TextField
              name="weight"
              label="Weight (KG)"
              size="small"
              type="number"
              fullWidth
              value={values.weight || ""}
              onChange={handleChange}
              error={touched.weight && !!errors.weight}
              helperText={touched.weight && errors.weight}
            />
          </Box>

          {updateOrderMutation.error && (
            <Typography className="text-center text-red-600 font-semibold mb-3">
              {updateOrderMutation.error.message}
            </Typography>
          )}

          {updateOrderMutation.isSuccess && (
            <Typography className="text-center text-green-600 font-semibold mb-3">
              Order added successfully!
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            className="block m-auto w-1/2"
          >
            {updateOrderMutation.isPending ? (
              <CircularProgress size={25} className="text-white" />
            ) : (
              "Add"
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

export default EditOrder;
