import neuro1 from "@/assets/images/numberGame/neuro1.svg";
import neuro2 from "@/assets/images/numberGame/neuro2.svg";
import neuro3 from "@/assets/images/numberGame/neuro3.svg";
import neuro4 from "@/assets/images/numberGame/neuro4.svg";
import neuro5 from "@/assets/images/numberGame/neuro5.svg";
import neuro6 from "@/assets/images/numberGame/neuro6.svg";
import neuro7 from "@/assets/images/numberGame/neuro7.svg";

const imgList = [neuro1, neuro2, neuro3, neuro4, neuro5, neuro6, neuro7];

export function getRandom(length: number) {
  return Math.floor(Math.random() * length);
}

/* 숫자 맞추기 게임 -이미지 랜덤  */
export const getRandomImage = () => {
  const index = Math.floor(Math.random() * imgList.length);
  return imgList[index];
};

/* 숫자 맞추기 게임 - 배열 중복없이 랜덤으로 위치 */
export const getRandomPositions = (count: number, range: number): number[] => {
  const indices = Array.from({ length: range }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, count);
};
