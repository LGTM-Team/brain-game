// interface Props

import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import S from "./SignUp.module.css";
import { useId } from "react";
import SignUpImg from "@/assets/images/SignUp_neuro.svg"; // 회원가입 뉴로 이미지.
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";

function SignUp() {
  const id = useId();
  const password = useId();
  const confirmPassword = useId();
  const nickname = useId();
  const gender = useId();
  const birth = useId();
  const agree = useId();

  return (
    <>
      <Header title="회원가입" />
      <main className={S.container}>
        <h1 className={S["a11y-hidden"]}>회원가입</h1>
        <img src={SignUpImg} alt="회원가입 안내 이미지" />

        <form>
          <Input placeholder={"이메일을 입력해주세요. (필수)"} id={id} label={"ID"} />
          
          <Input placeholder={"비밀번호를 입력해주세요. (필수)"} id={password} label={"PW"} />
          
          <Input placeholder={"비밀번호를 다시 입력해 주세요. (필수)"} id={confirmPassword} label={"RE-PW"} />
          
          <Input placeholder={"닉네임을 입력해 주세요. (필수)"} id={nickname} label={"NICKNAME"} />
          
          <fieldset className={S.optional}>
            <legend className={S["a11y-hidden"]}>선택 정보</legend>
            <div>
              <label htmlFor={gender}>GENDER</label>
              <select id={gender} name="gender">
                <option value="">성별 선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label htmlFor={birth}>BIRTH</label>
              <input type="date" id={birth} name="birth" />
            </div>
          </fieldset>

          <fieldset className={S.agree}>
            <legend className={S["a11y-hidden"]}>약관 동의</legend>
            <input type="checkbox" id={agree} name="privacy_agree" />
            <label htmlFor={agree}>개인정보 동의하시겠습니까?</label>
          </fieldset>
          
          <SubmitButton label="회원가입"/>
        </form>
      </main>
      <Navigation />
    </>
  );
}
export default SignUp;
