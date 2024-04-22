"use client";

import { login } from "@/api";
import { useAuth } from "@/context/authContext";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface ILoginPayload {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login: authenticateUser } = useAuth();
  const router = useRouter();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authenticateUser(data);
      router.push("/");
    },
  });

  const submit = async (values: ILoginPayload) => {
    mutateAsync(values);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required("This is a required field"),
        password: Yup.string().required("This is a required field"),
      })}
      onSubmit={submit}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="E-mail"
            size="small"
            fullWidth
            className="mb-6"
            value={values.email}
            onChange={handleChange}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            size="small"
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />

          <Button variant="text" className="block ml-auto mb-8">
            Forgot password?
          </Button>

          {error && (
            <Typography className="text-center text-red-600 font-semibold mb-3">
              {error.message}
            </Typography>
          )}

          <Button type="submit" variant="contained" fullWidth>
            {isPending ? (
              <CircularProgress className="text-white" size={25} />
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
