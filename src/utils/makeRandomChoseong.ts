export function makeRandomChoseong(): string {
  const choseongList = [
    'ㄱ', 'ㄴ', 'ㄷ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ',
    'ㅇ', 'ㅈ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];

  const pick = () => {
    const i = Math.floor(Math.random() * choseongList.length);
    return choseongList[i];
  };

  return pick() + pick();
}