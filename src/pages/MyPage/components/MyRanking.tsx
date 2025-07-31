import RankingModal from "@/components/modals/Ranking/RankingModal";
import { useState } from "react";
import { rankingData } from "@/components/modals/Ranking/RankData";

interface Props {
  userId: string | null;
  gameId?: string;
  gameName: string;
}

function MyRanking({ userId, gameId, gameName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowMyRanking = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleShowMyRanking}>
        나의 {gameName} 게임 랭킹
      </button>
      <RankingModal
        gameName={gameName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={rankingData}
      />
    </>
  );
}
export default MyRanking;
