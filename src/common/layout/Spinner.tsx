import { BeatLoader } from "react-spinners";
import S from "../styles/spinner.module.css";

function Spinner() {
  return (
    <div className={S.container}>
      로딩중
      <BeatLoader />
    </div>
  );
}
export default Spinner;
