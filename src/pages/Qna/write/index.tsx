import { useRef } from "react";
import S from "./writeQna.module.css";

export default function QnaWritePage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleValue = titleRef.current?.value;
    const contentsValue = contentsRef.current?.value;
    console.log("제목:", titleValue);
    console.log("내용:", contentsValue);
    if (titleRef.current) titleRef.current.value = "";
    if (contentsRef.current) contentsRef.current.value = "";
  };

  return (
    <form className={S.container} onSubmit={handleForm}>
      <h5>제목</h5>
      <input ref={titleRef} type="text" placeholder="제목을 입력해 주세요" />
      <h5>내용</h5>
      <textarea ref={contentsRef} placeholder="상세 내용을 입력해 주세요" />
      <div className={S.spacer}></div>
      <button type="submit">
        <p>작성 완료</p>
      </button>
    </form>
  );
}
