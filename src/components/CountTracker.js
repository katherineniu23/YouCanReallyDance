import { Box, Typography } from "@mui/material";
import React from "react";
import { useStartGame } from "../StartGameProvider";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  circle: {
    width: "100px",
    height: "100px",
    backgroundColor: "#f8d1a2",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#e99e42",
  },
});

const CountTracker = () => {
  const { counts } = useStartGame();
  const classes = useStyles();
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" textAlign="center" mb="20px">
        Count Tracker
      </Typography>
      <Box className={classes.circle}>
        <Typography variant="h2" textAlign="center" className={classes.number}>
          {counts}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountTracker;
