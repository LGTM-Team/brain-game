import { getQnaList } from "@/api/service/qna/getQnaListData";

export async function qnaPageLoader() {
  const data = await getQnaList();
  return data;
}