import Footer from "./components/Footer";
import RankingModal from "@/common/modals/Ranking/RankingModal";
import { useEffect, useState } from "react";
import { rankingData } from "@/common/modals/Ranking/RankData";
import S from "./homePage.module.css";
import img from "@/assets/images/home_img.svg";
import numberCardImg from "@/assets/images/game/number_game.svg";
import wordImg from "@/assets/images/game/word_game.svg";
import colorImg from "@/assets/images/game/letterColor_game.svg";

import GameCard from "./components/GameCard";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };

  useEffect(() => {}, [isOpen]);
  return (
    <div className={S.container}>
      <main className={S.main}>
        <img src={img} className={S.mainImg} />
        <GameCard
          imageSrc={numberCardImg}
          title="숫자 순서 기억 게임"
          description={
            <>
              <p>작업 기억과 공간 기억을 발달 시키기!</p>
              <p>당신의 기억력을 테스트 해보세요!</p>
            </>
          }
          linkTo="/games/numbers"
          linkText="시작하기"
          onIconClick={handleModal}
        />
        <GameCard
          imageSrc={wordImg}
          title="단어 완성 게임"
          description={
            <>
              <p>작업 기억과 공간 기억을 발달 시키기!</p>
              <p>당신의 기억력을 테스트 해보세요!</p>
            </>
          }
          linkTo="/games/choseong"
          linkText="시작하기"
          onIconClick={handleModal}
        />
        <GameCard
          imageSrc={colorImg}
          title="글자색 맞추기 기억 게임"
          description={
            <>
              <p>작업 기억과 공간 기억을 발달 시키기!</p>
              <p>당신의 기억력을 테스트 해보세요!</p>
            </>
          }
          linkTo="/games/letter-color"
          linkText="시작하기"
          onIconClick={handleModal}
        />
        <RankingModal
          data={rankingData}
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
