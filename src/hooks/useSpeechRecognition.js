import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Browser Web Speech API (SpeechRecognition)
 * Supports live microphone streaming + fallback simulated recognition
 */
export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [hasSupport, setHasSupport] = useState(false);
  const [language, setLanguage] = useState('en-IN'); // Indian English default
  const [error, setError] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);

  const recognitionRef = useRef(null);
  const simulationTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setHasSupport(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event) => {
          let currentInterim = '';
          let currentFinal = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentFinal += event.results[i][0].transcript;
            } else {
              currentInterim += event.results[i][0].transcript;
            }
          }

          if (currentFinal) {
            setTranscript(prev => (prev ? `${prev} ${currentFinal}` : currentFinal).trim());
          }
          setInterimTranscript(currentInterim);
        };

        recognition.onerror = (event) => {
          console.warn('SpeechRecognition error:', event.error);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setError('Microphone permission withheld. Switching to simulated voice mode.');
          } else {
            setError(`Recognition info: ${event.error}`);
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setHasSupport(false);
        setError('Browser does not natively support Web Speech Recognition. Simulated voice test mode is available.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
      }
    };
  }, [language]);

  const startListening = useCallback(() => {
    setError(null);
    if (recognitionRef.current && hasSupport) {
      try {
        recognitionRef.current.lang = language;
        recognitionRef.current.start();
        setIsListening(true);
        setIsSimulated(false);
      } catch (err) {
        console.warn('Native speech recognition start failed:', err);
        // Fallback to simulated stream
        startSimulatedListening();
      }
    } else {
      startSimulatedListening();
    }
  }, [hasSupport, language]);

  const startSimulatedListening = useCallback((customPhrase = null) => {
    setIsListening(true);
    setIsSimulated(true);

    const simulationPhrases = [
      'Namaste! Welcome to our inclusive session.',
      'Can you please show me the hospital sign?',
      'Thank you for your help, I am fine.',
      'Good morning teacher, how are you today?',
      'I need emergency medical assistance please.'
    ];

    const targetPhrase = customPhrase || simulationPhrases[Math.floor(Math.random() * simulationPhrases.length)];
    const words = targetPhrase.split(' ');
    let wordIndex = 0;
    setInterimTranscript('');

    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);

    simulationTimerRef.current = setInterval(() => {
      if (wordIndex < words.length) {
        setInterimTranscript(words.slice(0, wordIndex + 1).join(' '));
        wordIndex++;
      } else {
        clearInterval(simulationTimerRef.current);
        setTranscript(prev => (prev ? `${prev} ${targetPhrase}` : targetPhrase).trim());
        setInterimTranscript('');
        setIsListening(false);
      }
    }, 450);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening && !isSimulated) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    if (simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
    }
    setIsListening(false);
  }, [isListening, isSimulated]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    hasSupport,
    language,
    setLanguage,
    error,
    isSimulated,
    startListening,
    startSimulatedListening,
    stopListening,
    resetTranscript,
    setTranscript
  };
}
