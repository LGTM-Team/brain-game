import { getRandom } from "@/utils/getRandom";
import type { State } from "../../common/PlayPage";
import S from "./LetterColorPlay.module.css";
import { useEffect, useState } from "react";
import letterColorData from "@/data/letterColorData.json";
import DynamicTimer from "../../common/DynamicTimer";
import CurrentGameScore from "../../common/CurrentGameScore";
import SubmitAnswer from "../../common/SubmitAnswer";
import { useBonusScore } from "@/hooks/useBonusScore";
import { motion } from "framer-motion";

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
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const { get, BonusRestart, BonusStart } = useBonusScore(10);
  const [shake, setShake] = useState(false);

  const answerChecker = (answer: string): Letter => {
    return answer as Letter;
  };
  const colorChecker = (color: string): Color => {
    return color as Color;
  };

  const isYellow = () => {
    if (quizColor === "rgb(255,255,1)") return true;
    return false;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400); // 애니메이션 지속 시간 후 제거
  };

  useEffect(() => {
    if (state === "starting") {
      setScore(0);
      setRound(0);
    }
  }, [state]);

  useEffect(() => {
    if (state === "playing") {
      setQuizColor(colorList[getRandom(colorList.length)]);
      setQuizLetter(letterList[getRandom(letterList.length)]);
      setScore(0);
      setRound(1);
      BonusStart();
    }
  }, [state]);

  const handleSubmit = (text: string) => {
    const trimmed = text.trim();

    //정답 입력 안했을때, 문제 컬러 없을때
    if (!trimmed || !quizColor) return;

    const checkedAnswer = answerChecker(trimmed);
    const checkedColor = colorChecker(quizColor);

    const isCorrect =
      letterColorData.letters[checkedAnswer] ===
      letterColorData.colors[checkedColor];

    const bonus = get();

    if (isCorrect) {
      setScore(score + 100 + bonus);
      setQuizColor(colorList[getRandom(colorList.length)]);
      setQuizLetter(letterList[getRandom(letterList.length)]);
      BonusRestart();
      setRound(round + 1);
    } else {
      triggerShake();
      onGameOver("잘못된 정답을 입력하였습니다.");
      onScoreCalculated(score);
      onFinish();
    }
  };

  const handelTimeOver = () => {
    onGameOver("타임 오버!");
    onScoreCalculated(score);
    onFinish();
  };

  return (
    <div className={S.container}>
      <CurrentGameScore score={score} />
      <DynamicTimer
        duration={10}
        round={round}
        isPlaying={state === "playing"}
        onTimeOver={handelTimeOver}
      />
      <div className={S.quizSection}>
        <motion.div
          className={S.quiz}
          animate={{
            x: shake ? [0, -10, 10, -6, 6, -3, 3, 0] : 0,
            boxShadow: shake
              ? [
                  "0px 4px 30px 0px rgba(0, 0, 0, 0.25)", // 시작: 원래 쉐도우
                  "0px 0px 12px rgba(255, 0, 0, 0.6)", // 중간: 붉은 쉐도우 강조
                  "0px 0px 18px rgba(255, 0, 0, 0.8)",
                  "0px 0px 12px rgba(255, 0, 0, 0.6)",
                  "0px 4px 30px 0px rgba(0, 0, 0, 0.25)", // 끝: 원래 쉐도우로 복귀
                ]
              : "0px 4px 30px 0px rgba(0, 0, 0, 0.25)",
          }}
          transition={{
            x: { duration: 0.4 },
            boxShadow: { duration: 0.4 },
          }}
        >
          {quizColor && quizLetter ? (
            <div
              className={`${isYellow() ? S.stroke : ""}`.trim()}
              id="quiz"
              style={{ color: `${quizColor}` }}
            >
              {quizLetter.split("").map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          ) : (
            ""
          )}
        </motion.div>
      </div>
      <SubmitAnswer
        placeholder="정답을 입력해 주세요."
        onSubmit={handleSubmit}
      />
    </div>
  );
}
export default LetterColorPlay;
