import { useEffect } from "react";

interface Props {
  gameStartCountdown: number;
  setGameStartCountdown: React.Dispatch<React.SetStateAction<number>>;
}

export const useCountdownTimer = ({
  gameStartCountdown,
  setGameStartCountdown,
}: Props) => {
  useEffect(() => {
    if (gameStartCountdown === null) return;
    if (gameStartCountdown === 0) {
      setGameStartCountdown(0);
      return;
    }

    const timer = setTimeout(() => {
      setGameStartCountdown((prev) => (prev !== 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameStartCountdown]);
};
