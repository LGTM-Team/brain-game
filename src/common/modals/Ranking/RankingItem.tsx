import { useEffect, useState } from "react";
import { type AllRankingEntry } from "@/hooks/useAllRankingData";
import { type MyRankingEntry } from "@/hooks/useMyRankingData";
import S from "../style/ranking.module.css";

// 유니온 타입으로 두 타입 모두 받을 수 있도록
type RankingEntry = AllRankingEntry | MyRankingEntry;

interface Props {
  data: RankingEntry;
  maxScore: number;
}

// 타입 가드: MyRankingEntry인지 확인하는 함수
function isMyRankingEntry(data: RankingEntry): data is MyRankingEntry {
  return 'isMine' in data;
}

export default function RankingItem({ data, maxScore }: Props) {
  const { score, rank, profiles, user_id } = data;
  
  // isMine 필드가 있으면 사용, 없으면 false
  const isMine = isMyRankingEntry(data) ? data.isMine : false;

  const [rankClass, setClass] = useState("");
  const [scorePercentage, setScorePercentage] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // 애니메이션 지연을 위해 약간의 딜레이 추가
    const timer = setTimeout(() => {
      switch (rank) {
        case 1:
          setClass("first");
          break;
        case 2:
          setClass("second");
          break;
        case 3:
          setClass("third");
          break;
        default:
          setClass("");
      }

      if (maxScore > 0) {
        const padding = Math.pow(10, String(maxScore).length - 1);
        const percentage = Math.trunc((score / (maxScore + padding)) * 100);
        setScorePercentage(percentage);
        setIsAnimated(true);
      }
    }, 100); // 모달 애니메이션과 겹치지 않도록 지연

    return () => clearTimeout(timer);
  }, [maxScore, rank, score]);

  return (
    <table className={isMine ? S.isMine : ""}>
      <tbody>
        <tr className={S.rankItem}>
          <td className={`${S.rank} ${S[rankClass]}`}>
            <p>{rank}</p>
          </td>
          <td className={S.userInfo}>
            <div className={S.userNameScore}>
              <p>{profiles?.nickname ?? "익명"}</p>
              <span>{score.toLocaleString()}</span>
            </div>
            <div className={S.totalScore}>
              <div
                className={`${S.userScore} ${isAnimated ? S.animated : ''}`}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}