import routes from "@/router/routes";
import { useRoutes } from "react-router-dom";

function App() {
  const route = useRoutes(routes);
  return route;
}
export default App;
