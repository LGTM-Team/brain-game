import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import S from "../components/styles/fixedLayout.module.css";

interface AppLinkProps {
  to?: string;
  variant: "tab" | "back" | "page";
  children?: React.ReactNode;
  className?: string;
}

export const AppLink = ({ to, variant, children, className }: AppLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 헤더 뒤로가기 전용
  if (variant === "back") {
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );
  }

  // 탭바 라우팅
  // 추후 auth 체크하는 로직 추가예정 로그인<->마이페이지 전환
  if (variant === "tab") {
    return (
      <NavLink to={to!}>
        {({ isActive }) => (
          <button type="button" className={isActive ? S.active : ""}>
            {children}
          </button>
        )}
      </NavLink>
    );
  }

  // 일반 페이지 내 링크
  return (
    <Link to={to!} className={className} state={{ from: location }}>
      {children}
    </Link>
  );
};
