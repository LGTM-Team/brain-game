import S from "./ranking.module.css";
import RankItem from "./RankItem";
import prizeIcon from "@/assets/icons/prize.svg";
import cancelIcon from "@/assets/icons/cancel.svg";

interface Props {
  gameName: string;
}

function RankingModal({ gameName }: Props) {
  return (
    <>
      <div className={S.overlay}>
        <div className={S.modal}>
          <div className={S.cancel}>
            <img src={cancelIcon} alt="닫기" />
          </div>

          <div className={S.title}>
            <img src={prizeIcon} alt="랭킹 아이콘" />
            <h2>{gameName} 랭킹</h2>
          </div>

          <RankItem />
        </div>
      </div>
    </>
  );
}
export default RankingModal;
