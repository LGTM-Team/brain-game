import S from "./styles/finishGame.module.css";
import cryingNeuro from "@/assets/images/pages/game/crying_neuro.svg";

interface Props {
  gameOverMessage: string | null;
}

function FinishGame({ gameOverMessage }: Props) {
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
