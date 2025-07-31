import { AppLink } from "@/router/AppLink";
import S from "../styles/fixedLayout.module.css";
import backward from "@/assets/icons/backward.svg";
import { useLocation } from "react-router-dom";

interface Props {
  title: string;
}

function Header({ title }: Props) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={S.header}>
      {!isHome && (
        <AppLink variant={"back"}>
          <img src={backward} alt="뒤로가기" />
        </AppLink>
      )}
      <h1>{title}</h1>
    </header>
  );
}

export default Header;