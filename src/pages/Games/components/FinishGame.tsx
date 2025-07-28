import { useEffect } from "react";
import S from "./styles/finishGame.module.css";
import cryingNeuro from "@/assets/images/game/crying_neuro.svg";
import type { State } from "./PlayPage";

interface Props {
  state: State;
  onShowResult: () => void;
  gameOverMessage: string | null;
}

function FinishGame({ state, onShowResult, gameOverMessage }: Props) {
  useEffect(() => {
    if (state !== "finish") return;
    setTimeout(() => {
      onShowResult();
    }, 3000);
  }, []);

  return (
    <div className={S.container}>
      <div className={S.inner}>
        <div className={S.gameOver}>GAME OVER</div>
        <img src={cryingNeuro} alt="게임 오버" />
        <div className={S.box}>
          {gameOverMessage ? gameOverMessage : "로딩중..."}
        </div>
      </div>
    </div>
  );
}
export default FinishGame;
