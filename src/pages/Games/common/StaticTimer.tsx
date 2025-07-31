import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import S from "./styles/staticTimer.module.css";
import Img from "@/assets/images/timer_img.svg";

interface Props {
  duration: number;
  isPlaying: boolean;
  onTimeOver: () => void;
}

export function StaticTimer({ duration, isPlaying, onTimeOver }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(onTimeOver, duration * 1000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, duration, onTimeOver]);

  const linearTransition = { ease: "linear" as const };

  return (
    <div className={S.container}>
      <p>Timer</p>
      <motion.img
        src={Img}
        className={S.marker}
        initial={{ left: "100%" }}
        animate={isPlaying ? { left: "0%" } : { left: "100%" }}
        transition={
          isPlaying ? { duration, ...linearTransition } : { duration: 0 }
        }
      />
      <div className={S.timer}>
        <motion.div
          className={S.bar}
          initial={{ width: "100%" }}
          animate={isPlaying ? { width: "0%" } : { width: "100%" }}
          transition={
            isPlaying ? { duration, ...linearTransition } : { duration: 0 }
          }
        />
      </div>
    </div>
  );
}

export default StaticTimer;
