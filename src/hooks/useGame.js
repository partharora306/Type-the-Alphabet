import { useContext } from "react";
import { GameContext } from "../context/GameContext";

function useGame() {
  const { gameState, setGameState } = useContext(GameContext);
  function generateRandomAlphabets() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = [];
    for (let i = 0; i < 20; i++) {
      let char = alphabets.charAt(Math.floor(Math.random() * 26));
      result.push(char);
    }
    return result;
  }
  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      alphabets: generateRandomAlphabets(),
      alphabetIndex: 0,
    }));
  };
  const updateHighScore = (newHighScore) => {
    setGameState((prev) => ({ ...prev, highScore: newHighScore }));
    localStorage.setItem("highScore", JSON.stringify(newHighScore));
  };
  const incrementAlphabetIndex = () => {
    setGameState((prev) => ({
      ...prev,
      alphabetIndex: prev.alphabetIndex + 1,
    }));
  };
  return { gameState, resetGame, updateHighScore, incrementAlphabetIndex };
}

export { useGame };
