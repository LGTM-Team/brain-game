import S from "../styles/form.module.css";

interface Props {
  type?:string
  placeholder: string;
  label: string;
  id: string;
  onChange?: (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
}

function Input({ type, placeholder, id, label, onChange, error, disabled }: Props) {
  
  return (
    <label htmlFor={id} className={S.inputContainer}>
      <p>{label}</p>
      <input type={type} placeholder={placeholder} onChange={onChange} disabled={disabled}/>
      <p className={S.errorMessage}>
        {error ? error : "\u00A0" /* 공백 유니코드로 줄 유지 */}
      </p>
    </label>
  );
}
export default Input;
