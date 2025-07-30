import { supabase } from "@/services/supabase";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import S from "./PendingEmail.module.css";
import { AppLink } from "@/router/AppLink";
import img from "@/assets/images/pending_img.svg";

function PendingEmail() {
  const location = useLocation();
  const email = location.state?.email;

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<boolean>(false);

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
    });

    if (error) {
      if (error.message === "Email is already confirmed") {
        setError("이미 인증된 이메일입니다. 로그인해주세요.");
        return;
      } else if (error.message.includes("Too Many Requests")) {
        setError("요청이 너무 많습니다. 1분 후 다시 시도해주세요.");
        setCooldown(true);
        setTimeout(() => setCooldown(false), 60000);
      } else {
        setError("인증 메일 재전송에 실패했습니다: " + error.message);
      }
    } else {
      setMessage("인증 이메일을 다시 보냈습니다. 메일함을 확인해주세요.");
      setCooldown(true);
      setTimeout(() => setCooldown(false), 60000);
    }

    setLoading(false);
  };

  return (
    <main className={S.container}>
      <img src={img} alt="" />
      <h1>📧 이메일 인증이 필요합니다</h1>

      {email ? (
        <>
          <p>가입하신 이메일 주소로 인증 링크를 보냈습니다.</p>

          <p>이메일을 확인하고 인증을 완료해주세요.</p>


          <p>
            인증 메일을 받지 못하셨다면 아래 버튼을 눌러 다시 보내실 수
            있습니다.
          </p>

          <div className={S.actionRow}>
            <button
              onClick={handleResend}
              disabled={loading || cooldown}
              className={S.resendButton}
            >
              {loading ? "재전송 중..." : "이메일 재전송"}
            </button>

            <AppLink variant="page" to="/login" className={S.loginLink}>
              로그인
            </AppLink>
          </div>

          {message && <p className={S.successMessage}>{message}</p>}
          {error && <p className={S.errorMessage}>{error}</p>}
        </>
      ) : (
        <>
          <p>잘못된 접근입니다. 로그인 후 다시 시도해주세요.</p>
          <AppLink variant="page" to="/login">
            로그인하러 가기
          </AppLink>
        </>
      )}
    </main>
  );
}

export default PendingEmail;
