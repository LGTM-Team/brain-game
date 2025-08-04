import { AppLink } from "@/router/AppLink";
import S from "./myPage.module.css";
import noticeNeuro from "@/assets/images/pages/notice/notice_neuro.svg";
import { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";
import MyRanking from "./components/MyRanking";
import { useAuth } from "@/contexts/AuthContext";
import NotFoundPage from "../NotFound";
import { supabase } from "@/api/service/supabase/supabase";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import Spinner from "@/common/layout/Spinner";
import { useAllGames } from "@/hooks/useAllGames"; // 추가
import {
  getNoticeList,
  type NoticeList,
} from "@/api/service/notice/getNoticeData";

function Mypage() {
  const navigate = useNavigate();

  const { user, userProfile } = useAuth();

  const [noticeList, setNoticeList] = useState<NoticeList | null>(null);
  // 동적으로 게임 목록 가져오기
  const { games, loading: gamesLoading, error: gamesError } = useAllGames();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const fetchNoticeData = async () => {
      const data = await getNoticeList();
      const notice = data?.filter((_, index) => index === 0);
      setNoticeList(notice!);
    };

    fetchNoticeData();
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

  if (!user) {
    return <NotFoundPage errorMessage={"유저 정보를 찾을 수 없습니다."} />;
  }

  if (!userProfile || !noticeList || gamesLoading) {
    return <Spinner />;
  }

  if (gamesError) {
    return (
      <NotFoundPage
        errorMessage={`게임 정보를 불러오는데 실패했습니다: ${gamesError}`}
      />
    );
  }

  return (
    <div className={S.container}>
      {noticeList?.map((item) => (
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
          {games?.map((game) => (
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
