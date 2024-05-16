import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthHome = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography
        sx={{
          mb: 4,
        }}
        variant={"h5"}
        fontWeight={600}
      >
        {"Welcome to Legacy Transformers"}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 3,
          }}
        >
          <Typography variant={"h6"} fontWeight={500}>
            {"Register"}
          </Typography>
          <Typography sx={{ mt: "2px" }} variant={"body2"}>
            {"Don't have an account? Register One!"}
          </Typography>
        </Box>
        <Button
          onClick={() => {
            navigate("register");
          }}
          sx={{
            borderRadius: "10px",
            letterSpacing: "5px",
            width: "300px",
          }}
          variant={"contained"}
        >
          {"REGISTER"}
        </Button>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 3,
          }}
        >
          <Typography variant={"subtitle1"}>{"OR"}</Typography>
          <Typography variant={"body2"}>{"Having an account?"}</Typography>
        </Box>
        <Button
          onClick={() => {
            navigate("login");
          }}
          sx={{
            borderRadius: "10px",
            letterSpacing: "5px",
            px: 4,
            width: "300px",
          }}
          variant={"contained"}
        >
          {"LOGIN"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthHome;
