import S from "./Card.module.css";
import { getNumberStep1 } from "./getRandomCard";

function CardFront() {
  const number = getNumberStep1();
  return (
    <div className={S.frontSide}>
      <p>{number}</p>
    </div>
  );
}
export default CardFront;
