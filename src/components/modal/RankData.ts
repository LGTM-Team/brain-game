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
    score: 999999,
    rank: 1,
  },
  {
    id: 2,
    user_id: 2,
    game_id: "number",
    score: 999888,
    rank: 2,
  },
  {
    id: 3,
    user_id: 3,
    game_id: "number",
    score: 997888,
    rank: 3,
  },
  {
    id: 4,
    user_id: 4,
    game_id: "number",
    score: 988888,
    rank: 4,
  },
  {
    id: 5,
    user_id: 5,
    game_id: "number",
    score: 777888,
    rank: 5,
  },
  {
    id: 6,
    user_id: 6,
    game_id: "number",
    score: 333888,
    rank: 6,
  },
  {
    id: 7,
    user_id: 6,
    game_id: "number",
    score: 322888,
    rank: 7,
  },
  {
    id: 8,
    user_id: 8,
    game_id: "number",
    score: 222888,
    rank: 8,
  },
  {
    id: 9,
    user_id: 9,
    game_id: "number",
    score: 111888,
    rank: 9,
  },
];
