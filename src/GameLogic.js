import React, { useEffect, useRef } from "react";
import { useStartGame } from "./StartGameProvider";
import HomePage from "./HomePage";
import MainPage from "./MainPage";
import { BEGINNER_DANCE_MOVES, BEGINNER_MOVES, BEGINNER_MOVE_INTERVAL, AUDIO_NAMES, DANCE_LEVEL, DANCE_TYPE, INTERVAL } from "./constants";
import "./App.css";

const GameLogic = () => {
  const {
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
    setScore,
    score,
    moveIndex,
    setMoveIndex,
    setIsDemoReady,
    isDemoReady,
    setCurrentPlayerMove,
    currentPlayerMove,
    setDisplayMsg,
    setCounts,
    counts,
    isGameStarted,
    customTimer,
    setCustomTimer,
    demoSection, 
    setDemoSection,
    selectedDance,
    progessMsg,
    setProgressMsg,
    gameLevel,
  } = useStartGame();
  const audioElement = useRef(null);
  const moveTimeOutRef = useRef([]);
  const audioSrc = AUDIO_NAMES[`${selectedDance}_${gameLevel}_${demoSection}`];

  const generateDemoMoves = () => {
    
    const startTime = 0;
    startTimeRef.current = startTime;
    const bpm = 93; // Beats per minute
    const beatDuration = 60 / bpm; // Duration of one beat in seconds
    const moveInterval = INTERVAL[`${gameLevel}`] * beatDuration * 1000; //every two beats for beginner
    const demoStartTime = 4 * beatDuration * 1000;
    const newDemoMoves = {};
    const newDemoMovesTimestamps = {};

    startTimeRef.current = startTime;

    for (let ds = 1; ds <= 3; ds++) {
      const newMoves = [];
      const newTimestamps = [];
      for (let i = 0; i < BEGINNER_MOVES; i++) {
        const randomMove = Math.floor(Math.random() * BEGINNER_DANCE_MOVES.length);
        newMoves.push(BEGINNER_DANCE_MOVES[randomMove]);
        newTimestamps.push(demoStartTime + (ds - 1) * 16 * 645 + i * moveInterval);
      }
      newDemoMoves[ds] = newMoves;
      newDemoMovesTimestamps[ds] = newTimestamps;
      
    }
    setDemoMoves(newDemoMoves);
    setDemoMovesTimestamps(newDemoMovesTimestamps);
    setIsDemoReady(true);
  };

  // start the demo phase when page renders
  useEffect(() => {
    generateDemoMoves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create a timer
  useEffect(() => {
    let timer;
    if (isGameStarted) {
      timer = setInterval(() => {
        setCustomTimer((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isGameStarted]);

  // show countdown + demo moves
  useEffect(() => {
    // Countdown phase
    if (gamePhase === "countdown") {
      const audio = audioElement.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      setCounts(5);
      // Start a 4-beat countdown
      const countdownInterval = setInterval(() => {
        setCounts((prev) => prev + 1);
      }, 645); // 1 beat is 0.645 seconds

      // After the countdown is finished, switch to demo phase
      const countdownTimeout = setTimeout(() => {
        setGamePhase("demo");
        setCounts(null); // Hide countdown when demo starts
        clearInterval(countdownInterval); // Stop the countdown interval
      }, 4 * 645); // 4 beats of 0.645 seconds each

      return () => {
        clearTimeout(countdownTimeout);
        clearInterval(countdownInterval);
      };
    }

    //Demo Phase: showing demo moves
    if (gamePhase === "demo") {
      setDisplayMsg("Memorize the combo!")
      const audio = audioElement.current;
      setCounts(1);

      let index = 1;
      const interval = setInterval(() => {
        setMoveIndex(index); // Set the current move index to be displayed
        setCounts((prev) => prev + 1);
        index++;

        if (index > demoMoves[`${demoSection}`].length) {
          clearInterval(interval);
          audio.pause();
          audio.currentTime = 0;
          setGamePhase("ready"); // Switch to user phase
          setMoveIndex(0); // Reset the index for user phase
          setCounts(null);
          setPlayerMoves([]); // Reset player moves
        }
      }, 2 * 0.645 * 1000); // Show each move for 1.29 second

      return () => clearInterval(interval);
    }
  }, [gamePhase]);

  useEffect(() => {
    console.log("Demo Moves: ", demoMoves[`${demoSection}`]);
  }, [demoMoves]);

  useEffect(() => {
    if (gamePhase === "play") {
      setDisplayMsg("Use your keyboard to dance!");
      

      const handleFullPt = () => {
        setScore((prevScore) => prevScore + 1);
        setProgressMsg("Correct!"); 
      }

      const handleHalfPt = () => {
        setScore((prevScore) => prevScore + 0.5);
        setProgressMsg("Correct!");
      }

      const handleMissedMove = () => {
        setProgressMsg("Missed Timing"); 
        
      }

      const handleIncorrectMove = () => {
        setProgressMsg("Incorrect Move"); 
        
      }
      const handleKeyDown = (e) => {
        const playerMove = e.key;
        console.log("score:", score);
        console.log("customTimer:", customTimer);
        setCurrentPlayerMove(playerMove);
        // setDisplayMsg(moveName[playerMove]);

        const timer = setTimeout(() => {
          setCurrentPlayerMove("DefaultPose");
        }, 550);

        let foundMatch = false;
        let playClickTime = customTimer - (15480 * demoSection) + 2580; //milliseconds; account for 2 count downs + 1 demo time, 15480ms
        //Add played move and timestamp into arrays
        setCurrentPlayerMove(playerMove);
        setPlayerMoves((prevPlayerMoves) => [...prevPlayerMoves, playerMove]);
        setPlayerMovesTimestamps((prevPlayerMovesTimestamps) => [...prevPlayerMovesTimestamps, playClickTime]);

        console.log("playClickTime: ", playClickTime);
        console.log("demoMovesTimestamps: ", demoMovesTimestamps[`${demoSection}`]);

        //iterate through demom move times to see if there is match
        for (let demoIndex = 0; demoIndex < demoMovesTimestamps[`${demoSection}`].length; demoIndex ++){
          let minHalfPt = demoMovesTimestamps[`${demoSection}`][demoIndex] - 500;
          let maxHalfPt = demoMovesTimestamps[`${demoSection}`][demoIndex] + 500;
          let minFullPt = demoMovesTimestamps[`${demoSection}`][demoIndex] - 250;
          let maxFullPt = demoMovesTimestamps[`${demoSection}`][demoIndex] + 250;
          if (playClickTime < minHalfPt){
            handleMissedMove();
            break
          }
          if (playClickTime <= maxHalfPt){
            //check if move matches
            if(playerMove == demoMoves[`${demoSection}`][demoIndex]){
              foundMatch = true;
              if(playClickTime <= maxFullPt && playClickTime >= minFullPt){ //if time is within full point range
                handleFullPt();
                break
                
              }
              handleHalfPt();
              break
            }
            else{
              handleIncorrectMove();
              break
            }
          }
          if (demoIndex === (demoMovesTimestamps[`${demoSection}`].length - 1) && playClickTime < maxHalfPt){
            handleMissedMove();
          }
        }
        return () => clearTimeout(timer);
      }


    window.addEventListener("keydown", handleKeyDown);

    demoMoves[`${demoSection}`].forEach((_, index) => {
      let duration = index === 0 ? 120: 1390 * (index); //first move is 1.1s, rest are 1.39s
      moveTimeOutRef.current[index] = setTimeout(() => {
        setCurrentPlayerMove("Missed")
        setProgressMsg("Missed Timing"); //Red Color
      }, duration);
    })
    

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      moveTimeOutRef?.current.forEach((timeout) => clearTimeout(timeout));
    }
    }
  }, [gamePhase, customTimer]);

  useEffect(() => {
    console.log("Count: ", counts);
    console.log("Timer when count: ", customTimer);
  }, [counts])



  useEffect(() => {
    if (gamePhase === "play") {
      // Start a 16-beat countdown
      setCounts(1);
      const playCountsInterval = setInterval(() => {
        setCounts((prev) => prev + 1);
      }, 2 * 0.645 * 1000); // 1 beat is 0.645 seconds

      // After the countdown is finished, continue to the next demo section or 
      // switch to result phase
      const playCountsCountdownTimeout = setTimeout(() => {
        if (demoSection < 3) {
          let newDemoSection = demoSection + 1;
          setDemoSection(newDemoSection);
          setCounts(null);
          setGamePhase("countdown");
        }
        else {
          setDemoSection(1);
          setGamePhase("result");
          setCounts(null);
        }
        clearInterval(playCountsInterval); // Stop the countdown interval
      }, 16 * 645); // 16 beats of 0.645 seconds each

      return () => {
        clearTimeout(playCountsCountdownTimeout);
        clearInterval(playCountsInterval);
        setCounts(1);
      };
    }
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === "ready") {
      if (audioElement.current && audioElement.current.paused) {
        audioElement.current.play();
      }
      setCounts(5);
      // Start a 4-beat countdown
      const readyCountdownInterval = setInterval(() => {
        setCounts((prev) => prev + 1);
      }, 645); // 1 beat is 0.645 seconds

      // After the countdown is finished, switch to play phase
      const readyCountdownTimeout = setTimeout(() => {
        setGamePhase("play");
        setCounts(null);
        clearInterval(readyCountdownInterval); // Stop the countdown interval
      }, 4 * 645); // 4 beats of 0.645 seconds each

      return () => {
        clearTimeout(readyCountdownTimeout);
        clearInterval(readyCountdownInterval);
      };
    }
  }, [gamePhase]);

  // show result
  useEffect(() => {
    if (gamePhase === "result") {
      setDisplayMsg("");
      console.log("Game Over!");
      console.log("Score: ", score);
    }
  }, [gamePhase])

  return (
    <div className="background-container">
      {gamePhase === "idle" ? <HomePage /> : <MainPage />}{" "}
      <audio
        ref={audioElement}
        src={audioSrc}
      ></audio>
    </div>
  );
};

export default GameLogic;
