import S from "./gamePage.module.css";
import { AppLink } from "@/router/AppLink";
import runNeuro from "@/assets/images/pages/game/run_neuro_cloud.svg";

function GamesPage() {
  return (
    <>
      <div className={S.container}>
        <img src={runNeuro} alt="" />
        <div className={S.anchors}>
          <AppLink variant={"page"} to={"numbers"} className={S.link}>
            숫자를 외워라!
          </AppLink>
          <AppLink variant={"page"} to={"choseong"} className={S.link}>
            초성 퀴즈
          </AppLink>
          <AppLink variant={"page"} to={"letter-color"} className={S.link}>
            색깔을 맞춰라!
          </AppLink>
        </div>
      </div>
    </>
  );
}
export default GamesPage;
