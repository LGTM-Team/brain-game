import { AppLink } from "@/router/AppLink";
import PostCard from "@/common/post/PostCard";
import S from "./qna.module.css";
import postIcon from "@/assets/icons/post.svg";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { QnaList } from "@/api/service/qna/getQnaListData";
import Spinner from "@/common/layout/Spinner";

function QnaPage() {
  const qnaList = useLoaderData() as QnaList | null;
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const onChangeToggle = (id: number) => {
    setOpenCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        {!qnaList && <Spinner />}
        {qnaList?.map((item) => (
          <PostCard
            key={item.id}
            qnaData={item}
            onChangeToggle={() => onChangeToggle(item.id)}
            isOpenCard={openCardId === item.id}
          />
        ))}
      </div>

      <div className={S.spacer}></div>
      <div className={S.iconBox}>
        <AppLink to="/qna/write" variant="page">
          <img src={postIcon} alt="고객문의로 이동" />
        </AppLink>
      </div>
    </div>
  );
}
export default QnaPage;
