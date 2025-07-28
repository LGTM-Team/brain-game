import { useEffect, useState } from "react";

import Timer from "../../components/Timer";
import NumberCard from "./NumberCard";
import S from "./card.module.css";
import CurrentGameScore from "../../components/CurrentGameScore";

interface Props {
  state: "waiting" | "starting" | "playing" | "finish" | "result";
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}
function NumberCardPay({
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

  return (
    <>
      <CurrentGameScore score={score} />
      <Timer duration={10} onTimeOver={() => {}} mode="static" round={round} />
      <main className={S.playContainer}>
        <NumberCard round={round} />
      </main>
    </>
  );
}
export default NumberCardPay;
