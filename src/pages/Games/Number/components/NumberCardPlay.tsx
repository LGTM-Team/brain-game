import { useEffect, useState } from "react";
import S from "./card.module.css";
import NumberCard from "./NumberCard";
import CurrentGameScore from "../../components/CurrentGameScore";
import StaticTimer from "../../components/StaticTimer";
import { useNumberStep } from "@/hooks/useNumberStep";
import { useBonusScore } from "@/hooks/useBonusScore";
import { useNumberCardTransition } from "@/hooks/useNumberCardTransition";

interface Props {
  state: "waiting" | "starting" | "playing" | "finish" | "result";
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}

function NumberCardPlay({
  state,
  onFinish,
  onScoreCalculated,
  onGameOver,
}: Props) {
  const [currentScore, setCurrentScore] = useState(0);
  const { get, BonusRestart, BonusStart } = useBonusScore(10);
  const [round, setRound] = useState(0);
  const [userRound, setUserRound] = useState(0);
  const [cardStatus, setCardStatus] = useState<"front" | "back" | "shuffle">(
    "back"
  );
  const [gameStep, setGameStep] = useState<
    "first" | "second" | "third" | "fourth"
  >("first");
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameStartCountdown, setGameStartCountdown] = useState<number | null>(
    null
  );
  const { answer, randomNumberList } = useNumberStep({
    step: gameStep,
    round,
    setGameStep,
  });
  const gridSize = Math.round(Math.sqrt(randomNumberList?.length ?? 1));

  useEffect(() => {
    if (state === "starting") {
      setIsTimerActive(false);
      setCurrentScore(0);
      setRound(0);
      setUserAnswer([]);
      setUserRound(0);
      setGameStep("first");
    }
  }, [state]);

  // 게임 시작
  useEffect(() => {
    if (state === "playing") {
      setIsTimerActive(false);
      setCardStatus("front");
      setGameStartCountdown(3);
      const toBack = setTimeout(() => {
        setIsTimerActive(true);
        setCardStatus("back");
      }, 3000);
      BonusStart();
      return () => {
        clearTimeout(toBack);
      };
    }
  }, [state]);

  // 게임 진행
  const handleGame = (isTimeout = false) => {
    if (!answer) return;
    const isCorrect = userAnswer.every((num, idx) => num === answer[idx]);
    // 게임 종료 처리
    if (isTimeout) {
      onScoreCalculated(currentScore);
      setUserAnswer([]);
      onGameOver(" 시간 초과!");
      onFinish();
      return;
    }

    if (!isCorrect) {
      onScoreCalculated(currentScore);
      onGameOver("잘못된 순서!");
      setTimeout(() => {
        setIsTimerActive(false);
      }, 500);
      setRound(0);
      setUserAnswer([]);
      onFinish();
      return;
    }

    //정답 처리
    if (userAnswer.length === answer.length) {
      const bonus = get();
      setCurrentScore(currentScore + 100 + bonus);
      BonusRestart();
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setUserRound((prev) => prev + 1);
        setIsTimerActive(false);
      }, 500);
    }
  };

  // 사용자 입력값 변경 시 정답 체크
  useEffect(() => {
    handleGame();
  }, [userAnswer]);

  // gameStep이 바뀔때마다 카드 변경
  useNumberCardTransition({
    trigger: gameStep,
    condition: gameStep === "first",
    setCardStatus,
    setIsTimerActive,
    setGameStartCountdown,
    setUserAnswer,
  });

  // round가 바뀔때마다 카드 변경
  useNumberCardTransition({
    trigger: round,
    condition: round === 0,
    setCardStatus,
    setIsTimerActive,
    setGameStartCountdown,
    setUserAnswer,
  });

  useEffect(() => {
    if (gameStartCountdown === null) return;
    if (gameStartCountdown === 0) {
      setGameStartCountdown(null);
      return;
    }

    const timer = setTimeout(() => {
      setGameStartCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameStartCountdown]);

  return (
    <>
      <CurrentGameScore score={currentScore} />

      <main className={S.playContainer}>
        {isTimerActive && (
          <StaticTimer
            duration={30}
            onTimeOver={() => handleGame(true)}
            isPlaying={isTimerActive}
            key={round}
          />
        )}
        {!isTimerActive && gameStartCountdown !== null && (
          <div className={S.gameStartCountdown}>
            <h3>
              <span>{gameStartCountdown}초</span> 뒤 게임 시작!
            </h3>
          </div>
        )}

        <div className={S.cardContainer}>
          <NumberCard
            key={`${gameStep}-${round}`}
            round={round}
            cardStatus={cardStatus}
            gameStep={gameStep}
            randomNumberList={randomNumberList}
            gridSize={gridSize}
            setUserAnswer={setUserAnswer}
            userRound={userRound}
          />
        </div>
      </main>
    </>
  );
}
export default NumberCardPlay;
