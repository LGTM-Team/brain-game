import PlayPage from "../components/PlayPage";
import LetterColorPlay from "./LetterColorPlay";

function LetterColorGamePage() {
  return (
    <PlayPage>
      {(state, onFinish) => (
        <LetterColorPlay state={state} onFinish={onFinish} />
      )}
    </PlayPage>
  );
}
export default LetterColorGamePage;
