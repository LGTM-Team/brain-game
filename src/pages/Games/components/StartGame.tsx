import S from "./styles/startGame.module.css";
import questionNeuro from "@/assets/images/game/question_neuro.svg";
import bubble from "@/assets/images/game/tutorial_bubble.svg";

interface Props {
  img: string;
  alt: string;
  boldText: string;
  text: string;
  onStart: () => void;
  onOpenTutorial: () => void;
}

function StartGame({
  img,
  alt,
  boldText,
  text,
  onStart,
  onOpenTutorial,
}: Props) {
  return (
    <div className={S.container}>
      <button className={S.tutorial} type="button" onClick={onOpenTutorial}>
        <img src={questionNeuro} alt="게임방법 캐릭터" />
        <img className={S.text} src={bubble} alt="게임방법 말풍선" />
      </button>

      <div className={S.card}>
        <img src={img} alt={alt} />
        <div>
          <div className={S.bold}>{boldText}</div>
          <div>{text}</div>
        </div>
        <button type="button" onClick={onStart}>
          바로 시작!
        </button>
      </div>
    </div>
  );
}
export default StartGame;
