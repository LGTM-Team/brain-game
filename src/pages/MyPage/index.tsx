import { AppLink } from "@/router/AppLink";
import S from "./myPage.module.css";
import noticeNeuro from "@/assets/images/pages/notice/notice_neuro.svg";
import UserProfile from "./components/UserProfile";
import MyRanking from "./components/MyRanking";
import { useAuth } from "@/contexts/AuthContext";
import NotFoundPage from "../NotFound";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import Spinner from "@/common/layout/Spinner";
import { useLoaderData } from "react-router-dom";
import type { Notice } from "@/api/service/notice/getNoticeData";
import type { GameEntry } from "@/api/service/game/getAllGames";
import { supabase } from "@/api/service/supabase/supabase";

function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { user, userProfile } = useAuth();
  const { latestNotice, games } = useLoaderData() as {
    latestNotice: Notice[];
    games: GameEntry[];
  };

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

  if (!user) {
    return <NotFoundPage errorMessage={"유저 정보를 찾을 수 없습니다."} />;
  }

  if (!userProfile) {
    return <Spinner />;
  }

  return (
    <div className={S.container}>
      {latestNotice.map((item) => (
        <AppLink
          variant={"page"}
          to={"/notice"}
          className={S.notice}
          key={item.id}
        >
          <img src={noticeNeuro} alt="공지사항" />
          <div>{item.title}</div>
        </AppLink>
      ))}
      <section>
        <UserProfile
          userAvatarUrl={userProfile.avatarUrl}
          userName={userProfile.nickname}
          userEmail={userProfile.email}
          userGender={userProfile.gender}
          userBirth={userProfile.birth}
        />

        <div className={S.rankingContainer}>
          {games.map((game) => (
            <MyRanking
              key={game.game_id}
              userId={userProfile.id}
              gameId={game.game_id}
              gameName={game.name}
            />
          ))}
        </div>

        <button type="button" id={S.logout} onClick={handleLogout}>
          로그아웃
        </button>
      </section>
    </div>
  );
}
export default Mypage;
