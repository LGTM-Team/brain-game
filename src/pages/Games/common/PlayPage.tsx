import { useState } from "react";
import S from "./styles/playPage.module.css";
import StartGame from "./StartGame";
import StartCountdown from "./StartCountdown";
import FinishGame from "./FinishGame";
import GameResult from "./GameResult";
import Tutorial from "./Tutorial";

export type State = "waiting" | "starting" | "playing" | "finish" | "result";

interface Props {
  children: (
    gameState: State,
    finishGame: () => void,
    onScoreCalculated: (score: number) => void,
    onGameOver: (message: string) => void
  ) => React.ReactNode;
  gameImg: string;
  imgAlt: string;
  boldDescription: string;
  description: string;
  tutorial?: React.ReactNode;
}

function PlayPage({
  children,
  gameImg,
  imgAlt,
  boldDescription,
  description,
  tutorial,
}: Props) {
  const [gameState, setGameState] = useState<State>("waiting");
  const [score, setScore] = useState<number | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  //리마운트를 위한 gameKey
  const [gameKey, setGameKey] = useState(0);

  const finishGame = () => {
    setGameState("finish");
  };

  const onScoreCalculated = (score: number) => {
    setScore(score);
  };

  const onGameOver = (message: string) => {
    setGameOverMessage(message);
  };

  const handleReStart = () => {
    setGameState("starting");
    setScore(null);
    setGameOverMessage(null);
    setGameKey((prev) => prev + 1);
  };

  const handleReWait = () => {
    setGameState("waiting");
    setScore(null);
    setGameOverMessage(null);
    setGameKey((prev) => prev + 1);
  };

  return (
    <div key={gameKey} className={S.gameWrapper}>
      {gameState === "waiting" && (
        <StartGame
          img={gameImg}
          alt={imgAlt}
          boldText={boldDescription}
          text={description}
          onStart={() => setGameState("starting")}
          onOpenTutorial={() => setShowTutorial(true)}
        />
      )}
      {gameState === "waiting" && showTutorial === true && (
        <Tutorial onCloseTutorial={() => setShowTutorial(false)}>
          {tutorial}
        </Tutorial>
      )}
      {gameState === "starting" && (
        <StartCountdown
          state={gameState}
          onCount={() => setGameState("playing")}
        />
      )}
      {gameState !== "waiting" &&
        children(gameState, finishGame, onScoreCalculated, onGameOver)}
      {gameState === "finish" && (
        <FinishGame
          state={gameState}
          onShowResult={() => setGameState("result")}
          gameOverMessage={gameOverMessage}
        />
      )}
      {gameState === "result" && (
        <GameResult
          onRestart={handleReStart}
          onWait={handleReWait}
          score={score}
        />
      )}
    </div>
  );
}
export default PlayPage;
