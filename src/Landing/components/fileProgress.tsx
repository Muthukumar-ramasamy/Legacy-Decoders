import { FC, useMemo } from "react";
import { Error, Image, FolderZip } from "@mui/icons-material";
import zip from "../../assets/zip_file.svg";
import txt from "../../assets/txt.svg";
import deleteIcon from "../../assets/delete.svg";

import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

export interface FileProcessingProps {
  fileName: string;
  fileSize: number;
  progressValue?: number;
  progressstatus: "loading" | "complete" | "failed";
  onRemove: (data?: any) => void;
  filleErrorMessage?: string | null;
  fileType: string;
}

const FileProcessingCard: FC<FileProcessingProps> = ({
  fileName,
  fileSize,
  progressstatus,
  onRemove,
  filleErrorMessage,
  fileType,
}) => {
  const fileStatus = {
    complete: "Complete",
    failed: "Failed",
    loading: "Loading",
  };

  const formatBytes = (bytes: number, decimals = 0) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  const statusBasedIcon = useMemo(() => {
    if (progressstatus === "complete") {
      if (fileType === "zip") {
        return <img src={zip} alt="" />;
      } else {
        return <img src={txt} alt="" />;
      }
    }
    if (progressstatus === "failed") {
      return (
        <Error
          fontSize={"large"}
          sx={{
            display: "flex",
            alignSelf: "center",
            color: (theme) => theme.palette.error.main,
          }}
        />
      );
    }
    return (
      <Image
        fontSize={"large"}
        sx={{
          display: "flxe",
          alignSelf: "center",
          color: (theme) => theme.palette.text.disabled,
        }}
      />
    );
  }, [progressstatus]);

  return (
    <Box
      sx={{
        height: "11rem",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        border: "dashed 1px #7e7d7d75",
        borderRadius: "4px ",
      }}
    >
      <Card elevation={1}>
        <CardContent sx={{ paddingBottom: "16px !important" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={2}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              {statusBasedIcon}
            </Grid>
            <Grid item xs={8}>
              <Box
                component={"div"}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "column",
                  alignItems: "start",
                  mb: "4px",
                }}
              >
                <Typography
                  color={
                    progressstatus === "failed" ? "error.main" : "text.primary"
                  }
                  variant={"subtitle1"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    display: "inline-block",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  {fileName}
                </Typography>
                <Typography
                  variant={"body2"}
                  sx={{ mt: 0 }}
                  color={
                    progressstatus === "failed"
                      ? "error.main"
                      : "text.secondary"
                  }
                >
                  {progressstatus === "failed"
                    ? filleErrorMessage
                    : formatBytes(fileSize)}
                  {bull}
                  {fileStatus[progressstatus]}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <IconButton
                aria-label={"close"}
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
                onClick={() => onRemove()}
              >
                <img src={deleteIcon} alt=""></img>
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FileProcessingCard;
