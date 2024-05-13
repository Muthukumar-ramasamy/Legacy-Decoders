import { FC, ChangeEvent, FormEvent, useState } from "react";
import { Box } from "@mui/system";
import { Button, Card, CardActions, CardContent, Divider, FormControl, OutlinedInput, TextField, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Filebox } from "./Filebox";
import AddLinkIcon from '@mui/icons-material/AddLink';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'


export const MagicDecoder: FC = () => {
    const [description, setDescription] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    return (
        <Box sx={{ display: "flex", alignItems: "center", p: 4, justifyContent: "center" }}>
            <Card sx={{ minWidth: 432, borderRadius: "10px" }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Filebox onChange={(file: File | null) => {
                            console.log(file, "filee")
                            setSelectedFile(file)
                        }} />
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
                                    fontSize:"13px",
                                    fontWeight:"600"
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
    )
}
