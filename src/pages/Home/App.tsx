import neuro from "@/assets/images/Neuro.png";
import Header from "@/components/Header";

function App() {
  return (
    <>
      <Header title={"뇌하수체"} />
      <div style={{ backgroundColor: "white" }}>
        <h1>뇌하수체</h1>
        <a href="https://github.com/LGTM-Team/brain-game" target="_blank">
          <img src={neuro} alt="Vite logo" />
        </a>
      </div>
    </>
  );
}

export default App;
