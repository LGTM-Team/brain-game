import { useEffect, useState } from "react";
import S from "../Choseoung/choseong.module.css";
import SubmitAnswer from "../components/SubmitAnswer";
import CurrentGameScore from "../components/CurrentGameScore";
import isExistWord from "@/utils/isExistWord";
import { makeRandomChoseong } from "@/utils/makeRandomChoseong";
import { getChoseong } from "es-hangul";
import { useScore } from "@/hooks/useBonusScore";

interface Props {
  state: "waiting" | "starting" | "playing" | "finish" | "result";
  onFinish: () => void;
  onScoreCalculated: (score: number) => void;
  onGameOver: (message: string) => void;
}

function Choseoung({ state, onFinish, onScoreCalculated, onGameOver }: Props) {
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentQuiz, setCurrentQuiz] = useState<string>("");
  const [usedWords, setUsedWords] = useState<string[]>([]); // 중복 저장 공간.
  const { get, restart, start } = useScore(10);

  // 초기 문제 설정
  useEffect(() => {
    if (state === "playing") {
      setCurrentQuiz(makeRandomChoseong());
      setUsedWords([]);
      setCurrentScore(0);
      start();
    }
  }, [state]);

  const handleAnswerSubmit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (!isExistWord(trimmed)) {
      alert("없는 단어입니다!");
      return;
    }

    if (getChoseong(trimmed) !== currentQuiz) {
      alert("초성이 다릅니다!");
      return;
    }

    if (usedWords.includes(trimmed)) {
      onScoreCalculated(currentScore);
      onGameOver("이미 입력하신 단어입니다!");
      onFinish();
      return;
    }

    // 정답 처리
    const bonus = get();

    setCurrentScore(currentScore + 100 + bonus);
    setUsedWords((prev) => [...prev, trimmed]);
    setCurrentQuiz(makeRandomChoseong());
    restart();
  };

  return (
    <main className={S.container}>
      <CurrentGameScore score={currentScore} />
      <div className="timer"></div>
      <div className={S.cardSection}>
        <div className={S.card}>
          {currentQuiz.split("").map((ch, idx) => (
            <p key={idx}>{ch}</p>
          ))}
        </div>
      </div>
      <SubmitAnswer
        placeholder="단어를 입력해 주세요."
        onSubmit={handleAnswerSubmit}
      />
    </main>
  );
}

export default Choseoung;
