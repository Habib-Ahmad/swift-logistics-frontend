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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrder, getAllShipments } from "@/api";
import { ICreateOrder, IShipment } from "@/interfaces";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomModal } from ".";

const RATE = 3000;

const AddOrder: React.FC = () => {
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);

  const { data: shipmentData, isPending: isShipmentDataPending } = useQuery<
    IShipment[]
  >({
    queryKey: ["stations"],
    queryFn: getAllShipments,
  });

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"], exact: true });
    },
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submit = async (values: ICreateOrder) => {
    const payload = { ...values };
    const id = shipmentData?.find(
      (shipment) => shipment.name === payload.shipmentId
    )?.id;
    if (!id) return;
    payload.shipmentId = id;

    mutate(payload);
  };

  return (
    <>
      <IconButton onClick={openModal}>
        <AddBox className="dark:text-white" />
      </IconButton>
      <CustomModal open={modalOpen} onClose={closeModal}>
        <Formik
          initialValues={{
            sender: {
              name: "",
              phone: "",
            },
            recipient: {
              name: "",
              phone: "",
              address: "",
            },
            transactionId: "",
            weight: 0,
            price: 0,
            description: "",
            shipmentId: "",
          }}
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
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Typography variant="h2">Add Order</Typography>

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
                  helperText={
                    touched.recipient?.phone && errors.recipient?.phone
                  }
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
                  error={
                    touched.recipient?.address && !!errors.recipient?.address
                  }
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
                  name="shipmentId"
                  label="Shipment"
                  select
                  size="small"
                  fullWidth
                  value={values.shipmentId}
                  onChange={handleChange}
                  error={touched.shipmentId && !!errors.shipmentId}
                  helperText={touched.shipmentId && errors.shipmentId}
                >
                  {shipmentData?.map((shipment) => (
                    <MenuItem key={shipment.id} value={shipment.name}>
                      {shipment.name}
                    </MenuItem>
                  ))}
                </TextField>

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
                  onChange={(e) => {
                    const price = (Number(e.target.value) * RATE).toFixed(2);
                    setFieldValue("weight", e.target.value);
                    setFieldValue("price", price);
                  }}
                  error={touched.weight && !!errors.weight}
                  helperText={touched.weight && errors.weight}
                />

                <TextField
                  name="price"
                  label="Price (₦)"
                  size="small"
                  type="number"
                  fullWidth
                  value={values.price || ""}
                  onChange={handleChange}
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </Box>

              {error && (
                <Typography className="text-center text-red-600 font-semibold mb-3">
                  {error.message}
                </Typography>
              )}

              {isSuccess && (
                <Typography className="text-center text-green-600 font-semibold mb-3">
                  Order added successfully!
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

export default AddOrder;
