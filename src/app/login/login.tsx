import { Box, Button, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

import { loginData } from "../types/loginTypes";
import useAdminSignIn from "../customHooks/useAdminSignIn";

export default function Login() {

  const { mutate,isPending } = useAdminSignIn();
  const { register, control, handleSubmit, formState } = useForm<loginData>({
    mode: "onTouched",
  });
  const { errors, isSubmitting } = formState;
  const onSubmit = (loginData: loginData) => {
    mutate(loginData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          " black",
        flexDirection: "column",
      }}
    >
      <Image src={"/images/Logo_En.svg"} width={300} height={100} alt="alcoupon image" />

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          width={400}
          style={{
            padding: "3rem",
            borderRadius: "10px",
            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
            backgroundColor: "white",
            border: "1px solid black",
          }}
        >
          <Typography
            variant="h5"
            component={"h2"}
            sx={{ margin: "1rem", fontWeight: "900", color: "#F7845D" }}
          >
            Admin Login
          </Typography>
          <TextField
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "email is not correct",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            {...register("password", {
              required: "password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
          >
            Sign in
          </Button>
        </Stack>
      </form>
      <Toaster
        toastOptions={{
          position: "bottom-left",
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </Box>
  );
}
