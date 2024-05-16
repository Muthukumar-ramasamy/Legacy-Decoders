import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { UploadFileLoader } from "./UploadFileLoader";

export const UploadPopUp = (props: any) => {
  const { serverEvents } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [cancel, setCancel] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const fileArray = Array.from(serverEvents.entries());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingData.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadingData = [
    { name: "Your experience is just a moment away..." },
    {
      name: "Sit tight while we prepare everything for you...",
    },
    {
      name: "We're getting things ready for you. Sit tight!...",
    },
    {
      name: "Just a quick sec... Your experience is worth the wait!...",
    },
    { name: "Making sure everything's perfect for you!..." },
  ];

  const getFileName = (file: string) => {
    const filePath = file;
    console.log("filePath", filePath);

    const parts = filePath.split("/");

    return parts[parts.length - 1];

    // return fileName.split(".")[0];
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
          zIndex: "1000",
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
          {/* <Stack sx={{ position: "absolute", top: "10px", left: "10px" }}>
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
          </Stack> */}
          <Stack sx={{ height: "40%" }}>
            {isLoading ? (
              <Stack>
                <Typography
                  key={currentIndex}
                  fontSize={20}
                  sx={{ color: "#3d5afe" }}
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
            height: "calc(100% - 132px)",
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
              padding: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Object.entries(serverEvents)?.map(([filename, status], index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                sx={{
                  marginBottom: "10px",
                  width: "50%",
                  border: "1px solid gray",
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  fontSize={16}
                  align="left"
                  alignItems="center"
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  sx={{
                    padding: "10px",
                    width: "40%",
                  }}
                >
                  {getFileName(filename)}
                </Typography>
                <Stack sx={{ marginRight: "10px" }}>
                  <UploadFileLoader
                    width="30px"
                    height="30px"
                    type={`${status ? "success" : "loader"}`}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
