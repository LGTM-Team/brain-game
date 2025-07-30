import { supabase } from "@/services/supabase";
import { useState } from "react";

export function useSignUp() {
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/post-sign-up", // 이메일 인증 후 리디렉션 주소
        },
      });

      if (error) throw error;

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        // 타입 가드. 에러가 정말 존재 하는지.
        setError(err.message);
      } else {
        setError("회원가입 시도 중 알 수 없는 오류가 발생했습니다.");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };
  return { signUp, loading, error };
}
export default useSignUp;
