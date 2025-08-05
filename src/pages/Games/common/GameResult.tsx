import { useEffect, useState } from "react";
import Share from "../Share/components/ShareButton";
import S from "./styles/gameResult.module.css";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/api/service/supabase/supabase";
import { starConfetti } from "@/utils/confetti";

interface Props {
  onRestart: () => void;
  onWait: () => void;
  score: number | null;
  gameId: number | null;
}

interface RankingData {
  id: number;
  game_id: number;
  user_id: string;
  score: number;
}

function GameResult({ onRestart, onWait, score, gameId }: Props) {
  const { user, userProfile } = useAuth();
  const [rankingData, setRankingData] = useState<RankingData | null>(null);
  const [confettiPlayed, setConfettiPlayed] = useState(false);

  const isScoreNull = () => {
    if (score === null) {
      return `계산중...`;
    }

    return `${score.toLocaleString()}점`;
  };

  useEffect(() => {
    if (!user) return;

    const fetchRankingData = async () => {
      const { data, error } = await supabase
        .from("rankings")
        .select("*")
        .eq("user_id", userProfile?.id)
        .eq("game_id", gameId)
        .single();

      if (data) {
        setRankingData(data);
      }
      if (error) {
        console.error("랭킹 데이터를 불러오는걸 실패했습니다.");
      }
    };

    fetchRankingData();
  }, [score, user, userProfile?.id, gameId]);

  useEffect(() => {
    if (!confettiPlayed) {
      const timer = setTimeout(() => {
        starConfetti();
        setConfettiPlayed(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [confettiPlayed, score]);

  return (
    <div className={S.container}>
      <div className={S.inner}>
        <div className={S.score}>
          <div className={S.scoreBox}>
            <div className={S.currentScore}>현재점수</div>
            <div className={S.value}>{isScoreNull()}</div>
          </div>
          <div className={S.scoreBox}>
            <div className={S.highestScore}>최고점수</div>
            <div className={S.value}>
              {rankingData ? `${rankingData.score.toLocaleString()}점` : " - "}
            </div>
          </div>
        </div>
        <div className={S.buttonContainer}>
          <button type="button" onClick={onRestart} className={S.reStart}>
            다시 시작!
          </button>
          <button className={S.quit} type="button" onClick={onWait}>
            그만하기
          </button>
          <Share
            rankingId={rankingData && rankingData.id}
            userNickname={userProfile && userProfile.nickname}
            userHighestScore={rankingData && rankingData.score.toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}

export default GameResult;