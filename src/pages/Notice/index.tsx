import { AppLink } from "@/router/AppLink";
import PostCard from "@/common/post/PostCard";
import S from "./notice.module.css";
import qnaIcon from "@/assets/icons/qna.svg";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { NoticeList } from "@/api/service/notice/getNoticeData";
import Spinner from "@/common/layout/Spinner";

function NoticePage() {
  const noticeList = useLoaderData() as NoticeList | null;
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const onChangeToggle = (id: number) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        {!noticeList && <Spinner />}
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
