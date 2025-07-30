import type {
  FailRound,
  SuccessRound,
  ValidateAnswer,
} from "@/types/numberGame.type";

export const validateAnswer = ({
  answer,
  userAnswer,
}: ValidateAnswer): boolean => {
  if (!answer) return false;
  const result = userAnswer!.every((num, idx) => num === answer[idx]);
  return result;
};

export const onFailRound = ({
  onScoreCalculated,
  onFinish,
  onGameOver,
  currentScore,
  setIsTimerActive,
}: FailRound) => {
  onScoreCalculated(currentScore);
  onGameOver("잘못된 순서입니다!");
  onFinish();
  setTimeout(() => {
    setIsTimerActive!(false);
  }, 500);
};

export const onSuccessRound = ({
  bonus,
  currentScore,
  setCurrentScore,
  setRound,
  setUserRound,
  setUserAnswer,
}: SuccessRound): Promise<void> => {
  return new Promise((resolve) => {
    setCurrentScore(currentScore + 100 + bonus);

    setTimeout(() => {
      setRound((prev) => prev + 1);
      setUserRound((prev) => prev + 1);
      setUserAnswer([]);
      resolve();
    }, 500);
  });
};
