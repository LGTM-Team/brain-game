import S from "./userProfile.module.css";
import profileImg from "@/assets/images/SignUp_neuro.svg";

interface Props {
  userAvatarUrl?: string | null;
  userName: string | null;
  userGender?: "여자" | "남자" | "기타" | " - " | null;
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
  return (
    <div className={S.profile}>
      <img
        src={userAvatarUrl ? userAvatarUrl : profileImg}
        alt="프로필이미지"
      />
      <div className={S.userInfo}>
        <div className={S.nameGenderWrapper}>
          <div className={S.userName}>{userName}</div>
          <div className={S.gender}>{userGender}</div>
        </div>
        <div className={S.birth}>{userBirth}</div>
        <div className={S.email}>{userEmail}</div>
      </div>
    </div>
  );
}
export default UserProfile;
