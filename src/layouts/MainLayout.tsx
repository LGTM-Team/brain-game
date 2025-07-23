import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header title={"뇌하수체"} />
      <main>
        <Outlet />
      </main>
      <Navigation />
    </>
  );
}
export default MainLayout;
