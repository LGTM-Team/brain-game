import S from "./ranking.module.css";

export default function RankItem() {
  return (
    <>
      <table>
        <tbody className={S.rankItem}>
          <td className={S.rank + " " + S.first}>
            <p>1</p>
          </td>
          <td className={S.userInfo}>
            <div className={S.userNameScore}>
              <p> 로지</p>
              <span>999,999</span>
            </div>
            <div className={S.totalScore}>
              <div className={S.userScore} style={{ width: "200px" }}></div>
            </div>
          </td>
        </tbody>
      </table>
      <table>
        <tbody className={S.rankItem}>
          <td className={S.rank + " " + S.second}>
            <p>2</p>
          </td>
          <td className={S.userInfo}>
            <div className={S.userNameScore}>
              <p> 로지</p>
              <span>999,999</span>
            </div>
            <div className={S.totalScore}>
              <div className={S.userScore} style={{ width: "200px" }}></div>
            </div>
          </td>
        </tbody>
      </table>
      <table className={S.isMe}>
        <tbody className={S.rankItem}>
          <td className={S.rank + " " + S.third}>
            <p>3</p>
          </td>
          <td className={S.userInfo}>
            <div className={S.userNameScore}>
              <p> 로지</p>
              <span>999,999</span>
            </div>
            <div className={S.totalScore}>
              <div className={S.userScore} style={{ width: "200px" }}></div>
            </div>
          </td>
        </tbody>
      </table>
      <table>
        <tbody className={S.rankItem}>
          <td className={S.rank}>
            <p>4</p>
          </td>
          <td className={S.userInfo}>
            <div className={S.userNameScore}>
              <p> 로지</p>
              <span>999,999</span>
            </div>
            <div className={S.totalScore}>
              <div className={S.userScore} style={{ width: "200px" }}></div>
            </div>
          </td>
        </tbody>
      </table>
    </>
  );
}
