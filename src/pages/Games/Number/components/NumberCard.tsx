import { useState } from "react";
import CardBack from "./CardBack";
import CardFront from "./CardFront";
import { motion, AnimatePresence } from "framer-motion";
import S from "./Card.module.css";
import { useNumberStep } from "../../../../hooks/useNumberStep";
function NumberCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { answer, randomNumberList } = useNumberStep(3);
  const gridSize = Math.round(Math.sqrt(randomNumberList?.length ?? 1));
  const getCellSize = (step: number) => {
    switch (step) {
      case 1:
        return { width: "100px", height: "132px" };
      case 2:
        return { width: "90px", height: "119px" };
      case 3:
        return { width: "74px", height: "98px" };
      case 4:
        return { width: "74px", height: "98px" };
      default:
        return { width: "60px", height: "60px" };
    }
  };

  const cellSize = getCellSize(3);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <>
      {/* 정답 맞출 때 애니메이션  */}
      {/* <div className={S.card} onClick={handleClick}>
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0 }}
            >
              <CardFront />
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0 }}
            >
              <CardBack />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
     */}
      <div className={S.cardContainer}>
        {/* <CardFront
          randomNumberList={randomNumberList!}
          cellSize={cellSize}
          gridSize={gridSize}
        /> */}
        <CardBack
          randomNumberList={randomNumberList!}
          cellSize={cellSize}
          gridSize={gridSize}
        />
      </div>
    </>
  );
}
export default NumberCard;
