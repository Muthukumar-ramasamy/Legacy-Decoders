import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import DownloadIcon from "../../assets/download.svg";
import { downloadFile } from "../util/commonUtil";
import Loader from "./Loader";
import { DrawerPopup } from "./DrawerPopup";

const GeneratedStory = (props: any) => {
  return (
    <>
      <DrawerPopup
        header=""
        close={() => {
          props.onClose();
        }}
        isLoading={props.loading}
        element={
          <>
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      position: "relative",
                      backgroundColor: "white",
                      borderRadius: "16px",
                      height: "75vh",
                      boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.3)",
                      overflow: "hidden",
                    }}
                  >
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{
                        mb: 1,
                        p: 2,
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        zIndex: 1,
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "left",
                          fontWeight: 600,
                          fontSize: "18px",
                        }}
                      >
                        User Story
                      </Typography>
                      <img
                        src={DownloadIcon}
                        style={{
                          width: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          downloadFile(props?.generateStoryResponse?.story?.s3_url);
                        }}
                      />
                    </Stack>
                    <Box
                      sx={{
                        p: 2,
                        overflowY: "auto",
                        height: "calc(100% - 64px - 32px)",
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "darkgrey",
                          borderRadius: "2px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "grey",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "21.6px",
                          whiteSpace: "pre-wrap",
                          textAlign: "left",
                        }}
                      >
                        {props?.generateStoryResponse?.story?.content?.user_story}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      position: "relative",
                      backgroundColor: "white",
                      borderRadius: "16px",
                      height: "75vh",
                      boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.3)",
                      overflow: "hidden",
                    }}
                  >
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{
                        mb: 1,
                        p: 2,
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        zIndex: 1,
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          textAlign: "left",
                          fontWeight: 600,
                          fontSize: "20px",
                        }}
                      >
                        BRD
                      </Typography>
                      <img
                        src={DownloadIcon}
                        style={{
                          width: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          downloadFile(props?.generateStoryResponse?.brd?.s3_url);
                        }}
                      />
                    </Stack>
                    <Box
                      sx={{
                        p: 2,
                        overflowY: "auto",
                        height: "calc(100% - 64px - 32px)",
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "darkgrey",
                          borderRadius: "2px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          backgroundColor: "grey",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "21.6px",
                          whiteSpace: "pre-wrap",
                          textAlign: "left",
                        }}
                      >
                        {props?.generateStoryResponse?.brd?.content?.brd_content}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
          </>
        }
      ></DrawerPopup>
    </>
  );
};

export default GeneratedStory;
