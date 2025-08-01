import PlayPage from "../common/PlayPage";
import Choseong from "./Choseong";
import word_img from "@/assets/images/game/word_game.svg";

function ChoseongPlayPage() {
  return (
    <PlayPage
      gameId={2}
      gameImg={word_img}
      imgAlt={"초성 퀴즈"}
      boldDescription={"중요한건 스피드!"}
      description={"주어진 초성에 일치하는 단어를 입력해 주세요."}
    >
      {(gameState, onFinish, onScoreCalculated, onGameOver) => (
        <Choseong
          state={gameState}
          onFinish={onFinish}
          onScoreCalculated={onScoreCalculated}
          onGameOver={onGameOver}
        />
      )}
    </PlayPage>
  );
}
export default ChoseongPlayPage;
