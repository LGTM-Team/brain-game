import { useEffect, useState } from "react";
import S from "./card.module.css";
import NumberCard from "./NumberCard";
import CurrentGameScore from "../../components/CurrentGameScore";
import Timer from "../../components/Timer";
import StaticTimer from "../../components/StaticTimer";
import { useNumberStep } from "@/hooks/useNumberStep";
import { useBonusScore } from "@/hooks/useBonusScore";

interface Props {
  state: "waiting" | "starting" | "playing" | "finish" | "result";
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}

// round : 게임 각 단계
// gameStep : grid가 바뀌는 단계

function NumberCardPlay({
  state,
  onFinish,
  onScoreCalculated,
  onGameOver,
}: Props) {
  const [currentScore, setCurrentScore] = useState(0);
  const { get, BonusRestart, BonusStart } = useBonusScore(10);
  const [round, setRound] = useState(0);
  const [cardStatus, setCardStatus] = useState<"shuffle" | "front" | "back">(
    "shuffle"
  );
  const [gameStep, setGameStep] = useState<
    "first" | "second" | "third" | "fourth"
  >("first");
  const { answer, randomNumberList } = useNumberStep(gameStep);
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const gridSize = Math.round(Math.sqrt(randomNumberList?.length ?? 1));

  // 게임 시작
  useEffect(() => {
    if (state === "playing") {
      setRound(1);
      setCurrentScore(0);
      BonusStart();
      setCardStatus("front");

      const gameStater = setTimeout(() => {
        setCardStatus("back");
      }, 3000);

      return () => {
        clearTimeout(gameStater);
      };
    }
  }, [state]);

  const handleGame = () => {
    if (!answer) return;
    const isCorrectSoFar = userAnswer.every((num, idx) => num === answer[idx]); // 정답인지 확인

    if (!isCorrectSoFar) {
      setUserAnswer([]);
      onGameOver("잘못된 순서!");
      onFinish();
      return;
    }

    if (userAnswer.length === answer.length) {
      console.log("🎉 모두 정답!", userAnswer);
      const bonus = get();
      BonusRestart();
      setRound((prev) => prev + 1);
    }
  };

  // 시간이 끝나면 타임 오버

  // 사용자 입력값 정답 체크
  useEffect(() => {
    handleGame();
  }, [userAnswer]);

  return (
    <>
      <CurrentGameScore score={currentScore} />

      <main className={S.playContainer}>
        <StaticTimer
          duration={60}
          onTimeOver={handleGame}
          isPlaying={state === "playing"}
          key={round}
        />
        <div className={S.cardContainer}>
          <NumberCard
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
