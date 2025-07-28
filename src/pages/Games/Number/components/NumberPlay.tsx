import { useEffect, useState } from "react";
import S from "./card.module.css";
import NumberCard from "./NumberCard";
import CurrentGameScore from "../../components/CurrentGameScore";
import Timer from "../../components/Timer";
import StaticTimer from "../../components/StaticTimer";

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
  const [score, setScore] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (state === "starting") {
      setScore(0);
      setRound(0);
    }
  }, [state]);

  // 정답인지 확인
  const handleGame = () => {};

  return (
    <>
      <CurrentGameScore score={score} />

      <main className={S.playContainer}>
        <StaticTimer
          duration={60}
          onTimeOver={handleGame}
          isPlaying={state === "playing"}
          key={round}
        />
        <div className={S.cardContainer}>
          <NumberCard round={round} />
        </div>
      </main>
    </>
  );
}
export default NumberCardPlay;
