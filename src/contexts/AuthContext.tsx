import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";

interface UserProfile {
  id: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  gender: "male" | "female" | "other" | null;
  birth: string | null;
  email: string | null;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 최초 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 로그인/로그아웃 이벤트 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  //userProfile 가져오기
  useEffect(() => {
    if (!user) return;
    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", `${user.id}`)
        .single();

      if (data) {
        setUserProfile(data);
      }
      if (error) {
        console.error("프로필 조회 오류:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // context 훅
