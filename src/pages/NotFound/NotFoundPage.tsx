import ErrorImg from "@/assets/images/Error_neuro.svg";
import S from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={S.container}>
      <div>페이지를 찾을 수 없습니다.</div>
      <img src={ErrorImg} alt="에러 페이지 안내 이미지" />
    </div>
  );
}
export default NotFoundPage;
