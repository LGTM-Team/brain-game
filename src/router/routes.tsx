import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import HomePage from "@/pages/Home";
import GamesPage from "@/pages/Games";
import NoticePage from "@/pages/Notice/index";
import QnaPage from "@/pages/Qna/index";
import MyPage from "@/pages/MyPage";
import PendingEmail from "@/pages/SignUp/components/PendingEmail";
import SignUp from "@/pages/SignUp";
import NotFoundPage from "@/pages/NotFound";
import FindAccount from "@/pages/FindAccount";
import Login from "@/pages/Login";
import PostSignUp from "@/pages/SignUp/components/PostSignUp";
import QnaLayout from "@/pages/Qna/QnaLayout";
import QnaWritePage from "@/pages/Qna/write";
import SharePage from "@/pages/Games/Share";
import ResetPasswordPending from "@/pages/FindAccount/components/ResetPasswordPending";

import { homePageLoader } from "@/router/loaders/homePageLoader";
import { gamePageLoader } from "@/router/loaders/gamePageLoader";
import { qnaPageLoader } from "@/router/loaders/qnaPageLoader";
import { noticePageLoader } from "@/router/loaders/noticePageLoader";
import { myPageLoader } from "@/router/loaders/myPageLoader";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        handle: { title: "뇌하수체" },
        path: "", 
        element: <HomePage />, 
        loader: homePageLoader
      },
      {
        handle: { title: "게임" },
        path: "games/:gameType?",
        element: <GamesPage />,
        loader: gamePageLoader,
      },
      {
        handle: { title: "게임 결과 공유" },
        path: "games/share/:rankingId",
        element: <SharePage />,
      },
      {
        handle: { title: "공지사항" },
        path: "notice",
        element: <NoticePage />,
        loader: noticePageLoader,
      },
      { 
        handle: { title: "마이페이지" },
        path: "mypage", 
        loader: myPageLoader,
        element: <MyPage /> 
      },
      {
        path: "qna",
        element: <QnaLayout />,
        children: [
          { 
            handle: { title: "고객문의" },
            path: "",
            loader: qnaPageLoader, 
            element: <QnaPage /> 
          },
          {
            handle: { title: "문의작성" },
            path: "write",
            element: <QnaWritePage />,
          },
        ],
      },
      { 
        handle: { title: "로그인" },
        path: "login", 
        element: <Login /> 
      },
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
      { 
        handle: { title: "회원가입" },
        path: "sign-up", 
        element: <SignUp /> 
      },
      {
        handle: { title: "계정활성화" },
        path: "post-sign-up",
        element: <PostSignUp />,
      },
      {
        handle: { title: "계정찾기 대기" },
        path: "reset-password-pending",
        element: <ResetPasswordPending />,
      },
      {
        handle: { title: "ERROR" },
        path: "*",
        element: <NotFoundPage errorMessage="페이지를 찾을 수 없습니다." />,
      },
    ],
  }
]);

export default routes;