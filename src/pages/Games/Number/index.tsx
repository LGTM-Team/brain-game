import PlayPage from "../common/PlayPage";
import numberCardImg from "@/assets/images/game/number_game.svg";
import NumberCardPlay from "./components/NumberCardPlay";

function NumberPlayPage() {
  return (
    <>
      <PlayPage
        gameId={1}
        gameImg={numberCardImg}
        imgAlt={"숫자 맞추기"}
        boldDescription={"중요한건 순서!"}
        description={"숫자의 순서대로 카드를 눌러 주세요."}
      >
        {(gameState, onFinish, onScoreCalculated, onGameOver) => (
          <NumberCardPlay
            state={gameState}
            onFinish={onFinish}
            onScoreCalculated={onScoreCalculated}
            onGameOver={onGameOver}
          />
        )}
      </PlayPage>
    </>
  );
}
export default NumberPlayPage;
