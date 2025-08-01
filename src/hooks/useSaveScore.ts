import { useState } from "react";
import { supabase } from "@/services/supabase"; 

export function useSaveScore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveScore = async (gameId: number, score: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("로그인된 유저 정보를 불러올 수 없습니다.");
      setLoading(false);
      return;
    }

    const { error: upsertError } = await supabase
      .from("rankings")
      .upsert({
        user_id: user.id,
        game_id: gameId,
        score: score,
      }, {
        onConflict: 'user_id,game_id'
      });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return { saveScore, loading, error, success };
}

export default useSaveScore;