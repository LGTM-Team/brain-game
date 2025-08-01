import Footer from "./components/Footer";
import RankingModal from "@/common/modals/Ranking/RankingModal";
import { useEffect, useState } from "react"; // useEffect 추가
import { useAllGames } from "@/hooks/useAllGames";
import { useAllRankingData } from "@/hooks/useAllRankingData";
import S from "./homePage.module.css";
import img from "@/assets/images/home_img.svg";
import GameCard from "./components/GameCard";
import Spinner from "@/common/layout/Spinner"; // 로딩 스피너 컴포넌트 추가

// 이미지 & 라우팅 경로 하드 코딩 => 추후에 스토리지 추가하면 변경 예정.
const gameMetaMap: Record<string, { image: string; path: string }> = {
  "숫자를 외워라!": {
    image: "/src/assets/images/game/number_game.svg",
    path: "/games/numbers",
  },
  "초성 퀴즈": {
    image: "/src/assets/images/game/word_game.svg",
    path: "/games/choseong",
  },
  "색깔을 맞춰라!": {
    image: "/src/assets/images/game/letterColor_game.svg",
    path: "/games/letter-color",
  },
};

// 기본 게임 데이터 (스켈레톤용)
const defaultGames = [
  { game_id: 1, name: "숫자를 외워라!", description: "숫자를 기억하고@순서대로 맞춰보세요" },
  { game_id: 2, name: "초성 퀴즈", description: "초성을 보고@단어를 맞춰보세요" },
  { game_id: 3, name: "색깔을 맞춰라!", description: "색깔을 기억하고@순서대로 맞춰보세요" },
];

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{ id: number; name: string } | null>(null);

  const { games, loading: gamesLoading, error: gamesError } = useAllGames();
  const { rankings, loading: rankingLoading } = useAllRankingData(selectedGame?.id ?? 0);

  // 랭킹 데이터를 가져오는 로직을 분리합니다.
  const handleOpenRanking = (gameId: number, name: string) => {
    setIsOpen(false);
    setSelectedGame({ id: gameId, name });
  };
  
  // selectedGame이 업데이트되고 랭킹 로딩이 완료되면 모달 오픈.
  useEffect(() => {
    if (selectedGame && !rankingLoading) {
      setIsOpen(true);
    }
  }, [selectedGame, rankingLoading]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedGame(null); // 모달정보 초기화.
  };

  // 로딩 중이거나 에러가 있을 때는 기본 게임 데이터 사용
  const displayGames = gamesLoading || gamesError ? defaultGames : games;

  return (
    <div className={S.container}>
      <main className={S.main}>
        <img src={img} className={S.mainImg} alt="메인 이미지" />

        {gamesError && <p>에러 발생: {gamesError}</p>}

        {displayGames?.map((game) => {
          const meta = gameMetaMap[game.name];
          return (
            <GameCard
              key={game.game_id}
              imageSrc={meta?.image ?? ""}
              title={game.name}
              description={game.description}
              linkTo={meta?.path ?? "/games"}
              onIconClick={() => handleOpenRanking(game.game_id, game.name)}
              isLoading={gamesLoading}
            />
          );
        })}

        <RankingModal
          data={rankings ?? []}
          gameName={selectedGame?.name ?? ""}
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;