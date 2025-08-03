import { useEffect, useState } from "react";
import S from "./styles/card.module.css";
import type { GameStep } from "@/types/numberGame.type";

interface Props {
  randomNumberList: number[] | null;
  gridSize: number;
  gameStep: GameStep;
  setUserAnswer: React.Dispatch<React.SetStateAction<number[]>>;
}

function CardBack({
  randomNumberList,
  gridSize,
  setUserAnswer,
  gameStep,
}: Props) {
  const [clickedCardList, setClickedCardList] = useState<boolean[]>(
    Array(randomNumberList?.length).fill(false)
  );

  const handleClick = (item: number, idx: number) => {
    if (clickedCardList[idx]) return;

    setClickedCardList((prev) => {
      const newClicked = [...prev];
      newClicked[idx] = true;
      return newClicked;
    });
    setUserAnswer((prev) => [...prev, item]);
  };

  useEffect(() => {
    setClickedCardList(Array(randomNumberList?.length).fill(false));
  }, [randomNumberList]);
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
              className={`${S.card} ${isClicked ? S.frontSide : S.backSide} ${S[gameStep]}`}
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
