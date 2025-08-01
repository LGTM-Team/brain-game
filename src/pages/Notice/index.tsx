import { AppLink } from "@/router/AppLink";
import PostCard from "../../common/post/PostCard";
import S from "./notice.module.css";
import qnaIcon from "@/assets/icons/qna.svg";
import { useEffect, useState } from "react";
import {
  getNoticeList,
  type NoticeList,
} from "@/api/service/notice/getNoticeData";

function NoticePage() {
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const [noticeList, setNoticeList] = useState<NoticeList | null>(null);
  const onChangeToggle = (id: number) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };
  useEffect(() => {
    const fetchNoticeData = async () => {
      const data = await getNoticeList();
      setNoticeList(data);
    };

    fetchNoticeData();
  }, []);

  useEffect(() => {}, [openCardId]);
  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        {noticeList?.map((item) => (
          <PostCard
            key={item.id}
            noticeData={item}
            onChangeToggle={() => onChangeToggle(item.id)}
            isOpenCard={openCardId === item.id}
          />
        ))}
      </div>
      <div className={S.spacer}></div>
      <div className={S.iconBox}>
        <AppLink to="/qna" variant="page">
          <img src={qnaIcon} alt="고객문의로 이동" />
        </AppLink>
      </div>
    </div>
  );
}
export default NoticePage;
