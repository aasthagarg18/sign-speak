import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for Browser SpeechSynthesis API
 * Handles Indian English and Hindi voice auto-detection, pitch, rate, and speech queue
 */
export function useSpeechSynthesis() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSupport, setHasSupport] = useState(false);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(true);

  const synthRef = useRef(null);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSupport(true);
      synthRef.current = window.speechSynthesis;

      const updateVoices = () => {
        const available = synthRef.current.getVoices() || [];
        setVoices(available);

        // Prefer English (India) or Hindi or default English
        const indianVoice = available.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india'));
        const hindiVoice = available.find(v => v.lang.includes('hi-IN'));
        const defaultVoice = available.find(v => v.default) || available.find(v => v.lang.startsWith('en')) || available[0];

        setSelectedVoice(indianVoice || hindiVoice || defaultVoice || null);
      };

      updateVoices();

      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = updateVoices;
      }
    } else {
      setHasSupport(false);
    }
  }, []);

  const speak = useCallback((text, onEndCallback = null) => {
    if (!synthRef.current || !text) return;

    // Cancel current speech if any
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  }, [selectedVoice, rate, pitch, volume]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    hasSupport,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    isSpeaking,
    autoSpeakEnabled,
    setAutoSpeakEnabled,
    speak,
    stop
  };
}
