import { useRef } from "react";
import S from "./writeQna.module.css";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { insertQna } from "@/api/service/qna/insertQna";

export default function QnaWritePage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  //로그인 유저인지 확인
  const { user } = useAuth();
  if (!user) {
    Swal.fire({
      icon: "error",
      text: "로그인이 필요합니다",
    }).then(async () => {
      navigate("/login", { replace: true });
    });
  }

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleValue = titleRef.current?.value;
    const contentsValue = contentsRef.current?.value;
    const response = await insertQna({
      user_id: user?.id!,
      title: titleValue!,
      content: contentsValue!,
    });
    if (response === 201) {
      navigate("/qna", { replace: true });
    }
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
