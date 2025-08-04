import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/pages/Home";
import GamesLayout from "@/pages/Games/GamesLayout";
import GamesPage from "@/pages/Games";
import LetterColorPlayPage from "@/pages/Games/LetterColor/index";
import NoticePage from "@/pages/Notice/index";
import QnaPage from "@/pages/Qna/index";
import MyPage from "@/pages/MyPage";
import PendingEmail from "@/pages/SignUp/components/PendingEmail";
import SignUp from "@/pages/SignUp";
import ChoseongPlayPage from "@/pages/Games/Choseong/index";
import NumberPlayPage from "@/pages/Games/Number/index";
import NotFoundPage from "@/pages/NotFound";
import FindAccount from "@/pages/FindAccount";
import Login from "@/pages/Login";
import PostSignUp from "@/pages/SignUp/components/PostSignUp";
import QnaLayout from "@/pages/Qna/QnaLayout";
import QnaWritePage from "@/pages/Qna/write";
import SharePage from "@/pages/Games/Share";

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
              title: "색깔을 맞춰라",
            },
            path: "letter-color",
            element: <LetterColorPlayPage />,
          },
          {
            handle: { title: "숫자를 외워라" },
            path: "numbers",
            element: <NumberPlayPage />,
          },
          {
            handle: { title: "초성 퀴즈" },
            path: "Choseong",
            element: <ChoseongPlayPage />,
          },
          {
            handle: { title: "게임 결과 공유" },
            path: "share/:rankingId",
            element: <SharePage />,
          },
        ].filter(Boolean),
      },
      {
        handle: { title: "공지사항" },
        path: "notice",
        element: <NoticePage />,
      },
      { handle: { title: "마이페이지" }, path: "mypage", element: <MyPage /> },
      {
        path: "qna",
        element: <QnaLayout />,
        children: [
          { handle: { title: "고객문의" }, path: "", element: <QnaPage /> },
          {
            handle: { title: "문의작성" },
            path: "write",
            element: <QnaWritePage />,
          },
        ],
      },
      { handle: { title: "로그인" }, path: "login", element: <Login /> },
      {
        handle: { title: "계정찾기" },
        path: "find-account",
        element: <FindAccount />,
      },
      {
        handle: { title: "이메일 대기" },
        path: "pending-email",
        element: <PendingEmail />,
      },
      { handle: { title: "회원가입" }, path: "sign-up", element: <SignUp /> },
      {
        handle: { title: "계정활성화" },
        path: "post-sign-up",
        element: <PostSignUp />,
      },
      {
        handle: { title: "ERROR" },
        path: "*",
        element: <NotFoundPage errorMessage="페이지를 찾을 수 없습니다." />,
      },
    ],
  },
]);

export default routes;
