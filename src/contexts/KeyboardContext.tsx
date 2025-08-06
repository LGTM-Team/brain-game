import { createContext, useContext, useEffect, useState } from "react";

interface KeyboardContextType {
  isKeyboardOpen: boolean;
}

const KeyboardContext = createContext<KeyboardContextType>({
  isKeyboardOpen: false,
});

export const KeyboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  //아이패드 제외
  const isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isMobile) return;

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as Element;
      if (target.matches("input, textarea")) {
        setIsKeyboardOpen(true);
        setIsInputFocused(true);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const target = e.target as Element;
      if (target.matches("input, textarea")) {
        setIsKeyboardOpen(false);
        setIsInputFocused(false);
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const onResize = () => {
      // 키보드가 올라오면 innerHeight가 줄어듭니다
      if (isInputFocused) return;
      const heightDiff =
        window.innerHeight < document.documentElement.clientHeight;
      setIsKeyboardOpen(heightDiff);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMobile, isInputFocused]);

  return (
    <KeyboardContext.Provider value={{ isKeyboardOpen }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyBoard = () => useContext(KeyboardContext);
