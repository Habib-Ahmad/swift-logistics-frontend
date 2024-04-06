"use client";

import api, { urls } from "@/api";
import { useAuth } from "@/context/authContext";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface ILoginPayload {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: ILoginPayload) => {
      try {
        const response = await api.post(urls.auth.login, { email, password });
        setUser(response.data.user);
        localStorage.setItem("accessToken", response.data.accessToken);
        router.push("/");
        return response.data;
      } catch (error) {
        throw new Error("Login failed");
      }
    },
  });

  const submit = async (values: ILoginPayload) => {
    mutation.mutateAsync(values);
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

          <Button type="submit" variant="contained" fullWidth>
            {mutation.isPending ? <CircularProgress size={25} /> : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
