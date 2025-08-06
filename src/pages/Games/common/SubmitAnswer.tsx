import { useEffect, useRef } from "react";
import S from "./styles/submitAnswer.module.css";
import submitIcon from "@/assets/icons/submit.svg";

interface Props {
  placeholder: string;
  onSubmit: (value: string) => void;
}

function SubmitAnswer({ placeholder, onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // 컴포넌트 로드시 자동 포커스
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim() || "";
    if (value) {
      onSubmit(value); // 부모로 전달
      inputRef.current!.value = ""; // 입력 초기화
      inputRef.current!.focus(); //입력 후 자동 포커스
    }
  };

  return (
    <form className={S.container} onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder={placeholder} />
      <button type="submit">
        <img src={submitIcon} alt="제출 아이콘" />
      </button>
    </form>
  );
}
export default SubmitAnswer;
