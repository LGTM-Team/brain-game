import type { LoaderFunctionArgs } from "react-router";
import { getAllGames, type GameEntry } from "@/api/service/game/getAllGames";

// 기본 게임 데이터 (에러 시 fallback용)
const defaultGames: GameEntry[] = [
  { game_id: 1, name: "숫자를 외워라!", game_url: null, description: "숫자를 기억하고@순서대로 맞춰보세요" },
  { game_id: 2, name: "초성 퀴즈", game_url: null, description: "초성을 보고@단어를 맞춰보세요" },
  { game_id: 3, name: "색깔을 맞춰라!", game_url: null, description: "색깔을 기억하고@순서대로 맞춰보세요" },
];

export async function homePageLoader({ request }: LoaderFunctionArgs) {
  try {
    const games = await getAllGames();

    return {
      games,
      error: null,
    };
  } catch (error) {
    console.error("홈 로더 에러:", error);
    
    // API 에러 메시지 추출
    const errorMessage = error instanceof Error ? error.message : "게임 데이터를 불러오는데 실패했습니다.";
    
    // 에러가 발생해도 기본 게임 데이터로 fallback
    return {
      games: defaultGames,
      error: errorMessage,
    };
  }
}

// 로더 데이터 타입 export (컴포넌트에서 사용)
export type HomeLoaderData = Awaited<ReturnType<typeof homePageLoader>>;