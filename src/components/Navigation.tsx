import { useState } from "react";
import S from "./styles/fixedLayout.module.css";
import { AuthIcon, GameIcon, HomeIcon } from "./navigationIcons";
import { AppLink } from "@/router/AppLink";

function Navigation() {
  const [iconColor] = useState("#8c8c8cff");
  return (
    <div className={S.navigation}>
      <AppLink variant={"tab"} to={"games"}>
        <GameIcon color={iconColor} />
        <p>게임</p>
      </AppLink>
      <AppLink className={S.active} variant={"tab"} to={""}>
        <HomeIcon color={iconColor} />
        <p>홈</p>
      </AppLink>
      <button type="button">
        <AuthIcon color={iconColor} />
        <p>마이페이지</p>
      </button>
    </div>
  );
}
export default Navigation;
