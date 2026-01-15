export interface Token {
  word: string;
  punctuation: string;
  pauseMultiplier: number;
}

interface ExtractedWord {
  word: string;
  punctuation: string;
}

const PAUSE_MULTIPLIERS: Record<string, number> = {
  ',': 2,
  ';': 2,
  ':': 2,
  '.': 3,
  '!': 3,
  '?': 3,
  paragraph: 5,
};

/**
 * Extract the base word (letters only) from a token that may include punctuation.
 */
function extractWord(token: string): ExtractedWord {
  const match = token.match(/^([a-zA-ZÀ-ÿ0-9'-]+)([.,!?;:]*)?$/);
  if (match) {
    return {
      word: match[1],
      punctuation: match[2] || '',
    };
  }
  return { word: token, punctuation: '' };
}

/**
 * Get the pause multiplier based on punctuation.
 */
function getPauseMultiplier(punctuation: string, isEndOfParagraph: boolean): number {
  if (isEndOfParagraph) {
    return PAUSE_MULTIPLIERS.paragraph;
  }

  for (const char of punctuation) {
    if (PAUSE_MULTIPLIERS[char]) {
      return PAUSE_MULTIPLIERS[char];
    }
  }

  return 1;
}

/**
 * Tokenize text into an array of word objects with pause information.
 */
export function tokenize(text: string): Token[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const paragraphs = text.split(/\n\s*\n/);
  const tokens: Token[] = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);

    words.forEach((rawToken, wordIndex) => {
      const { word, punctuation } = extractWord(rawToken);

      if (!word) return;

      const isLastWordInParagraph = wordIndex === words.length - 1;
      const isLastParagraph = paragraphIndex === paragraphs.length - 1;
      const isEndOfParagraph = isLastWordInParagraph && !isLastParagraph;

      tokens.push({
        word,
        punctuation,
        pauseMultiplier: getPauseMultiplier(punctuation, isEndOfParagraph),
      });
    });
  });

  return tokens;
}
