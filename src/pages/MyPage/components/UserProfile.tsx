import { useState, useEffect } from "react";
import S from "./userProfile.module.css";
import profileImg from "@/assets/images/account/SignUp_neuro.svg";
import editIcon from "@/assets/icons/edit.svg";
import { useUpdateNickname } from "@/hooks/useUpdateNickname"; // 경로에 맞게 수정

interface Props {
  userAvatarUrl?: string | null;
  userName: string | null;
  userGender?: "male" | "female" | "other" | null;
  userBirth?: string | null;
  userEmail: string | null;
  onNicknameUpdate?: (newNickname: string) => void; // 닉네임 업데이트 시 부모 컴포넌트에 알림
}

function UserProfile({
  userAvatarUrl,
  userName,
  userGender,
  userBirth,
  userEmail,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentNickname, setCurrentNickname] = useState(userName || "");
  const [newNickname, setNewNickname] = useState(userName || "");
  const { updateNickname, isLoading, error, clearError } = useUpdateNickname();

  // userName prop이 변경되면 currentNickname도 업데이트
  useEffect(() => {
    setCurrentNickname(userName || "");
    setNewNickname(userName || "");
  }, [userName]);

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
      userGenderKo = "";
      break;
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setNewNickname(currentNickname || "");
    clearError();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewNickname(currentNickname || "");
    clearError();
  };

  const handleSaveNickname = async () => {
    const success = await updateNickname(newNickname);

    if (success) {
      // 저장 성공 시 페이지 새로고침
      window.location.reload();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveNickname();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className={S.profile}>
      <img
        className={S.profileImage}
        src={userAvatarUrl ? userAvatarUrl : profileImg}
        alt="프로필이미지"
      />
      <div className={S.userInfo}>
        <div className={S.nameGenderWrapper}>
          {isEditing ? (
            <div className={S.editContainer}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                onKeyDown={handleKeyPress}
                className={S.nicknameInput}
                maxLength={9}
                autoFocus
                disabled={isLoading}
              />
              <div className={S.editButtons}>
                <button
                  onClick={handleSaveNickname}
                  disabled={isLoading || !newNickname.trim()}
                  className={S.saveButton}
                >
                  {isLoading ? "저장중..." : "저장"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className={S.cancelButton}
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={S.userNameWrapper}>
                <div className={S.userName}>{currentNickname}</div>
                <button onClick={handleEditClick} className={S.editButton}>
                  <img
                    src={editIcon}
                    className={S.editIcon}
                    alt="닉네임 수정"
                  />
                </button>
              </div>
              <div className={S.gender}>{userGenderKo}</div>
            </>
          )}
        </div>

        {error && <div className={S.error}>{error}</div>}

        {!isEditing && (
          <>
            <div className={S.birth}>{userBirth ?? ""}</div>
            <div className={S.email}>{userEmail}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
