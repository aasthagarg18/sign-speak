import { ISL_DICTIONARY } from '../data/islDictionary';

// Builds an indexed dictionary map
const DICTIONARY_MAP = new Map();
ISL_DICTIONARY.forEach(item => {
  DICTIONARY_MAP.set(item.word.toLowerCase(), item);
  if (item.tags) {
    item.tags.forEach(tag => {
      if (!DICTIONARY_MAP.has(tag.toLowerCase())) {
        DICTIONARY_MAP.set(tag.toLowerCase(), item);
      }
    });
  }
});

/**
 * Tokenize input text into ISL sign sequence
 * Priority: Multi-word phrases -> Single words -> Finger-spelling characters
 */
export function tokenizeTextToISL(text) {
  if (!text || typeof text !== 'string') return [];

  const cleaned = text.trim();
  if (!cleaned) return [];

  const tokens = [];
  const lower = cleaned.toLowerCase();

  // 1. Try finding complete phrase match first
  for (const item of ISL_DICTIONARY) {
    const itemWord = item.word.toLowerCase();
    if (lower === itemWord || (item.tags && item.tags.includes(lower))) {
      return [{
        type: 'word',
        item: item,
        display: item.word,
        gloss: item.gloss
      }];
    }
  }

  // 2. Greedy phrase and word matching
  const words = cleaned.split(/\s+/);
  let i = 0;

  while (i < words.length) {
    // Try 3-word phrase
    if (i + 2 < words.length) {
      const phrase3 = `${words[i]} ${words[i+1]} ${words[i+2]}`.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      const match3 = findMatch(phrase3);
      if (match3) {
        tokens.push({ type: 'word', item: match3, display: match3.word, gloss: match3.gloss });
        i += 3;
        continue;
      }
    }

    // Try 2-word phrase
    if (i + 1 < words.length) {
      const phrase2 = `${words[i]} ${words[i+1]}`.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      const match2 = findMatch(phrase2);
      if (match2) {
        tokens.push({ type: 'word', item: match2, display: match2.word, gloss: match2.gloss });
        i += 2;
        continue;
      }
    }

    // Try single word
    const singleWord = words[i].toLowerCase().replace(/[^a-z0-9]/g, '');
    const match1 = findMatch(singleWord);
    if (match1) {
      tokens.push({ type: 'word', item: match1, display: match1.word, gloss: match1.gloss });
      i++;
      continue;
    }

    // Fallback: Fingerspell this word letter-by-letter
    const cleanChars = words[i].replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (cleanChars.length > 0) {
      for (const ch of cleanChars) {
        const charMatch = findCharMatch(ch);
        if (charMatch) {
          tokens.push({
            type: 'letter',
            item: charMatch,
            display: `Letter ${ch}`,
            gloss: ch,
            char: ch,
            parentWord: words[i]
          });
        }
      }
    }
    i++;
  }

  return tokens;
}

function findMatch(str) {
  if (!str) return null;
  // Direct lookup
  if (DICTIONARY_MAP.has(str)) return DICTIONARY_MAP.get(str);

  // Exact word lookup
  const exact = ISL_DICTIONARY.find(d => d.word.toLowerCase() === str);
  if (exact) return exact;

  // Tag lookup
  const tagged = ISL_DICTIONARY.find(d => d.tags && d.tags.some(t => t.toLowerCase() === str));
  if (tagged) return tagged;

  // Number lookup
  if (!isNaN(str)) {
    const num = ISL_DICTIONARY.find(d => d.category === 'numbers' && (d.word.includes(str) || d.gloss === str));
    if (num) return num;
  }

  return null;
}

function findCharMatch(ch) {
  // Check if alphabet sign exists in dictionary
  const lowerCh = ch.toLowerCase();
  const alphaItem = ISL_DICTIONARY.find(d => d.id === `alpha-${lowerCh}`);
  if (alphaItem) return alphaItem;

  // Check numbers
  const numItem = ISL_DICTIONARY.find(d => d.id === `num-${ch}`);
  if (numItem) return numItem;

  // Generic fallback representation
  return {
    id: `char-${ch}`,
    word: `Character ${ch}`,
    englishMeaning: `ISL Finger-spelled ${ch}`,
    category: 'alphabets',
    twoHanded: false,
    facialExpression: 'Focused, steady',
    handshape: `Standard ISL representation for ${ch}`,
    movement: `Hold finger-spelled shape for ${ch}`,
    gloss: ch,
    difficulty: 'Beginner',
    svgType: `isl-${lowerCh}`
  };
}
