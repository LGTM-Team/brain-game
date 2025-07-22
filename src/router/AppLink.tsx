import { NavLink, useNavigate, Link } from "react-router-dom";
import S from "./AppLink.module.css";

interface AppLinkProps {
  to?: string;
  variant: "tab" | "back" | "page";
  children?: React.ReactNode;
  className?: string;
}

export const AppLink = ({ to, variant, children, className }: AppLinkProps) => {
  const navigate = useNavigate();

  // 헤더 뒤로가기 전용
  if (variant === "back") {
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );
  }

  // 탭바 라우팅 (activeClassName으로 현재 탭 표시 가능)
  // 추후 auth 체크하는 로직 추가예정 로그인<->마이페이지 전환
  if (variant === "tab") {
    return (
      <NavLink
        to={to!}
        className={({ isActive }) => (isActive ? S.active : "")}
      >
        {children}
      </NavLink>
    );
  }

  // 일반 페이지 내 링크
  return (
    <Link to={to!} className={className}>
      {children}
    </Link>
  );
};
