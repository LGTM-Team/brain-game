import App from "@/App";
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
    ],
  },
]);

export default routes;
