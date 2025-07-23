import App from "@/App";
import ColorGame from "@/pages/Games/ColorGame";
import GamePage from "@/pages/Games/GamePage";
import HomePage from "@/pages/Home/HomePage";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { handle: { title: "뇌하수체" }, path: "", element: <HomePage /> },
      {
        handle: { title: "게임 바로가기" },
        path: "games",
        element: <GamePage />,
      },
      {
        handle: { title: "글씨 색 맞추기 게임" },
        path: "games/match-color",
        element: <ColorGame />,
      },
    ],
  },
]);

export default routes;
