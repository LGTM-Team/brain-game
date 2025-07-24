import S from "../styles/form.module.css";

interface Props {
  placeholder: string;
  label: string;
  id: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error?: string;
  disabled?: boolean;
}

function Input({ placeholder, id, label, onChange, error, disabled }: Props) {
  return (
    <label htmlFor={id} className={S.inputContainer}>
      <p>{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className={S.errorMessage}>{error}</p>}
    </label>
  );
}
export default Input;
