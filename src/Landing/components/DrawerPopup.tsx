import { Box, Typography, Button, Drawer, Stack } from "@mui/material";
import downloadDisableIcon from "../../assets/download_disable.svg";
import downloadIcon from "../../assets/download.svg";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "./Loader";

export const DrawerPopup = (props: any) => {
  return (
    <Drawer
      sx={{
        ">.MuiPaper-root": {
          height: "85vh",
          p: 2,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.4)",
          whiteSpace: "pre-wrap",
        },
      }}
      anchor={"bottom"}
      open={true}
      onClose={() => props?.close()}
      BackdropProps={{ invisible: true }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "10px",
            marginTop: "10px"
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
            }}
            variant={"h6"}
          >
            {props?.header}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {props?.isDownloadEnable && (
              <Button variant="outlined" endIcon={(props?.url || props?.isLoading) ? <img src={downloadIcon} alt="download" /> : <img src={downloadDisableIcon} alt="download" />} sx={{
                border: "solid 1px",
                borderColor: "blue",
                paddingx: "8px",
                borderRadius: "10px",
                color: "blue",
                textTransform: "capitalize"
              }} disabled={!props?.url || props?.isLoading}>Download</Button>
            )}
            <Button
              sx={{
                textTransform: "capitalize",
                color: "gray",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
                marginLeft: "10px"
              }}
              onClick={() => props?.close()}
              endIcon={<CloseIcon />}
              variant={"text"}
            >
              {"Close"}
            </Button>
          </Stack>
        </Box>

        {props?.isLoading ? (<Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}><Loader /></Stack>) : <Stack>{props.element}</Stack>}
      </Box>
    </Drawer>
  );
};
