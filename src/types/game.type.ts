export interface PlayGame {
  state: "waiting" | "starting" | "playing" | "finish" | "result";
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}
