import neuro1 from "@/assets/images/numberGame/neuro1.svg";
import neuro2 from "@/assets/images/numberGame/neuro2.svg";
import neuro3 from "@/assets/images/numberGame/neuro3.svg";
import neuro4 from "@/assets/images/numberGame/neuro4.svg";
import { number } from "framer-motion";
import { useState } from "react";

const imgList = [neuro1, neuro2, neuro3, neuro4];

export const getRandomImage = () => {
  const index = Math.floor(Math.random() * imgList.length);
  return imgList[index];
};
