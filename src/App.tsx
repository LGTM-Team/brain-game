import { Outlet, useMatches } from "react-router-dom";
import Header from "./common/layout/Header";
import Navigation from "./common/layout/Navigation";

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
      <main className="global-container">
        <Header title={currentTitle} />
        <div className="outlet-wrapper">
          <Outlet />
        </div>
        <Navigation />
      </main>
    </>
  );
}
export default App;
