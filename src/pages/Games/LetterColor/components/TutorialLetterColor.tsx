import S from "./styles/tutorialLetterColor.module.css";
import letterCard from "@/assets/images/game/tutorial/letterColorCard.svg";

function TutorialLetterColor() {
  return (
    <>
      <div className={S.container}>
        <h3>색깔을 맞춰라</h3>
        <img src={letterCard} alt="색깔 카드" />
        <p>
          주어진 <span>글자의 색깔</span>을 입력해 주세요!
        </p>
        <p>
          <span>오타없이 입력</span>해야 해요!
        </p>
        <p>주어진 카드의 정답은 초록입니다!</p>
        <span>게임 타이머는 점점 빨라집니다.</span>
        <p>빠르게 생각하고 입력하세요!</p>
      </div>
    </>
  );
}
export default TutorialLetterColor;
