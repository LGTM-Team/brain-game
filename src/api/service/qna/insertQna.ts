import { supabase } from "@/services/supabase";

interface RequestBody {
  user_id: string;
  title: string;
  content: string;
}

export const insertQna = async ({ title, content, user_id }: RequestBody) => {
  const { status, error } = await supabase.from("customer_support").insert({
    user_id,
    title,
    content,
  });
  if (error) {
    console.warn(error);
  }
  return status;
};
