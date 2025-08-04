import { supabase } from "@/api/service/supabase/supabase";

export interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export type NoticeList = Notice[];

export const getNoticeList = async (): Promise<NoticeList | null> => {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) {
    console.log("공지사항 조회 api 실패:", error);
  }
  return data;
};
