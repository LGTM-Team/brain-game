import { useState } from "react";
import S from "./styles/GameResult.module.css";
import resultNeuro from "@/assets/images/game/result_neuro.svg";

interface Props {
  onStart: () => void;
  onWait: () => void;
}

function GameResult({ onStart, onWait }: Props) {
  const [score] = useState(23331);
  return (
    <div className={S.container}>
      <div className={S.inner}>
        <div className={S.score}>
          <div>당신의 점수</div>
          <div className={S.value}>{score}점</div>
        </div>
        <img src={resultNeuro} alt="게임 결과" />
        <div className={S.buttonContainer}>
          <button type="button" onClick={onStart}>
            다시 시작!
          </button>
          <button className={S.quit} type="button" onClick={onWait}>
            그만하기
          </button>
        </div>
      </div>
    </div>
  );
}
export default GameResult;
