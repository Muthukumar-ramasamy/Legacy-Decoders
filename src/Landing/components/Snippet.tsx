import { FC, useState } from "react";
import {
  Button,
  Typography,
  styled,
  Dialog,
  Box,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import { FolderZip, Delete } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import storyToCode from "../service/codeGenerator";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Snippet: FC<{
  structure: { content: any; s3_url: string; project_id: number };
  showStructure: boolean;
  setShowStructure: (val: boolean) => void;
  serverEvent: () => void;
}> = ({ structure, showStructure, setShowStructure, serverEvent }) => {
  const [isZipGenerated, setIsZipGenerated] = useState(false);

  const handleClose = () => {
    setIsZipGenerated(false);
    setShowStructure(false);
  };

  const generateCode = async (projectId: number) => {
    serverEvent();
    const projectZip = await storyToCode.getProjectZip(projectId);
    if (projectZip) {
      setIsZipGenerated(true);
    }
  };

  return (
    <>
        {!isZipGenerated ? (
          <Box
            id="structure"
            sx={{ p: 1, display: "flex", flexDirection: "column" }}
          >
            <pre
              style={{
                fontStyle: "inherit",
                padding: "10px",
                backgroundColor: "rgb(250 251 255)",
                whiteSpace: "break-spaces",
              }}
            >
              <Typography fontWeight="600" color="black" marginBottom={"5px"}>
                Description:
                <br />
              </Typography>
              <Typography
                fontFamily={"sans-serif"}
              >{`${structure?.content?.project_details}`}</Typography>
              <Stack>
                <Typography
                  paddingTop={"8px"}
                  textAlign={"left"}
                  fontWeight="600"
                  color="black"
                >
                  Structure:
                </Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ p: "0.5rem", height: "100%", width: "100%" }}
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
                    <Stack sx={{ p: "1rem", maxHeight:"40vh", lineHeight: "25px", overflowY: "auto", overFlow: "auto", paddingY: 3}}>
                      {structure?.content?.project_structure}
                    </Stack>
                  </Paper>
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
                onClick={() => {generateCode(structure.project_id);}}
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
              flexDirection: "row",
              justifyContent: "flex-end",
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
    </>
  );
};

export default Snippet;
