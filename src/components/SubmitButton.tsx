import S from "./styles/form.module.css";
interface Props {
  label: string;
}
function SubmitButton({ label }: Props) {
  return <button className={S.submitButton}>{label}</button>;
}
export default SubmitButton;
