import { useEffect, useState } from "react";
import S from "./card.module.css";
import NumberCard from "./NumberCard";
import CurrentGameScore from "../../components/CurrentGameScore";
import StaticTimer from "../../components/StaticTimer";
import { useNumberStep } from "@/hooks/useNumberStep";
import { useBonusScore } from "@/hooks/useBonusScore";
import type { CardStatus, GameStep } from "@/types/numberGame.type";
import type { PlayGame } from "@/types/game.type";
import {
  showBackCard,
  showFrontCard,
  showShuffleCard,
} from "../../../../types/numberCardSetting";
import {
  onFailRound,
  onSuccessRound,
  validateAnswer,
} from "@/utils/numberGameProcess";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";

function NumberCardPlay({
  state,
  onFinish,
  onScoreCalculated,
  onGameOver,
}: PlayGame) {
  const [currentScore, setCurrentScore] = useState(0);
  const { get, BonusRestart, BonusStart } = useBonusScore(30);
  const [round, setRound] = useState(0);
  const [userRound, setUserRound] = useState(0);
  const [cardStatus, setCardStatus] = useState<CardStatus>("back");
  const [gameStep, setGameStep] = useState<GameStep>("first");
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isStartFirstRound, setIsStartFirstRound] = useState(false);
  const [gameStartCountdown, setGameStartCountdown] = useState<number>(0);
  const { answer, randomNumberList } = useNumberStep({
    step: gameStep,
    round,
    setGameStep,
    setRound,
  });
  useCountdownTimer({ gameStartCountdown, setGameStartCountdown });
  const gridSize = Math.round(Math.sqrt(randomNumberList?.length ?? 1));

  // 게임 시작
  useEffect(() => {
    if (state === "starting") {
      setIsTimerActive(false);
      setCurrentScore(0);
      setRound(0);
      setUserAnswer([]);
      setUserRound(0);
      setGameStep("first");
      setIsStartFirstRound(true);
    }
    if (state === "playing") {
      showFrontCard({ setCardStatus, setGameStartCountdown });
      showBackCard({
        setIsTimerActive,
        setCardStatus,
        isStartFirstRound,
        BonusStart,
      });
    }
  }, [state]);

  // 게임 진행
  const handleGame = async (isTimeout = false) => {
    const isCorrect = validateAnswer({ answer, userAnswer });

    if (!isCorrect || isTimeout) {
      onFailRound({
        onScoreCalculated,
        onFinish,
        onGameOver,
        currentScore,
        setIsTimerActive,
      });
      return;
    }

    //정답 처리
    if (userAnswer!.length === answer!.length) {
      const bonus = get();
      await onSuccessRound({
        bonus,
        currentScore,
        setCurrentScore,
        setRound,
        setUserRound,
        setUserAnswer,
      });

      ///카드세팅
      await showShuffleCard({
        setCardStatus,
        setIsTimerActive,
        setGameStartCountdown,
        BonusRestart,
        isReadyForNextRound: true,
      });
    }
  };

  // 사용자 입력값 변경 시 정답 체크
  useEffect(() => {
    if (userAnswer.length === 0) return;
    const run = async () => {
      await handleGame();
    };
    run();
  }, [userAnswer]);

  return (
    <>
      <CurrentGameScore score={currentScore} />
      <main className={S.playContainer}>
        {isTimerActive && (
          <StaticTimer
            duration={30}
            onTimeOver={() => handleGame(true)}
            isPlaying={isTimerActive}
            key={round}
          />
        )}
        {!isTimerActive && gameStartCountdown !== 0 && (
          <div className={S.gameStartCountdown}>
            <h3>
              <span>{gameStartCountdown}초</span> 뒤 게임 시작!
            </h3>
          </div>
        )}

        <div className={S.cardContainer}>
          <NumberCard
            key={`${gameStep}-${round}`}
            round={round}
            cardStatus={cardStatus}
            gameStep={gameStep}
            randomNumberList={randomNumberList}
            gridSize={gridSize}
            setUserAnswer={setUserAnswer}
            userRound={userRound}
          />
        </div>
      </main>
    </>
  );
}
export default NumberCardPlay;
