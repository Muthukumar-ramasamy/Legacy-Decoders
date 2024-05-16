import { Box, Typography, Button, Drawer, CardContent, Card, IconButton, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import { MagicDecoder } from "./components/magicDecoder";
import { StoryToSnippet } from "./components/storyToSnippet";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from "@mui/icons-material/Close";
import HistoryList from "./history/HistoryList";
import welcome from "../assets/Welcome.png"
import logo from "../assets/Vector.png"
import LogoutIcon from '@mui/icons-material/Logout';
import { UploadPopUp } from "./components/UploadPopUp";


const historyValues = [
    {
        title: "User Story 4",
        date: "04/05/2024"
    },
    {
        title: "User Story 3",
        date: "04/02/2024"
    },
    {
        title: "User Story 2",
        date: "06/01/2024"
    },
    {
        title: "User Story 1",
        date: "01/01/2024"
    }
]
export const Home: FC = () => {
    const [showHistory, setShowHistory] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [tabVal, setTabVal] = useState("");
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY != 0);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [window.scrollY]);

    useEffect(() => {
        const handleReload = () => {
        window.scrollTo(0, 0);
        };

        window.addEventListener("beforeunload", handleReload);

        return () => {
        window.removeEventListener("beforeunload", handleReload);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [useLocation().pathname]);

    useEffect(() => {
        const path = location.pathname;
        const extractedValue = path.slice(path.lastIndexOf('/') + 1);
        const translateValue = (value) => {
          switch (value) {
            case "story-to-syntex":
              return "Story to Code";
            case "magic-decoder":
                return "Code to Story";
            default:
              return value;
          }
        };

        const transformedValue = translateValue(extractedValue);
        setTabVal(transformedValue);
      }, [location]);

    const handleChange = (newValue: string) => {
        setTabVal(newValue);
        if (newValue === "Code to Story") {
            navigate("/magic-decoder");
        } else {
            navigate("/story-to-syntex");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/auth"
    }

    return (
        <Box id="homee">
            <Box
                sx={{
                    py: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundImage: `url(${welcome})`,
                    backgroundSize: "cover",
                    position: "sticky",
                    top: 0,
                    zIndex: 10
                }}>
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
                <Box sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
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
                <Box sx={{ marginLeft: "16%" }}>
                    <Tooltip title="Logout">
                        <IconButton
                            onClick={handleLogout}
                            size="small"
                            sx={{ width: 56, height: 56, mr: 6 }}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Routes>
                <Route path="/magic-decoder" element={<MagicDecoder />} />
                <Route path="/story-to-syntex" element={<StoryToSnippet />} />
            </Routes>

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                my: 2
            }}>
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
                    onClick={() => setShowHistory(true)}
                    endIcon={<KeyboardArrowUpIcon />}>
                    {"View Previously Generated Codes"}
                </Button>
            </Box>
            <Drawer
                sx={{
                    ">.MuiPaper-root": {
                        height: "85%",
                        p: 4
                    }
                }}
                anchor={"bottom"}
                open={showHistory}
                onClose={() => setShowHistory(false)}>
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
                            {"Generated User-stories"}
                        </Typography>
                        <Button
                            sx={{
                                textTransform: "capitalize",
                                color: "gray",
                                "&:hover": {
                                    backgroundColor: "#f1f1f1"
                                }
                            }}
                            onClick={() => setShowHistory(false)}
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
                        <Card elevation={2} sx={{ width: "50%", borderRadius: "10px", p: 0 }}>
                            <CardContent sx={{ width: "100%" }}>
                                <HistoryList values={historyValues} />
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Drawer>
        </Box >
    )
}
