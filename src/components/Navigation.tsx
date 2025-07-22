import { useState } from "react";
import S from "./styles/fixedLayout.module.css";
import { AuthIcon, GameIcon, HomeIcon } from "./navigationIcons";

function Navigation() {
  const [iconColor, setIconColor] = useState("#8c8c8cff");
  return (
    <div className={S.navigation}>
      <button type="button">
        <GameIcon color={iconColor} />
        <p>게임</p>
      </button>
      <button className={S.active} type="button">
        <HomeIcon color={iconColor} />
        <p>홈</p>
      </button>
      <button type="button">
        <AuthIcon color={iconColor} />
        <p>마이페이지</p>
      </button>
    </div>
  );
}
export default Navigation;
