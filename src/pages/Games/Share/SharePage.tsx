import neuro from "@/assets/images/numberGame/neuro7.svg";
import S from "./styles/sharePage.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useParams } from "react-router-dom";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import Spinner from "@/common/layout/Spinner";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { AppLink } from "@/router/AppLink";

interface Games {
  name: string;
}

interface RankingDataType {
  games: Games;
  id: number;
  score: number;
}

function SharePage() {
  const { rankingId } = useParams();
  const [rankingData, setRankingData] = useState<RankingDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [gamePath] = useState("/games");

  useEffect(() => {
    const fetchRankingData = async () => {
      if (!rankingId)
        return <NotFoundPage errorMessage={"랭킹 정보를 찾을 수 없습니다."} />;

      const { data, error }: PostgrestSingleResponse<RankingDataType> =
        await supabase
          .from("rankings")
          .select(`id,score,games!inner(name)`)
          .eq("id", rankingId)
          .single();

      if (data) {
        setRankingData({
          id: data.id,
          score: data.score,
          games: data.games,
        });
      }

      if (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchRankingData();
  }, [rankingId]);

  if (loading) {
    return <Spinner />;
  }
  if (!rankingData)
    return <NotFoundPage errorMessage={"랭킹 정보를 찾을 수 없습니다."} />;
  return (
    <div className={S.container}>
      <img src={neuro} alt="뉴로" />
      <div className={S.gameName}>{rankingData.games.name}</div>
      <div className={S.shareScore}>{rankingData.score.toLocaleString()}점</div>
      <p className={S.shareDescription}>
        게임 점수를 공유받았어요!
        <br /> 혹시 더 잘하실 자신 있으신가요?
      </p>
      <AppLink variant={"page"} to={gamePath} className={S.linkButton}>
        <button type="button">쫄?</button>
      </AppLink>
    </div>
  );
}

export default SharePage;
