import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, FC, useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export const Filebox: FC<{
  onChange: (file: File) => void;
  isFormSubmitted: boolean;
  isStoryToSyntex?: Boolean;
  accept: string;
}> = ({ onChange, isStoryToSyntex, accept }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [invalidFile, setInvalidFile] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const isRequired = true;
  const allowedfileSize = 100 * 1024;
  const allowedFileExtensions = ["x-zip-compressed"];

  const borderColor = (theme) => {
    if (isError && !dragActive) {
      return {
        background: "rgba(211, 47, 47, 0.04)",
        border: `1px solid ${theme.palette.error.main}`,
      };
    } else if (dragActive) {
      return {
        background: "rgba(33, 150, 243, 0.08)",
        border: `1px dashed ${theme.palette.primary.main}`,
      };
    } else {
      return {
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: `1px dashed ${theme.palette.divider}`,
      };
    }
  };

  const handleFile = (files: FileList) => {
    let error = false;
    setInvalidFile(error);
    setIsError(error);
    if (isRequired && files.length === 0) {
      error = true;
    }
    setIsError(error);
    //file Type and size validation
    if (!error && files.length) {
      for (let limit = 0; limit < files.length; limit++) {
        const file = files[limit];
        let fileExtension = file.type.split("/")[1];
        if (!fileExtension) {
          const splitName = file.name.split(".");
          fileExtension = splitName[splitName.length - 1];
        }
        if (!allowedFileExtensions.includes(fileExtension.toLowerCase())) {
          error = true;
          setInvalidFile(true);
          break;
        }
      }
      setIsError(error);
      if (!error) {
        setSelectedFile(files);
      }
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleChange = function (e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files);
      onChange(files[0]);
    }
  };
  const onButtonClick = (e) => {
    if (inputRef && inputRef.current) {
      e.preventDefault();
      inputRef.current.click();
    }
  };

  return (
    <Box
      onDragEnter={handleDrag}
      data-testid={`box`}
      sx={[
        {
          "&:hover": {
            background: isError
              ? "rgba(211, 47, 47, 0.04)"
              : "rgba(33, 150, 243, 0.08)",
            border: (theme) =>
              isError
                ? `1px solid ${theme.palette.error.main}`
                : `1px dashed ${theme.palette.primary.main}`,
          },
        },
        {
          mt: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          flexGrow: 0,
          position: "relative",
          borderRadius: "4px",
          padding: "24px 16px",
          height: isStoryToSyntex ? 150 : 170,
        },
        (theme) => ({ ...borderColor(theme) }),
      ]}
    >
      <input
        id={"upload-zip"}
        hidden
        multiple={false}
        ref={inputRef}
        accept={accept}
        type="file"
        onChange={handleChange}
      />

      <Box
        component={"div"}
        sx={[
          {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            p: 1,
          },
        ]}
      >
        <CloudUploadOutlinedIcon
          fontSize={"small"}
          color={isError ? "error" : "primary"}
          sx={{ width: "24px", height: "24px", mt: 4 }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component={"div"}>
            <Typography>{"Choose a file or drag & drop it here."}</Typography>
            {!isStoryToSyntex && (
              <Typography>{`Upload zip file up to 10 MB.`}</Typography>
            )}
            {isStoryToSyntex && (
              <Typography>{`Upload txt file up to 5 MB.`}</Typography>
            )}
            <Button
              onClick={(e) => onButtonClick(e)}
              variant={"outlined"}
              sx={{
                my: 2,
                textDecorationColor: "rgb(33, 94, 205, .4)",
                textTransform: "none",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Browse File
            </Button>
          </Box>
          <Box sx={{ width: "100%", textAlign: "center", height: "20px" }}>
            {isError && invalidFile && !isStoryToSyntex && (
              <Typography variant={"body2"} color={"error.main"}>
                {"Please upload a valid zip file"}
              </Typography>
            )}
            {isError && invalidFile && isStoryToSyntex && (
              <Typography variant={"body2"} color={"error.main"}>
                {"Please upload a valid txt file"}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {dragActive && (
        <Box
          component={"div"}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </Box>
  );
};
