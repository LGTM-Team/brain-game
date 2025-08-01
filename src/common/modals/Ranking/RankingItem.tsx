import { useEffect, useState } from "react";
import { type AllRankingEntry } from "@/hooks/useAllRankingData";
import S from "../style/ranking.module.css";

interface Props {
  data: AllRankingEntry;
  maxScore: number;
}

export default function RankingItem({ data, maxScore }: Props) {
  const { score, rank, profiles, user_id } = data;

  const [rankClass, setClass] = useState("");
  const [isMine, setIsMine] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  useEffect(() => {
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

    const padding = Math.pow(10, String(maxScore).length - 1);
    const percentage = Math.trunc((score / (maxScore + padding)) * 100);
    setScorePercentage(percentage);
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
                className={S.userScore}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}