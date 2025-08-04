import { supabase } from "@/api/service/supabase/supabase";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import S from "./styles/pendingEmail.module.css";
import img from "@/assets/images/account/pending_img.svg";
import SubmitButton from "@/common/form/SubmitButton";

function PendingEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const startCooldown = () => {
    setCooldown(true);
    setTimeout(() => setCooldown(false), 60000); // 1분 후 다시 가능
  };

  const handleResend = async () => {
    if (!email) {
      setError("이메일 정보가 없습니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    if (cooldown) {
      setError("인증 메일은 잠시 후 다시 요청할 수 있습니다.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/post-sign-up",
      },
    });

    if (error) {
      if (error.message === "Email is already confirmed") {
        setError("이미 인증된 이메일입니다. 로그인해주세요.");
      } else if (error.message.includes("Too Many Requests")) {
        setError("요청이 너무 많습니다. 1분 후 다시 시도해주세요.");
        startCooldown();
      } else {
        setError("인증 메일 재전송에 실패했습니다: " + error.message);
      }
    } else {
      setMessage("인증 이메일을 다시 보냈습니다. 메일함을 확인해주세요.");
      startCooldown();
    }

    setLoading(false);
  };

  const handleRoute = () => {
    navigate("/login", { replace: true });
  };

  return (
    <main className={S.container}>
      <div className={S.cardWrap}>
        <img src={img} alt="이메일 확인 안내 이미지" />
        <h1>📧 이메일을 인증해 주세요.</h1>

        {email ? (
          <>
            <div className={S.pendingText}>
              <p>가입하신 이메일 주소로 인증 링크를 보냈습니다!</p>
              <p>이메일을 확인하고 인증 완료 버튼을 눌러주세요!</p>
            </div>

            <div className={S.resendWrap}>
              <p className={S.resendText}>혹시 인증 메일을 받지 못하셨나요?</p>
              <button
                onClick={handleResend}
                disabled={loading || cooldown}
                className={S.resendButton}
                aria-disabled={loading || cooldown}
              >
                {loading ? "재전송 중..." : "이메일 재전송"}
              </button>
            </div>

            <div className={S.actionRow}>
              <SubmitButton label="로그인" onClick={handleRoute} />
            </div>

            {message && <p className={S.successMessage}>{message}</p>}
            {error && <p className={S.errorMessage}>{error}</p>}
          </>
        ) : (
          <>
            <p className={S.errorMessage}>
              잘못된 접근입니다. 로그인 후 다시 시도해주세요.
            </p>
            <SubmitButton label="로그인" onClick={handleRoute} />
          </>
        )}
      </div>
    </main>
  );
}

export default PendingEmail;
