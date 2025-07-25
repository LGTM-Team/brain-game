import S from "./styles/GameResult.module.css";
import resultNeuro from "@/assets/images/game/result_neuro.svg";

interface Props {
  onRestart: () => void;
  onWait: () => void;
  score: number | null;
}

function GameResult({ onRestart, onWait, score }: Props) {
  return (
    <div className={S.container}>
      <div className={S.inner}>
        <div className={S.score}>
          <div>당신의 점수</div>
          <div className={S.value}>{score ? `${score}점` : "계산중..."}</div>
        </div>
        <img src={resultNeuro} alt="게임 결과" />
        <div className={S.buttonContainer}>
          <button type="button" onClick={onRestart}>
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
