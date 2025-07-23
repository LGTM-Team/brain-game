import { supabase } from "@/services/supabase";

interface Payload {
  id: string; // auth.users.id
  nickname: string;
  gender?: "male" | "female" | "other";
  birth?: string;
}


export async function insertProfile({
  id,
  nickname,
  gender,
  birth,
}: Payload) {
  const payload: Record<string, any> = {
    id,
    nickname,
  };
  
  if (gender !== undefined && gender !== null) payload.gender = gender;
  if (birth !== undefined && birth !== null) payload.birth = birth;

  const { data, error } = await supabase.from("profiles").insert([payload]);

  if (error) throw error;
  return data;
}

