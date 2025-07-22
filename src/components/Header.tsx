import { AppLink } from "@/router/AppLink";
import S from "./styles/header.module.css";
import backward from "@/assets/icons/backward.svg";
interface Props {
  title: string;
}
function Header({ title }: Props) {
  return (
    <>
      <div className={S.container}>
        <AppLink variant={"back"}>
          <img src={backward} alt="뒤로가기" />
        </AppLink>
        <h1>{title}</h1>
      </div>
    </>
  );
}
export default Header;
