import { useEffect, useState } from "react";
import CardBack from "./CardBack";
import CardFront from "./CardFront";
import { motion, AnimatePresence } from "framer-motion";
import ShuffleCard from "./ShuffleCard";

interface Props {
  cardStatus: string;
  gameStep: string;
  randomNumberList: number[] | null;
  gridSize: number;
  setUserAnswer: React.Dispatch<React.SetStateAction<number[]>>;
}

function NumberCard({
  cardStatus,
  gameStep,
  setUserAnswer,
  gridSize,
  randomNumberList,
}: Props) {
  return (
    <>
      <AnimatePresence mode="wait">
        {cardStatus === "shuffle" && (
          <motion.div
            key="front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShuffleCard
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
            />
          </motion.div>
        )}
        {cardStatus === "front" && (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardFront
              gameStep={gameStep}
              randomNumberList={randomNumberList!}
              gridSize={gridSize}
            />
          </motion.div>
        )}
        {cardStatus === "back" && (
          <motion.div
            key="back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardBack
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
