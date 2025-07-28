import { useEffect, useState } from "react";
import CardBack from "./CardBack";
import CardFront from "./CardFront";
import { motion, AnimatePresence } from "framer-motion";
import S from "./card.module.css";
import { useNumberStep } from "../../../../hooks/useNumberStep";
import ShuffleCard from "./ShuffleCard";

interface Props {
  round: number;
}
// round : 게임 각 단계
// gameStep : grid가 바뀌는 단계

function NumberCard({ round }: Props) {
  const [cardSide, setCardSide] = useState<"shuffle" | "front" | "back">(
    "shuffle"
  );
  const [gameStep, setGameStep] = useState<
    "first" | "second" | "third" | "fourth"
  >("fourth");
  const { answer, randomNumberList } = useNumberStep(gameStep);
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const gridSize = Math.round(Math.sqrt(randomNumberList?.length ?? 1));

  useEffect(() => {
    const shuffleTimer = setTimeout(() => {
      setCardSide("front");
    }, 4000);
    const gameStater = setTimeout(() => {
      setCardSide("back");
    }, 7000);
    return () => {
      clearTimeout(shuffleTimer);
      clearTimeout(gameStater);
    };
  }, []);

  // 사용자 입력값 정답 체크
  useEffect(() => {
    if (!answer) return;
    const isCorrectSoFar = userAnswer.every((num, idx) => num === answer[idx]);

    if (!isCorrectSoFar) {
      console.log("❌ 탈락", userAnswer);
      // 필요 시 초기화나 shake 효과
      setUserAnswer([]);
      return;
    }

    if (userAnswer.length === answer.length) {
      console.log("🎉 모두 정답!", userAnswer);
    }
  }, [userAnswer]);

  return (
    <>
      <AnimatePresence mode="wait">
        {cardSide === "shuffle" && (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShuffleCard
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
            />
          </motion.div>
        )}
        {cardSide === "front" && (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardFront
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
            />
          </motion.div>
        )}
        {cardSide === "back" && (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardBack
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
              setUserAnswer={setUserAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default NumberCard;
