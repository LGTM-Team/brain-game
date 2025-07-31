import { useEffect, useRef } from "react";
import S from "./writeQna.module.css";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function QnaWritePage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentsRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  //세션 없으면 로그인 페이지로 이동
  const { user } = useAuth();
  if (!user) {
    Swal.fire({
      icon: "error",
      text: "로그인이 필요합니다",
    }).then(async () => {
      navigate("/login", { replace: true });
    });
  }

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleValue = titleRef.current?.value;
    const contentsValue = contentsRef.current?.value;
    console.log("제목:", titleValue);
    console.log("내용:", contentsValue);
    if (titleRef.current) titleRef.current.value = "";
    if (contentsRef.current) contentsRef.current.value = "";
  };

  useEffect(() => {}, []);

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
