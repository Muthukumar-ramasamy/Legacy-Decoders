import { FC, FormEvent, useState } from "react";
import { Box } from "@mui/system";
import { Button, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import { Filebox } from "./Filebox";
import storyToCode from "../service/codeGenerator";
import Markdown from 'react-markdown'



export const StoryToSnippet: FC = () => {
    const [description, setDescription] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        console.log('Zip file uploaded:', selectedFile.name, description);
        e.preventDefault();
        if (selectedFile && selectedFile.type === 'application/x-zip-compressed') {
            console.log('Zip file uploaded:', selectedFile.name);
            console.log('Description:', description);
            storyToCode.generateZip({ selectedFile, description })
        } else {
            console.log('Please upload a zip file.');
        }
    }

    const markd ="### 1. Project Structure    "

    return (
        <Box sx={{ display: "flex", alignItems: "center", px: 4, justifyContent: "center", flexDirection: 'column' }}>
            <Card sx={{ minWidth: 432, borderRadius: "10px" }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="userstory"
                            label="Enter/Paste User Story Here"
                            placeholder="Enter/Paste User Story Here"
                            multiline
                            minRows={10}
                            sx={{ minWidth: "370px", minHeight: "270px" }}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Box sx={{ position: 'relative', mt: 4 }}>
                            <Divider />
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    bgcolor: 'white',
                                    px: 1,
                                    fontSize: "13px",
                                    fontWeight: "600"
                                }}
                            >
                                OR
                            </Typography>
                        </Box>
                        <Box component={"div"} my={3} sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography
                                component={"div"}
                                display={"flex"}
                                justifySelf={"center"}
                                sx={{ mb: 2 }}>
                                {"Upload User Story"}
                            </Typography>
                            <Filebox
                                isStoryToSyntex={true}
                                onChange={(file: File | null) => {
                                    console.log(file, "...selected file")
                                    setSelectedFile(file)
                                }} />
                        </Box>
                        <Button type="submit" variant="contained" fullWidth>Generate Code</Button>
                    </form >
                </CardContent>
            </Card>
            <Markdown>{markd}</Markdown>
        </Box >
    )
}
