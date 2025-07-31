import { AppLink } from "@/router/AppLink";
import PostCard from "../../components/post/PostCard";
import Question from "./components/Question";
import S from "./qna.module.css";
import postIcon from "@/assets/icons/post.svg";

function QnaPage() {
  return (
    <div className={S.container}>
      <PostCard isContact={true} />
      <PostCard isContact={true} />
      <PostCard isContact={true} />
      <div className={S.iconBox}>
        <AppLink to="/notice" variant="page">
          <img src={postIcon} alt="고객문의로 이동" />
        </AppLink>
      </div>
    </div>
  );
}
export default QnaPage;
