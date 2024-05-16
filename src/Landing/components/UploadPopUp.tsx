import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ArrowForward } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const UploadPopUp = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingData.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fileJson = {
    files: [
      "/AuthApp/src/main/java/com/authapp/controllers/UserController.java",
      "/AuthApp/src/main/java/com/authapp/models/User.java",
      "/AuthApp/src/main/java/com/authapp/repositories/UserRepository.java",
      "/AuthApp/src/main/java/com/authapp/security/SecurityConfig.java",
      "/AuthApp/src/main/java/com/authapp/services/UserService.java",
      "/AuthApp/src/main/java/com/authapp/Application.java",
      "/AuthApp/src/main/resources/application.properties",
      "/AuthApp/test/java/com/authapp/UserControllerTest.java",
      "/AuthApp/Dockerfile",
      "/AuthApp/pom.xml",
      "/AuthApp/README.md",
    ],
  };

  const loadingData = [
    { name: "Your experience is just a moment away......", color: "#ff1744" },
    {
      name: "Sit tight while we prepare everything for you......",
      color: "#ff9100",
    },
    {
      name: "We're getting things ready for you. Sit tight!......",
      color: "#3d5afe",
    },
    {
      name: "Just a quick sec... Your experience is worth the wait!",
      color: "#00e676",
    },
    { name: "Making sure everything's perfect for you!", color: "#00e5ff" },
  ];

  const handleProceed = () => {
    setIsLoading(!isLoading);
  };

  const handleCancel = () => {
    setIsLoading(!isLoading);
    setCancel(!cancel);
  };

  const getFileName = (file: string) => {
    const filePath = file;

    const parts = filePath.split("/");

    const fileName = parts[parts.length - 1];

    return fileName.split(".")[0];
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "0.5px solid black",
          padding: "10px",
          width: "95%",
          height: "29rem",
          marginBottom: "10px",
          marginTop: "10px",
          marginLeft: "2.5%",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            height: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Stack sx={{ position: "absolute", top: "10px", left: "10px" }}>
            <Typography
              variant="body1"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                props?.setBack();
              }}
            >
              <ArrowBackIcon fontSize="inherit" />
              <Typography fontSize={14} sx={{ marginLeft: "2px" }}>
                Go Back
              </Typography>
            </Typography>
          </Stack>
          <Stack sx={{ height: "40%" }}>
            {isLoading ? (
              <Stack>
                <Typography
                  key={currentIndex}
                  fontSize={20}
                  sx={{ color: loadingData[currentIndex].color }}
                >
                  {loadingData[currentIndex].name}
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        <Stack
          sx={{
            overflowY: "auto",
            height: "calc(100% - 200px)",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "darkgrey",
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "grey",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Stack
            sx={{
              marginBottom: "2px",
              flexGrow: 1,
              padding: "0.5em",
            }}
          >
            {fileJson?.files?.map((file, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                sx={{
                  marginBottom: "10px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    border: "0.5px solid black",
                    padding: "10px",
                    width: "85%",
                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    fontSize={12}
                    align="left"
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                  >
                    {getFileName(file)}
                  </Typography>
                </Box>
                <Stack sx={{ marginLeft: "10%" }}>
                  {isSuccess && <CheckCircleIcon sx={{ color: "green" }} />}
                  {isLoading && <CircularProgress key={index} />}
                  {cancel && <CancelIcon sx={{ color: "red" }} />}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            marginTop: "25px",
          }}
        >
          {cancel && (
            <Button variant="text" sx={{ border: "0.5px solid blue" }}>
              Cancled
            </Button>
          )}
          {isLoading && (
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          {isSuccess && (
            <Button variant="contained" onClick={handleProceed}>
              Proceed to Convert
              <ArrowForward fontSize="inherit" />
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
};
