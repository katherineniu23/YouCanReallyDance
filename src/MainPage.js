import { Box, Container, Grid2, Stack, Typography, Button } from "@mui/material";
import React, {useState, useEffect, useRef } from "react";
import { useStartGame } from "./StartGameProvider";
import glossary from "./assets/glossary.jpg";
import CountTracker from "./components/CountTracker";
import AnimationBlock from "./AnimationBlock";
import KpopGlossary from "./assets/KpopGlossary.jpg";
import BalletGlossary from "./assets/BalletGlossary.jpg";
import { DANCE_TYPE } from "./constants";
import { makeStyles } from '@mui/styles';
import "./MainPage.css";

const useStyles = makeStyles({
  popUp: {
    transform: 'translateY(50px)', // Initially, position it off-screen (100px below)
    opacity: 0,                     // Initially invisible
    transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
  },
  popUpVisible: {
    transform: 'translateY(0)',      // Move it into view
    opacity: 1,                      // Make it fully visible
  }
});

const PopUpTypography = (props) => {
  const { children, progressMsg } = props;
  const classes = useStyles();
  const [visible, setVisible] = useState(false); 

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50); 

    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 1000);

    // Clean up timeouts
    return () => {
      clearTimeout(timeout);
      clearTimeout(hideTimeout);
    };
  }, [progressMsg]);

  return (
    <Box
      className={`${classes.popUp} ${visible ? classes.popUpVisible : ''} progress-msg`}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
    >
      <Typography variant="h5" {...props} 
      style={{
        color: progressMsg === "Correct!" ? "green" : 
        progressMsg === "Incorrect Move" ? "red" : 
        progressMsg === "Missed Timing"? "red" : "black",
      }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const MainPage = () => {
  const {
    setGamePhase,
    gamePhase,
    currentPlayerMove,
    displayMsg,
    setDisplayMsg,
    selectedDance,
    gameLevel,
    score,
    progressMsg,
  } = useStartGame();
  return (
    <Box
      mx="50px"
      pt="50px"
      style={{
        maxWidth: "100vw",
      }}
    >
      <Grid2 container spacing={3}>
        <Grid2 size={2}>
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="h3" gutterBottom>
                {selectedDance || "Dance Style"}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {gameLevel || "Game Level"}
              </Typography>
            </Box>
            <Box style={{ height: "150px" }} />
            <CountTracker />
          </Stack>
        </Grid2>
        <Grid2 size={6}>
          <Stack
            direction="column"
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="progress-msg">
              {gamePhase === "countdown"
                ? "Get Ready!"
                : gamePhase === "demo"
                ? "Watch and Learn"
                : gamePhase === "ready"
                ? "Get Ready to Dance"
                : gamePhase === "play"
                ? "Your Turn!"
                : gamePhase === "result"
                ? "Game Over"
                : "Loading..."}
            </h2>
            <Box style={{minHeight: "40px"}}>
              <Typography variant="h5" gutterBottom>
                {displayMsg}
              </Typography>
            </Box>
            {gamePhase === "result" && (
              <Button variant="contained" color="outlined" onClick={() => setGamePhase("idle")}>Back to Home</Button>
            )}
            <AnimationBlock />
          </Stack>
        </Grid2>
        <Grid2 size={2}>
          <Stack direction="column" spacing={2}>
          <Typography variant="h3" gutterBottom>
            Score: {score}
          </Typography>
          {gamePhase === "play" && (
            <PopUpTypography gutterBottom mt="30px" mr="10px"
            progressMsg={progressMsg}
            
            >
              {progressMsg}
            </PopUpTypography>
          )}
          
          </Stack>
        </Grid2>
        <Grid2
          size={2}
          style={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <img src={selectedDance === DANCE_TYPE.HIPHOP ? glossary:
              selectedDance === DANCE_TYPE.KPOP ? KpopGlossary:
              selectedDance === DANCE_TYPE.BALLET ? BalletGlossary:
              null
            } height="450px" alt="Glossary" />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default MainPage;
