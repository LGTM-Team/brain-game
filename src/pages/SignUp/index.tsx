import S from "./SignUp.module.css";
import signUpImg from "@/assets/images/account/SignUp_neuro.svg"; // 회원가입 뉴로 이미지.
import Input from "@/common/form/Input";
import SubmitButton from "@/common/form/SubmitButton";
import useSignUp from "@/hooks/useSignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signUp, loading, error } = useSignUp();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(
    null
  );
  const [birth, setBirth] = useState<string | null>(null);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
    agreeToPrivacy?: string;
    global?: string;
  }>({});

  // 입력 필드 유효성 검사 함수.
  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    if (!email) errors.email = "이메일을 입력해 주세요.";
    if (!password) errors.password = "비밀번호를 입력해 주세요.";
    if (!confirmPassword)
      errors.confirmPassword = "비밀번호 확인을 입력해 주세요.";
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    if (!nickname) errors.nickname = "닉네임을 입력해 주세요.";
    if (!agreeToPrivacy)
      errors.agreeToPrivacy = "개인정보 수집에 동의해 주세요.";

    return Object.keys(errors).length > 0 ? errors : null;
  };

  // 회원가입 제출 핸들러
  const handelSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({}); // 기존 에러 초기화

    const result = await signUp(email, password, nickname, gender, birth);

    if (result) {   
      // 팬딩 안내 페이지로 이동
      navigate("/pending-email", { replace: true, state: { email } });
    } else {
      setFieldErrors({ global: error ?? "회원가입 실패" });
    }
  };

  return (
    <main className={S.container}>
      <h1 className={S["a11y-hidden"]}>회원가입</h1>
      <img src={signUpImg} alt="회원가입 안내 이미지" className={S.signUpImg} />

      <form onSubmit={handelSubmitSignUp} className={S.signUpForm}>
        <Input
          type={"email"}
          placeholder={"이메일을 입력해주세요. (필수)"}
          id={"id"}
          label={"ID"}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          disabled={loading}
        />

        <Input
          type={"password"}
          placeholder={"비밀번호를 입력해주세요. (필수)"}
          id={"password"}
          label={"PW"}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          disabled={loading}
        />

        <Input
          type={"password"}
          placeholder={"비밀번호를 다시 입력해 주세요. (필수)"}
          id={"confirmPassword"}
          label={"RE-PW"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          disabled={loading}
        />

        <Input
          placeholder={"닉네임을 입력해 주세요. (필수)"}
          id={"nickname"}
          label={"NICKNAME"}
          onChange={(e) => setNickname(e.target.value)}
          error={fieldErrors.nickname}
          disabled={loading}
        />

        <fieldset className={S.optional}>
          <legend className={S["a11y-hidden"]}>선택 정보</legend>
          <div>
            <label htmlFor="gender">GENDER</label>
            <select
              id="gender"
              name="gender"
              onChange={(e) => {
                const value = e.target.value;
                setGender(
                  value === "" ? null : (value as "male" | "female" | "other")
                );
              }}
              disabled={loading}
            >
              <option value="">성별 선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label htmlFor="birth">BIRTH</label>
            <input
              type="date"
              id="birth"
              name="birth"
              onChange={(e) => setBirth(e.target.value)}
              disabled={loading}
            />
          </div>
        </fieldset>

        <fieldset className={S.agree}>
          <legend className={S["a11y-hidden"]}>약관 동의</legend>
          <input
            type="checkbox"
            id="agree"
            name="privacy_agree"
            onChange={(e) => setAgreeToPrivacy(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="agree">개인정보 동의하시겠습니까?</label>
        </fieldset>

        <p className={S.errorMessage}>
          {fieldErrors.agreeToPrivacy || fieldErrors.global ? (
            <>
              {fieldErrors.agreeToPrivacy && (
                <>
                  {fieldErrors.agreeToPrivacy}
                  <br />
                </>
              )}
              {fieldErrors.global && <>{fieldErrors.global}</>}
            </>
          ) : (
            "\u00A0"
          )}
        </p>

        <SubmitButton
          label={loading ? "가입 중..." : "회원가입"}
          type="submit"
          disabled={loading}
        />
      </form>
    </main>
  );
}
export default SignUp;