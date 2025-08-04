import { useEffect, useRef, useState } from "react";
import S from "./styles/shareButton.module.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import linkIcon from "@/assets/icons/link.svg";
import cancel from "@/assets/icons/cancel.svg";

interface Props {
  rankingId?: number | null;
  userNickname?: string | null;
  userHighestScore?: string | null;
}

function Share({ rankingId, userNickname, userHighestScore }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const sharePath = `/games/share/${rankingId}`;
  const shareUrl = `${window.location.origin}${sharePath}`;

  const kakaoBtnRef = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast("복사되었습니다.", {
      position: "bottom-center",
      autoClose: 700,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  useEffect(() => {
    if (!isOpenModal) return;
    if (!kakaoBtnRef.current) return;

    window.Kakao.Share.createCustomButton({
      container: kakaoBtnRef.current,
      templateId: 123072,
      templateArgs: {
        userNickname,
        gameScore: userHighestScore,
        rankingId,
      },
    });
  }, [isOpenModal]);

  return (
    <>
      <button
        type="button"
        className={S.shareButton}
        onClick={() => setIsOpenModal(true)}
      >
        내 최고 점수 자랑하기
      </button>
      {isOpenModal && (
        <div className={S.modal}>
          <header>
            <h4>공유하기</h4>
            <button
              type="button"
              className={S.closed}
              onClick={() => setIsOpenModal(false)}
            >
              <img src={cancel} alt="닫기" />
            </button>
          </header>
          <div className={S.modalShareButtonContainer}>
            <button
              type="button"
              className={S.modalShareButton}
              onClick={handleCopy}
            >
              <img src={linkIcon} alt="링크 복사하기" />
            </button>
            <button
              type="button"
              className={S.modalShareButton}
              ref={kakaoBtnRef}
              id="kakaotalk-sharing-btn"
            >
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                alt="카카오톡 공유 보내기 버튼"
              />
            </button>
          </div>
        </div>
      )}
      <ToastContainer limit={1} />
    </>
  );
}
export default Share;
