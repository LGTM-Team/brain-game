import { getRandomPositions } from "@/pages/Games/Number/components/getRandomCard";
import { useEffect, useState } from "react";

interface Props {
  step: string;
}

export const useNumberStep = (step: string) => {
  const [answer, setAnswer] = useState<number[] | null>(null);
  const [randomNumberList, setRandomNumberList] = useState<number[] | null>(
    null
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    let answerList: number[] = [];
    let boardSize = 0;

    if (step === "first") {
      answerList = [1, 2, 3];
      boardSize = 9;
    } else if (step === "second") {
      answerList = [1, 2, 3, 4, 5, 6, 7];
      boardSize = 16;
    } else if (step === "third") {
      answerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      boardSize = 20;
    } else if (step === "fourth") {
      answerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
      boardSize = 25;
    } else {
      return;
    }

    setAnswer(answerList);

    const board = Array(boardSize).fill(0);
    const positions = getRandomPositions(answerList.length, boardSize);

    const filledBoard = [...board];
    answerList.forEach((num, idx) => {
      filledBoard[positions[idx]] = num;
    });

    setRandomNumberList(filledBoard);
  }, [step]);

  return { answer, randomNumberList };
};
