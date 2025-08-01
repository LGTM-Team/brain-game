import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import S from "./styles/timer.module.css";
import Img from "@/assets/images/timer_img.svg";

interface Props {
  duration: number;
  onTimeOver: () => void;
  mode?: "static" | "dynamic";
  round?: number;
}

export function Timer({
  duration,
  onTimeOver,
  mode = "static",
  round = 0,
}: Props) {
  const effectiveDuration =
    mode === "dynamic" ? Math.max(7, duration - (round - 1)) : duration;

  const [remainingTime, setRemainingTime] = useState(effectiveDuration);
  const [prevRound, setPrevRound] = useState(round);

  // Static 모드 타이머 종료
  useEffect(() => {
    if (mode !== "static") return;

    const timeout = setTimeout(onTimeOver, effectiveDuration * 1000);
    return () => clearTimeout(timeout);
  }, [mode, effectiveDuration, onTimeOver]);

  // Dynamic 모드 타이머 감소
  useEffect(() => {
    if (mode !== "dynamic") return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode]);

  // Dynamic 모드 라운드 회복 (+3초)
  useEffect(() => {
    if (mode !== "dynamic") return;
    if (round > prevRound) {
      const diff = round - prevRound;
      setRemainingTime((prev) => Math.min(prev + diff * 3, effectiveDuration));
      setPrevRound(round);
    }
  }, [round, prevRound, mode, effectiveDuration]);

  // 종료 조건 (남은 시간 0일 때)
  useEffect(() => {
    if (mode === "dynamic" && remainingTime === 0) {
      const t = setTimeout(onTimeOver, 1000);
      return () => clearTimeout(t);
    }
  }, [remainingTime, mode, onTimeOver]);

  const percent = (remainingTime / effectiveDuration) * 100;
  const linearTransition = { ease: "linear" as const };

  return (
    <div className={S.container}>
      <div className={S.timer}>
        {/* 게이지 바 */}
        {mode === "static" ? (
          <motion.div
            className={S.bar}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: effectiveDuration, ...linearTransition }}
          />
        ) : (
          <motion.div
            className={S.bar}
            initial={{ width: `${percent}%` }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ...linearTransition }}
          />
        )}

        {/* 마커 */}
        {mode === "static" ? (
          <motion.img
            src={Img}
            alt="타이머 마커"
            className={S.marker}
            initial={{ left: "100%" }}
            animate={{ left: "0%" }}
            transition={{ duration: effectiveDuration, ...linearTransition }}
          />
        ) : (
          <motion.img
            src={Img}
            alt="타이머 마커"
            className={S.marker}
            initial={{ left: `${percent}%` }}
            animate={{ left: `${percent}%` }}
            transition={{ duration: 1, ...linearTransition }}
          />
        )}
      </div>
    </div>
  );
}

export default Timer;
