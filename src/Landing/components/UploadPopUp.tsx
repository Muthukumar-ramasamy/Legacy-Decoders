import { useEffect, useState } from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { UploadFileLoader } from "./UploadFileLoader";
import downloadIcon from "../../assets/download_white.svg";
import zipped from "../../assets/zip_file.svg";

export const UploadPopUp = (props: any) => {
  const { serverEvents, projectZip } = props;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingData.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadingData = [
    { name: "Your experience is just a moment away" },
    { name: "Sit tight while we prepare everything for you" },
    { name: "We're getting things ready for you. Sit tight!" },
    { name: "Just a quick sec... Your experience is worth the wait!" },
    { name: "Making sure everything's perfect for you!" },
    { name: "Hang tight, we're almost there" },
    { name: "Putting the finishing touches on your experience" },
    { name: "Preparing something special just for you" },
    { name: "Almost done, thank you for your patience" },
    { name: "Getting everything ready for you, just a moment" },
    { name: "We're working hard to bring you the best experience" },
    { name: "Your patience is appreciated, we're nearly there" },
    { name: "Finalizing details for your amazing experience" },
    { name: "Please hold on while we load your experience" },
    { name: "We're nearly finished setting things up for you" },
  ];

  const getFileName = (file: string) => {
    const filePath = file;

    const parts = filePath.split("/");

    return parts[parts.length - 1];
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Stack>
            {projectZip === undefined ? (
              <Stack>
                <Typography
                  key={currentIndex}
                  fontSize={20}
                  sx={{ color: "#3d5afe", marginBottom: "20px" }}
                >
                  {loadingData[currentIndex].name}
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "44rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "55%",
              overflowY: "auto",
              padding: "0.5rem",
              alignItems: "center",
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
              maxHeight: "90%",
              height: "100%",
            }}
          >
            {Object.entries(serverEvents)?.map(([filename, status], index) => (
              <Stack
                key={filename}
                sx={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px solid rgb(15, 118, 235, 0.5)",
                  justifyContent: "space-between",
                  width: "75%",
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
          </Box>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              width: "45%",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {projectZip !== undefined && (
              <Typography fontSize={20}>
                {"Your Generated Code is here"}
              </Typography>
            )}
            <UploadFileLoader
              height={`${projectZip !== undefined ? "50px" : "100px"}`}
              type={`${projectZip !== undefined ? "success" : "loader"}`}
              width={`${projectZip !== undefined ? "50px" : "100px"}`}
            />
            {projectZip !== undefined && (
              <>
                <Box
                  sx={{
                    display: "inline-block",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                    border: "1px solid rgb(15, 118, 235, 0.5)",
                    boxShadow: "0px 0px 5px rgba(15, 118, 235, 0.5)",
                    padding: "20px !important",
                    borderRadius: "10px",
                  }}
                >
                  <img src={zipped} alt="zip" />
                  <Typography fontSize={16} sx={{}}>
                    {getFileName(projectZip?.data?.s3_url)}
                  </Typography>
                </Box>
                <Link
                  href={projectZip?.data?.s3_url}
                  sx={{
                    textDecoration: "none",
                    textUnderlineOffset: "none",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "fit",
                      height: "fit",
                      padding: "5px",
                      paddingX: "10px",
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography fontSize={12} textTransform={"capitalize"}>
                      {"Download"}
                    </Typography>
                    <img
                      src={downloadIcon}
                      alt="download"
                      style={{
                        cursor: "pointer",
                        color: "inherit",
                        textUnderlineOffset: "none",
                        height: "20px",
                        marginTop: "2px",
                      }}
                    />
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
