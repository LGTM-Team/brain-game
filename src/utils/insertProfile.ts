import { supabase } from "@/api/service/supabase/supabase";

export interface Payload {
  id: string; // auth.users.id
  nickname: string;
  gender?: "male" | "female" | "other" | null;
  birth?: string | null;
  avatar_url?: string | null;
  email?: string | null;
}

export async function insertProfile({
  id,
  nickname,
  gender,
  birth,
  avatar_url,
  email,
}: Payload) {
  const payload: Record<string, any> = {
    id,
    nickname,
  };

  if (gender !== undefined && gender !== null) payload.gender = gender;
  if (birth !== undefined && birth !== null) payload.birth = birth;
  if (avatar_url !== undefined) payload.avatar_url = avatar_url;
  if (email !== undefined) payload.email = email;

  const { data, error } = await supabase.from("profiles").insert([payload]);

  if (error) throw error;
  return data;
}