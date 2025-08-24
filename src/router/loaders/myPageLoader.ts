import { supabase } from "@/api/service/supabase/supabase";
import { getAllGames } from "@/api/service/game/getAllGames";
import type { GameEntry } from "@/api/service/game/getAllGames";
import type { Notice } from "@/api/service/notice/getNoticeData";

export async function myPageLoader(): Promise<{
  latestNotice: Notice[];
  games: GameEntry[];
}> {
  const { data: noticeData, error: noticeError } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (noticeError) {
    throw new Response("공지사항 불러오기 실패", { status: 500 });
  }

  const games = await getAllGames();

  return {
    latestNotice: noticeData ?? [],
    games,
  };
}