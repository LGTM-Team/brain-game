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
}

function CardBack({ randomNumberList, gridSize, cellSize }: Props) {
  const imageUrl = getRandomImage() ?? neuro;
  console.log("gridSize", gridSize);
  return (
    <>
      <div
        className={S.grid}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {randomNumberList?.map((item, idx) => (
          <div
            key={idx}
            className={`${S.card} ${S.backSide}`}
            style={{ ...cellSize }}
          >
            <img src={imageUrl} />
          </div>
        ))}
      </div>
    </>
  );
}
export default CardBack;
