import S from "./userProfile.module.css";
import profileImg from "@/assets/images/account/SignUp_neuro.svg";

interface Props {
  userAvatarUrl?: string | null;
  userName: string | null;
  userGender?: "male" | "female" | "other" | null;
  userBirth?: string | null;
  userEmail: string | null;
}

function UserProfile({
  userAvatarUrl,
  userName,
  userGender,
  userBirth,
  userEmail,
}: Props) {
  let userGenderKo;

  switch (userGender) {
    case "male":
      userGenderKo = "남자";
      break;

    case "female":
      userGenderKo = "여자";
      break;

    case "other":
      userGenderKo = "기타";
      break;

    default:
      userGenderKo = " - ";
      break;
  }

  return (
    <div className={S.profile}>
      <img
        src={userAvatarUrl ? userAvatarUrl : profileImg}
        alt="프로필이미지"
      />
      <div className={S.userInfo}>
        <div className={S.nameGenderWrapper}>
          <div className={S.userName}>{userName}</div>
          <div className={S.gender}>{userGenderKo}</div>
        </div>
        <div className={S.birth}>{userBirth ?? " - "}</div>
        <div className={S.email}>{userEmail}</div>
      </div>
    </div>
  );
}
export default UserProfile;
