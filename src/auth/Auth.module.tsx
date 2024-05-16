import { Box, Card, CardContent, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import AuthHome from "./AuthHome";
import logo from "../assets/logo.svg";
import Login from "./Login";

const AuthModule = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            component={"img"}
            src={logo}
            sx={{
              minWidth: 40,
              minHeight: 40,
              maxWidth: 65,
              maxHeight: 65,
              mr: 2,
              mb: 1,
            }}
          ></Box>
          <Typography variant={"h3"} sx={{ fontWeight: 600 }}>
            Legacy Transformers
          </Typography>
        </Box>
        <Card
          elevation={2}
          sx={{ width: "550px", borderRadius: "20px", px: 3 }}
        >
          <CardContent>
            <Routes>
              <Route path="/" element={<AuthHome />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AuthModule;
