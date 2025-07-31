import S from "./writeQna.module.css";

export default function QnaWritePage() {
  return (
    <div className={S.container}>
      <h5>제목</h5>
      <input type="text" placeholder="제목을 입력해 주세요" />
      <h5>내용</h5>
      <textarea />
      <div className={S.spacer}></div>
      <button>
        <p>작성 완료</p>
      </button>
    </div>
  );
}
