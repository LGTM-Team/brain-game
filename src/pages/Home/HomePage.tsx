import neuro from "@/assets/images/Neuro.png";
import Footer from "./components/Footer";
import RankingModal from "@/components/modals/Ranking/RankingModal";
import { useEffect, useState } from "react";
import { rankingData } from "@/components/modals/Ranking/RankData";
import { AppLink } from "@/router/AppLink";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };


  useEffect(() => {}, [isOpen]);
  return (
    <>
      <div>
        <h1>뇌하수체</h1>
        <a href="https://github.com/LGTM-Team/brain-game" target="_blank">
          <img src={neuro} alt="Vite logo" />
        </a>
      </div>
      <button type="button" onClick={handleModal}>
        모달창 열기{" "}
      </button>
      <RankingModal
        data={rankingData}
        gameName="숫자 순서 기억"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      
      <AppLink to={"sign-up"} variant={"page"}>
        <button type="button">회원가입 입니디~</button>
      </AppLink>

      <Footer />
    </>
  );
}

export default HomePage;
