import { supabase } from "@/services/supabase";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ // supabase 로그인 시도.
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (err: unknown) {
      
      if (err instanceof Error) { // 타입 가드. 에러가 정말 존재 하는지.
        setError(err.message);
      } else {
        setError("로그인 시도중 알 수 없는 오류가 발생했습니다.");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
}
export default useLogin;
