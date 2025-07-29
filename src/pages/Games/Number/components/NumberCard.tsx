import type { CardStatus, GameStep } from "@/types/numberGame.type";
import CardBack from "./CardBack";
import CardFront from "./CardFront";
import ShuffleCard from "./ShuffleCard";

interface Props {
  cardStatus: CardStatus;
  gameStep: GameStep;
  randomNumberList: number[] | null;
  gridSize: number;
  round: number;
  setUserAnswer: React.Dispatch<React.SetStateAction<number[]>>;
  userRound: number;
}

function NumberCard({
  cardStatus,
  gameStep,
  setUserAnswer,
  gridSize,
  randomNumberList,
  round,
  userRound,
}: Props) {
  return (
    <>
      {cardStatus === "shuffle" && (
        <ShuffleCard key={round} userRound={userRound} />
      )}
      {cardStatus === "front" && (
        <CardFront
          key={round}
          gameStep={gameStep}
          randomNumberList={randomNumberList!}
          gridSize={gridSize}
        />
      )}
      {cardStatus === "back" && (
        <CardBack
          key={round}
          gameStep={gameStep}
          randomNumberList={randomNumberList!}
          gridSize={gridSize}
          setUserAnswer={setUserAnswer}
        />
      )}
    </>
  );
}
export default NumberCard;
