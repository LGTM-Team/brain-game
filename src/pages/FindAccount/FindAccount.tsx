import Input from "@/components/form/Input";
import S from "./FindAccount.module.css";
import img from "@/assets/images/findAccountImg.svg";
import SubmitButton from "@/components/form/SubmitButton";
import { useState } from "react";
import usePasswordReset from "@/hooks/usePasswordReset";

function FindAccount() {
  const { sendResetEmail, updatePassword, checkEmailExists, loading, error } =
    usePasswordReset();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isExistEmail, setIsExistEmail] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    global?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    if (!email) errors.email = "이메일을 입력해 주세요.";
    if (!password) errors.password = "비밀번호를 입력해 주세요.";
    if (!confirmPassword)
      errors.confirmPassword = "비밀번호 확인을 입력해 주세요.";
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  };

  const handleCheckEmail = async () => {

    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({}); // 기존 에러 초기화

    try {
      const result = await checkEmailExists(email); // 해당 이메일이 우리 DB에 존재하는지.
      if (result) {
        setIsExistEmail(true);
      }else{
        setFieldErrors({
          email: "가입되지 않은 이메일입니다.",
        });
      }
    } catch (error) {
      setFieldErrors({
        global: "이메일 확인 중 오류가 발생했습니다. 다시 시도해 주세요.",
      });
    }
  };

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({}); // 기존 에러 초기화

    try {
      // const result = await
    } catch (error) {
      
    }
  }


  return (
    <main className={S.container}>
      <img src={img} alt="" />
      <form onSubmit={handleSubmit}>
        <Input
        type="email"
        placeholder="이메일을 입력해주세요."
        label="ID 찾기"
        id="id"
        onChange={(e) => setEmail(e.target.value)}
        disabled={ isExistEmail }
        error={fieldErrors.email}
      />
      <p className={S.errorMessage}>
        {fieldErrors.global ? fieldErrors.global : "\u00A0"}
      </p>

      {isExistEmail ? (
        <>
          <Input
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            label="Password 재설정"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="다시 새로운 비밀번호를 입력해주세요."
            label="PW 확인"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </>
      ) : null}

      {isExistEmail ? (
        <SubmitButton label="비밀번호 재설정" />
      ) : (
        <SubmitButton label="다음" onClick={handleCheckEmail} />
      )}
      </form>
    </main>
  );
}
export default FindAccount;
