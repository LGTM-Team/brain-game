import S from "./styles/currentGameScore.module.css";
interface Props {
  score: number;
}

function CurrentGameScore({ score }: Props) {
  const currentScore = score.toLocaleString();
  return (
    <div className={S.currentScore}>
      <h3>현재 점수</h3>
      <p>{currentScore}</p>
    </div>
  );
}
export default CurrentGameScore;
