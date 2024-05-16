import React, { FC, FormEvent, useState } from "react";
import { Box } from "@mui/system";
import { Button, Card, CardContent, Divider, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Filebox } from "./Filebox";
import storyToCode from "../service/codeGenerator";
import FileProcessingCard from "./fileProgress";
import { useNavigate } from "react-router-dom";
import ProjectStructure from "./projectStructure";
import { UploadPopUp } from "./UploadPopUp";

export const StoryToSnippet: FC = () => {
    const navigate = useNavigate()
    const [techStack, setTechStack] = useState<string>("");
    const [selectedBrdFile, setSelectedBrdFile] = useState<File | null>(null);
    const [selectedBrdVal, setSelectedBrdVal] = useState("0")
    const [brdTxt, setBrdTxt] = useState("")
    const [userStory, setUserStory] = useState("")
    const [projectId, setProjectId] = useState(null)
    const [structure, setStructure] = useState({ content: '', s3_url: '', project_id: null })
    const [showStructure, setShowStructure] = useState(false)
    const [fileUpload, setFileUpload] = useState(false);

    const generateBrdContent = async () => {
        const payload = {
            story: userStory,
            tech: techStack,
            user_name: "admin",
        }
        const res = await storyToCode.generateBrd(payload)
        console.log(res, "...ress")
        if (res.content) {
            setBrdTxt(res.content)
            setProjectId(res.project_id)
        }
    }

    const generateStructure = async (e: FormEvent) => {
        e.preventDefault()
        if (projectId) {
            const res = await storyToCode.getStructureByProjectId(projectId)
            if (res) {
                setShowStructure(true)
                setStructure({ content: res.content || null, s3_url: res?.s3_url, project_id: res.project_id })
            }
        }
        else if (selectedBrdFile && selectedBrdFile.type === 'application/x-zip-compressed') {
            const brd_file = new FormData();
            brd_file.append('brd_file', selectedBrdFile)
            const payload = {
                story: userStory,
                tech: techStack,
                user_name: "admin",
                brdFile: brd_file
            }
            const res = await storyToCode.generateProjectStructure(payload)
            console.log(res, "...ress")
            if (res) {
                setShowStructure(true)
                setStructure({ content: res.content || null, s3_url: res?.s3_url, project_id: res.project_id })
            }
        } else {
            console.log('Please upload a zip file.');
        }
    }

    console.log(selectedBrdFile, "iiii")

  return (
    <>
      {fileUpload ? (
        <UploadPopUp setBack={() => setFileUpload(false)} />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 4,
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Card sx={{ minWidth: 520, borderRadius: "10px" }}>
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
                    label="Enter/Paste User Story Here"
                    placeholder="Enter/Paste User Story Here"
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
                    label="Enter Tech Stack Here"
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
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="I have Business Requirements Document (BRD) file"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="I don't have Business Requirements Document (BRD) file"
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
                      />
                    ) : (
                      <>
                        <Typography
                          component={"div"}
                          display={"flex"}
                          justifySelf={"center"}
                        >
                          {"Upload BRD file as '.txt' file"}
                        </Typography>
                        <Filebox
                          isStoryToSyntex={true}
                          onChange={(file: File | null) => {
                            console.log(file, "...selected file");
                            setSelectedBrdFile(file);
                          }}
                          isFormSubmitted={false}
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
                      <Button
                        variant="outlined"
                        sx={{ width: "fit-content", mb: 2 }}
                        onClick={() => generateBrdContent()}
                      >
                        Generate BRD
                      </Button>
                    )}
                  </Box>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!projectId && !selectedBrdFile}
                >
                  Generate Project Structure
                </Button>
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
        />
      }
    </>
  );
};

export default StoryToSnippet;
