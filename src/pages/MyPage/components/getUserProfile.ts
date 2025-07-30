import { supabase } from "@/services/supabase";
import type { User } from "@supabase/supabase-js";

//userProfile 가져오기
export async function getUserProfile(userData: User) {
  if (!userData) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", `${userData.id}`)
    .single();

  if (error) {
    console.error("프로필 조회 오류:", error);
  } else {
    return data;
  }
}
