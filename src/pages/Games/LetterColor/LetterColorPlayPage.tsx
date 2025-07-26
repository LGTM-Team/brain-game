import PlayPage from "../components/PlayPage";
import LetterColorPlay from "./LetterColorPlay";
import letterColor from "@/assets/images/game/letterColor_game.svg";

function LetterColorGamePage() {
  return (
    <PlayPage
      gameImg={letterColor}
      imgAlt={"글자 색 맞추기 게임"}
      boldDescription={"중요한건 색깔!"}
      description={"주어진 글자의 색깔을 입력해 주세요."}
    >
      {(state, onFinish, onScoreCalculated, onGameOver) => (
        <LetterColorPlay
          state={state}
          onFinish={onFinish}
          onScoreCalculated={onScoreCalculated}
          onGameOver={onGameOver}
        />
      )}
    </PlayPage>
  );
}
export default LetterColorGamePage;
