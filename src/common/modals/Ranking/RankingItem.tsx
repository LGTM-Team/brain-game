import { useEffect, useState } from "react";
import type { Ranking } from "./RankData";
import S from "../style/ranking.module.css";

interface Props {
  data: Ranking;
  maxScore: number;
}

export default function RankingItem({ data, maxScore }: Props) {
  const { id, game_id, score, rank } = data;
  const [rankClass, setClass] = useState("");
  const [isMine, setIsMine] = useState(false); // TODO: uuid 같을때만 true로 변경
  const [scorePercentage, setScorePercentage] = useState(0);

  const getRankClass = () => {
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
        break;
    }
  };
  useEffect(() => {
    getRankClass();
    const padding = Math.pow(10, String(maxScore).length - 1);
    setScorePercentage(Math.trunc((score / (maxScore + padding)) * 100));
  }, [maxScore]);

  return (
    <>
      <table className={isMine ? S.isMine : ""}>
        <tbody>
          <tr className={S.rankItem}>
            <td className={S.rank + " " + S[rankClass]}>
              <p>{rank}</p>
            </td>
            <td className={S.userInfo}>
              <div className={S.userNameScore}>
                <p> 로지</p>
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
    </>
  );
}
