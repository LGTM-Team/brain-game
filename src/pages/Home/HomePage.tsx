import Footer from "./components/Footer";
import RankingModal from "@/common/modals/Ranking/RankingModal";
import { useState } from "react";
import { useAllGames } from "@/hooks/useAllGames";
import S from "./homePage.module.css";
import img from "@/assets/images/home_img.svg";
import GameCard from "./components/GameCard";

// 게임 이름 → 이미지 & 라우팅 경로 매핑
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

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => setIsOpen((prev) => !prev);

  const { games, loading, error } = useAllGames();

  return (
    <div className={S.container}>
      <main className={S.main}>
        <img src={img} className={S.mainImg} alt="메인 이미지" />

        {loading && <p>로딩 중...</p>}
        {error && <p>에러 발생: {error}</p>}

        {games?.map((game) => {
          const meta = gameMetaMap[game.name];

          return (
            <GameCard
              key={game.game_id}
              imageSrc={meta?.image ?? ""}
              title={game.name}
              description={game.description}
              linkTo={meta?.path ?? "/games"}
              onIconClick={handleModal}
            />
          );
        })}

        <RankingModal
          data={[]}
          gameName="숫자 순서 기억"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
