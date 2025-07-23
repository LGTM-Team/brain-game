import S from "./styles/style.module.css";
import github from "@/assets/icons/github.svg";
import programmers from "@/assets/icons/programmers.svg";

export default function Footer() {
  return (
    <footer>
      <div className={S.buttonContainer}>
        <button>고객문의</button>
        <span>|</span>
        <button>공지사항</button>
      </div>
      <h3>뇌하수체</h3>
      <div className={S.iconContainer}>
        <img src={github} alt="깃허브" />
        <img src={programmers} alt="프로그래머스" />
      </div>
      <p>© 2025 뇌하수체 All rights reserved.</p>
    </footer>
  );
}
