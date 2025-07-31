import { AppLink } from "@/router/AppLink";
import PostCard from "../../components/post/PostCard";
import S from "./notice.module.css";
import qnaIcon from "@/assets/icons/qna.svg";
import { useEffect, useState } from "react";

function NoticePage() {
  const [isOpenCard, setIsOpenCard] = useState(false);

  const onChangeToggle = () => {
    isOpenCard ? setIsOpenCard(false) : setIsOpenCard(true);
  };
  useEffect(() => {}, [isOpenCard]);
  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        <PostCard
          isContact={false}
          onChangeToggle={onChangeToggle}
          isOpenCard={isOpenCard}
        />
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
