import { useEffect } from "react";

interface Props {
  trigger: number | string;
  condition?: boolean;
  setCardStatus: (status: "front" | "back" | "shuffle") => void;
  setIsTimerActive: (active: boolean) => void;
  setGameStartCountdown: (count: number) => void;
  setUserAnswer: (answers: number[]) => void;
}

export function useNumberCardTransition({
  trigger,
  condition = false,
  setCardStatus,
  setIsTimerActive,
  setGameStartCountdown,
  setUserAnswer,
}: Props) {
  useEffect(() => {
    if (condition) return;

    setUserAnswer([]);
    setIsTimerActive(false);
    setCardStatus("shuffle");

    const toFront = setTimeout(() => {
      setCardStatus("front");
      setGameStartCountdown(3);
    }, 3000);

    const toBack = setTimeout(() => {
      setCardStatus("back");
      setIsTimerActive(true);
    }, 6000);

    return () => {
      clearTimeout(toFront);
      clearTimeout(toBack);
    };
  }, [trigger]);
}
