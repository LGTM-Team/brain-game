import S from "../notice.module.css";
import foldingIcon from "@/assets/icons/folding.svg";

function Notice() {
  return (
    <article className={S.noticeContainer}>
      <h3>공지사항 입니다</h3>
      <div className={S.dateWithIcon}>
        <span>25.07.18</span>
        <img src={foldingIcon} alt="접는 아이콘" />
      </div>
    </article>
  );
}
export default Notice;
