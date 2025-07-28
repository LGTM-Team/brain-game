import S from "./gamePage.module.css";
import { AppLink } from "@/router/AppLink";
import runNeuro from "@/assets/images/run_neuro_cloud.svg";

function GamesPage() {
  return (
    <>
      <div className={S.container}>
        <img src={runNeuro} alt="" />
        <div className={S.anchors}>
          <AppLink variant={"page"} to={"numbers"} className={S.link}>
            숫자 맞추기 게임 시작하기
          </AppLink>
          <AppLink variant={"page"} to={"choseong"} className={S.link}>
            단어 완성 게임 시작하기
          </AppLink>
          <AppLink variant={"page"} to={"letter-color"} className={S.link}>
            글자색 맞추기 게임 시작하기
          </AppLink>
        </div>
      </div>
    </>
  );
}
export default GamesPage;
