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
        console.warn("세션 없음 또는 오류 발생:", sessionError);
        navigate("/login", { replace: true });
        return;
      }

      // 2. 로컬에 저장된 프로필 정보 확인
      const pendingRaw = localStorage.getItem("pending-profile");
      if (!pendingRaw) {
        console.warn("로컬 저장된 프로필 없음");
        navigate("/", { replace: true });
        return;
      }

      const pendingProfile = JSON.parse(pendingRaw);

      if (!pendingProfile.nickname) { // 닉네임은 필수 컬럼이기에 유효성 검사 추가.
        console.warn("닉네임 누락: 잘못된 프로필 데이터");
        localStorage.removeItem("pending-profile");
        navigate("/", { replace: true });
        return;
      }

      // 3. 이미 프로필 존재 여부 확인
      const { data: existingProfile, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (checkError) {
        console.error("프로필 중복 확인 실패:", checkError);
        navigate("/", { replace: true });
        return;
      }

      // 4. insert 실행 (없을 때만)
      if (!existingProfile) {
        try {
          await insertProfile({
            id: user.id,
            nickname: pendingProfile.nickname,
            gender: pendingProfile.gender ?? null,
            birth: pendingProfile.birth ?? null,
            avatar_url: null, // 기본값 null
            email: user.email, // 인증된 이메일 저장
          });
          console.log("프로필 저장 완료");
        } catch (err) {
          console.error("프로필 저장 실패:", err);
          // 오류 발생해도 홈으로 이동
        }
      }

      // 5. 정리 및 홈 이동
      localStorage.removeItem("pending-profile");
      navigate("/", { replace: true });
    };

    run();
  }, []);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>계정 활성화 중...</h1>
      <p>잠시만 기다려주세요. 자동으로 홈으로 이동합니다.</p>
    </main>
  );
}

export default PostSignUp;
