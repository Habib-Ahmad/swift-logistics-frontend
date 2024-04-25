"use client";
import { deleteShipment, getAllStations, updateShipment } from "@/api";
import { IShipment, IStation } from "@/interfaces";
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

interface IProps {
  data: IShipment;
  handleCloseModal: () => void;
}

const EditShipment: React.FC<IProps> = ({ data, handleCloseModal }) => {
  const queryClient = useQueryClient();

  const { data: stationsData, isPending: isStationsPending } = useQuery({
    queryKey: ["stations"],
    queryFn: getAllStations,
  });

  const updateShipmentMutation = useMutation({
    mutationKey: ["shipments", data.id],
    mutationFn: updateShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"], exact: true });
    },
  });

  const deleteShipmentMutation = useMutation({
    mutationKey: ["shipments", data.id],
    mutationFn: deleteShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipments"], exact: true });
    },
  });

  const submit = async (values: IShipment) => {
    updateShipmentMutation.mutate(values);
  };

  const removeStationSuffix = (name: string) => {
    return name.replace(/ Station/i, "");
  };

  const getStationName = (id: string) => {
    const name =
      stationsData.find((station: IStation) => station.id === id)?.name || "";

    return removeStationSuffix(name);
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
        deleteShipmentMutation.mutate(data.id);

        Swal.fire({
          title: "Deleted!",
          text: "Shipment deleted.",
          icon: "success",
        }).then(() => {
          handleCloseModal();
        });
      }
    });
  };

  if (isStationsPending) {
    return <CircularProgress className="block m-auto mt-10" />;
  }

  return (
    <Formik
      initialValues={{
        ...data,
        startPoint:
          typeof data.startPoint === "object"
            ? data.startPoint.id
            : data.startPoint,
        destination:
          typeof data.destination === "object"
            ? data.destination.id
            : data.destination,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        startPoint: Yup.string().required("Start Point is required"),
        destination: Yup.string().required("Destination is required"),
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
              name="startPoint"
              label="Start Point"
              select
              size="small"
              fullWidth
              value={values.startPoint}
              onChange={(e) => {
                setFieldValue("startPoint", e.target.value);

                const startName = getStationName(e.target.value);
                const destName = getStationName(values.destination as string);
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

                const startName = getStationName(values.startPoint as string);
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
              value={values.schedule?.interval}
              onChange={handleChange}
              error={touched.schedule?.interval && !!errors.schedule?.interval}
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
                value={values.schedule.timesPerDay}
                onChange={handleChange}
                error={
                  touched.schedule?.timesPerDay &&
                  !!errors.schedule?.timesPerDay
                }
                helperText={
                  touched.schedule?.timesPerDay && errors.schedule?.timesPerDay
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
                  touched.schedule?.dayOfWeek && !!errors.schedule?.dayOfWeek
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

export default EditShipment;
