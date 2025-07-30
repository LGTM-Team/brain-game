export type GameStep = "first" | "second" | "third" | "fourth";
export type CardStatus = "front" | "back" | "shuffle";

export interface ValidateAnswer {
  answer: number[] | null;
  userAnswer: number[] | null;
}

export interface FailRound {
  onScoreCalculated: (score: number) => void;
  onFinish: () => void;
  onGameOver: (message: string) => void;
  currentScore: number;
  setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SuccessRound {
  bonus: number;
  currentScore: number;
  setCurrentScore: React.Dispatch<React.SetStateAction<number>>;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setUserRound: React.Dispatch<React.SetStateAction<number>>;
  setUserAnswer: React.Dispatch<React.SetStateAction<number[]>>;
  isReadyForNextRound?: boolean;
}
