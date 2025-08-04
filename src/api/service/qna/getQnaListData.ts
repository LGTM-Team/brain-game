import { supabase } from "@/api/service/supabase/supabase";

export interface Qna {
  id: number;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  is_answered: boolean;
  answer: string;
  answer_at: string;
  profiles: {
    nickname: string;
  };
}

export type QnaList = Qna[];

export const getQnaList = async (): Promise<QnaList | null> => {
  const { data, error } = await supabase
    .from("customer_support")
    .select(
      `
      *,
      profiles (
        nickname
      )
    `
    )
    .order("created_at", { ascending: false });
  if (error || !data) {
    console.log("고객 문의 센터 조회 api 실패:", error);
  }
  return data;
};
