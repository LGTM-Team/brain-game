import S from "./postCard.module.css";
import closeIcon from "@/assets/icons/postCardClose.svg";
import openIcon from "@/assets/icons/postCardOpen.svg";

interface Props {
  isContact: boolean;
  onChangeToggle: () => void;
  isOpenCard: boolean;
}

function PostCard({ isContact, onChangeToggle, isOpenCard }: Props) {
  return (
    <article className={S.postCardContainer}>
      {isContact && (
        <div className={`${S.category}`}>
          <span className={S.finish}>답변 완료</span>
        </div>
      )}
      <h3>
        공지사항 입니다공지사항 입니다공지사항 입니다공지사항 입니다공지사항
        입니다 공지사항 입니다 공지사항 입니다
      </h3>
      <div className={S.dateWithIcon}>
        <span>25.07.18</span>
        {isContact && <p>작성자</p>}

        {isOpenCard ? (
          <img src={openIcon} alt="펼치는 아이콘" onClick={onChangeToggle} />
        ) : (
          <img src={closeIcon} alt="접는 아이콘" onClick={onChangeToggle} />
        )}
      </div>
      {isOpenCard && (
        <div className={S.detailInformation}>
          <p>
            어쩌구 저쩌구 공지사항입니다 잘 부탁드립니다 문의사항이 있다면
            공지사항에 말씀하십셔 무엇이든 들어드립니다 예예 들어만 드립니다
            빠른 해결은 어렵습니다 어쩌구 저쩌구 공지사항입니다 잘 부탁드립니다
            문의사항이 있다면 공지사항에 말씀하십셔 무엇이든 들어드립니다 예예
            들어만 드립니다 빠른 해결은 어렵습니다 어쩌구 저쩌구 공지사항입니다
            잘 부탁드립니다 문의사항이 있다면 공지사항에 말씀하십셔 무엇이든
            들어드립니다 예예 들어만 드립니다 빠른 해결은 어렵습니다 어쩌구
            저쩌구 공지사항입니다 잘 부탁드립니다 문의사항이 있다면 공지사항에
            말씀하십셔 무엇이든 들어드립니다 예예 들어만 드립니다 빠른 해결은
            어렵습니다
          </p>
        </div>
      )}
    </article>
  );
}
export default PostCard;
