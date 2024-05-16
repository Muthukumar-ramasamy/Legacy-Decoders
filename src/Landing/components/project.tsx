import { useEffect, useState } from "react";
import { getProjects } from "../service/projectService";
import { downloadFile } from "../util/commonUtil";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Stack, Tooltip } from '@mui/material';
import downloadIcon from "../../assets/download.svg";
import logoIcon from "../../assets/legacy_logo.svg";

export const GenerateProject = () => {

    const [data, setData] = useState([]);

    const headers = ["", "Description", "Tech Stack", "Brd", "Story", "Structure", "Generated Code", "Date"];

    const getGeneratedProject = async () => {
        const projects = await getProjects();
        setData(projects?.data);
    };

    useEffect(() => {
        getGeneratedProject();
    }, [])

    const handleDownload = (url) => {
        downloadFile(url);
    }

    const getUserGeneratedStory = (story: string) => {
        return story.length > 75
            ? `${story.substring(0, 75)}...`
            : story;

    }

    const getWidth = (value: string) => {
        switch (value) {
            case "Project Icon":
                return "10%";

            case "Description":
                return "25%";

            case "Tech Stack":
                return "15%";

            case "Story":
                return "10%";

            case "Structure":
                return "10%";

            case "Generated Code":
                return "10%";

            case "Date":
                return "10%";

            case "default":
                return "10%";
        }
    }

    const getDate = (dateToBeFormatted: number | string | Date) => {
        const date = new Date(dateToBeFormatted);
        const isoDate: any = date.toISOString().slice(0, 10);
        return isoDate;
    };

    return (
        <Stack sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "General Sans, sans-serif", maxHeight: "70vh", margin: "0px" }}>
            {data?.length !== 0 && (
                <TableContainer component={Paper} sx={{
                    maxWidth: "95%",
                    '&.MuiPaper-root': {
                        marginTop: "0px"
                    },
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {headers.map((value: any) => (
                                    <TableCell align='center' sx={{ width: getWidth(value), fontWeight: "600" }} key={value}>{value}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map?.((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell align='center' sx={{ width: "10%" }}>
                                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", height: "25px" }}>
                                            <img src={logoIcon} alt="" />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: "25%" }}>
                                        <Tooltip title={row.story}>
                                            <Stack>
                                                {row.story ? getUserGeneratedStory(row.story) : "-"}
                                            </Stack>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: "15%" }}>{row.tech}</TableCell>
                                    <TableCell align="center" sx={{ width: "10%" }}>
                                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", height: "20px" }}>
                                            {row.brdUrl ? <img src={downloadIcon} alt="" onClick={() => { handleDownload(row.brdUrl) }} /> : "-"}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: "10%" }}>
                                        <Stack sx={{ flexDirection: "row", justifyContent: "center", height: "20px" }}>
                                            {row.storyUrl ? <img src={downloadIcon} alt="" onClick={() => { handleDownload(row.storyUrl) }} /> : "-"}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: "10%" }}>
                                        <Stack sx={{ flexDirection: "row", justifyContent: "center", height: "20px" }}>
                                            {row.structureUrl ? <img src={downloadIcon} alt="" onClick={() => { handleDownload(row.structureUrl) }} /> : "-"}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: "10%" }}>
                                        <Stack sx={{ flexDirection: "row", justifyContent: "center", height: "20px" }}>
                                            <img src={downloadIcon} alt="" onClick={() => { handleDownload(row.structureUrl) }} />
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: "10%" }}>{row?.createdAt ? getDate(row.createdAt) : "-"}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Stack>
    )
}