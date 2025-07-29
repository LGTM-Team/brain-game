import cancel from "@/assets/icons/cancel.svg";
import S from "./styles/tutorial.module.css";

interface Props {
  children: React.ReactNode;
  onCloseTutorial: () => void;
}

function Tutorial({ children, onCloseTutorial }: Props) {
  const onBackGroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseTutorial();
    }
  };

  return (
    <div className={S.container} onClick={onBackGroundClick}>
      <div className={S.wrapper}>
        <button type="button" onClick={onCloseTutorial}>
          <img src={cancel} alt="창닫기" />
        </button>
        {children}
      </div>
    </div>
  );
}
export default Tutorial;
