import { useState } from "react";
import StartGame from "./StartGame";
import StartCountdown from "./StartCountdown";
import FinishGame from "./FinishGame";
import GameResult from "./GameResult";

export type State = "waiting" | "starting" | "playing" | "finish" | "result";

interface Props {
  children: (
    state: State,
    finishGame: () => void,
    onScoreCalculated: (score: number) => void,
    onGameOver: (message: string) => void
  ) => React.ReactNode;
  gameImg: string;
  imgAlt: string;
  boldDescription: string;
  description: string;
}

function PlayPage({
  children,
  gameImg,
  imgAlt,
  boldDescription,
  description,
}: Props) {
  const [gameState, setGameState] = useState<State>("waiting");
  const [score, setScore] = useState<number | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);

  //결과 보고 게임 점수랑 메세지 reset 필요 이건 GameResult 컴포넌트에 onReset={()=>setScore(null)} 이거 쓰면 될듯
  // 게임 점수 로딩중에 조건문 필요 {(score&&gameOverMessage)|<FinishGame/>:"로딩중"} 이런느낌..

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
  };

  const handleReWait = () => {
    setGameState("waiting");
    setScore(null);
    setGameOverMessage(null);
  };

  return (
    <>
      {gameState === "waiting" && (
        <StartGame
          img={gameImg}
          alt={imgAlt}
          boldText={boldDescription}
          text={description}
          onStart={() => setGameState("starting")}
        />
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
    </>
  );
}
export default PlayPage;
