import Input from "@/common/form/Input";
import S from "./findAccount.module.css";
import findAccountImg from "@/assets/images/account/find-account.svg";
import SubmitButton from "@/common/form/SubmitButton";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usePasswordReset from "@/hooks/usePasswordReset";
import { supabase } from "@/api/service/supabase/supabase";

function FindAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const { sendResetEmail, updatePassword, loading, error } = usePasswordReset();

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    id?: string;
    password?: string;
    confirmPassword?: string;
    global?: string;
  }>({});

  // URL 파라미터로 이메일 인증 완료 상태 체크
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('mode') === 'reset') {
      setIsValidEmail(true); // 이메일 인증 완료된 상태로 설정
      
      // Supabase 세션에서 이메일 정보 가져오기
      const getEmailFromSession = async () => {
        try {
          const { data: { session }} = await supabase.auth.getSession();

          
          if (session?.user?.email) {

            setEmail(session.user.email);
          } else {
            setIsValidEmail(false);
            setFieldErrors({ 
              global: "이메일 정보를 가져올 수 없습니다. 이메일을 다시 입력해주세요." 
            });
          }
        } catch (error) {
          console.error('세션에서 이메일을 가져오는데 실패했습니다:', error);

          setIsValidEmail(false);
          setFieldErrors({ 
            global: "세션 오류가 발생했습니다. 이메일을 다시 입력해주세요." 
          });
        }
      };
      
      getEmailFromSession();
    }
  }, [location.search]);

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    // 이메일 필수
    if (!email) errors.id = "이메일을 입력해주세요.";

    // 이메일 인증이 완료된 경우에만 비밀번호 검증
    if (isValidEmail) {
      if (!password) {
        errors.password = "비밀번호를 입력해주세요.";
      }

      if (!confirmPassword) {
        errors.confirmPassword = "비밀번호 확인을 입력해주세요.";
      } else if (password && password !== confirmPassword) {
        errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  const handleCheckEmail = async () => {
    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({}); // 기존 필드 에러 초기화

    const emailResult = await sendResetEmail(email);

    if (emailResult) {
      // 이메일 발송 성공 시 대기 페이지로 이동
      navigate('/reset-password-pending', { 
        state: { email },
        replace: true 
      });
    } else {
      setFieldErrors({ global: error ?? "메일 전송에 실패했습니다." });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({}); // 이전 에러 초기화

    const result = await updatePassword(password);

    if (result) {
      if (url === "/find-account") {
        navigate("/", { replace: true });
      } else {
        alert("비밀번호가 성공적으로 변경되었습니다.");
      }
    } else {
      setFieldErrors({ global: error ?? "비밀번호 변경에 실패했습니다." });
    }
  };

  return (
    <main className={S.container}>
      <img src={findAccountImg} className={S.img} />
      <form className={S.fieldWrap} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일을 입력해 주세요."
          label="ID"
          id="id"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          disabled={isValidEmail}
          error={fieldErrors.id}
        />

        {!isValidEmail ? (
          <>
            <p className={S.errorMessage}>{fieldErrors.global || "\u00A0"}</p>
            <SubmitButton
              label="메일 요청"
              onClick={handleCheckEmail}
              disabled={loading}
            />
          </>
        ) : (
          <>
            <Input
              type="password"
              placeholder="새로운 비밀번호를 입력해 주세요."
              label="PW"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              error={fieldErrors.password}
            />

            <Input
              type="password"
              placeholder="다시 새로운 비밀번호를 입력해 주세요."
              label="RE-PW"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={fieldErrors.confirmPassword}
            />

            <p className={S.errorMessage}>{fieldErrors.global || "\u00A0"}</p>

            <SubmitButton
              type="submit"
              label={
                url === "/find-account"
                  ? "다시 로그인 하러 가기"
                  : "비밀번호 수정 완료"
              }
              disabled={loading}
            />
          </>
        )}
      </form>
    </main>
  );
}

export default FindAccount;