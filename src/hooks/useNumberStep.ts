import type { GameStep } from "@/types/numberGame.type";
import { getRandomPositions } from "@/utils/getRandom";
import { useEffect, useState } from "react";

interface Props {
  step: GameStep;
  round: number; // 0부터 시작
  setGameStep: React.Dispatch<React.SetStateAction<GameStep>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
}

const stepConfig: Record<
  GameStep,
  { min: number; max: number; boardSize: number; next: GameStep | null }
> = {
  first: { min: 3, max: 6, boardSize: 9, next: "second" },
  second: { min: 7, max: 12, boardSize: 16, next: "third" },
  third: { min: 13, max: 16, boardSize: 20, next: "fourth" },
  fourth: { min: 17, max: 20, boardSize: 25, next: null },
};

export const useNumberStep = ({
  step,
  round,
  setGameStep,
  setRound,
}: Props) => {
  const [answer, setAnswer] = useState<number[] | null>(null);
  const [randomNumberList, setRandomNumberList] = useState<number[] | null>(
    null
  );

  useEffect(() => {
    const config = stepConfig[step as keyof typeof stepConfig];
    if (!config) return;
    const targetLength = config.min + round;

    if (targetLength > config.max) {
      if (config.next) {
        setGameStep(config.next);
        setRound(0);
      }
      return;
    }

    const answerList = Array.from({ length: targetLength }, (_, i) => i + 1);
    setAnswer(answerList);

    const board = Array(config.boardSize).fill(0);
    const positions = getRandomPositions(answerList.length, config.boardSize);

    const filledBoard = [...board];
    answerList.forEach((num, idx) => {
      filledBoard[positions[idx]] = num;
    });

    setRandomNumberList(filledBoard);
  }, [step, round]);

  return { answer, randomNumberList };
};
