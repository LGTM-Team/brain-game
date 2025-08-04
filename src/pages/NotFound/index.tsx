import errorImg from "@/assets/images/pages/error/error_neuro.svg";
import S from "./NotFoundPage.module.css";

interface Props {
  errorMessage: string;
}

function NotFoundPage({ errorMessage }: Props) {
  return (
    <div className={S.container}>
      <div>{errorMessage}</div>
      <img src={errorImg} alt="에러 페이지 안내 이미지" />
    </div>
  );
}
export default NotFoundPage;
