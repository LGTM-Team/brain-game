import { supabase } from "@/services/supabase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import S from "./PendingEmail.module.css";


function PendingEmail() {
   const navigate = useNavigate();


  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.email_confirmed_at) {
          navigate("/"); // 인증 완료 → 홈 이동
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

  },[])


  return (
      <main className={S.container}>
        <p>메일을 확인해 주세요!</p>
        <p>당신의 뇌가 깨어날 준비를 하고 있어요!</p>
        <img src="#" alt="이메일 대기 화면 이미지" />
        <p>방금 전송된 인증 메일의 버튼을 눌러 뇌하수체의 문을 여세요♥️</p>
        <button type="button">새로고침</button>
      </main>
  )
}
export default PendingEmail