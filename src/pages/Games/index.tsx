import { useParams, useLoaderData } from "react-router-dom";
import { GameEntry } from "@/api/service/game/getAllGames";
import S from "./gamePage.module.css";
import { AppLink } from "@/router/AppLink";
import runNeuro from "@/assets/images/pages/game/run_neuro_cloud.svg";
import LetterColorGamePage from "./LetterColor";
import NumberPlayPage from "./Number";
import ChoseongPlayPage from "./Choseong";
import NotFoundPage from "@/pages/NotFound";

function GamesPage() {
  const { gameType } = useParams<{ gameType: string }>();
  const games = useLoaderData() as GameEntry[];

  // gameType이 없으면 게임 선택 페이지 렌더링
  if (!gameType) {
    // 게임 목록이 없을 때
    if (!games || games.length === 0) {
      return <div>게임이 없습니다.</div>;
    }

    return (
      <div className={S.container}>
        <img src={runNeuro} alt="" />
        <div className={S.anchors}>
          {games.map((game) => {
            const gameLink = game.segment || "";
            
            return (
              <AppLink 
                key={game.game_id}
                variant={"page"} 
                to={gameLink} 
                className={S.link}
              >
                {game.name}
              </AppLink>
            );
          })}
        </div>
      </div>
    );
  }

  // gameType이 있으면 해당 게임 렌더링
  switch (gameType) {
    case "letter-color":
      return <LetterColorGamePage />;
    case "numbers":
      return <NumberPlayPage />;
    case "choseong":
      return <ChoseongPlayPage />;
    default:
      return <NotFoundPage errorMessage="존재하지 않는 게임입니다." />;
  }
}

export default GamesPage;