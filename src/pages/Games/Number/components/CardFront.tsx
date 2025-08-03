import type { GameStep } from "@/types/numberGame.type";
import S from "./styles/card.module.css";
interface Props {
  randomNumberList: number[];
  gridSize: number;
  gameStep: GameStep;
}

function CardFront({ randomNumberList, gridSize, gameStep }: Props) {
  return (
    <>
      <div
        className={S.grid}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {randomNumberList?.map((item, idx) =>
          item === 0 ? (
            <div
              key={idx}
              className={`${S.card} ${S.noNumber} ${S[gameStep]}`}
            ></div>
          ) : (
            <div
              key={idx}
              className={`${S.card} ${S.frontSide} ${S[gameStep]}`}
            >
              <p>{item}</p>
            </div>
          )
        )}
      </div>
    </>
  );
}
export default CardFront;
