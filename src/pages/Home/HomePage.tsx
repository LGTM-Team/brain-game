import neuro from "@/assets/images/Neuro.png";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <>
      <div>
        <h1>뇌하수체</h1>
        <a href="https://github.com/LGTM-Team/brain-game" target="_blank">
          <img src={neuro} alt="Vite logo" />
        </a>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
