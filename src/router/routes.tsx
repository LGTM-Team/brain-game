import GamesPage from "@/pages/Game/GamesPage";
import MemorizeNumberCard from "@/pages/Game/MemorizeNumberCard/MemorizeNumberCard";
import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
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
  {
    title: "NotFound",
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
