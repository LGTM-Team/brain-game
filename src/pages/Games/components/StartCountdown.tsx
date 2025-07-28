import { useEffect, useState } from "react";
import S from "./styles/startCountdown.module.css";
import counter1 from "@/assets/icons/counter1.svg";
import counter2 from "@/assets/icons/counter2.svg";
import counter3 from "@/assets/icons/counter3.svg";
import type { State } from "./PlayPage";

interface Props {
  state: State;
  onCount: () => void;
}

function StartCountdown({ state, onCount }: Props) {
  const [countdown, setCountdown] = useState(2);
  const counters = [counter1, counter2, counter3];

  useEffect(() => {
    if (state !== "starting") return;

    const timeout = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    if (countdown === -2) {
      clearTimeout(timeout);
      onCount();
    }
  }, [countdown]);

  return (
    <div className={S.container}>
      <div className={S.inner}>
        {countdown !== -1 ? (
          <img src={counters[countdown]} alt="3초 카운트다운" />
        ) : (
          <div>시작!</div>
        )}
      </div>
    </div>
  );
}

export default StartCountdown;
