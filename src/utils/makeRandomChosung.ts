export function makeRandomChosung(): string {
  const choseongList = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
    'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
    'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];

  const pick = () => {
    const i = Math.floor(Math.random() * choseongList.length);
    return choseongList[i];
  };

  return pick() + pick();
}