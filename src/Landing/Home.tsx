import { Box, ToggleButtonGroup, ToggleButton, Typography, Tooltip, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { MagicDecoder } from "./components/magicDecoder";
import { Filebox } from "./components/Filebox";
import Avatar from '@mui/material/Avatar';
import { StoryToSnippet } from "./components/storyToSnippet";
import logo from "../assets/Vector.png"

export const Home: FC = () => {
    const [tabVal, setTabVal] = useState("Code to Story");
    const navigate = useNavigate();

    const handleChange = (newValue: string) => {
        setTabVal(newValue);
        if (newValue === "Code to Story") {
            navigate("/magic-decoder");
        } else {
            navigate("/story-to-syntex");
        }
    }

    return (
        <Box id="homee">
            <Box sx={{ my: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Box
                        component={"img"}
                        src={logo}
                        sx={{
                            minWidth: 36,
                            minHeight: 36,
                            ml: 3,
                            mr: 2
                        }}>
                    </Box>
                    <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>Legacy Transformers</Typography>
                </Box>
                <Box sx={{backgroundColor:"#fff", borderRadius:"10px"}}>
                    <ToggleButtonGroup
                        color="primary"
                        value={tabVal}
                        exclusive
                        onChange={(_, newValue) => handleChange(newValue)}
                        aria-label="Platform">
                        <ToggleButton value="Code to Story" sx={{ fontSize: "14px", fontWeight: 600 }}>Code to Story</ToggleButton>
                        <ToggleButton value="Story to Code" sx={{ fontSize: "14px", fontWeight: 600 }}>Story to Code</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box sx={{ marginLeft: "20%" }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={() => { console.log("clicked") }}
                            size="small"
                            sx={{ width: 56, height: 56, mr: 6 }}
                        >
                            <Avatar sx={{ width: 46, height: 46 }}>LT</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Routes>
                <Route path="/magic-decoder" element={<MagicDecoder />} />
                <Route path="/story-to-syntex" element={<StoryToSnippet />} />
            </Routes>
        </Box >
    )
}
