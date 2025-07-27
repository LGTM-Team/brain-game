import S from "./Card.module.css";
import { getRandomImage } from "./getRandomCard";
import neuro from "@/assets/images/run_neuro_cloud.svg";

interface Props {
  randomNumberList: number[];
  gridSize: number;
  gameStep: string;
}

function ShuffleCard({ randomNumberList, gridSize, gameStep }: Props) {
  const imageUrl = getRandomImage() ?? neuro;

  return (
    <>
      <div
        className={S.grid}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {randomNumberList?.map((item, idx) => (
          <div key={idx} className={`${S.card} ${S.backSide}  ${S[gameStep]} `}>
            <img src={imageUrl} />
          </div>
        ))}
      </div>
    </>
  );
}
export default ShuffleCard;
