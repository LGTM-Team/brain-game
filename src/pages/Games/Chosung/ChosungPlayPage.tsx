import PlayPage from "../components/PlayPage";
import Chosung from "./Chosung";
import word_img from "@/assets/images/game/word_game.svg";

function ChosungPlayPage() {
  return (
    <PlayPage
      gameImg={word_img}
      imgAlt={"초성 퀴즈"}
      boldDescription={"제시된 초성에 맞는 단어를 입력하세요!"}
      description={"올바른 단어를 입력하면 점수를 얻어요."}
    >
      {(gameState, onFinish, onScoreCalculated, onGameOver) => (
        <Chosung
          state={gameState}
          onFinish={onFinish}
          onScoreCalculated={onScoreCalculated}
          onGameOver={onGameOver}
        />
      )}
    </PlayPage>
  );
}
export default ChosungPlayPage;