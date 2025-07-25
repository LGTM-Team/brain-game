import { useEffect, useState } from "react";

export const useNumberStep = (step: number) => {
  const [answer, setAnswer] = useState<number[] | null>(null);
  const [randomNumberList, setRandomNumberList] = useState<number[] | null>(
    null
  );

  useEffect(() => {
    let answerList: number[] = [];
    let boardSize = 0;

    if (step === 1) {
      answerList = [1, 2, 3];
      boardSize = 9;
    } else if (step === 2) {
      answerList = [1, 2, 3, 4, 5, 6, 7];
      boardSize = 16;
    } else if (step === 3) {
      answerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      boardSize = 20;
    } else if (step === 4) {
      answerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
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

// 중복 없는 랜덤 위치 N개 뽑기
const getRandomPositions = (count: number, range: number): number[] => {
  const indices = Array.from({ length: range }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
};
