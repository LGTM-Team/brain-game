import Input from "@/components/form/Input";
import S from "./Login.module.css";
import loginImg from "@/assets/images/login_img.svg";
import SubmitButton from "@/components/form/SubmitButton";
import { useState } from "react";
import useLogin from "@/hooks/useLogin";
import { AppLink } from "@/router/AppLink";

function Login() {
  const { login, loading, error } = useLogin();

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});

  return (
    <main className={S.container}>
      <h1 className={S["a11y-hidden"]}>로그인</h1>
      <img src={loginImg} alt="로그인 마스코트 이미지" />

      <form>
        <fieldset>
          <Input
            type={"email"}
            placeholder={"이메일을 입력해주세요."}
            id={"id"}
            label={"ID"}
            onChange={(e) => setId(e.target.value)}
            error={fieldErrors.email}
            disabled={loading}
          />

          <Input
            type={"password"}
            placeholder={"비밀번호를 입력해주세요."}
            id={"password"}
            label={"PW"}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.email}
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
          <AppLink to={"/sign-up"} variant={"page"}>회원가입</AppLink>
        </div>
      </div>
    </main>
  );
}
export default Login;
