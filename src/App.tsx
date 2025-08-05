import { Outlet, useMatches } from "react-router-dom";
import Header from "./common/layout/Header";
import Navigation from "./common/layout/Navigation";
import { useKeyBoard } from "./contexts/KeyboardContext";

interface RouteHandle {
  title?: string;
}

function App() {
  const matches = useMatches();
  const { isKeyboardOpen } = useKeyBoard();
  const currentMatch = matches[matches.length - 1];
  if (!currentMatch.handle) return;
  const currentTitle = (currentMatch.handle as RouteHandle).title || "뇌하수체";
  console.log(isKeyboardOpen);

  return (
    <>
      <main className="global-container">
        <Header title={currentTitle} />
        <div className="outlet-wrapper">
          <Outlet />
        </div>
        {!isKeyboardOpen && <Navigation />}
      </main>
    </>
  );
}
export default App;
