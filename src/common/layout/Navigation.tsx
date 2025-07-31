import { useState, useEffect } from "react"; // useEffect 추가
import { useLocation } from "react-router-dom";
import S from "../styles/fixedLayout.module.css";
import { AuthIcon, GameIcon, HomeIcon } from "./navigationIcons";
import { AppLink } from "@/router/AppLink";
import { useAuth } from "@/contexts/AuthContext";

function Navigation() {
  const ACTIVE_COLOR = "#6db7ebff";
  const DEFAULT_COLOR = "#8c8c8cff";
  const [activeMenu, setActiveMenu] = useState("");
  const { user } = useAuth();
  const location = useLocation();

  // 라우팅 변화 시 activeMenu 자동 설정
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") setActiveMenu("home");
    else if (path.startsWith("/games")) setActiveMenu("game");
    else if (path.startsWith("/mypage")) setActiveMenu("mypage");
    else if (path.startsWith("/login")) setActiveMenu("login");
    else setActiveMenu("");
  }, [location.pathname]);

  return (
    <ul className={S.navigation}>
      <AppLink variant="tab" to="games">
        <li onClick={() => setActiveMenu("game")}>
          <GameIcon
            color={activeMenu === "game" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
          <p className={activeMenu === "game" ? S.active : ""}>게임</p>
        </li>
      </AppLink>

      <AppLink className={S.active} variant="tab" to="">
        <li onClick={() => setActiveMenu("home")}>
          <HomeIcon
            color={activeMenu === "home" ? ACTIVE_COLOR : DEFAULT_COLOR}
          />
          <p className={activeMenu === "home" ? S.active : ""}>홈</p>
        </li>
      </AppLink>

      <AppLink variant="tab" to={user ? "mypage" : "login"}>
        <li onClick={() => setActiveMenu(user ? "mypage" : "login")}>
          <AuthIcon
            color={activeMenu === "mypage" || activeMenu === "login"
              ? ACTIVE_COLOR
              : DEFAULT_COLOR}
          />
          <p className={activeMenu === "mypage" || activeMenu === "login"
              ? S.active
              : ""}
          >
            {user ? "마이페이지" : "로그인"}
          </p>
        </li>
      </AppLink>
    </ul>
  );
}

export default Navigation;
