import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";
import { insertProfile } from "@/utils/insertProfile";

function PostSignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      // 1. 세션 확인
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user || sessionError) {
        console.warn("⚠️ 세션 없음 또는 오류 발생:", sessionError);
        navigate("/login", { replace: true });
        return;
      }

      // 2. User Metadata에서 프로필 정보 확인
      const { nickname, gender, birth } = user.user_metadata || {};

      if (!nickname) {
        console.warn("⚠️ User Metadata에 닉네임 없음");
        navigate("/", { replace: true });
        return;
      }


      // 3. 기존 프로필 존재 여부 확인
      const { data: existingProfile, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (checkError) {
        console.error("❌ 프로필 중복 확인 실패:", checkError);
        navigate("/", { replace: true });
        return;
      }

      // 4. insert (기존 프로필이 없을 때만)
      if (!existingProfile) {
        try {
          await insertProfile({
            id: user.id,
            nickname: nickname,
            gender: gender ?? null,
            birth: birth ?? null,
            avatar_url: null,
            email: user.email,
          });
          
          console.log("✅ 프로필 생성 완료");
        } catch (err) {
          console.error("❌ 프로필 저장 실패 상세 에러:", err);
        }
      } else {
        console.log("ℹ️ 이미 프로필이 존재함");
      }

      // 5. 홈으로 이동
      navigate("/", { replace: true });
    };

    run();
  }, []);

  return (
    <main
      style={{
        flex: 1,
        backgroundColor: "#FFC260",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>계정 활성화 중...</h1>
      <p style={{ fontSize: "1.1rem" }}>
        잠시만 기다려주세요. 자동으로 홈으로 이동합니다.
      </p>
    </main>
  );
}

export default PostSignUp;