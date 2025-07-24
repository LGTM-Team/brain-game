import neuro1 from "@/assets/images/numberGame/neuro1.svg";
import neuro2 from "@/assets/images/numberGame/neuro2.svg";
import neuro3 from "@/assets/images/numberGame/neuro3.svg";
import neuro4 from "@/assets/images/numberGame/neuro4.svg";

const imgList = [neuro1, neuro2, neuro3, neuro4];

export const getRandomImage = () => {
  const index = Math.floor(Math.random() * imgList.length);
  return imgList[index];
};

// 1단계 3*3
export const getNumberStep1 = () => {
  return Math.floor(Math.random() * 9) + 1;
};

// 2단계 3*4
export const getNumberStep2 = () => {
  return Math.floor(Math.random() * 12) + 1;
};

//3단계 4*4
export const getNumberStep3 = () => {
  return Math.floor(Math.random() * 16) + 1;
};

//4단계 4*5
export const getNumberStep4 = () => {
  return Math.floor(Math.random() * 20) + 1;
};

//5단계 5*5
export const getNumberStep5 = () => {
  return Math.floor(Math.random() * 25) + 1;
};
