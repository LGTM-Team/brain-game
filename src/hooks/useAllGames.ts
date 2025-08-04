import { useEffect, useState } from "react";
import { supabase } from "@/api/service/supabase/supabase";

// 타입 정의: games 테이블 전체 컬럼
export interface GameEntry {
  game_id: number;
  name: string;
  game_url: string | null;
  description: string;
}

// 훅: 모든 게임 정보를 가져오는 커스텀 훅
export function useAllGames() {
  const [games, setGames] = useState<GameEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("games")
        .select("*");

      if (error) {
        setError(error.message);
        setGames(null);
      } else {
        setGames(data as GameEntry[]);
      }

      setLoading(false);
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}
