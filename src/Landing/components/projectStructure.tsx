import React, { FC, useState } from "react";
import {
    Modal,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    IconButton,
    Typography,
    styled,
    Dialog,
    Box,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Error, Image, FolderZip, Delete } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import storyToCode from "../service/codeGenerator";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const ProjectStructure: FC<{
    structure: { content: string; s3_url: string; project_id: number };
    showStructure: boolean;
    setShowStructure: (val: boolean) => void;
}> = ({ structure, showStructure, setShowStructure }) => {
    const [isZipGenerated, setIsZipGenerated] = useState(false);

    const handleClose = () => {
        setIsZipGenerated(false);
        setShowStructure(false);
    };

    const generateCode = async (projectId: number) => {
        const projectZip = await storyToCode.getProjectZip(projectId);
        if (projectZip) {
            setIsZipGenerated(true);
        }
    };

    return (
        <BootstrapDialog
            id="proj-structure"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={showStructure}
            sx={{
                "& .MuiDialog-paper": {
                    minHeight: "100%",
                    borderRadius: 0,
                    minWidth: "100%",
                },
            }}
        >
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent
                id="structure-content"
                dividers
                sx={{ display: "flex", justifyContent: "center" }}
            >
                {!isZipGenerated ? (
                    <Box
                        id="structure"
                        sx={{ p: 1, display: "flex", flexDirection: "column" }}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            Generated Project Structure
                        </DialogTitle>
                        <pre
                            style={{
                                fontStyle: "inherit",
                                padding: "10px",
                                backgroundColor: "rgb(250 251 255)",
                                whiteSpace: "break-spaces",
                            }}
                        >
                            {structure.content}
                        </pre>
                        <Box component={"div"} sx={{ pb: 4 }}>
                            <Button
                                variant="contained"
                                onClick={() => generateCode(structure.project_id)}
                                sx={{ width: "fit-content", my: 2 }}
                            >
                                Proceed to generate code
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box
                        id="download-zip"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Your Generated Code is here
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "150px",
                                minWidth: "400px",
                                border: "1px solid",
                                borderRadius: "5px",
                                borderColor: "#E2E4E9",
                            }}
                        >
                            <FolderZip
                                fontSize={"large"}
                                sx={{
                                    color: "rgba(0, 0, 0, 0.56)",
                                }}
                            />
                            <Typography variant="body2" fontWeight={600}>
                                Code.zip
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{ width: "fit-content", mt: 2 }}>
                            {"Download  "}
                            <FileDownloadIcon />
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </BootstrapDialog>
    );
};

export default ProjectStructure;
