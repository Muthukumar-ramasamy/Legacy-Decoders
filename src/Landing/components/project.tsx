import { useEffect, useState } from "react";
import { getProjects } from "../service/projectService";
import { downloadFile } from "../util/commonUtil";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Stack, Tooltip } from "@mui/material";
import downloadIcon from "../../assets/download.svg";
import logoIcon from "../../assets/legacy_logo.svg";
import Loader from "./Loader";

export const GenerateProject = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const headers = [
    "",
    "Description",
    "Tech Stack",
    "Brd",
    "Story",
    "Structure",
    "Generated Code",
    "Date",
  ];

  const getGeneratedProject = async () => {
    setLoading(true);
    const projects = await getProjects();
    if (projects) {
      setLoading(false);
      setData(projects?.data);
    }
  };

  useEffect(() => {
    getGeneratedProject();
  }, []);

  const handleDownload = (url) => {
    downloadFile(url);
  };

  const getUserGeneratedStory = (story: string) => {
    return story.length > 75 ? `${story.substring(0, 75)}...` : story;
  };

  const getWidth = (value: string) => {
    switch (value) {
      case "Project Icon":
        return "5%";

      case "Description":
        return "25%";

      case "Tech Stack":
        return "10%";

      case "Story":
        return "10%";

      case "Structure":
        return "10%";

      case "Generated Code":
        return "10%";

      case "Date":
        return "20%";

      case "default":
        return "10%";
    }
  };

  const getDate = (dateToBeFormatted: number | string | Date) => {
    const date = new Date(dateToBeFormatted);
    const isoDate: any = date.toISOString().slice(0, 10);
    return isoDate;
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "General Sans, sans-serif",
          marginTop: "10px",
        }}
      >
        {data?.length !== 0 && (
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: "95%",
              maxHeight: "46rem",
              "&.MuiPaper-root": {
                marginTop: "0px",
              },
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((value: any) => (
                    <TableCell
                      align="center"
                      sx={{ width: getWidth(value), fontWeight: "600" }}
                      key={value}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map?.((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center" sx={{ width: "10%" }}>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          height: "25px",
                        }}
                      >
                        <img src={logoIcon} alt="" />
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: "25%", height: "0%" }}
                    >
                      <Tooltip title={row.story}>
                        <Stack>
                          {row.story ? getUserGeneratedStory(row.story) : "-"}
                        </Stack>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "10%" }}>
                      {row.tech}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "10%" }}>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          height: "20px",
                        }}
                      >
                        {row.brdUrl ? (
                          <img
                            src={downloadIcon}
                            alt=""
                            onClick={() => {
                              handleDownload(row.brdUrl);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          "-"
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "5%" }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "center",
                          height: "20px",
                        }}
                      >
                        {row.storyUrl ? (
                          <img
                            src={downloadIcon}
                            alt=""
                            onClick={() => {
                              handleDownload(row.storyUrl);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          "-"
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "10%" }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "center",
                          height: "20px",
                        }}
                      >
                        {row.structureUrl ? (
                          <img
                            src={downloadIcon}
                            alt=""
                            onClick={() => {
                              handleDownload(row.structureUrl);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          "-"
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "10%" }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        {row?.generatedCodeUrl ? (
                          <a href={row?.generatedCodeUrl}>
                            <img
                              src={downloadIcon}
                              alt="download"
                              style={{
                                cursor: "pointer",
                                height: "20px",
                                marginTop: "2px",
                              }}
                            />
                          </a>
                        ) : (
                          "-"
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ width: "20%" }}>
                      {row?.createdAt ? getDate(row.createdAt) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </>
  );
};
