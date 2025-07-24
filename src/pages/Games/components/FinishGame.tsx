import { useEffect, useState } from "react";
import S from "./styles/FinishGame.module.css";
import cryingNeuro from "@/assets/images/game/crying_neuro.svg";
import type { Play } from "./PlayPage";

interface Props {
  state: Play;
  onShowResult: () => void;
}

function FinishGame({ state, onShowResult }: Props) {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (state !== "finish") return;
    setResult("즉탈메세지 로직 만들어야해요...");
    setTimeout(() => {
      onShowResult();
    }, 3000);
  }, []);

  return (
    <div className={S.container}>
      <div className={S.inner}>
        <div className={S.gameOver}>GAME OVER</div>
        <img src={cryingNeuro} alt="게임 오버" />
        <div className={S.box}>{result}</div>
      </div>
    </div>
  );
}
export default FinishGame;
