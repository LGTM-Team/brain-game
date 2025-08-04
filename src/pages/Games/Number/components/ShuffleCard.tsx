import S from "./styles/card.module.css";
import { getRandomImage } from "@/utils/getRandom";
import neuro from "@/assets/images/pages/game/run_neuro_cloud.svg";

interface Props {
  userRound: number;
}

function ShuffleCard({ userRound }: Props) {
  const imageUrl = getRandomImage() ?? neuro;

  return (
    <>
      <div className={S.shuffle}>
        <img src={imageUrl} style={{ width: "200px", height: "200px" }} />
        <p>{userRound}단계 클리어!</p>
      </div>
    </>
  );
}
export default ShuffleCard;
