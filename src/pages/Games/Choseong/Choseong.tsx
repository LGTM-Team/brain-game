import { useEffect, useState } from "react";
import S from "../Choseong/choseong.module.css";
import SubmitAnswer from "../components/SubmitAnswer";
import CurrentGameScore from "../components/CurrentGameScore";
import isExistWord from "@/utils/isExistWord";
import { makeRandomChoseong } from "@/utils/makeRandomChoseong";
import { getChoseong } from "es-hangul";
import { useBonusScore } from "@/hooks/useBonusScore";
import { motion } from "framer-motion";
// import StaticTimer from '../components/StaticTimer';
import DynamicTimer from "../components/DynamicTimer";

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
  const { get, BonusRestart, BonusStart } = useBonusScore(10);
  const [round, setRound] = useState<number>(1);
  const [shake, setShake] = useState(false);

  // 초기 문제 설정
  useEffect(() => {
    if (state === "playing") {
      setRound(1);
      setCurrentQuiz(makeRandomChoseong());
      setUsedWords([]);
      setCurrentScore(0);
      BonusStart();
    }
  }, [state]);

  const handleAnswerSubmit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (!isExistWord(trimmed)) {
      triggerShake();
      return;
    }

    if (getChoseong(trimmed) !== currentQuiz) {
      triggerShake();
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
    BonusRestart();
    setRound((prev) => prev + 1); // Timer 강제 리셋
  };

  const handleTimeOver = () => {
    onScoreCalculated(currentScore);
    onGameOver("시간이 초과되었습니다!");
    onFinish();
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400); // 애니메이션 지속 시간 후 제거
  };

  return (
    <main className={S.container}>
      <CurrentGameScore score={currentScore} />
      <DynamicTimer
        duration={10}
        onTimeOver={handleTimeOver}
        round={round}
        isPlaying={state === "playing"}
      />
      <div className={S.cardSection}>
        <motion.div
          className={S.card}
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
          {currentQuiz.split("").map((ch, idx) => (
            <p key={idx}>{ch}</p>
          ))}
        </motion.div>
      </div>
      <SubmitAnswer
        placeholder="단어를 입력해 주세요."
        onSubmit={handleAnswerSubmit}
      />
    </main>
  );
}

export default Choseoung;
