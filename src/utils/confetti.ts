// utils/confetti.ts
import confetti from 'canvas-confetti';

// canvas-confetti의 Options 타입을 직접 사용
type ConfettiOptions = Parameters<typeof confetti>[0];

// 기본 confetti 효과
export const fireConfetti = (options?: ConfettiOptions) => {
  return confetti({
    particleCount: 300,
    spread: 150,
    origin: { y: 0.6 },
    colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'],
    zIndex: 1001, // 모달보다 높게 설정
    ...options,
  });
};

// 게임 완료용 celebration confetti
export const celebrationConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d'],
    zIndex: 1001, // 모달보다 높게 설정
  };

  function fire(particleRatio: number, opts: ConfettiOptions) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 여러 방향에서 동시에 발사
  fire(0.25, {
    spread: 26,
    startVelocity: -35,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// 별 모양 confetti
export const starConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 360,
    origin: { x: 0.5, y: 0.4 },
    shapes: ['star'] as const,
    colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#9370DB'],
    scalar: 1.2,
    gravity: 0.5,
    drift: 0.1,
    zIndex: 1001, // 모달보다 높게 설정
  });
};

// 사이드에서 발사하는 confetti (양쪽에서)
export const sideCannonConfetti = () => {
  const end = Date.now() + 2000; // 2초간 지속

  const colors = ['#bb0000', '#ffffff', '#00bb00'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 1001, // 모달보다 높게 설정
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 1001, // 모달보다 높게 설정
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

// 점수에 따른 confetti 효과
export const scoreBasedConfetti = (score: number | null) => {
  if (score === null) {
    fireConfetti();
    return;
  }

  if (score >= 90) {
    // 고득점: 화려한 celebration
    celebrationConfetti();
  } else if (score >= 70) {
    // 중간 점수: 별 confetti
    starConfetti();
  } else if (score >= 50) {
    // 보통 점수: 기본 confetti
    fireConfetti({
      particleCount: 80,
      colors: ['#ffd700', '#ffed4e', '#ff6b6b', '#4ecdc4'],
      zIndex: 1001,
    });
  } else {
    // 낮은 점수: 적은 양의 confetti
    fireConfetti({
      particleCount: 50,
      colors: ['#95a5a6', '#bdc3c7'],
      scalar: 0.8,
      zIndex: 1001,
    });
  }
};