import { createContext, useState } from "react";

const GameContext = createContext({});

function GameProvider({ children }) {
  const [gameState, setGameState] = useState({
    highScore: JSON.parse(localStorage.getItem("highScore")) || {
      min: 0,
      sec: 0,
      milliSec: 0,
      overAllMilliseconds: 0,
    },
    alphabets: [],
    alphabetIndex: 0,
  });
  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
}

export { GameProvider, GameContext };
