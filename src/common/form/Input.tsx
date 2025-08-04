import S from "../styles/form.module.css";

interface Props {
  type?: string;
  placeholder: string;
  label: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
}

function Input({ type, placeholder, id, label, onChange, error, disabled }: Props) {
  
  // 비밀번호 조건 메시지
  const getHelperText = () => {
    if (error) return error;
    
    if (id === "sign-up-password") {
      return "영문자와 숫자 포함 6자 이상";
    }
    
    return "\u00A0"; 
  };

  return (
    <label htmlFor={id} className={S.inputContainer}>
      <p>{label}</p>
      <input 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange} 
        disabled={disabled}
      />
      <p className={error ? S.errorMessage : (id === "sign-up-password" ? S.helperText : S.errorMessage)}>
        {getHelperText()}
      </p>
    </label>
  );
}

export default Input;