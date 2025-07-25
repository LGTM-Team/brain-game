import S from "./Card.module.css";

interface Props {
  randomNumberList: number[];
  gridSize: number;
  cellSize: {
    width: string;
    height: string;
  };
}

function CardFront({ randomNumberList, gridSize, cellSize }: Props) {
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
              className={`${S.card} ${S.noNumber}`}
              style={{ ...cellSize }}
            ></div>
          ) : (
            <div
              key={idx}
              className={`${S.card} ${S.frontSide}`}
              style={{ ...cellSize }}
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
