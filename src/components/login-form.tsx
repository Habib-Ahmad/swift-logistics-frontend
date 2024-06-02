"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "@/api";
import { useAuth } from "@/context/authContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ILoginPayload {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login: authenticateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authenticateUser(data);
      router.push("/");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submit = async (values: ILoginPayload) => {
    mutateAsync(values);
  };

  return (
    <Formik
      initialValues={{
        email: "ahmadalkali.dev@gmail.com",
        password: "password123!",
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
            type={showPassword ? "text" : "password"}
            size="small"
            fullWidth
            className="mb-8"
            value={values.password}
            onChange={handleChange}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
