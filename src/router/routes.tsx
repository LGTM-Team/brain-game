import GamesPage from "@/pages/Game/GamesPage";
<<<<<<< HEAD
import MemorizeNumberCard from "@/pages/Game/MemorizeNumberCard/MemorizeNumberCard";
import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
=======
import HomePage from "@/pages/Home/HomePage";
>>>>>>> eceec85 (feat(route): routes 배열 정의를 위한 router.tsx 생성)
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
<<<<<<< HEAD
  {
    title: "NotFound",
    path: "*",
    element: <NotFoundPage />,
  },
=======
>>>>>>> eceec85 (feat(route): routes 배열 정의를 위한 router.tsx 생성)
];

export default routes;
