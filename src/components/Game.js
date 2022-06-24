import { useEffect, useRef, useState } from "react";
import { useGame } from "../hooks/useGame";
import "../App.css";

function Game() {
  const { gameState, resetGame, updateHighScore, incrementAlphabetIndex } =
    useGame();
  const { alphabets, alphabetIndex, highScore } = gameState;
  useEffect(() => {
    if (gameState.alphabets.length < 1 || alphabetIndex >= 19) {
      resetGame();
    }
  }, []);

  const initialTime = {
    min: 0,
    sec: 0,
    milliSec: 0,
    overAllMilliseconds: 0,
  };
  const [time, setTime] = useState(initialTime);
  const [inputValue, setInputValue] = useState("");
  const [showPenalty, setShowPenalty] = useState(false);

  const timerID = useRef();

  const formatNumber = (num) => {
    return num <= 9 ? `0${num}` : `${num}`;
  };

  const inputHandler = (event) => {
    setInputValue(event.target.value);
    if (!timerID.current && alphabetIndex < 1) {
      startTimer();
    }

    if (alphabetIndex <= 19) {
      if (
        event.target.value.slice(-1).toLowerCase() ===
        alphabets[alphabetIndex].toLowerCase()
      ) {
        if (alphabetIndex === 19) {
          stopTimer();
          if (
            (highScore.milliSec === 0 &&
              highScore.sec === 0 &&
              highScore.min === 0) ||
            time.overAllMilliseconds < highScore.overAllMilliseconds
          ) {
            updateHighScore(time);
          }
        }
        incrementAlphabetIndex();
      } else {
        setShowPenalty(true);
        setTimeout(() => {
          setShowPenalty(false);
        }, 500);
        setTime((prev) => {
          const newState = {
            milliSec: prev.milliSec,
            sec: prev.sec,
            min: prev.min,
            overAllMilliseconds: prev.overAllMilliseconds + 500,
          };
          if (prev.milliSec < 49) {
            newState.milliSec = prev.milliSec + 50;
          } else {
            newState.milliSec = (prev.milliSec + 50) % 100;
            if (prev.sec < 58) {
              newState.sec = prev.sec + 1;
            } else {
              newState.sec = 0;
              newState.min = prev.min + 1;
            }
          }

          return newState;
        });
      }
    } else {
      stopTimer();
    }
  };

  const startTimer = () => {
    timerID.current = setInterval(() => {
      setTime((prev) => {
        const newState = {
          milliSec: prev.milliSec,
          sec: prev.sec,
          min: prev.min,
          overAllMilliseconds: prev.overAllMilliseconds + 10,
        };
        if (prev.milliSec === 99) {
          newState.milliSec = 0;
          if (prev.sec === 59) {
            newState.min = prev.min + 1;
            newState.sec = 0;
          } else {
            newState.sec = prev.sec + 1;
          }
        } else {
          newState.milliSec = prev.milliSec + 1;
        }

        return newState;
      });
    }, 10);
  };

  const stopTimer = () => {
    clearTimeout(timerID.current);
  };

  const reset = () => {
    stopTimer();
    resetGame();
    timerID.current = null;
    setTime(initialTime);
    setInputValue("");
  };
  return (
    <div>
      <h1 className="heading1">Type the Alphabet</h1>
      <p className="heading2">
        Typing game to see how fast you type. Timer starts when you do :)
      </p>
      <div className="alphabetBox">
        <p className="alphabet">
          {alphabetIndex <= 19 ? (
            alphabets[alphabetIndex]
          ) : highScore.overAllMilliseconds >= time.overAllMilliseconds ? (
            "Success!"
          ) : (
            <span className="failure">Failure</span>
          )}
        </p>
      </div>

      <div className="timeBox">
        <p className="time">
          Time: {time.min > 0 && `${time.min}:`}
          {formatNumber(time.sec)}:{formatNumber(time.milliSec)}s
        </p>

        {showPenalty && (
          <div className="penalty">
            <p>+0.5s</p>
          </div>
        )}
      </div>

      <p className="myBestTime">
        My Best Time:{" "}
        {highScore.milliSec === 0 && highScore.sec === 0 && highScore.min === 0
          ? "00:00s"
          : highScore.min > 0
          ? `${formatNumber(highScore.min)}:${formatNumber(
              highScore.sec
            )}:${formatNumber(highScore.milliSec)}s`
          : `${formatNumber(highScore.sec)}:${formatNumber(
              highScore.milliSec
            )}s!`}
      </p>

      <div className="inputBox">
        <input
          value={inputValue}
          placeholder="Type here"
          onChange={inputHandler}
          className="input"
        />
        <button onClick={reset} className="resetButton">
          Reset
        </button>
      </div>
    </div>
  );
}

export { Game };
