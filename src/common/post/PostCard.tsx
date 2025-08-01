import type { Qna } from "@/api/service/qna/getQnaListData";
import S from "./postCard.module.css";
import closeIcon from "@/assets/icons/postCardClose.svg";
import openIcon from "@/assets/icons/postCardOpen.svg";
import { formatDate } from "@/utils/getFormatDate";
import type { Notice } from "@/api/service/notice/getNoticeData";

interface Props {
  onChangeToggle: () => void;
  isOpenCard: boolean;
  qnaData?: Qna;
  noticeData?: Notice;
}

function PostCard({ qnaData, onChangeToggle, isOpenCard, noticeData }: Props) {
  if (qnaData) {
    const { id, title, is_answered, answer, created_at, profiles } = qnaData;
    const created_date = formatDate(created_at);
    return (
      <article className={S.postCardContainer} key={id}>
        <div className={`${S.category}`}>
          <span className={is_answered ? S.finish : ""}>
            {is_answered ? "답변 완료" : "답변 미완료"}
          </span>
        </div>
        <h3>{title}</h3>
        <div className={S.dateWithIcon}>
          <span>{created_date}</span>
          <p>{profiles.nickname}</p>

          {isOpenCard ? (
            <img src={openIcon} alt="펼치는 아이콘" onClick={onChangeToggle} />
          ) : (
            <img src={closeIcon} alt="접는 아이콘" onClick={onChangeToggle} />
          )}
        </div>
        {isOpenCard && (
          <div className={S.detailInformation}>
            <p>{is_answered ? answer : "등록된 답변이 없습니다"}</p>
          </div>
        )}
      </article>
    );
  }

  if (noticeData) {
    const { id, title, content, created_at } = noticeData;
    const created_date = formatDate(created_at);

    return (
      <article className={S.postCardContainer}>
        <h3>{title}</h3>
        <div className={S.dateWithIcon}>
          <span>{created_date}</span>

          {isOpenCard ? (
            <img src={openIcon} alt="펼치는 아이콘" onClick={onChangeToggle} />
          ) : (
            <img src={closeIcon} alt="접는 아이콘" onClick={onChangeToggle} />
          )}
        </div>
        {isOpenCard && (
          <div className={S.detailInformation}>
            <p>{content}</p>
          </div>
        )}
      </article>
    );
  }
}
export default PostCard;
