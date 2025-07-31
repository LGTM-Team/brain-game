import { AppLink } from "@/router/AppLink";
import PostCard from "../../components/post/PostCard";
import S from "./notice.module.css";
import qnaIcon from "@/assets/icons/qna.svg";

function NoticePage() {
  const handleToggle = () => {};
  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        <PostCard isContact={false} />
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
