import React, { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useEventCallback,
} from "@mui/material";
import { Filebox } from "./Filebox";
import storyToCode from "../service/codeGenerator";
import FileProcessingCard from "./fileProgress";
import { useNavigate } from "react-router-dom";
import ProjectStructure from "./projectStructure";
import { UploadPopUp } from "./UploadPopUp";

export const StoryToSnippet: FC = () => {
  const navigate = useNavigate();
  const [techStack, setTechStack] = useState<string>("");
  const [selectedBrdFile, setSelectedBrdFile] = useState<File | null>(null);
  const [selectedBrdVal, setSelectedBrdVal] = useState("");
  const [brdTxt, setBrdTxt] = useState("") as any;
  const [userStory, setUserStory] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [structure, setStructure] = useState({
    content: "",
    s3_url: "",
    project_id: null,
  });
  const [showStructure, setShowStructure] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [fileStatus, setFileStatus] = useState<any>();
  const [status, setStatus] = useState<{ [key: string]: boolean[] }>();

  useEffect(() => {
    if (messages.length !== 0 && messages) {
      setFileUpload(true);
      setShowStructure(false);
    }
  }, [messages]);

  const serverEvent = () => {
    const eventSource = new EventSource(
      "http://192.168.22.207:8080/api/legacy/sse"
    );
    eventSource.addEventListener("files", (event: any) => {
      const newMessage = JSON.parse(event.data);
      setMessages(newMessage);
    });

    eventSource.onerror = (error) => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  };

  const generateBrdContent = async () => {
    const payload = {
      story: userStory,
      tech: techStack,
      user_name: "dbabu",
    };
    const res = await storyToCode.generateBrd(payload);
    if (res) {
      setBrdTxt(res);
      setProjectId(res);
    }
  };

  const generateStructure = async (e: FormEvent) => {
    e.preventDefault();
    if (projectId) {
      const res = (await storyToCode.getStructureByProjectId(projectId)) as any;
      if (res) {
        setShowStructure(true);
        setStructure({
          content: res.content,
          s3_url: res?.s3_url,
          project_id: res.project_id,
        });
      }
    } else if (selectedBrdFile && selectedBrdFile.type === "text/plain") {
      const brd_file = new FormData();
      brd_file.append("brd_file", selectedBrdFile);
      const payload = {
        story: userStory,
        tech: techStack,
        user_name: "dbabu",
        brdFile: brd_file,
      };
      const res = (await storyToCode.generateProjectStructure(payload)) as any;
      setShowStructure(true);
      if (res) {
        setShowStructure(true);
        setStructure({
          content: res?.data?.content,
          s3_url: res?.data?.s3_url,
          project_id: res?.data?.project_id,
        });
      }
    } else {
    }
  };

  return (
    <>
      {fileUpload ? (
        <UploadPopUp
          serverEvents={messages}
          setBack={() => setFileUpload(false)}
          // fileStatus={fileStatus}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
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
              <form onSubmit={(e) => generateStructure(e)}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}
                  >
                    {"User Story"}
                  </Typography>
                  <TextField
                    id="userstory"
                    placeholder="Enter User Story Here"
                    multiline
                    required
                    minRows={3}
                    value={userStory}
                    sx={{ minWidth: "370px", minHeight: "100px" }}
                    onChange={(e) => setUserStory(e.target.value)}
                  />
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      p: 1,
                      pt: 2,
                    }}
                  >
                    {"Tech stack"}
                  </Typography>
                  <TextField
                    id="TechStack"
                    placeholder="Enter Tech Stack Here"
                    multiline
                    required
                    value={techStack}
                    minRows={1}
                    sx={{ minWidth: "370px", minHeight: "50px" }}
                    onChange={(e) => setTechStack(e.target.value)}
                  />
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"flex-start"}
                  paddingTop={2}
                >
                  <RadioGroup
                    onChange={(e) => setSelectedBrdVal(e.target.value)}
                    aria-labelledby="demo-form-control-label-placement"
                    value={selectedBrdVal}
                    name="position"
                    row
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="BRD Available&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes"
                      style={{ margin: "0px", paddingLeft: 10 }}
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="No"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                </Box>
                {selectedBrdVal && selectedBrdVal === "0" ? (
                  <Box
                    component={"div"}
                    my={3}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {selectedBrdFile && selectedBrdFile.name ? (
                      <FileProcessingCard
                        fileName={selectedBrdFile.name}
                        fileSize={selectedBrdFile.size}
                        progressstatus={"complete"}
                        onRemove={() => {
                          setSelectedBrdFile(null);
                        }}
                        fileType="txt"
                      />
                    ) : (
                      <>
                        <Typography
                          component={"div"}
                          display={"flex"}
                          justifySelf={"center"}
                          paddingLeft={"10px"}
                        >
                          {"Upload BRD file(.txt)"}
                        </Typography>
                        <Filebox
                          isStoryToSyntex={true}
                          onChange={(file: File | null) => {
                            setSelectedBrdFile(file);
                          }}
                          isFormSubmitted={false}
                          accept={"text/plain"}
                        />
                      </>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ py: 2, display: "flex", flexDirection: "column" }}>
                    {brdTxt ? (
                      <TextField
                        id="BRD"
                        label="Business Requirements Document (BRD)"
                        placeholder="Enter BRD Here"
                        multiline
                        value={brdTxt}
                        disabled
                        minRows={5}
                        sx={{ minWidth: "370px", minHeight: "150px" }}
                        onChange={(e) => setBrdTxt(e.target.value)}
                      />
                    ) : (
                      <></>
                    )}
                  </Box>
                )}
                {selectedBrdVal === "1" ? (
                  <Button
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      textTransform: "unset",
                      mt: 5,
                    }}
                    onClick={() => generateBrdContent()}
                  >
                    Generate BRD
                  </Button>
                ) : selectedBrdVal === "0" ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!projectId && !selectedBrdFile}
                    sx={{
                      width: "fit-content",
                      textTransform: "unset",
                    }}
                  >
                    Generate Project Structure
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!projectId && !selectedBrdFile}
                    sx={{
                      width: "fit-content",
                      textTransform: "unset",
                      mt: 5,
                    }}
                  >
                    Generate Project Structure
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
      {
        <ProjectStructure
          structure={structure}
          showStructure={showStructure}
          setShowStructure={setShowStructure}
          serverEvent={serverEvent}
        />
      }
    </>
  );
};

export default StoryToSnippet;
