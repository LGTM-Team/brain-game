import S from "./styles/tutorialNumber.module.css";
import cardImg from "@/assets/images/game/tutorial/numberCard.svg";
import leftArrow from "@/assets/icons/leftArrow.svg";
import rightArrow from "@/assets/icons/rightArrow.svg";
import cardGrid from "@/assets/images/game/tutorial/numberCardGrid.svg";
import { useState } from "react";

function TutorialNumber() {
  const [isClicked, setIsClicked] = useState(false);
  const handleIcon = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  };

  return (
    <div className={S.container}>
      <div className={S.iconBox}>
        <img src={leftArrow} alt="왼쪽 화살표" onClick={handleIcon} />
        <img src={rightArrow} alt="오른쪽 화살표" onClick={handleIcon} />
      </div>
      <h3>숫자를 외워라</h3>
      {!isClicked && (
        <>
          <div className={S.cardImgBox}>
            <img src={cardImg} alt="카드" />
          </div>
          <p>숫자는 3초 동안 보여줘요!</p>
          <p> 숫자의 순서를 모두 외운 다음,</p>
          <p className={S.highlight}>숫자의 순서대로 카드를 눌러주세요!</p>
        </>
      )}

      {isClicked && (
        <>
          <div className={S.cardImgBox}>
            <img src={cardGrid} alt="카드 단계" />
          </div>

          <p>게임이 진행될수록 카드의 숫자가 늘어나요!</p>
        </>
      )}
    </div>
  );
}
export default TutorialNumber;
