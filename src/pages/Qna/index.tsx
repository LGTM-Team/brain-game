import { AppLink } from "@/router/AppLink";
import PostCard from "../../components/post/PostCard";
import Question from "./components/Question";
import S from "./qna.module.css";
import postIcon from "@/assets/icons/post.svg";
import { useEffect, useState } from "react";

function QnaPage() {
  const [isOpenCard, setIsOpenCard] = useState(false);

  const onChangeToggle = () => {
    isOpenCard ? setIsOpenCard(false) : setIsOpenCard(true);
  };
  useEffect(() => {}, [isOpenCard]);
  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        <PostCard
          isContact={true}
          onChangeToggle={onChangeToggle}
          isOpenCard={isOpenCard}
        />
      </div>
      <div className={S.spacer}></div>
      <div className={S.iconBox}>
        <AppLink to="/notice" variant="page">
          <img src={postIcon} alt="고객문의로 이동" />
        </AppLink>
      </div>
    </div>
  );
}
export default QnaPage;
