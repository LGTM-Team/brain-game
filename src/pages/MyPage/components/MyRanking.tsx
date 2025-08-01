import RankingModal from "@/common/modals/Ranking/RankingModal";
import { useState } from "react";
import { useMyRankingData } from "@/hooks/useMyRankingData";

interface Props {
  userId: string | null;
  gameId: number; 
  gameName: string;
}

function MyRanking({ userId, gameId, gameName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { rankings, loading, error } = useMyRankingData(gameId, userId || ""); // useMyRankingData 훅 사용

  const handleShowMyRanking = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleShowMyRanking}>
        나의 {gameName} 게임 랭킹
        {loading && " (로딩중...)"}
        {error && " (오류 발생)"}
      </button>
      <RankingModal
        gameName={gameName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={rankings ?? []} // 실제 데이터 사용
      />
    </>
  );
}
export default MyRanking;