import S from "./Card.module.css";
import neuro from "@/assets/images/numberGame/neuro1.svg";

function CardBack() {
  return (
    <div className={S.backContainer}>
      <img src={neuro} />
    </div>
  );
}
export default CardBack;
