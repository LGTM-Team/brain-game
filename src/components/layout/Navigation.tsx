import { useState } from "react";
import S from "../styles/fixedLayout.module.css";
import { AuthIcon, GameIcon, HomeIcon } from "./navigationIcons";
import { AppLink } from "@/router/AppLink";
import { useAuth } from "@/contexts/AuthContext"; 
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [iconColor] = useState("#8c8c8cff");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleMyPageClick = () => {
    if (loading) return; // 세션 확인 중이면 아무 것도 안 함
    if (user) {
      navigate("mypage");
    } else {
      navigate("login");
    }
  };

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
      <button type="button" onClick={handleMyPageClick}>
        <AuthIcon color={iconColor} />
        <p>마이페이지</p>
      </button>
    </div>
  );
}
export default Navigation;
