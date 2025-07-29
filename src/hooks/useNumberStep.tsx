import { getRandomPositions } from "@/utils/getRandom";
import { useEffect, useState } from "react";

export type Step = "first" | "second" | "third" | "fourth";

interface Props {
  step: Step;
  round: number; // 0부터 시작
  setGameStep: React.Dispatch<React.SetStateAction<Step>>;
}

const stepConfig: Record<
  Step,
  { min: number; max: number; boardSize: number; next: Step | null }
> = {
  first: { min: 3, max: 6, boardSize: 9, next: "second" },
  second: { min: 7, max: 12, boardSize: 16, next: "third" },
  third: { min: 13, max: 16, boardSize: 20, next: "fourth" },
  fourth: { min: 17, max: 20, boardSize: 25, next: null },
};

export const useNumberStep = ({ step, round, setGameStep }: Props) => {
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
