import { useEffect, useRef } from 'react';

export function useScore(sec: number) {
  const ref = useRef<NodeJS.Timeout | null>(null); // 타이머 저장
  const scoreRef = useRef<number>(100);            // 실시간 점수
  const resultRef = useRef<number | null>(null);    // 최종 점수 고정
  const unit = 100 / sec;                          // 초당 감소량

  // 타이머 시작
  useEffect(() => {
    ref.current = setInterval(() => {
      scoreRef.current = Math.max(0, scoreRef.current - unit);
    }, 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
        ref.current = null;
      }
    };
  }, [unit]);

  // get: 점수 반환 + 타이머 정지
  const get = () => {
    if (resultRef.current === null) {
      resultRef.current = Math.floor(scoreRef.current); // 현재 점수 고정
      if (ref.current) {
        clearInterval(ref.current); // 타이머 정지
        ref.current = null;
      }
    }
    return resultRef.current;
  };

  return { get };
}

const { get } = useScore(30); // 30초 기준 타이머 바로 시작됨

// 나중에 점수 필요할 때
const score = get(); // get() 호출 시 현재 점수 반환 + 타이머 종료