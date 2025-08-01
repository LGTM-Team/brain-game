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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // 애니메이션 완료 후 모달 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // CSS 애니메이션 시간과 맞춤
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && data.length > 0) {
      const topScore = Math.max(...data.map((item) => item.score));
      setMaxScore(topScore);
    }
  }, [isOpen, data]);

  if (!isVisible) return null;
  
  return (
    <>
      <div className={`${S.overlay} ${isOpen ? S.overlayVisible : ''}`} onClick={onClose}>
        <div className={`${S.modal} ${isOpen ? S.modalVisible : ''}`} onClick={(e) => e.stopPropagation()}>
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