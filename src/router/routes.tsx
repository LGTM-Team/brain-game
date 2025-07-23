import App from "@/App";
import GamePage from "@/pages/Games/GamePage";
import HomePage from "@/pages/Home/HomePage";
import NoticePage from "@/pages/Notice/NoticePage";
import QnaPage from "@/pages/Qna/QnaPage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { handle: { title: "뇌하수체" }, path: "", element: <HomePage /> },
      {
        handle: { title: "게임 바로가기 왜 안돼?" },
        path: "games",
        element: <GamePage />,
      },
      {
        handle: { title: "공지사항" },
        path: "/notice",
        element: <NoticePage />,
      },
      { handle: { title: "고객문의" }, path: "/qna", element: <QnaPage /> },
    ],
  },
]);

export default routes;
