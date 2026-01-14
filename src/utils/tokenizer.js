/**
 * Tokenize text into words with punctuation metadata for smart pauses.
 *
 * Pause multipliers:
 * - Normal word: 1x
 * - Comma (,): 2x
 * - Period, exclamation, question (.!?): 3x
 * - Paragraph break: 5x
 */

const PAUSE_MULTIPLIERS = {
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
 *
 * @param {string} token - The token to clean
 * @returns {{ word: string, punctuation: string }} The cleaned word and trailing punctuation
 */
function extractWord(token) {
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
 *
 * @param {string} punctuation - The punctuation character(s)
 * @param {boolean} isEndOfParagraph - Whether this token ends a paragraph
 * @returns {number} The pause multiplier
 */
function getPauseMultiplier(punctuation, isEndOfParagraph) {
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
 *
 * @param {string} text - The text to tokenize
 * @returns {Array<{ word: string, punctuation: string, pauseMultiplier: number }>}
 */
export function tokenize(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const paragraphs = text.split(/\n\s*\n/);
  const tokens = [];

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
