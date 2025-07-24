import App from "@/App";
import GamesPage from "@/pages/Games/GamesPage";
import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import NoticePage from "@/pages/Notice/NoticePage";
import QnaPage from "@/pages/Qna/QnaPage";
import PendingEmail from "@/pages/SignUp/PendingEmail";
import SignUp from "@/pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { handle: { title: "뇌하수체" }, path: "", element: <HomePage /> },
      {
        handle: {
          title: "게임",
        },
        path: "games",
        element: <GamesPage />,
      },
      {
        handle: { title: "공지사항" },
        path: "/notice",
        element: <NoticePage />,
      },
      { handle: { title: "고객문의" }, path: "/qna", element: <QnaPage /> },
      { handle: { title: "이메일 대기" }, path: "pending-email", element: <PendingEmail /> },
      { handle: { title: "회원가입" }, path: "sign-up", element: <SignUp /> },
      { handle: { title: "ERROR" }, path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default routes;
