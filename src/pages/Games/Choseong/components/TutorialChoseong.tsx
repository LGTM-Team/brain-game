import { useState } from "react";
import S from "./styles/tutorialChoseong.module.css";
import choseongImg from "@/assets/images/game/tutorial/choseongCard.svg";
import leftArrow from "@/assets/icons/leftArrow.svg";
import rightArrow from "@/assets/icons/rightArrow.svg";

export default function TutorialChoseong() {
  const [isClicked, setIsClicked] = useState(false);
  const handleIcon = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  };

  return (
    <div className={S.container}>
      <h3>초성퀴즈</h3>
      <img src={choseongImg} alt="" />
      <div className={S.iconBox}>
        <img src={leftArrow} alt="왼쪽 화살표" onClick={handleIcon} />
        <img src={rightArrow} alt="오른쪽 화살표" onClick={handleIcon} />
      </div>
      {!isClicked && (
        <>
          <p>
            주어진 <span>초성에 맞는 단어를 입력</span>해 주세요!
          </p>
          <p>
            <span>오타없이 입력</span>해야 해요!
          </p>
          <span>게임 타이머는 점점 빨라집니다.</span>
          <p>빠르게 생각하고 입력하세요!</p>
        </>
      )}
      {isClicked && (
        <>
          <span>이전 라운드와 같은 초성이 나왔을 때</span>
          <span>입력했던 단어는 다시 입력할 수 없습니다</span>

          <p>이전 라운드에서 “우유”를 입력하셨다면</p>
          <p>다음 라운드는 “오이", ”아이” 등 “우유"가 아닌</p>
          <p>단어를 입력해야 해요!</p>
        </>
      )}
    </div>
  );
}
