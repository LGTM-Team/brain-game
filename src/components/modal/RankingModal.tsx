import S from "./ranking.module.css";
import RankItem from "./RankItem";
import prizeIcon from "@/assets/icons/prize.svg";
import cancelIcon from "@/assets/icons/cancel.svg";
import { rankingData } from "./RankData";
import { useEffect, useState } from "react";

interface Props {
  gameName: string;
}

function RankingModal({ gameName }: Props) {
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const topScore = Math.max(...rankingData.map((item) => item.score));
    setMaxScore(topScore);
  }, []);
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
          {rankingData.map((item) => (
            <RankItem key={item.id} data={item} maxScore={maxScore} />
          ))}
        </div>
      </div>
    </>
  );
}
export default RankingModal;
