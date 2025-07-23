import { supabase } from "@/services/supabase";
import { useState } from "react";

export function usePasswordReset() {
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태


  //1단계: 비밀번호 재설정 이메일 요청
  const sendResetEmail = async (email: string, redirectTo: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) throw error;

      return true; // 성공
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("비밀번호 재설정 이메일 요청 중 알 수 없는 오류가 발생했습니다.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //2단계: 새로운 비밀번호 저장 (토큰 기반 로그인 상태여야 가능)
  const updatePassword = async (newPassword: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("비밀번호 변경 중 알 수 없는 오류가 발생했습니다.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendResetEmail, updatePassword, loading, error };
}

export default usePasswordReset;