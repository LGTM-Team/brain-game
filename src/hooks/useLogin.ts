import { supabase } from "@/api/service/supabase/supabase";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error?.message === "Email not confirmed") {
        // 실패지만 특별한 경우, error 대신 데이터 전달
        return { user: null, session: null, emailNotConfirmed: true };
      }

      if (error) throw new Error(error.message);

      return { ...data, emailNotConfirmed: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
export default useLogin;
