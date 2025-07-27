import { useEffect, useState } from 'react';
import S from '../Chosung/Chosung.module.css';
import SubmitAnswer from '../components/SubmitAnswer';
import CurrentGameScore from '../CurrentGameScore';
import isExistWord from '@/utils/isExistWord';
import { makeRandomChosung } from '@/utils/makeRandomChosung';
import { getChoseong } from 'es-hangul';
import { useScore } from '@/hooks/useBonusScore';

function Chosung() {
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentQuiz, setCurrentQuiz] = useState<string>("");
  const [usedWords, setUsedWords] = useState<string[]>([]); // 중복 저장 공간.
  const { get, restart, start } = useScore(10);

  // 초기 문제 설정
  useEffect(() => {
    setCurrentQuiz(makeRandomChosung());
    start(); // 최초 시작 시 수동 시작
  }, []);

  const handleAnswerSubmit = (text: string) => {
    const trimmed = text.trim(); // 빈문자일경우 함수 종료.
    if (!trimmed) return;

    if (usedWords.includes(trimmed)) { // 중복 입력인지.
      alert("이미 입력한 단어입니다!");
      return;
    }

    if (isExistWord(trimmed)) {
      if (getChoseong(trimmed) === currentQuiz) {
        const bonus = get();
        setCurrentScore((prev) => prev + 100 + bonus); // 정답이면 점수 +
        setUsedWords((prev) => [...prev, trimmed]); // 단어 저장.
        restart(); // 보너스 점수 계산 다시 시작
        setCurrentQuiz(makeRandomChosung());   // 다음 문제 출제
      } else {
        alert("초성이 다릅니다!");
      }
    } else {
      alert("없는 단어입니다!");
    }
  };

  return (
    <main className={S.container}>
      <CurrentGameScore score={currentScore} />
      <div className="timer"></div>
      <div className={S.cardSection}>
        <div className={S.card}>
          {currentQuiz.split('').map((ch, idx) => (
            <p key={idx}>{ch}</p>
          ))}
        </div>
      </div>
      <SubmitAnswer placeholder="단어를 입력해 주세요." onSubmit={handleAnswerSubmit} />
    </main>
  );
}

export default Chosung;
