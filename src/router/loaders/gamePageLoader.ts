import { getAllGames } from "@/api/service/game/getAllGames"

export async function gamePageLoader() {
  try {
    const games = await getAllGames();
    return games;
  } catch (error) {
    console.error("게임 로더 에러:", error);
    throw error;
  }
}