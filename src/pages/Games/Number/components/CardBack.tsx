import { useState } from "react";
import S from "./Card.module.css";
import { getRandomImage } from "@/utils/getRandom";
import neuro from "@/assets/images/run_neuro_cloud.svg";

interface Props {
  randomNumberList: number[];
  gridSize: number;
  cellSize: {
    width: string;
    height: string;
  };
  setUserAnswer: React.Dispatch<React.SetStateAction<number[]>>;
}

function CardBack({
  randomNumberList,
  gridSize,
  cellSize,
  setUserAnswer,
}: Props) {
  const [clickedCardList, setClickedCardList] = useState<boolean[]>(
    Array(randomNumberList.length).fill(false)
  );

  const handleClick = (item: number, idx: number) => {
    //이미 클릭된 카드
    if (clickedCardList[idx]) return;

    setClickedCardList((prev) => {
      const newClicked = [...prev];
      newClicked[idx] = true;
      return newClicked;
    });
    setUserAnswer((prev) => [...prev, item]);
  };

  return (
    <>
      <div
        className={S.grid}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {randomNumberList?.map((item, idx) => {
          const isClicked = clickedCardList[idx];
          return (
            <div
              key={idx}
              className={`${S.card} ${isClicked ? S.frontSide : S.backSide}`}
              style={{ ...cellSize }}
              onClick={() => {
                handleClick(item, idx);
              }}
            >
              {isClicked && item !== 0 && <p>{item}</p>}
            </div>
          );
        })}
      </div>
    </>
  );
}
export default CardBack;
