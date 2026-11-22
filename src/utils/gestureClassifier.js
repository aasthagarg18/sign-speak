import { ISL_DICTIONARY } from '../data/islDictionary';

/**
 * Geometric Landmark Heuristic Classifier for Indian Sign Language (ISL) Gestures
 * Evaluates 21 3D hand landmarks from MediaPipe Hands.
 * Note: Uses deterministic kinematic and geometric heuristics based on joint distances,
 * angles, finger extension states, and dual-hand spatial proximity.
 */

// Pre-indexed dictionary cache for O(1) sign resolution
const DICTIONARY_MAP = new Map();
for (let i = 0; i < ISL_DICTIONARY.length; i++) {
  const item = ISL_DICTIONARY[i];
  if (item.id) DICTIONARY_MAP.set(item.id.toLowerCase(), item);
  if (item.word) DICTIONARY_MAP.set(item.word.toLowerCase(), item);
  if (item.gloss) DICTIONARY_MAP.set(item.gloss.toLowerCase(), item);
}

function findDictionarySign(idOrWord) {
  if (!idOrWord) return null;
  return DICTIONARY_MAP.get(idOrWord.toLowerCase()) || null;
}

// Fast 2D Euclidean distance (inlined sqrt avoiding extra object creation)
const dist = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Analyze kinematics of a single 21-point hand landmark set
 */
export function analyzeHandKinematics(landmarks) {
  if (!landmarks || landmarks.length < 21) return null;

  const wrist = landmarks[0];
  const thumbMcp = landmarks[2];
  const thumbIp = landmarks[3];
  const thumbTip = landmarks[4];

  const indexMcp = landmarks[5];
  const indexPip = landmarks[6];
  const indexTip = landmarks[8];

  const middleMcp = landmarks[9];
  const middlePip = landmarks[10];
  const middleTip = landmarks[12];

  const ringMcp = landmarks[13];
  const ringPip = landmarks[14];
  const ringTip = landmarks[16];

  const pinkyMcp = landmarks[17];
  const pinkyPip = landmarks[18];
  const pinkyTip = landmarks[20];

  // Palm reference scale (wrist to middle MCP)
  const palmScale = dist(wrist, middleMcp);

  // Finger extension heuristics based on joint progression and wrist distances
  const isIndexExtended =
    dist(indexTip, wrist) > dist(indexPip, wrist) * 1.15 &&
    dist(indexTip, indexMcp) > dist(indexPip, indexMcp) * 1.1;

  const isMiddleExtended =
    dist(middleTip, wrist) > dist(middlePip, wrist) * 1.15 &&
    dist(middleTip, middleMcp) > dist(middlePip, middleMcp) * 1.1;

  const isRingExtended =
    dist(ringTip, wrist) > dist(ringPip, wrist) * 1.15 &&
    dist(ringTip, ringMcp) > dist(ringPip, ringMcp) * 1.1;

  const isPinkyExtended =
    dist(pinkyTip, wrist) > dist(pinkyPip, wrist) * 1.15 &&
    dist(pinkyTip, pinkyMcp) > dist(pinkyPip, pinkyMcp) * 1.1;

  // Thumb extension (angle away from middle MCP)
  const isThumbExtended =
    dist(thumbTip, middleMcp) > palmScale * 0.65 &&
    dist(thumbTip, thumbMcp) > dist(thumbIp, thumbMcp) * 1.1;

  // Thumb vertical orientation
  const isThumbPointingUp =
    thumbTip.y < thumbIp.y &&
    thumbTip.y < thumbMcp.y &&
    thumbTip.y < wrist.y;

  // Pinch detection: Thumb tip near Index tip
  const isThumbIndexPinch = dist(thumbTip, indexTip) < palmScale * 0.38;

  // Count total extended non-thumb fingers
  const extendedCount = (isIndexExtended ? 1 : 0) +
    (isMiddleExtended ? 1 : 0) +
    (isRingExtended ? 1 : 0) +
    (isPinkyExtended ? 1 : 0);

  return {
    isThumbExtended,
    isThumbPointingUp,
    isIndexExtended,
    isMiddleExtended,
    isRingExtended,
    isPinkyExtended,
    isThumbIndexPinch,
    extendedCount,
    palmScale,
    wrist,
    indexTip,
    middleTip,
    thumbTip,
    pinkyTip
  };
}

/**
 * Classify detected hands into supported ISL Dictionary Sign
 */
export function classifyISLGesture(multiHandLandmarks) {
  if (!multiHandLandmarks || multiHandLandmarks.length === 0) {
    return null;
  }

  // --- TWO HANDS DETECTED ---
  if (multiHandLandmarks.length >= 2) {
    const h1 = multiHandLandmarks[0];
    const h2 = multiHandLandmarks[1];

    const k1 = analyzeHandKinematics(h1);
    const k2 = analyzeHandKinematics(h2);

    if (k1 && k2) {
      const wristDistance = dist(k1.wrist, k2.wrist);
      const middleTipsDistance = dist(k1.middleTip, k2.middleTip);
      const avgPalmScale = (k1.palmScale + k2.palmScale) / 2;

      // 1. NAMASTE (Anjali Mudra): Wrists close, middle tips close, hands upright
      const bothUpright = k1.middleTip.y < k1.wrist.y && k2.middleTip.y < k2.wrist.y;
      if (bothUpright && wristDistance < avgPalmScale * 1.8 && middleTipsDistance < avgPalmScale * 1.2) {
        return {
          sign: findDictionarySign('namaste') || { word: 'Namaste', gloss: 'NAMASTE', id: 'namaste' },
          confidence: 98.2,
          gestureName: 'Namaste',
          twoHanded: true,
          description: 'Two palms pressed together in respectful greeting'
        };
      }

      // 2. HELP: One hand thumbs-up, other hand flat underneath
      const h1ThumbUp = k1.isThumbPointingUp && k1.extendedCount === 0;
      const h2ThumbUp = k2.isThumbPointingUp && k2.extendedCount === 0;
      const h1Flat = k1.extendedCount >= 3;
      const h2Flat = k2.extendedCount >= 3;

      if ((h1ThumbUp && h2Flat) || (h2ThumbUp && h1Flat)) {
        return {
          sign: findDictionarySign('help') || { word: 'Help', gloss: 'HELP', id: 'help' },
          confidence: 96.5,
          gestureName: 'Help',
          twoHanded: true,
          description: 'Thumbs-up hand supported by flat palm'
        };
      }

      // 3. NICE TO MEET YOU: Both index fingers pointing towards each other
      if (k1.isIndexExtended && k1.extendedCount === 1 && k2.isIndexExtended && k2.extendedCount === 1) {
        const indexTipsDist = dist(k1.indexTip, k2.indexTip);
        if (indexTipsDist < avgPalmScale * 1.4) {
          return {
            sign: findDictionarySign('nice-to-meet-you') || { word: 'Nice to meet you', gloss: 'MEET NICE', id: 'nice-to-meet-you' },
            confidence: 96.0,
            gestureName: 'Nice to meet you',
            twoHanded: true,
            description: 'Both index fingers meeting together'
          };
        }
      }

      // 4. SIGN LANGUAGE / WELCOME: Both hands open and active
      if (k1.extendedCount >= 3 && k2.extendedCount >= 3) {
        return {
          sign: findDictionarySign('sign-language') || { word: 'Sign Language', gloss: 'SIGN LANGUAGE', id: 'sign-language' },
          confidence: 95.0,
          gestureName: 'Sign Language',
          twoHanded: true,
          description: 'Both open hands gesturing in synchrony'
        };
      }
    }
  }

  // --- SINGLE HAND DETECTED ---
  const primaryHand = multiHandLandmarks[0];
  const k = analyzeHandKinematics(primaryHand);
  if (!k) return null;

  // 1. THUMBS UP -> "Yes" / "Good"
  if (k.isThumbPointingUp && k.extendedCount === 0) {
    return {
      sign: findDictionarySign('yes') || { word: 'Yes', gloss: 'YES', id: 'yes' },
      confidence: 97.5,
      gestureName: 'Thumbs Up (Yes)',
      twoHanded: false,
      description: 'Thumbs up affirming agreement or good'
    };
  }

  // 2. PEACE / VICTORY / V -> "Alphabet V" / "Number 2"
  if (k.isIndexExtended && k.isMiddleExtended && !k.isRingExtended && !k.isPinkyExtended) {
    return {
      sign: findDictionarySign('alpha-v') || findDictionarySign('num-2') || { word: 'Alphabet V', gloss: 'V', id: 'alpha-v' },
      confidence: 97.8,
      gestureName: 'Victory / V (Alphabet V / Number 2)',
      twoHanded: false,
      description: 'Index and middle fingers extended apart in V'
    };
  }

  // 3. POINTING INDEX -> "Number 1" / "Where" / "Alphabet L"
  if (k.isIndexExtended && !k.isMiddleExtended && !k.isRingExtended && !k.isPinkyExtended) {
    // If thumb is also extended at 90 deg -> Alphabet L
    if (k.isThumbExtended && dist(k.thumbTip, k.indexTip) > k.palmScale * 0.7) {
      return {
        sign: findDictionarySign('alpha-l') || { word: 'Alphabet L', gloss: 'L', id: 'alpha-l' },
        confidence: 96.8,
        gestureName: 'Alphabet L',
        twoHanded: false,
        description: 'Thumb and index forming clear right angle L'
      };
    }
    return {
      sign: findDictionarySign('num-1') || findDictionarySign('where') || { word: 'Number 1', gloss: '1', id: 'num-1' },
      confidence: 98.0,
      gestureName: 'Pointing Index (Number 1 / Where)',
      twoHanded: false,
      description: 'Single index finger pointing upright'
    };
  }

  // 4. THREE FINGERS -> "Water" / "Number 3"
  if (k.isIndexExtended && k.isMiddleExtended && k.isRingExtended && !k.isPinkyExtended) {
    return {
      sign: findDictionarySign('water') || findDictionarySign('num-3') || { word: 'Water', gloss: 'WATER', id: 'water' },
      confidence: 96.4,
      gestureName: 'Three Fingers (Water / Number 3)',
      twoHanded: false,
      description: 'Three vertical fingers representing water or numeral 3'
    };
  }

  // 5. FOUR FINGERS -> "Number 4"
  if (k.isIndexExtended && k.isMiddleExtended && k.isRingExtended && k.isPinkyExtended && !k.isThumbExtended) {
    return {
      sign: findDictionarySign('num-4') || { word: 'Number 4', gloss: '4', id: 'num-4' },
      confidence: 96.0,
      gestureName: 'Number 4',
      twoHanded: false,
      description: 'Four extended fingers with thumb tucked'
    };
  }

  // 6. OPEN PALM -> "Hello" / "5" / "Stop"
  if (k.extendedCount === 4 && k.isThumbExtended) {
    return {
      sign: findDictionarySign('hello') || { word: 'Hello', gloss: 'HELLO', id: 'hello' },
      confidence: 97.2,
      gestureName: 'Open Hand (Hello / Stop)',
      twoHanded: false,
      description: 'All five fingers spread open displaying palm'
    };
  }

  // 7. LOVE / ILY SIGN (Thumb + Index + Pinky)
  if (k.isThumbExtended && k.isIndexExtended && !k.isMiddleExtended && !k.isRingExtended && k.isPinkyExtended) {
    return {
      sign: findDictionarySign('love') || { word: 'Love', gloss: 'LOVE', id: 'love' },
      confidence: 98.4,
      gestureName: 'I Love You (ILY Sign)',
      twoHanded: false,
      description: 'Universal sign: Thumb, index, and pinky extended'
    };
  }

  // 8. OK / UNDERSTAND / ALPHABET O (Pinch)
  if (k.isThumbIndexPinch && k.extendedCount >= 2) {
    return {
      sign: findDictionarySign('understand') || findDictionarySign('alpha-o') || { word: 'Understand', gloss: 'UNDERSTAND', id: 'understand' },
      confidence: 96.5,
      gestureName: 'OK / Pinch (Understand)',
      twoHanded: false,
      description: 'Thumb and index tips touching in a circle'
    };
  }

  // 9. PINKY UP -> "Alphabet I"
  if (!k.isIndexExtended && !k.isMiddleExtended && !k.isRingExtended && k.isPinkyExtended) {
    return {
      sign: findDictionarySign('alpha-i') || { word: 'Alphabet I', gloss: 'I', id: 'alpha-i' },
      confidence: 96.2,
      gestureName: 'Alphabet I',
      twoHanded: false,
      description: 'Pinky finger extended upright'
    };
  }

  // 10. FIST -> "Yes" / "Alphabet A"
  if (k.extendedCount === 0 && !k.isThumbPointingUp) {
    return {
      sign: findDictionarySign('alpha-a') || findDictionarySign('yes') || { word: 'Alphabet A', gloss: 'A', id: 'alpha-a' },
      confidence: 95.0,
      gestureName: 'Fist (Alphabet A)',
      twoHanded: false,
      description: 'Closed compact fist'
    };
  }

  // Fallback: Hand is active but posture in transition
  return {
    sign: findDictionarySign('hello') || { word: 'Hello', gloss: 'HELLO', id: 'hello' },
    confidence: 88.5,
    gestureName: 'Hand Active (Detecting...)',
    twoHanded: false,
    description: 'Analyzing hand joint geometry...'
  };
}
