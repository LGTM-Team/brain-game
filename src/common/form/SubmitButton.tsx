import S from "../styles/form.module.css";
interface Props {
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void; 
}

function SubmitButton({
  label,
  type = "button",
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={S.submitButton}
      disabled={disabled}
      onClick={onClick} 
    >
      {label}
    </button>
  );
}

export default SubmitButton;