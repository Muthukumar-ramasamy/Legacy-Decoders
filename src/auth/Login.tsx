import { Alert, Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormInput from "../form/FormInput";
import { loginUser } from "./authService.service";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit, setValue } = useForm({ mode: "onSubmit" });

  const handleLogin = (data) => {
    loginUser(data)
      .then((response) => {
        if (response.status === 200) {
          const decodedToken = jwtDecode(response?.data?.token);
          localStorage.setItem("token", response?.data.token);
          navigate("/story-to-syntex");
        }
      })
      .catch((error) => {
        setSearchParams("");
        setErrorMessage(error?.message);
      });
  };

  useEffect(() => {
    if (searchParams && searchParams.get("username")) {
      setUsername(searchParams.get("username"));
      setValue("username", searchParams.get("username"));
    } else {
      setUsername("");
    }
  }, [searchParams]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        mt: 2,
      }}
    >
      <Typography variant={"h4"}>{"Login"}</Typography>
      {username && (
        <Alert
          sx={{
            ">.MuiAlert-icon": {
              alignItems: "center",
            },
            ">.MuiAlert-message": {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            },
          }}
          severity="success"
        >
          <Typography variant={"body1"}>
            {"User registered successfully"}
          </Typography>
          <Typography sx={{ fontWeight: 600 }} variant={"body2"}>
            {`Username: ${username}`}
          </Typography>
        </Alert>
      )}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        component={"form"}
        onSubmit={handleSubmit(handleLogin)}
      >
        <FormInput
          name={"username"}
          label={"Username"}
          control={control}
          required={true}
          type={"text"}
        />
        <FormInput
          name={"password"}
          label={"Password"}
          control={control}
          required={true}
          type={"password"}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mt: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ borderRadius: "10px", flexBasis: "40%" }}
            onClick={() => navigate(-1)}
            variant={"contained"}
          >
            {"Back"}
          </Button>
          <Button
            sx={{ borderRadius: "10px", flexBasis: "40%" }}
            type={"submit"}
            variant={"contained"}
          >
            {"Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
