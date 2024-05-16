import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

export default function Loader() {
    const DisabledBackground = styled(Box)({
        width: "100vw",
        height: "100vh",
        position: "fixed",
        background: "#ccc",
        opacity: 0.5,
        zIndex: 1,
        top: 0,
        left: 0,
      });
  return (
    <>
    <CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2
      }}
    />
      <DisabledBackground />
    </>
  );
}