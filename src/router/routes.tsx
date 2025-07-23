import HomePage from "@/pages/Home/HomePage";
import type { JSX } from "react";

interface Route {
  title: string;
  path: string;
  element: JSX.Element;
}
//테스트

const routes: Route[] = [{ title: "홈", path: "/", element: <HomePage /> }];

export default routes;
