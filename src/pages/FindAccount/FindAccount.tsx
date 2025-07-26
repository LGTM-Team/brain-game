import Input from '@/components/form/Input';
import S from './FindAccount.module.css';
import img from '@/assets/images/findAccountImg.svg'
import SubmitButton from '@/components/form/SubmitButton';

function FindAccount() {



  return (
    <main className={S.container}>
      <img src={img} alt="" />
      <Input 
        type="email"
        placeholder="이메일을 입력해주세요." 
        label="ID 찾기" 
        id="id"      
      />

      <Input 
        type="password"
        placeholder="새로운 비밀번호를 입력해주세요." 
        label="Password 재설정" 
        id="password"      
      />

      <Input 
        type="password"
        placeholder="다시 새로운 비밀번호를 입력해주세요." 
        label="PW 확인" 
        id="confirmPassword"      
      />

      <SubmitButton label='다음'/>
    </main>
  )
}
export default FindAccount