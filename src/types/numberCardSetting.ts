import type { CardStatus } from "@/types/numberGame.type";

interface Props {
  setCardStatus: React.Dispatch<React.SetStateAction<CardStatus>>;
  setGameStartCountdown?: React.Dispatch<React.SetStateAction<number>>;
  setIsTimerActive?: React.Dispatch<React.SetStateAction<boolean>>;
  BonusRestart?: () => void;
  BonusStart?: () => void;
  isReadyForNextRound?: boolean;
  isStartFirstRound?: boolean;
}

export const showFrontCard = ({
  setCardStatus,
  setGameStartCountdown,
}: Props) => {
  setCardStatus("front");
  setGameStartCountdown!(3);
};

export const showBackCard = ({
  setIsTimerActive,
  setCardStatus,
  isReadyForNextRound,
  isStartFirstRound,
  BonusRestart,
  BonusStart,
}: Props) => {
  setTimeout(() => {
    setCardStatus("back");
    setIsTimerActive!(true);
    if (isStartFirstRound) BonusStart!();
    if (isReadyForNextRound) BonusRestart!();
  }, 3000);
};

export const showShuffleCard = ({
  setCardStatus,
  setIsTimerActive,
  setGameStartCountdown,
  BonusStart,
  BonusRestart,
  isReadyForNextRound,
}: Props): Promise<void> => {
  return new Promise((resolve) => {
    setCardStatus("shuffle");
    setIsTimerActive!(false);

    setTimeout(() => {
      showFrontCard({ setCardStatus, setGameStartCountdown });
      showBackCard({
        setIsTimerActive,
        setCardStatus,
        isReadyForNextRound,
        BonusRestart,
        BonusStart,
      });
      resolve();
    }, 3000);
  });
};
