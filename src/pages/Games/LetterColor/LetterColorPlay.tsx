import { useEffect } from "react";
import type { State } from "../components/PlayPage";
import S from "./LetterColorPlay.module.css";

interface Props {
  state: State;
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}
function LetterColorPlaying({
  state,
  onFinish,
  onScoreCalculated,
  onGameOver,
}: Props) {
  useEffect(() => {
    onScoreCalculated(2319845);
    onGameOver("타임오버!");
  }, []);

  return (
    <div className={S.container}>
      {state}
      <button onClick={() => onFinish()}>클릭하면 게임이 끝납니다</button>
    </div>
  );
}
export default LetterColorPlaying;
