import React, { useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStartGame } from "../StartGameProvider";

const useStyles = makeStyles({
  backRectangle: {
    border: "1.5px solid black",
    color: "#000",
    width: "160px",
    height: "45px",
    position: "absolute",
    top: "5px",
    right: "10px",
    borderRadius: "4px",
    zIndex: 0,
  },
  buttonWrapper: {
    position: "relative",
    display: "inline-block",
  },
  outlinedButton: {
    minWidth: "100px",
    border: "1.5px solid black",
    color: "#000",
    padding: "10px 30px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "4px",
    zIndex: 1,
    position: "relative",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&:active": {
      transform: "scale(0.98)", // Slightly reduces the button size when clicked
    },
  },
});

const DanceButton = ({ text }) => {
  const classes = useStyles();
  const [clickEffect, setClickEffect] = useState(false);
  const { setSelectedDance, startGame } = useStartGame();

  const handleClick = () => {
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 300); // Reset the effect after 300ms
    setSelectedDance(text);
    startGame();
  };
  return (
    <Box className={classes.buttonWrapper}>
      <Box
        className={classes.backRectangle}
        style={{
          backgroundColor:
            text === "BALLET"
              ? "#f2c1e6"
              : text === "HIPHOP"
              ? "#7F8487"
              : "#94FFD8",
        }}
      ></Box>

      <Box
        className={classes.outlinedButton}
        onClick={handleClick}
        style={{
          backgroundColor: clickEffect ? "#f5f5f5" : "#fff",
          cursor: clickEffect ? "not-allowed" : "pointer",
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

export default DanceButton;
