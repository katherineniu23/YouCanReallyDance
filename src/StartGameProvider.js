import React, { createContext, useContext, useRef, useState } from "react";
import { DANCE_LEVEL } from "./constants";

const StartGameContext = createContext();

export const useStartGame = () => {
  const context = useContext(StartGameContext);
  return context;
};

export const StartGameProvider = ({ children }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gamePhase, setGamePhase] = useState("idle"); // idle, countdown, demo, ready, play, result
  const [gameLevel, setGameLevel] = useState(DANCE_LEVEL.BEGINNER);
  const [demoSection, setDemoSection] = useState(1);
  const [selectedDance, setSelectedDance] = useState();
  // arrays to store moves
  const [isDemoReady, setIsDemoReady] = useState(false);
  const [demoMoves, setDemoMoves] = useState([]);
  const [demoMovesTimestamps, setDemoMovesTimestamps] = useState([]);
  const [currentPlayerMove, setCurrentPlayerMove] = useState("DefaultPose");
  const [playerMoves, setPlayerMoves] = useState([]);
  const [playerMovesTimestamps, setPlayerMovesTimestamps] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0); // to track the current move
  const [score, setScore] = useState(0);
  const [counts, setCounts] = useState(null);
  const [displayMsg, setDisplayMsg] = useState("");
  const [customTimer, setCustomTimer] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const startTimeRef = useRef(null);

  const startGame = () => {
    // initialize all states
    setScore(0);
    setIsGameStarted(true);
    setCustomTimer(0);
    if (isDemoReady) {
      setGamePhase("countdown");
      setDemoSection(1);
      setGameLevel(DANCE_LEVEL.BEGINNER);
    }
  };

  const stopGame = () => {
    // reset all states
    setIsGameStarted(false);
  };
  return (
    <StartGameContext.Provider
      value={{
        isGameStarted,
        startGame,
        stopGame,
        gameLevel,
        setGameLevel,
        selectedDance,
        setSelectedDance,
        score,
        setScore,
        startTimeRef,
        gamePhase,
        setGamePhase,
        demoMoves,
        setDemoMoves,
        demoMovesTimestamps,
        setDemoMovesTimestamps,
        playerMoves,
        setPlayerMoves,
        playerMovesTimestamps,
        setPlayerMovesTimestamps,
        moveIndex,
        setMoveIndex,
        isDemoReady,
        setIsDemoReady,
        currentPlayerMove,
        setCurrentPlayerMove,
        displayMsg,
        setDisplayMsg,
        counts,
        setCounts,
        customTimer,
        setCustomTimer,
        demoSection,
        setDemoSection,
        progressMsg,
        setProgressMsg,
      }}
    >
      {children}
    </StartGameContext.Provider>
  );
};
