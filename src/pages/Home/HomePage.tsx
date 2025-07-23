import neuro from "@/assets/images/Neuro.png";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <>
      <Header title={"뇌하수체"} />
      <div>
        <h1>뇌하수체</h1>
        <a href="https://github.com/LGTM-Team/brain-game" target="_blank">
          <img src={neuro} alt="Vite logo" />
        </a>
      </div>

      <Footer />
      <Navigation />
    </>
  );
}

export default HomePage;
