import React from "react";
import { Box, Container, Grid2, Stack } from "@mui/material";
import DanceButton from "./components/DanceButton";
import HomePageTitle from "./assets/HomePageTitle.png";
import balletstickman from "./assets/balletstickman.jpg";
import hiphopstickman from "./assets/hiphopstickman.jpg";
import kpopstickman from "./assets/kpopstickman.jpg";
import { DANCE_TYPE } from "./constants";

const danceBoxStyles = {
  height: "500px",
  display: "flex",
  justifyContent: "center",
};

const HomePage = () => {
  return (
    <Container mt="0px">
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <img src={HomePageTitle} width="1000px" alt="You Can Really Dance!" />
      </Box>

      <Grid2 container spacing={3}>
        <Grid2 size={4} style={danceBoxStyles}>
          <Stack direction="column" spacing={2}>
            <DanceButton text={DANCE_TYPE.BALLET} />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <img src={balletstickman} height="200px" alt="Stickman" />
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={4} style={danceBoxStyles}>
          <Stack direction="column" spacing={2}>
            <DanceButton text={DANCE_TYPE.HIPHOP} />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <img src={hiphopstickman} height="200px" alt="Stickman" />
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={4} style={danceBoxStyles}>
          <Stack direction="column" spacing={2}>
            <DanceButton text={DANCE_TYPE.KPOP} />
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <img src={kpopstickman} height="200px" alt="Stickman" />
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default HomePage;
