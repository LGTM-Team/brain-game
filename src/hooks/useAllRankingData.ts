import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";

// 타입: 전체 랭킹 항목
export interface AllRankingEntry {
  id: number;
  user_id: string;
  score: number;
  rank: number;
  profiles?: {
    nickname: string;
  };
}

// 훅: 특정 게임 ID에 대한 전체 랭킹 데이터를 가져옴
export function useAllRankingData(gameId: number) {
  const [rankings, setRankings] = useState<AllRankingEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // gameId가 없으면 훅을 실행하지 않음
    if (!gameId) {
      setRankings(null);
      setLoading(false);
      return;
    }

    // gameId가 변경될 때 즉시 이전 데이터 초기화.
    setRankings(null);
    setLoading(true);
    setError(null);

    const fetchRankings = async () => {
      try {
        const { data, error } = await supabase
          .from("rankings")
          .select("id, user_id, score, profiles!inner(nickname)")
          .eq("game_id", gameId)
          .order("score", { ascending: false })
          .limit(10);

        if (error) {
          setError(error.message);
          setRankings(null);
        } else if (Array.isArray(data)) {
          const normalized: AllRankingEntry[] = data.map((r: any, index: number) => ({
            id: r.id,
            user_id: r.user_id,
            score: r.score,
            rank: index + 1,
            profiles: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles,
          }));

          setRankings(normalized);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setRankings(null);
      }

      setLoading(false);
    };

    fetchRankings();
  }, [gameId]);

  return { rankings, loading, error };
}