import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import loaderIcon from "../../assets/loader.svg";

export default function Loader() {

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const DisabledBackground = styled(Box)({
    width: "100vw",
    height: "100vh",
    position: "fixed",
    background: "#ccc",
    opacity: 0.5,
    zIndex: 0,
    top: 0,
    left: 0,
  });

  const loadData = [
    { "name": "Your experience is just a moment away" },
    { "name": "Sit tight while we prepare everything for you" },
    { "name": "We're getting things ready for you. Sit tight!" },
    { "name": "Just a quick sec... Your experience is worth the wait!" },
    { "name": "Making sure everything's perfect for you!" },
    { "name": "Hang tight, we're almost there" },
    { "name": "Putting the finishing touches on your experience" },
    { "name": "Preparing something special just for you" },
    { "name": "Almost done, thank you for your patience" },
    { "name": "Getting everything ready for you, just a moment" },
    { "name": "We're working hard to bring you the best experience" },
    { "name": "Your patience is appreciated, we're nearly there" },
    { "name": "Finalizing details for your amazing experience" },
    { "name": "Please hold on while we load your experience" },
    { "name": "We're nearly finished setting things up for you" }
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadData.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Stack sx={{
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Stack>
        <img src={loaderIcon} alt="loading" />
      </Stack>
      <Stack sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        zIndex: 5
      }}>
        <Typography
          key={currentIndex}
          fontSize={20}
          sx={{ color: "#3d5afe" }}
        >
          {loadData[currentIndex].name}
        </Typography>
      </Stack>
    </Stack>
  );
}