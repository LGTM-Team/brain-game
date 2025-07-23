import MainLayout from "@/layouts/MainLayout";
import GamePage from "@/pages/Games/GamePage";
import HomePage from "@/pages/Home/HomePage";
import type { JSX } from "react";

interface Route {
  title: string;
  path: string;
  element: JSX.Element;
  children: {
    title: string;
    path: string;
    element: JSX.Element;
  }[];
}
const routes: Route[] = [
  {
    title: "메인 레이아웃",
    path: "/",
    element: <MainLayout />,
    children: [
      { title: "홈", path: "", element: <HomePage /> },
      { title: "게임 바로가기", path: "games", element: <GamePage /> },
    ],
  },
];

export default routes;
