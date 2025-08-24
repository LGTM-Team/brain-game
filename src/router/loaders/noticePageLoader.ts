import { getNoticeList } from "@/api/service/notice/getNoticeData";

export async function noticePageLoader() {
  const data = await getNoticeList();
  return data;
}