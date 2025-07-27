import { getRandom } from "@/utils/getRandom";
import type { State } from "../components/PlayPage";
import S from "./LetterColorPlay.module.css";
import submitIcon from "@/assets/icons/submit.svg";
import { useEffect, useState } from "react";
import letterColorData from "./letterColorData.json";

interface Props {
  state: State;
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}

type Color = keyof typeof letterColorData.colors;
type Letter = keyof typeof letterColorData.letters;

const colorList = Object.keys(letterColorData.colors);
const letterList = Object.keys(letterColorData.letters);

function LetterColorPlay({
  state,
  onFinish,
  onScoreCalculated,
  onGameOver,
}: Props) {
  const [quizColor, setQuizColor] = useState<string | null>(null);
  const [quizLetter, setQuizLetter] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const inputChecker = (input: string): Letter => {
    return input as Letter;
  };
  const colorChecker = (color: string): Color => {
    return color as Color;
  };

  useEffect(() => {
    if (state !== "starting") return;
    setQuizColor(colorList[getRandom(colorList.length)]);
    setQuizLetter(letterList[getRandom(letterList.length)]);
    setInput("");
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !quizColor) return;
    const checkedInput = inputChecker(input);
    const checkedColor = colorChecker(quizColor);
    const isCorrect =
      letterColorData.letters[checkedInput] ===
      letterColorData.colors[checkedColor];

    if (isCorrect) {
      setScore(score + 1);
      setQuizColor(colorList[getRandom(colorList.length)]);
      setQuizLetter(letterList[getRandom(letterList.length)]);
      setInput("");
    } else {
      onGameOver("잘못된 정답을 입력하였습니다.");
      onScoreCalculated(score);
      onFinish();
    }
  };
  const isYellow = () => {
    if (quizColor === "rgb(255,255,1)") return true;
    return false;
  };

  return (
    <div className={S.container}>
      <div className={S.score}>
        <div>현재점수</div>
        <div className={S.value}>{score}</div>
      </div>
      {quizColor && quizLetter ? (
        <div
          className={`${S.quiz} ${isYellow() ? S.stroke : ""}`.trim()}
          id="quiz"
          style={{ color: `${quizColor}` }}
        >
          {quizLetter}
        </div>
      ) : (
        <div className={S.quiz}>로딩 중...</div>
      )}
      <div className={S.formWrapper}>
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="정답을 입력해주세요"
          />
          <button type="submit">
            <img src={submitIcon} alt="제출버튼" />
          </button>
        </form>
      </div>
    </div>
  );
}
export default LetterColorPlay;
