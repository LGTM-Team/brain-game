import { useState, useEffect } from "react";
import S from "./styles/playPage.module.css";
import StartGame from "./StartGame";
import StartCountdown from "./StartCountdown";
import FinishGame from "./FinishGame";
import GameResult from "./GameResult";
import Tutorial from "./Tutorial";
import { useSaveScore } from "@/hooks/useSaveScore";

export type State = "waiting" | "starting" | "playing" | "finish" | "result";

interface Props {
  gameId: number;
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
  gameId,
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
  const [gameKey, setGameKey] = useState(0);

  const { saveScore } = useSaveScore();

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

  // ✅ 저장 로직: finish → result 넘어가기 전에 수행
  useEffect(() => {
    if (gameState !== "finish") return;

    const save = async () => {
      console.log("[🏁] 게임 종료. 결과 저장 시도...");
      if (score === null) {
        console.warn("[❗] 점수 정보 없음. 저장 생략.");
        return;
      }

      try {
        await saveScore(gameId, score);
        console.log("[✅] 점수 저장 완료 또는 무시됨 (트리거)");
      } catch (err) {
        console.error("[🚨] 점수 저장 실패:", err);
      } finally {
        // 3초 후 결과로 이동 (성공 여부 관계없이)
        setTimeout(() => {
          console.log("[➡️] 결과 화면으로 이동");
          setGameState("result");
        }, 3000);
      }
    };

    save();
  }, [gameState]);

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
      {gameState === "waiting" && showTutorial && (
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
        <FinishGame gameOverMessage={gameOverMessage} />
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
