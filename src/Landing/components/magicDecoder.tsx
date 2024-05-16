import { FC, ChangeEvent, FormEvent, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Drawer,
  FormControl,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Filebox } from "./Filebox";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Loader from "./Loader";
import GeneratedStory from "./GeneratedStory";
import { generateStory } from "../service/generateStory";
import FileProcessingCard from "./fileProgress";

export const MagicDecoder: FC = () => {
  const [description, setDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isStory, setIsStory] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [generateStoryResponse, setGenerateStoryResponse] = useState<any>();
  const [legacyTech, setLegacyTech] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile && selectedFile.type === "application/x-zip-compressed") {;
      const legacy_code = new FormData();
      legacy_code.append('legacy_code', selectedFile)
      const payload = {
        userName: "Dbabu",
        legacyTech: legacyTech ? legacyTech : null,
        legacy_code: legacy_code
      }
      setLoading(true);
      const res = await generateStory(payload) as any;
      if (res) {
        setLoading(false);
        setGenerateStoryResponse(res?.data);
        setIsStory(true);
      }
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 4,
          justifyContent: "center",
        }}
      >
        <Card sx={{ minWidth: 432, borderRadius: "10px" }}>
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
                />
              ) : (
                <Filebox
                  onChange={(file: File | null) => {
                    setSelectedFile(file);
                  }}
                  isFormSubmitted={false}
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
                <Typography
                  component={"div"}
                  display={"flex"}
                  justifySelf={"center"}
                  sx={{ mb: 2 }}
                >
                  {"Import from Github"}
                </Typography>
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
              <Button type="submit" variant="contained" fullWidth>
                Generate User Story
              </Button>
            </form> 
          </CardContent>
        </Card>
        <div></div>

      </Box>
      {isStory && !loading && (
        <>
          <GeneratedStory
            generateStoryResponse={generateStoryResponse}
            onClose={()=>{
              setIsStory(false);
              setDescription("");
              setLegacyTech("");
              setSelectedFile(null);
            }}
          />
        </>
      )}
    </>
  );
};
