import { useEffect, useState } from "react";
import { supabase } from "@/api/service/supabase/supabase";

// 타입: 내 랭킹 기준 랭킹 항목 (isMine 필드 추가)
export interface MyRankingEntry {
  id: number;
  user_id: string;
  score: number;
  rank: number;
  isMine: boolean;
  profiles?: {
    nickname: string;
  };
}

// 훅: 특정 게임 ID와 유저 ID에 대한 내 랭킹 기준 데이터를 가져옴
export function useMyRankingData(gameId: number, userId: string) {
  const [rankings, setRankings] = useState<MyRankingEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId || !userId) return;

    const fetchRankings = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. 먼저 내 랭킹을 찾기 위해 전체 랭킹 조회
        const { data: allRankings, error: allError } = await supabase
          .from("rankings")
          .select("id, user_id, score, profiles!inner(nickname)")
          .eq("game_id", gameId)
          .order("score", { ascending: false });

        if (allError) throw allError;

        // 2. 내 랭킹 찾기
        const myIndex = allRankings?.findIndex(r => r.user_id === userId) ?? -1;
        
        if (myIndex === -1) {
          // 내 기록이 없으면 상위 10명만 반환
          const { data: topRankings, error: topError } = await supabase
            .from("rankings")
            .select("id, user_id, score, profiles!inner(nickname)")
            .eq("game_id", gameId)
            .order("score", { ascending: false })
            .limit(10);

          if (topError) throw topError;

          const normalized: MyRankingEntry[] = topRankings?.map((r: any, index: number) => ({
            id: r.id,
            user_id: r.user_id,
            score: r.score,
            rank: index + 1,
            isMine: false,
            profiles: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles,
          })) || [];

          setRankings(normalized);
          setLoading(false);
          return;
        }

        // 3. 내 랭킹 계산
        const myRank = myIndex + 1;
        const totalRankings = allRankings?.length || 0;
        
        let selectedIndices: number[] = [];
        
        if (myRank <= 10) {
          // 내가 10등 안에 있으면 1~10등만 표시
          for (let i = 0; i < Math.min(10, totalRankings); i++) {
            selectedIndices.push(i);
          }
        } else {
          // 내가 10등 밖에 있으면 상위 6명 + 내 앞뒤 포함해서 선택
          // 상위 6명 인덱스 추가
          for (let i = 0; i < Math.min(6, totalRankings); i++) {
            selectedIndices.push(i);
          }
          
          // 내 앞뒤 포함 (중복 제거)
          const around = [myIndex - 1, myIndex, myIndex + 1].filter(i => 
            i >= 0 && i < totalRankings && !selectedIndices.includes(i)
          );
          selectedIndices.push(...around);
          
          // 9명이 안 되면 상위권에서 더 추가
          while (selectedIndices.length < 9 && selectedIndices.length < totalRankings) {
            const nextIndex = Math.max(...selectedIndices) + 1;
            if (nextIndex < totalRankings && !selectedIndices.includes(nextIndex)) {
              selectedIndices.push(nextIndex);
            } else {
              break;
            }
          }
        }
        
        // 인덱스 정렬 후 데이터 추출
        selectedIndices.sort((a, b) => a - b);
        
        const selectedRankings = selectedIndices.map(index => allRankings[index]);
        
        const normalized: MyRankingEntry[] = selectedRankings.map((r: any, index: number) => ({
          id: r.id,
          user_id: r.user_id,
          score: r.score,
          rank: selectedIndices[index] + 1, // 실제 랭킹 사용
          isMine: r.user_id === userId,
          profiles: Array.isArray(r.profiles) ? r.profiles[0] : r.profiles,
        }));

        setRankings(normalized);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setRankings(null);
      }

      setLoading(false);
    };

    fetchRankings();
  }, [gameId, userId]);

  return { rankings, loading, error };
}