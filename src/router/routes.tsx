import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/pages/Home/HomePage";
import GamesLayout from "@/pages/Games/GamesLayout";
import GamesPage from "@/pages/Games/GamesPage";
import LetterColorPlayPage from "@/pages/Games/LetterColor/index";
import NoticePage from "@/pages/Notice/index";
import QnaPage from "@/pages/Qna/index";
import MyPage from "@/pages/MyPage/MyPage";
import Login from "@/pages/Login/Login";
import PendingEmail from "@/pages/SignUp/PendingEmail";
import SignUp from "@/pages/SignUp/SignUp";
import ChoseongPlayPage from "@/pages/Games/Choseong/index";
import NumberPlayPage from "@/pages/Games/Number/index";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { handle: { title: "뇌하수체" }, path: "", element: <HomePage /> },
      {
        path: "games",
        element: <GamesLayout />,
        children: [
          {
            handle: {
              title: "게임",
            },
            path: "",
            element: <GamesPage />,
          },
          {
            handle: {
              title: "글자색 맞추기",
            },
            path: "letter-color",
            element: <LetterColorPlayPage />,
          },
          {
            handle: { title: "숫자 순서 맞추기" },
            path: "numbers",
            element: <NumberPlayPage />,
          },
          {
            handle: { title: "초성 퀴즈" },
            path: "Choseong",
            element: <ChoseongPlayPage />,
          },
        ].filter(Boolean),
      },
      {
        handle: { title: "공지사항" },
        path: "/notice",
        element: <NoticePage />,
      },
      { handle: { title: "마이페이지" }, path: "mypage", element: <MyPage /> },
      { handle: { title: "고객문의" }, path: "/qna", element: <QnaPage /> },
      { handle: { title: "로그인" }, path: "login", element: <Login /> },
      {
        handle: { title: "이메일 대기" },
        path: "pending-email",
        element: <PendingEmail />,
      },
      { handle: { title: "회원가입" }, path: "sign-up", element: <SignUp /> },
      { handle: { title: "ERROR" }, path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default routes;
