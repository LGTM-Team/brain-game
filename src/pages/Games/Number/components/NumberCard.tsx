import CardBack from "./CardBack";
import CardFront from "./CardFront";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  cardStatus: string;
  gameStep: string;
  randomNumberList: number[] | null;
  gridSize: number;
  round: number;
  setUserAnswer: React.Dispatch<React.SetStateAction<number[]>>;
}

function NumberCard({
  cardStatus,
  gameStep,
  setUserAnswer,
  gridSize,
  randomNumberList,
  round,
}: Props) {
  return (
    <>
      <AnimatePresence mode="wait">
        {cardStatus === "front" && (
          <motion.div key={`front-${round}`}>
            <CardFront
              key={round}
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
            />
          </motion.div>
        )}
        {cardStatus === "back" && (
          <motion.div key={`back-${round}`}>
            <CardBack
              key={round}
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
              setUserAnswer={setUserAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default NumberCard;
