import { useRef } from 'react';

export function useBonusScore(sec: number) {
  const ref = useRef<NodeJS.Timeout | null>(null); // 타이머 저장
  const scoreRef = useRef<number>(100);            // 실시간 점수
  const resultRef = useRef<number | null>(null);   // 최종 점수 고정
  const unitRef = useRef<number>(100 / sec);       // 초당 감소량

  // 시작
  const start = () => {
    // 이전 타이머 정리
    if (ref.current) clearInterval(ref.current);

    ref.current = setInterval(() => {
      scoreRef.current = Math.max(0, scoreRef.current - unitRef.current);
    }, 1000);
  };

  // 점수 반환 + 타이머 정지
  const get = () => {
    if (resultRef.current === null) {
      resultRef.current = Math.floor(scoreRef.current);
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    }
    return resultRef.current;
  };

  // 리셋 + 타이머 다시 시작
  const restart = () => {
    scoreRef.current = 100;
    resultRef.current = null;
    start();
  };

  return { get, restart, start };
}
