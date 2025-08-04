import S from "./styles/shareButton.module.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import linkIcon from "@/assets/icons/link.svg";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  rankingId?: number | null;
  userNickname?: string | null;
  userHighestScore?: string | null;
}

function Share({ rankingId, userNickname, userHighestScore }: Props) {
  const { user } = useAuth();
  const sharePath = `/games/share/${rankingId}`;
  const shareUrl = `${window.location.origin}${sharePath}`;
  const shareArgs = {
    templateId: 123072,
    templateArgs: { userNickname, gameScore: userHighestScore, rankingId },
  };

  const handleCopy = () => {
    if (!user) {
      toast.error("로그인이 필요한 서비스 입니다.", {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    navigator.clipboard.writeText(shareUrl).then(() => {
      toast("복사되었습니다.", {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    });
  };

  const handleKakaoShare = () => {
    if (!user) {
      toast.error("로그인이 필요한 서비스 입니다.", {
        position: "top-center",
        autoClose: 700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    window.Kakao.Share.sendCustom(shareArgs);
  };

  return (
    <div className={S.container}>
      <div className={S.share}>내 최고 점수 자랑하기</div>

      <div className={S.modalShareButtonContainer}>
        <button
          type="button"
          className={S.modalShareButton}
          onClick={handleCopy}
        >
          <img src={linkIcon} alt="링크 복사하기" />
          <div className={S.buttonText}>URL복사</div>
        </button>
        <button
          type="button"
          className={S.modalShareButton}
          onClick={handleKakaoShare}
        >
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡 공유 보내기 버튼"
          />
          <div className={S.buttonText}>카카오톡</div>
        </button>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
}
export default Share;
