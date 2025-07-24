import { useState } from "react";
import letterColor from "@/assets/images/game/letterColor_game.svg";
import StartGame from "./StartGame";
import StartCountdown from "./StartCountdown";
import FinishGame from "./FinishGame";
import GameResult from "./GameResult";

export type Play = "waiting" | "starting" | "playing" | "finish" | "result";

interface Props {
  children: (state: Play, finishGame: () => void) => React.ReactNode;
}

function PlayPage({ children }: Props) {
  const [play, setPlay] = useState<Play>("waiting");

  const finishGame = () => {
    setPlay("finish");
  };
  return (
    <>
      {play === "waiting" && (
        <StartGame
          img={letterColor}
          alt={"글자 색 맞추기 게임"}
          boldText={"중요한건 색깔!"}
          text={"주어진 글자의 색깔을 입력해 주세요."}
          onStart={() => setPlay("starting")}
        />
      )}
      {play === "starting" && (
        <StartCountdown state={play} onCount={() => setPlay("playing")} />
      )}
      {play !== "waiting" && children(play, finishGame)}
      {play === "finish" && (
        <FinishGame state={play} onShowResult={() => setPlay("result")} />
      )}
      {play === "result" && (
        <GameResult
          onStart={() => setPlay("starting")}
          onWait={() => setPlay("waiting")}
        />
      )}
    </>
  );
}
export default PlayPage;
