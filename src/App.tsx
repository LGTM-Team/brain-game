import { Outlet, useMatches } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

interface RouteHandle {
  title?: string;
}

function App() {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  if (!currentMatch.handle) return;
  const currentTitle = (currentMatch.handle as RouteHandle).title || "뇌하수체";
  return (
    <>
      <Header title={currentTitle} />
      <main>
        <Outlet />
      </main>
      <Navigation />
    </>
  );
}
export default App;
