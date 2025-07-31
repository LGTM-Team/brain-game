export interface Ranking {
  id: number;
  user_id: number | string;
  game_id: "number" | "word" | "color";
  score: number;
  rank: number;
}

export type RankingList = Ranking[];

export const rankingData: RankingList = [
  {
    id: 1,
    user_id: 1,
    game_id: "number",
    score: 9999,
    rank: 1,
  },
  {
    id: 2,
    user_id: 2,
    game_id: "number",
    score: 9988,
    rank: 2,
  },
  {
    id: 3,
    user_id: 3,
    game_id: "number",
    score: 9888,
    rank: 3,
  },
  {
    id: 4,
    user_id: 4,
    game_id: "number",
    score: 8888,
    rank: 4,
  },
  {
    id: 5,
    user_id: 5,
    game_id: "number",
    score: 7778,
    rank: 5,
  },
  {
    id: 6,
    user_id: 6,
    game_id: "number",
    score: 3338,
    rank: 6,
  },
  {
    id: 7,
    user_id: 6,
    game_id: "number",
    score: 3222,
    rank: 7,
  },
  {
    id: 8,
    user_id: 8,
    game_id: "number",
    score: 2228,
    rank: 8,
  },
  {
    id: 9,
    user_id: 9,
    game_id: "number",
    score: 1118,
    rank: 9,
  },
];
