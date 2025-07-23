import HomePage from "@/pages/Home/HomePage";
import NoticePage from "@/pages/Notice/NoticePage";
import QnaPage from "@/pages/Qna/QnaPage";
import type { JSX } from "react";

interface Route {
  title: string;
  path: string;
  element: JSX.Element;
}
//테스트

const routes: Route[] = [
  { title: "홈", path: "/", element: <HomePage /> },
  { title: "공지사항", path: "/notice", element: <NoticePage /> },
  { title: "고객문의", path: "/qna", element: <QnaPage /> },
];

export default routes;
