import S from "../style/ranking.module.css";
import RankingItem from "./RankingItem";
import prizeIcon from "@/assets/icons/prize.svg";
import cancelIcon from "@/assets/icons/cancel.svg";
import { type AllRankingEntry } from "@/hooks/useAllRankingData";
import { type MyRankingEntry } from "@/hooks/useMyRankingData";
import { useEffect, useState } from "react";

// 유니온 타입으로 두 타입 모두 받을 수 있도록
type RankingEntry = AllRankingEntry | MyRankingEntry;

interface Props {
  gameName: string;
  isOpen: boolean;
  onClose: () => void;
  data: RankingEntry[];
}

function RankingModal({ gameName, isOpen, onClose, data }: Props) {
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    if (isOpen && data.length > 0) {
      const topScore = Math.max(...data.map((item) => item.score));
      setMaxScore(topScore);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;
  return (
    <>
      <div className={S.overlay} onClick={onClose}>
        <div className={S.modal} onClick={(e) => e.stopPropagation()}>
          <div className={S.close} onClick={onClose}>
            <img src={cancelIcon} alt="닫기" />
          </div>
          <div className={S.title}>
            <img src={prizeIcon} alt="랭킹 아이콘" />
            <h2>{gameName} 랭킹</h2>
          </div>
          {data.map((item) => (
            <RankingItem key={item.id} data={item} maxScore={maxScore} />
          ))}
        </div>
      </div>
    </>
  );
}
export default RankingModal;