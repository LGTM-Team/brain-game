import Notice from "./components/Notice";
import S from "./notice.module.css";

function NoticePage() {
  const handleToggle = () => {};
  return (
    <div className={S.container}>
      <Notice />
    </div>
  );
}
export default NoticePage;
