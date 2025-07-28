import { useState } from "react";
import S from "../styles/fixedLayout.module.css";
import { AuthIcon, GameIcon, HomeIcon } from "./navigationIcons";
import { AppLink } from "@/router/AppLink";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const ACTIVE_COLOR = "#6db7ebff";
  const DEFAULT_COLOR = "#8c8c8cff";
  const [activeMenu, setActiveMenu] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleMyPageClick = () => {
    if (loading) return; // 세션 확인 중이면 아무 것도 안 함
    if (user) {
      navigate("mypage");
      onChangeActiveMenu("mypage");
    } else {
      navigate("login");
      onChangeActiveMenu("login");
    }
  };

  const onChangeActiveMenu = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <ul className={S.navigation}>
      <AppLink variant={"tab"} to={"games"}>
        <li
          onClick={() => {
            onChangeActiveMenu("game");
          }}
        >
          <GameIcon
            color={activeMenu === "game" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
          <p>게임</p>
        </li>
      </AppLink>
      <AppLink className={S.active} variant={"tab"} to={""}>
        <li
          onClick={() => {
            onChangeActiveMenu("home");
          }}
        >
          <HomeIcon
            color={activeMenu === "home" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
          <p>홈</p>
        </li>
      </AppLink>
      <button type="button" onClick={handleMyPageClick}>
        <AuthIcon
          color={
            activeMenu === "mypage" || activeMenu === "login"
              ? ACTIVE_COLOR
              : DEFAULT_COLOR
          }
        />
        <p>마이페이지</p>
      </button>
    </ul>
  );
}
export default Navigation;
