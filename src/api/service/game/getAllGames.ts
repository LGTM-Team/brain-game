import { supabase } from "@/api/service/supabase/supabase";

// supabase games 테이블 전체 컬럼 타입.
export interface GameEntry {
  game_id: number;
  name: string;
  segment: string | null;
  description: string;
  img_url:string;
}

// 모든 게임 목록을 가져오는 API 함수
export async function getAllGames(): Promise<GameEntry[]> {
  const { data, error } = await supabase
    .from("games")
    .select("*");

  if (error) {
    throw new Error(`게임 데이터 조회 실패: ${error.message}`);
  }

  return data as GameEntry[];
}