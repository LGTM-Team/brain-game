import wordList from '@/data/wordList.json';

function isExistWord(answer: string): boolean {
  let left = 0;
  let right = wordList.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midWord = wordList[mid];
    
    if (midWord === answer) {
      return true;
    } else if (midWord < answer) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return false;
}

export default isExistWord;