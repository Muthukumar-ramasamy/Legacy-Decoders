import { FolderZip, Download } from "@mui/icons-material"
import { ListItem, Box, Typography, Button } from "@mui/material"

const HistoryItem = ({ title, date }) => {
    return (
        <ListItem sx={{ width: "100%" }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Box sx={{
                    display: "flex",
                    gap: 2
                }}>
                    <FolderZip sx={{ height: "43px", width: "43px" }} />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography variant="body1">{title}</Typography>
                        <Typography variant="caption">{date}</Typography>
                    </Box>
                </Box>
                <Button
                    sx={{
                        textTransform: "capitalize",
                        px: 4
                    }}
                    endIcon={<Download />}
                    variant={"outlined"}>
                    {"Download"}
                </Button>
            </Box>
        </ListItem>
    )
}

export default HistoryItem