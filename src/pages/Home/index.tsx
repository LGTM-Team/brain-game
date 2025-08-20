// src/pages/HomePage/HomePage.tsx
import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import { useAllRankingData } from "@/hooks/useAllRankingData";
import Footer from "./components/Footer";
import RankingModal from "@/common/modals/Ranking/RankingModal";
import GameCard from "./components/GameCard";
import S from "./homePage.module.css";
import img from "@/assets/images/pages/home/home_img.svg";

import type { HomeLoaderData } from "@/router/loaders/homePageLoader";

function HomePage() {
  // 로더에서 데이터 가져오기
  const { games, error: gamesError } = useLoaderData() as HomeLoaderData;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{ id: number; name: string } | null>(null);

  // 랭킹 데이터는 모달용이므로 기존 훅 유지
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

  return (
    <div className={S.container}>
      <main className={S.main}>
        <img src={img} className={S.mainImg} alt="메인 이미지" />

        {gamesError && <p>에러 발생: {gamesError}</p>}

        {games?.map((game) => {
          return (
            <GameCard
              key={game.game_id}
              imageSrc={game.img_url}
              title={game.name}
              description={game.description}
              linkTo={"/games"} // 나중에 slug 기반 동적 라우팅으로 교체 예정
              onIconClick={() => handleOpenRanking(game.game_id, game.name)}
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
