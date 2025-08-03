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

  // 랭킹 데이터 처리 - 연속되지 않는 순위 사이에 ... 표시
  const processedData = (): (RankingEntry | 'dots')[] => {
    if (data.length === 0) return [];
    
    const result: (RankingEntry | 'dots')[] = [];
    
    for (let i = 0; i < data.length; i++) {
      const currentItem = data[i];
      const prevItem = data[i - 1];
      
      // 이전 아이템이 있고, 순위가 연속되지 않으면 ... 추가
      if (prevItem && currentItem.rank - prevItem.rank > 1) {
        result.push('dots' as const);
      }
      
      result.push(currentItem);
    }
    
    return result;
  };

  const displayData = processedData();

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
          <div className={S.rankingContent}>
            {displayData.map((item, index) => {
              if (typeof item === 'string' && item === 'dots') {
                return (
                  <div key="dots" className={S.dotsContainer}>
                    <div className={S.dots}>...</div>
                  </div>
                );
              }
              return (
                <RankingItem key={(item as RankingEntry).id} data={item as RankingEntry} maxScore={maxScore} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default RankingModal;