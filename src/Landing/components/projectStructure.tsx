import React, { FC, useState } from "react";
import {
  Modal,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  IconButton,
  Typography,
  styled,
  Dialog,
  Box,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Error, Image, FolderZip, Delete } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import storyToCode from "../service/codeGenerator";
import download from "../../assets/download.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ProjectStructure: FC<{
  structure: { content: any; s3_url: string; project_id: number };
  showStructure: boolean;
  setShowStructure: (val: boolean) => void;
  serverEvent: () => void;
  setProjectZip: any;
}> = ({
  structure,
  showStructure,
  setShowStructure,
  serverEvent,
  setProjectZip,
}) => {
  const [isZipGenerated, setIsZipGenerated] = useState(false);

  const handleClose = () => {
    setIsZipGenerated(false);
    setShowStructure(false);
  };

  const generateCode = async (projectId: number) => {
    serverEvent();
    const projectZip = await storyToCode.getProjectZip(projectId);
    if (projectZip) {
      // setIsZipGenerated(true);
      setProjectZip(projectZip);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = structure.s3_url;
    link.download = "structure.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <BootstrapDialog
      id="proj-structure"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={showStructure}
      sx={{
        "& .MuiDialog-paper": {
          minHeight: "80vh",
          borderRadius: "1rem",
          minWidth: "100vw",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        id="structure-content"
        dividers
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {!isZipGenerated ? (
          <Box
            id="structure"
            sx={{ p: 1, display: "flex", flexDirection: "column" }}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Generated Project Structure
            </DialogTitle>
            <pre
              style={{
                fontStyle: "inherit",
                padding: "10px",
                backgroundColor: "rgb(250 251 255)",
                whiteSpace: "break-spaces",
              }}
            >
              <Typography fontWeight="500" color="black">
                Description:
                <br />
              </Typography>
              <Typography
                fontFamily={"sans-serif"}
              >{`${structure.content.project_details}`}</Typography>
              <Stack>
                <Typography
                  paddingTop={"8px"}
                  textAlign={"left"}
                  fontWeight="500"
                  color="black"
                >
                  Structure:
                </Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ p: "0.5rem", height: "auto", width: 700 }}
                >
                  <br />
                  <Paper
                    elevation={3}
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    <Stack
                      height="1rem"
                      width="100%"
                      sx={{
                        backgroundColor: "#2f2f2f",
                        borderRadius: " 4px 4px 0px 0",
                      }}
                    ></Stack>
                    <Stack sx={{ p: "1rem" }}>
                      {structure.content.project_structure}
                    </Stack>
                  </Paper>
                </Stack>
                <Stack
                  justifyContent={"start"}
                  alignItems={"center"}
                  flexDirection={"row"}
                >
                  {/* <Typography
                    paddingTop={"8px"}
                    textAlign={"center"}
                    fontWeight="500"
                    color="black"
                  >
                    Download:
                  </Typography>
                  <img
                    src={download}
                    style={{ width: "18px", height: "18x" }}
                  /> */}
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    size="small"
                    onClick={(e) => {
                      handleDownload();
                    }}
                    endIcon={
                      <img
                        src={download}
                        style={{ width: "18px", height: "18x" }}
                        alt="download icon"
                      />
                    }
                  >
                    Download file
                  </Button>
                </Stack>
              </Stack>
            </pre>

            <Box
              component={"div"}
              sx={{
                pb: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => generateCode(structure.project_id)}
                sx={{ width: "fit-content", my: 2 }}
              >
                Proceed to generate code
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            id="download-zip"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Your Generated Code is here
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "150px",
                minWidth: "400px",
                border: "1px solid",
                borderRadius: "5px",
                borderColor: "#E2E4E9",
              }}
            >
              <FolderZip
                fontSize={"large"}
                sx={{
                  color: "rgba(0, 0, 0, 0.56)",
                }}
              />
              <Typography variant="body2" fontWeight={600}>
                Code.zip
              </Typography>
            </Box>
            <Button variant="contained" sx={{ width: "fit-content", mt: 2 }}>
              {"Download  "}
              <FileDownloadIcon />
            </Button>
          </Box>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ProjectStructure;
