import S from "../styles/form.module.css";
interface Props {
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
function SubmitButton({ label, type = "button", disabled = false }: Props) {
  return <button type={type} className={S.submitButton} disabled={disabled}>{label}</button>;
}
export default SubmitButton;
