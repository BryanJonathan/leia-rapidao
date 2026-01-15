export interface ORPSplit {
  before: string;
  orp: string;
  after: string;
}

/**
 * Calculate the Optimal Recognition Point (ORP) index for a word.
 * The ORP is the letter that the eye naturally focuses on for faster recognition.
 *
 * Rules based on word length:
 * - 1-2 letters: index 0
 * - 3-5 letters: index 1
 * - 6-9 letters: index 2
 * - 10-13 letters: index 3
 * - 14+ letters: index 4
 */
export function getORPIndex(word: string): number {
  const length = word.length;

  if (length <= 2) return 0;
  if (length <= 5) return 1;
  if (length <= 9) return 2;
  if (length <= 13) return 3;
  return 4;
}

/**
 * Split a word into three parts based on the ORP index.
 */
export function splitWordByORP(word: string): ORPSplit {
  const orpIndex = getORPIndex(word);

  return {
    before: word.slice(0, orpIndex),
    orp: word[orpIndex] || '',
    after: word.slice(orpIndex + 1),
  };
}
