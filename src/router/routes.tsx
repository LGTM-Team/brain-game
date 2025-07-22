import GamesPage from "@/pages/Game/GamesPage";
import HomePage from "@/pages/Home/HomePage";
import type { JSX } from "react";

interface Route {
  title: string;
  path: string;
  element: JSX.Element;
}

const routes: Route[] = [
  { title: "홈", path: "/", element: <HomePage /> },
  {
    title: "games",
    path: "/games",
    element: <GamesPage />,
  },
];

export default routes;
