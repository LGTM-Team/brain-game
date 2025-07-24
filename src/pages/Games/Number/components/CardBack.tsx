import S from "./Card.module.css";
import { getRandomImage } from "./getRandomCard";

function CardBack() {
  const imageUrl = getRandomImage();
  return (
    <div className={S.backSide}>
      <img src={imageUrl} />
    </div>
  );
}
export default CardBack;
