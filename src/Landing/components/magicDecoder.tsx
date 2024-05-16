import { FC, FormEvent, useState } from "react";
import { Box } from "@mui/system";
import { Button, Card, Drawer, CardContent, Divider, TextField, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Filebox } from "./Filebox";
import AddLinkIcon from '@mui/icons-material/AddLink';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from "@mui/icons-material/Close";
import { GenerateProject } from "./project";


export const MagicDecoder: FC = () => {
    const [description, setDescription] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        console.log('Zip file uploaded:', selectedFile.name);
        e.preventDefault();
        if (selectedFile && selectedFile.type === 'application/x-zip-compressed') {
            console.log('Zip file uploaded:', selectedFile.name);
            console.log('Description:', description);
            // Do something with the zip file and description
        } else {
            console.log('Please upload a zip file.');
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", p: 4, justifyContent: "center" }}>
                <Card sx={{ minWidth: 432, borderRadius: "10px" }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Filebox onChange={(file: File | null) => {
                                console.log(file, "filee");
                                setSelectedFile(file);
                            }} isFormSubmitted={false} />
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
                                    {"Import from Github"}
                                </Typography>
                                <TextField
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start">
                                                <AddLinkIcon />
                                            </InputAdornment>
                                        ),
                                        style: { height: '7px' }
                                    }}
                                    id="standard-basic"
                                    required
                                    placeholder="Paste Github URL"
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Box>
                            <Button type="submit" variant="contained" fullWidth>Generate User Story</Button>
                        </form >
                    </CardContent>
                </Card>
                <div>

                </div>

            </Box >
            <Button
                sx={{
                    borderRadius: "20px",
                    backgroundColor: "white",
                    px: 4,
                    boxShadow: 3,
                    textTransform: "capitalize",
                    "&:hover": {
                        backgroundColor: "#E1E5EC",
                    }
                }}
                onClick={() => setIsOpen(true)}
                endIcon={<KeyboardArrowUpIcon />}>
                {"View Previously Generated Project Codes"}
            </Button>
            <Drawer
                sx={{
                    ">.MuiPaper-root": {
                        height: "85%",
                        p: 4
                    }
                }}
                anchor={"bottom"}
                open={isOpen}
                onClose={() => setIsOpen(false)}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <Typography
                            sx={{
                                fontWeight: "600"
                            }}
                            variant={"h6"}>
                            {"Generated project-stories"}
                        </Typography>
                        <Button
                            sx={{
                                textTransform: "capitalize",
                                color: "gray",
                                "&:hover": {
                                    backgroundColor: "#f1f1f1"
                                }
                            }}
                            onClick={() => setIsOpen(false)}
                            endIcon={<CloseIcon />}
                            variant={"text"}>
                            {"Close"}
                        </Button>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        flexBasis: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <GenerateProject />
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}
