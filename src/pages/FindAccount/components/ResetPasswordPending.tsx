import { useLocation, useNavigate } from "react-router-dom";
import S from "../../SignUp/components/styles/pendingEmail.module.css"; 
import img from "@/assets/images/account/find-account.svg"; 
import SubmitButton from "@/common/form/SubmitButton";

function ResetPasswordPending() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleBackToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <main className={S.container}>
      <div className={S.cardWrap}>
        <img src={img} alt="비밀번호 재설정 안내 이미지" />
        <h1>📧 이메일을 확인해 주세요</h1>

        {email ? (
          <>
            <div className={S.pendingText}>
              <p>비밀번호 재설정 링크를 보냈습니다!</p>
              <p>이메일을 확인하고 링크를 클릭해주세요!</p>
              <p className={S.emailText}>📮 {email}</p>
            </div>

            <div className={S.actionRow}>
              <SubmitButton label="로그인으로 돌아가기" onClick={handleBackToLogin} />
            </div>
          </>
        ) : (
          <>
            <p className={S.errorMessage}>
              잘못된 접근입니다. 다시 시도해주세요.
            </p>
            <SubmitButton label="로그인" onClick={handleBackToLogin} />
          </>
        )}
      </div>
    </main>
  );
}

export default ResetPasswordPending;