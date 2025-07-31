import Input from "@/common/form/Input";
import S from "./Login.module.css";
import loginImg from "@/assets/images/login_img.svg";
import SubmitButton from "@/common/form/SubmitButton";
import { useState } from "react";
import useLogin from "@/hooks/useLogin";
import { AppLink } from "@/router/AppLink";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    if (!email) errors.email = "이메일을 입력해주세요.";
    if (!password) errors.password = "비밀번호를 입력해주세요.";

    return Object.keys(errors).length > 0 ? errors : null; // 에러가 하나라도 있으면 errors 객체 반환.
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      const result = await login(email, password);

      if (result.emailNotConfirmed) {
        // 인증 미완료 시 라우팅
        navigate("/pending-email", { replace: true, state: { email } });
        return;
      }

      if (!result || !result.user || !result.session) {
        setFieldErrors({ global: "로그인에 실패했습니다. 다시 시도해주세요." });
        return;
      }

      navigate(from, { replace: true });
    } catch (err: unknown) {
      let message = "로그인 중 오류가 발생했습니다.";

      if (err instanceof Error) {
        if (err.message.includes("Invalid login credentials")) {
          message = "존재하지 않는 계정이거나 비밀번호가 틀렸습니다.";
        } else {
          message = err.message;
        }
      }

      setFieldErrors({ global: message });
    }
  };

  return (
    <main className={S.container}>
      <h1 className={S["a11y-hidden"]}>로그인</h1>
      <img src={loginImg} alt="로그인 마스코트 이미지" />

      <form onSubmit={handleSubmitLogin}>
        <fieldset>
          <Input
            type={"email"}
            placeholder={"이메일을 입력해주세요."}
            id={"id"}
            label={"ID"}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            disabled={loading}
          />

          <Input
            type={"password"}
            placeholder={"비밀번호를 입력해주세요."}
            id={"password"}
            label={"PW"}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            disabled={loading}
          />
        </fieldset>

        <div className="btnWrap">
          <SubmitButton label="로그인" type="submit" />
          {fieldErrors.global && (
            <p className={S.errorMessage}>{fieldErrors.global}</p>
          )}
        </div>
      </form>

      <div className={S.findActions}>
        <div className={S.actionWrap}>
          <AppLink to={"/find-account"} variant={"page"}>
            <p className={S.actionLinkText}>혹시 계정을 잊어버리셨나요?</p>
          </AppLink>
        </div>

        <div className={S.signUpWrap}>
          <p>아직 회원이 아니신가요?</p>
          <AppLink to={"/sign-up"} variant={"page"}>
            회원가입
          </AppLink>
        </div>
      </div>
    </main>
  );
}
export default Login;
