import { useEffect, useState } from "react";
import S from "./card.module.css";
import NumberCard from "./NumberCard";
import CurrentGameScore from "../../components/CurrentGameScore";
import StaticTimer from "../../components/StaticTimer";
import { useNumberStep } from "@/hooks/useNumberStep";
import { useBonusScore } from "@/hooks/useBonusScore";
import { tr } from "framer-motion/client";

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
  const [cardStatus, setCardStatus] = useState<"front" | "back">("back");
  const [gameStep, setGameStep] = useState<
    "first" | "second" | "third" | "fourth"
  >("first");

  const { answer, randomNumberList } = useNumberStep({
    step: gameStep,
    round,
    setGameStep,
  });
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const gridSize = Math.round(Math.sqrt(randomNumberList?.length ?? 1));
  const [isTimerActive, setIsTimerActive] = useState(false);

  // 게임 시작
  useEffect(() => {
    if (state === "playing") {
      setCardStatus("front");
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
    if (isTimeout) {
      onScoreCalculated(currentScore);
      setUserAnswer([]);
      onGameOver(" 시간 초과!");
      onFinish();
      return;
    }

    if (!answer) return;
    const isCorrect = userAnswer.every((num, idx) => num === answer[idx]);

    // 게임 종료 처리
    if (!isCorrect) {
      onScoreCalculated(currentScore);
      setUserAnswer([]);
      onGameOver("잘못된 순서!");
      setIsTimerActive(false);
      onFinish();
      return;
    }

    //정답 검증 및 다음 라운드 진행
    if (userAnswer.length === answer.length) {
      setIsTimerActive(false);
      const bonus = get();
      setCurrentScore(currentScore + 100 + bonus);
      BonusRestart();
      setTimeout(() => {
        setRound((prev) => prev + 1);
      }, 500);
    }
  };

  // 사용자 입력값 변경 시 정답 체크
  useEffect(() => {
    handleGame();
  }, [userAnswer]);

  // 게임 단계 ui상 grid가 변경되면 ->  라운드와 사용자 입력 초기화
  useEffect(() => {
    setRound(0);
    setUserAnswer([]);
    if (gameStep === "first") return;
    setIsTimerActive(false);
    setCardStatus("back"); // 0초: 뒷면

    const toFront = setTimeout(() => {
      setCardStatus("front"); // 2초: 앞면
    }, 2000);

    const toBack = setTimeout(() => {
      setCardStatus("back"); // 7초: 다시 뒷면
      setIsTimerActive(true);
    }, 2000 + 3000);

    return () => {
      clearTimeout(toFront);
      clearTimeout(toBack);
    };
  }, [gameStep]);

  // round 변경시 카드 상태 초기화
  useEffect(() => {
    if (round === 0) return;
    setUserAnswer([]);
    setIsTimerActive(false);
    setCardStatus("back"); // 0초: 뒷면

    const toFront = setTimeout(() => {
      setCardStatus("front"); // 2초: 앞면
    }, 2000);

    const toBack = setTimeout(() => {
      setIsTimerActive(true);
      setCardStatus("back"); // 7초: 다시 뒷면
    }, 2000 + 3000);

    return () => {
      clearTimeout(toFront);
      clearTimeout(toBack);
    };
  }, [round]);

  return (
    <>
      <CurrentGameScore score={currentScore} />

      <main className={S.playContainer}>
        <StaticTimer
          duration={30}
          onTimeOver={() => handleGame(true)}
          isPlaying={isTimerActive}
          key={round}
        />
        <div className={S.cardContainer}>
          <NumberCard
            key={`${gameStep}-${round}`}
            round={round}
            cardStatus={cardStatus}
            gameStep={gameStep}
            randomNumberList={randomNumberList}
            gridSize={gridSize}
            setUserAnswer={setUserAnswer}
          />
        </div>
      </main>
    </>
  );
}
export default NumberCardPlay;
