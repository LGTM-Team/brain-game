import S from "./styles/style.module.css";
import github from "@/assets/icons/github.svg";
import programmers from "@/assets/icons/programmers.svg";
import { AppLink } from "@/router/AppLink";

export default function Footer() {
  return (
    <footer>
      <div className={S.buttonContainer}>
        <AppLink to="/qna" variant="page">
          <button>고객문의</button>
        </AppLink>
        <span>|</span>
        <AppLink to="/notice" variant="page">
          <button>공지사항</button>
        </AppLink>
      </div>

      <h3>뇌하수체</h3>
      <div className={S.iconContainer}>
        <a href="https://github.com/LGTM-Team/brain-game">
          <img src={github} alt="깃허브" />
        </a>
        <a href="https://programmers.co.kr/">
          <img src={programmers} alt="프로그래머스" />
        </a>
      </div>
      <p>© 2025 뇌하수체 All rights reserved.</p>
    </footer>
  );
}
