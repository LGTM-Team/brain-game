import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import S from "./styles/dynamicTimer.module.css";
import MarkerImg from "@/assets/images/timer_img.svg";

interface Props {
  duration: number;         // 초기 최대 시간 (초)
  round: number;            // 현재 라운드
  isPlaying: boolean;       // 타이머 실행 여부
  onTimeOver: () => void;   // 타이머 종료 콜백
  recoverTime?: number;     // 회복 시간 (ms) - 기본값 3000
  decayPerRound?: number;   // 라운드마다 감소하는 시간 (초) - 기본값 1
  minTime?: number;         // 최소 시간 (초) - 기본값 3
}

export function DynamicTimer({
  duration,
  round,
  onTimeOver,
  isPlaying,
  recoverTime = 3000,
  decayPerRound = 1,
  minTime = 3,
}: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const markerX = useMotionValue(100); // 퍼센트 (0~100)

  const startTimeRef = useRef(Date.now());
  const maxTimeRef = useRef(duration * 1000);
  const remainingTimeRef = useRef(duration * 1000);
  const prevRoundRef = useRef(round);
  const finishedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const prevPercentRef = useRef(100);

  const calcMaxTime = (r: number) =>
    Math.max(minTime, duration - decayPerRound * (r - 1)) * 1000;

  const update = () => {
  const now = Date.now();
  const elapsed = now - startTimeRef.current;
  const remaining = Math.max(0, remainingTimeRef.current - elapsed);
  const percent = (remaining / maxTimeRef.current) * 100;

  // 게이지 바 너비 업데이트
  if (barRef.current) {
    barRef.current.style.width = `${percent}%`;
  }

  // 마커 위치도 항상 percent 기준으로 맞춤
  markerX.set(percent);

  // 종료 처리
  if (remaining <= 0 && !finishedRef.current) {
    finishedRef.current = true;
    onTimeOver();
    return;
  }

  rafRef.current = requestAnimationFrame(update);
};

  useEffect(() => {
    if (!isPlaying) return;

    // 라운드 증가 시 회복
    if (round > prevRoundRef.current) {
      const newMax = calcMaxTime(round);
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const currentRemaining = Math.max(0, remainingTimeRef.current - elapsed);
      const recovered = Math.min(currentRemaining + recoverTime, newMax);

      maxTimeRef.current = newMax;
      remainingTimeRef.current = recovered;
      startTimeRef.current = Date.now();

      finishedRef.current = false;
      prevRoundRef.current = round;
    }
  }, [round, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    // 타이머 시작
    startTimeRef.current = Date.now();
    maxTimeRef.current = calcMaxTime(round);
    remainingTimeRef.current = maxTimeRef.current;
    finishedRef.current = false;
    prevPercentRef.current = 100;
    markerX.set(100);

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, duration, round, decayPerRound, minTime]);

  const markerLeft = useTransform(markerX, (v) => `${v}%`);

  return (
    <div className={S.container}>
      <p>Timer</p>
      <motion.img
        src={MarkerImg}
        alt="타이머 마커"
        className={S.marker}
        style={{ left: markerLeft }}
      />
      <div className={S.timer}>
        <div ref={barRef} className={S.bar} />
      </div>
    </div>
  );
}

export default DynamicTimer;
