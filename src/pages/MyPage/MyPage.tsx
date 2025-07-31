import { AppLink } from "@/router/AppLink";
import S from "./myPage.module.css";
import noticeNeuro from "@/assets/images/notice_neuro.svg";
import { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";
import MyRanking from "./components/MyRanking";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile } from "./components/getUserProfile";
import NotFoundPage from "../NotFound/NotFoundPage";
import { supabase } from "@/services/supabase";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import Spinner from "@/common/layout/Spinner";

interface UserProfileData {
  id: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  gender: "male" | "female" | "other" | null;
  birth: string | null;
  email: string | null;
}

function Mypage() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      const { id, nickname, gender, birth, avatar_url, email } =
        await getUserProfile(user);
      setUserProfile({
        id,
        nickname,
        gender,
        birth,
        avatarUrl: avatar_url,
        email,
      });
    };
    fetchUserProfile();
  }, [user]);

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      text: "로그아웃 되었습니다",
    }).then(async () => {
      const { error } = await supabase.auth.signOut();
      if (error)
        return (
          <NotFoundPage
            errorMessage={"로그아웃을 하는데 알수없는 오류가 발생하였습니다."}
          />
        );
      navigate(from, { replace: true });
    });
  };

  if (!user)
    return <NotFoundPage errorMessage={"유저 정보를 찾을 수 없습니다."} />;
  if (!userProfile) return <Spinner />;
  return (
    <div className={S.container}>
      <AppLink variant={"page"} to={"/notice"} className={S.notice}>
        <img src={noticeNeuro} alt="공지사항" />
        <div>최상단 공지 어쩌구저쩌구</div>
      </AppLink>
      <section>
        <UserProfile
          userAvatarUrl={userProfile.avatarUrl}
          userName={userProfile.nickname}
          userEmail={userProfile.email}
          userGender={userProfile.gender}
          userBirth={userProfile.birth}
        />

        <div className={S.rankingContainer}>
          <MyRanking userId={userProfile.id} gameName={"초성 퀴즈"} />
          <MyRanking userId={userProfile.id} gameName={"초성 퀴즈"} />
          <MyRanking userId={userProfile.id} gameName={"초성 퀴즈"} />
        </div>

        <button type="button" id={S.logout} onClick={handleLogout}>
          로그아웃
        </button>
      </section>
    </div>
  );
}
export default Mypage;
