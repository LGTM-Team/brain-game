import Input from "@/components/form/Input";
import S from "./Login.module.css";
import loginImg from "@/assets/images/login_img.svg";
import SubmitButton from "@/components/form/SubmitButton";
import { useState } from "react";
import useLogin from "@/hooks/useLogin";
import { AppLink } from "@/router/AppLink";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    id?: string;
    password?: string;
    global?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    if (!id) errors.id = "이메일을 입력해주세요.";
    if (!id) errors.password = "비밀번호를 입력해주세요.";

    return Object.keys(errors).length > 0 ? errors : null; // 에러가 하나라도 있으면 errors 객체 반환.
  };

  const handleSumitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      const result = await login(id, password);

      if (result) {
        const user = result.user;
        const session = result.session;

        if (!user || !session) {
          // 로그인 성공은 했는데 data가 비어있는 경우. (거의 일어나지 않음)
          setFieldErrors({
            global: "로그인에 실패했습니다. 다시 시도해주세요.",
          });
          return;
        }

        // ✅ 로그인 성공 처리
        console.log("로그인 성공:", user);
        navigate("/") // 홈 화면으로 라우팅.
      }
    } catch (err: unknown) {
      let message = "로그인 중 알 수 없는 오류가 발생했습니다.";

      if (err instanceof Error) {
        if (err.message === "Invalid login credentials") {
          message = "이메일 또는 비밀번호가 올바르지 않습니다.";
        } else {
          message = err.message; // 기타 메시지 직접 표시
        }
      }

      setFieldErrors({ global: message });
    }
  };

  return (
    <main className={S.container}>
      <h1 className={S["a11y-hidden"]}>로그인</h1>
      <img src={loginImg} alt="로그인 마스코트 이미지" />

      <form onSubmit={handleSumitLogin}>
        <fieldset>
          <Input
            type={"email"}
            placeholder={"이메일을 입력해주세요."}
            id={"id"}
            label={"ID"}
            onChange={(e) => setId(e.target.value)}
            error={fieldErrors.id}
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

        {fieldErrors.global && (
          <p className={S.errorMessage}>{fieldErrors.global}</p>
        )}
        <SubmitButton label="로그인" type="submit" />
      </form>

      <div className={S.findActions}>
        <div className={S.actionWrap}>
          <AppLink to={""} variant={"page"}>
            <p className={S.actionLinkText}>아이디 찾기</p>
          </AppLink>
          <span className={S.divider}>|</span>
          <AppLink to={""} variant={"page"}>
            <p className={S.actionLinkText}>비밀번호 찾기</p>
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
