import React, { useEffect, useState } from "react";
import { ReactComponent as Back } from "./moves/back.svg";
import { ReactComponent as Down } from "./moves/down.svg";
import { ReactComponent as Forward } from "./moves/forward.svg";
import { ReactComponent as Jump } from "./moves/jump.svg";
import { ReactComponent as DefaultPose } from "./moves/defaultpose.svg";
import { ReactComponent as Blood } from "./moves/Kpop_Blood.svg";
import { ReactComponent as Hipthrust } from "./moves/Kpop_Hipthrust.svg";
import { ReactComponent as Sweat } from "./moves/Kpop_Sweat.svg";
import { ReactComponent as Tears } from "./moves/Kpop_Tears.svg";
import { ReactComponent as Saute} from "./moves/Ballet_Jump.svg";
import { ReactComponent as Plie} from "./moves/Ballet_Plie.svg";
import { ReactComponent as Arabesque} from "./moves/Ballet_Arabesque.svg";
import { ReactComponent as Developpe} from "./moves/Ballet_Developpe.svg";
import { useStartGame } from "./StartGameProvider";
import { Box, Typography } from "@mui/material";
import { MOVE_NAME, DANCE_TYPE } from "./constants";


const AnimationBlock = () => {
  const {
    gamePhase,
    currentPlayerMove,
    setCurrentPlayerMove,
    displayMsg,
    setDisplayMsg,
    demoMoves,
    moveIndex,
    demoSection,
    selectedDance
  } = useStartGame();
  const [currentMove, setCurrentMove] = useState("DefaultPose");

  useEffect(() => {
    if (gamePhase === "demo" && demoMoves[`${demoSection}`][moveIndex]) {
      setCurrentMove(demoMoves[`${demoSection}`][moveIndex]);
       const timer = setTimeout(() => {
         setCurrentMove("DefaultPose");
       }, 600);
      return () => clearTimeout(timer);
    }
    
    // if (gamePhase === "play"){
    //   setDisplayMsg("Use your keyboard to dance!");
    //   const handleKeyDown = (e) => {
    //     const playerMove = e.key;
    //     setCurrentPlayerMove(playerMove);
    //     setDisplayMsg(moveName[playerMove]);

    //     const timer = setTimeout(() => {
    //       setCurrentPlayerMove("DefaultPose");
    //     }, 550);
    //     return () => clearTimeout(timer);
    //   };
    //   window.addEventListener("keydown", handleKeyDown); 
    // }
  }, [gamePhase, demoMoves[`${demoSection}`], moveIndex]);
  return (
    <Box style={{ height: "400px" }}>
      
      
     
      {gamePhase === "demo" && (
        <>
        <Box style={{ minHeight: "40px"}}>
        {demoMoves[`${demoSection}`][moveIndex] !== "DefaultPose" && (
        <Typography variant="h4" textAlign="center">{MOVE_NAME[`${selectedDance}`][demoMoves[`${demoSection}`][moveIndex]]}</Typography>
        )}
         </Box>

        {selectedDance === DANCE_TYPE.HIPHOP && (
            <>
              {currentMove === "ArrowUp" ? <Jump /> :
              currentMove === "ArrowDown" ? <Down /> :
              currentMove === "ArrowLeft" ? <Forward /> :
              currentMove === "ArrowRight" ? <Back /> :
              <DefaultPose />
            }
            </>
          )}
          {selectedDance === DANCE_TYPE.KPOP && (
            <>
              {currentMove === "ArrowUp" ? <Sweat /> :
              currentMove === "ArrowDown" ? <Hipthrust /> :
              currentMove === "ArrowLeft" ? <Blood /> :
              currentMove === "ArrowRight" ? <Tears /> :
              <DefaultPose />
            }
            </>
          )}
          {selectedDance === DANCE_TYPE.BALLET && (
            <>
              {currentMove === "ArrowUp" ? <Saute /> :
              currentMove === "ArrowDown" ? <Plie/> :
              currentMove === "ArrowLeft" ? <Developpe /> :
              currentMove === "ArrowRight" ? <Arabesque /> :
              <DefaultPose />
            }
            </>
          )}
     
        </>
      )}
      {gamePhase === "play" && (
        <>
          <Box style={{minHeight: "40px"}}>
          {MOVE_NAME[`${selectedDance}`][currentPlayerMove] !== "DefaultPose" && (
            <Typography variant="h4" textAlign="center">{MOVE_NAME[`${selectedDance}`][currentPlayerMove]}</Typography>
          )}
          </Box>
          {selectedDance === DANCE_TYPE.HIPHOP && (
            <>
              {currentPlayerMove === "ArrowUp" ? <Jump /> :
              currentPlayerMove === "ArrowDown" ? <Down /> :
              currentPlayerMove === "ArrowLeft" ? <Forward /> :
              currentPlayerMove === "ArrowRight" ? <Back /> :
              <DefaultPose />
            }
            </>
          )}
          {selectedDance === DANCE_TYPE.KPOP && (
            <>
              {currentPlayerMove === "ArrowUp" ? <Sweat /> :
              currentPlayerMove === "ArrowDown" ? <Hipthrust /> :
              currentPlayerMove === "ArrowLeft" ? <Blood /> :
              currentPlayerMove === "ArrowRight" ? <Tears /> :
              <DefaultPose />
            }
            </>
          )}
          {selectedDance === DANCE_TYPE.BALLET && (
            <>
              {currentPlayerMove === "ArrowUp" ? <Saute /> :
              currentPlayerMove === "ArrowDown" ? <Plie/> :
              currentPlayerMove === "ArrowLeft" ? <Developpe /> :
              currentPlayerMove === "ArrowRight" ? <Arabesque /> :
              <DefaultPose />
            }
            </>
          )}
          
        </>
      )}
    </Box>
  );
};

export default AnimationBlock;
