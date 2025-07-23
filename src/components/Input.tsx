import S from "./styles/form.module.css";

interface Props {
  placeholder: string;
  label: string;
  id: string;
}

function Input({ placeholder, id, label }: Props) {
  const placeholderText = placeholder + "을 입력해 주세요";
  return (
    <label htmlFor={id} className={S.inputContainer}>
      <p>{label}</p>
      <input type="text" placeholder={placeholderText} />
    </label>
  );
}
export default Input;
