import { StartGameProvider } from "./StartGameProvider";
import GameLogic from "./GameLogic";

function App() {
  return (
    <StartGameProvider>
      <GameLogic />
    </StartGameProvider>
  );
}

export default App;
