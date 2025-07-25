import type { Play } from "../components/PlayPage";
import S from "./LetterColorPlay.module.css";

interface Props {
  state: Play;
  onFinish: () => void;
}
function LetterColorPlaying({ state, onFinish }: Props) {
  return (
    <div className={S.container}>
      {state}
      <button onClick={() => onFinish()}>클릭하면 게임이 끝납니다</button>
    </div>
  );
}
export default LetterColorPlaying;
