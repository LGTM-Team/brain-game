import wordList from '@/data/wordList.json';

function isExistWord(answer: string): boolean {
  return wordList.includes(answer);
}

export default isExistWord;