import { FC, ChangeEvent, FormEvent, useState } from "react";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Drawer,
  FormControl,
  OutlinedInput,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Filebox } from "./Filebox";
import AddLinkIcon from "@mui/icons-material/AddLink";
import GeneratedStory from "./GeneratedStory";
import { generateStory } from "../service/generateStory";
import FileProcessingCard from "./fileProgress";

export const MagicDecoder: FC = () => {
  const [description, setDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isStory, setIsStory] = useState<boolean>(false);
  const [legacyTech, setLegacyTech] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [generateStoryResponse, setGenerateStoryResponse] = useState<any>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const legacy_code = new FormData();
    legacy_code.append("legacy_code", selectedFile);
    const payload = {
      userName: "dbabu",
      legacyTech: legacyTech ? legacyTech : null,
      legacy_code: legacy_code,
    };
    setIsStory(true);
    setLoading(true);
    const res = (await generateStory(payload)) as any;
    if (res?.data?.status !== 500) {  
      setLoading(false);
      setGenerateStoryResponse(res?.data);
    } else {
      setIsOpen(true);
      setIsStory(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            minWidth: "32rem",
            minHeight: "34rem",
            borderRadius: "10px",
            mt: "5rem",
          }}
        >
          <CardContent>
            <form onSubmit={handleSubmit}>
              {selectedFile ? (
                <FileProcessingCard
                  fileName={selectedFile.name}
                  fileSize={selectedFile.size}
                  progressstatus={"complete"}
                  onRemove={() => {
                    setSelectedFile(null);
                  }}
                  fileType="zip"
                />
              ) : (
                <Filebox
                  onChange={(file: File | null) => {
                    setSelectedFile(file);
                  }}
                  isFormSubmitted={false}
                  accept={"application/zip"}
                />
              )}

              <Box sx={{ position: "relative", mt: 4 }}>
                <Divider />
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    px: 1,
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  OR
                </Typography>
              </Box>
              <Box
                component={"div"}
                my={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Stack
                  direction="row"
                  justifyContent=""
                  spacing={1}
                  sx={{
                    mb: 1,
                  }}
                >
                  <Typography
                    component={"div"}
                    display={"flex"}
                    justifySelf={"center"}
                    sx={{ mb: 2 }}
                  >
                    {"Import from Github"}
                  </Typography>
                  <Typography
                    component={"div"}
                    display={"flex"}
                    justifySelf={"center"}
                    sx={{ mb: 2 }}
                  >
                    {"(Comming soon)"}
                  </Typography>
                </Stack>
                <TextField
                  inputProps={{
                    startadornment: (
                      <InputAdornment position="start">
                        <AddLinkIcon />
                      </InputAdornment>
                    ),
                    style: { height: "7px" },
                  }}
                  id="standard-basic"
                  placeholder="Paste Github URL"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box
                component={"div"}
                my={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Stack
                  direction="row"
                  justifyContent=""
                  spacing={1}
                  sx={{
                    mb: 1,
                  }}
                >
                  <Typography
                    component={"div"}
                    display={"flex"}
                    justifySelf={"center"}
                    sx={{ mb: 2 }}
                  >
                    {"Legacy Tech"}
                  </Typography>
                  <Typography
                    component={"div"}
                    display={"flex"}
                    justifySelf={"center"}
                    sx={{ mb: 2 }}
                  >
                    {"(Optional)"}
                  </Typography>
                </Stack>
                <TextField
                  inputProps={{
                    startadornment: (
                      <InputAdornment position="start">
                        <AddLinkIcon />
                      </InputAdornment>
                    ),
                    style: { height: "7px" },
                  }}
                  id="legacyTech"
                  placeholder="Enter tech stack"
                  variant="outlined"
                  value={legacyTech}
                  onChange={(e) => setLegacyTech(e.target.value)}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "fit-content",
                }}
              >
                Generate User Story
              </Button>
            </form>
          </CardContent>
        </Card>
        <div></div>
      </Box>
      {isStory && (
        <>
          <GeneratedStory
            generateStoryResponse={generateStoryResponse}
            loading={loading}
            onClose={() => {
              setIsStory(false);
              setDescription("");
              setLegacyTech("");
              setSelectedFile(null);
            }}
          />
        </>
      )}
      <Snackbar
        open={isOpen}
        onClose={()=>{
          setIsOpen(false);
        }}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Please retry..
        </Alert>
      </Snackbar>
    </>
  );
};
