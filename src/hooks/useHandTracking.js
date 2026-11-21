import { useState, useEffect, useRef, useCallback } from 'react';
import { classifyISLGesture } from '../utils/gestureClassifier';

/**
 * Custom React hook for MediaPipe Live Hand Tracking & Real-Time ISL Classification
 */
export function useHandTracking(videoRef, options = {}) {
  const {
    enabled = true,
    autoConfirmMs = 900,
    onStableSign = null
  } = options;

  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [handsCount, setHandsCount] = useState(0);
  const [liveLandmarks, setLiveLandmarks] = useState(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 1
  const [errorMessage, setErrorMessage] = useState(null);

  const handsInstanceRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const isProcessingRef = useRef(false);

  // Debouncing & Hold state
  const lastGestureIdRef = useRef(null);
  const holdStartTimeRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Initialize MediaPipe Hands
  useEffect(() => {
    let isMounted = true;

    async function initMediaPipe() {
      try {
        setIsLoadingModel(true);

        // 1. Check window.Hands first (from CDN script)
        let HandsClass = window.Hands;

        // 2. Fallback to npm package dynamic import if not on window
        if (!HandsClass) {
          try {
            const mpHands = await import('@mediapipe/hands');
            HandsClass = mpHands.Hands || mpHands.default?.Hands || window.Hands;
          } catch (impErr) {
            console.warn('Dynamic import of @mediapipe/hands failed, waiting for CDN script...', impErr);
          }
        }

        if (!HandsClass) {
          // Retry briefly if script is still downloading
          setTimeout(() => {
            if (isMounted) initMediaPipe();
          }, 800);
          return;
        }

        const hands = new HandsClass({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        hands.onResults((results) => {
          if (!isMounted) return;

          const multiLandmarks = results.multiHandLandmarks || [];
          const count = multiLandmarks.length;
          setHandsCount(count);

          if (count > 0) {
            setIsHandDetected(true);
            setLiveLandmarks(multiLandmarks);

            // Run ISL Gesture Classification
            const classification = classifyISLGesture(multiLandmarks);
            if (classification) {
              setCurrentGesture(classification);
              setConfidence(classification.confidence);

              // Check if user is holding the same gesture steadily
              const gestureKey = classification.sign.id;
              const now = Date.now();

              if (lastGestureIdRef.current === gestureKey) {
                const elapsed = now - (holdStartTimeRef.current || now);
                const progress = Math.min(1, elapsed / autoConfirmMs);
                setHoldProgress(progress);

                if (progress >= 1 && !hasTriggeredRef.current) {
                  hasTriggeredRef.current = true;
                  if (onStableSign) {
                    onStableSign(classification.sign);
                  }
                }
              } else {
                lastGestureIdRef.current = gestureKey;
                holdStartTimeRef.current = now;
                hasTriggeredRef.current = false;
                setHoldProgress(0);
              }
            }
          } else {
            setIsHandDetected(false);
            setLiveLandmarks(null);
            setCurrentGesture(null);
            setConfidence(0);
            setHoldProgress(0);
            lastGestureIdRef.current = null;
            hasTriggeredRef.current = false;
          }
        });

        handsInstanceRef.current = hands;
        if (isMounted) {
          setModelReady(true);
          setIsLoadingModel(false);
        }
      } catch (err) {
        console.error('Error initializing MediaPipe Hands:', err);
        if (isMounted) {
          setErrorMessage('Could not initialize MediaPipe hand tracking. Using simulation mode.');
          setIsLoadingModel(false);
        }
      }
    }

    initMediaPipe();

    return () => {
      isMounted = false;
      if (handsInstanceRef.current) {
        try { handsInstanceRef.current.close(); } catch (e) {}
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [autoConfirmMs, onStableSign]);

  // Continuous frame processing loop
  useEffect(() => {
    if (!enabled || !modelReady || !handsInstanceRef.current) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    let isRunning = true;

    const processLoop = async () => {
      const video = videoRef.current;
      if (
        video &&
        video.readyState >= 2 &&
        !video.paused &&
        !video.ended &&
        !isProcessingRef.current &&
        handsInstanceRef.current
      ) {
        try {
          isProcessingRef.current = true;
          await handsInstanceRef.current.send({ image: video });
        } catch (err) {
          // Suppress occasional frame pipeline drop
        } finally {
          isProcessingRef.current = false;
        }
      }

      if (isRunning) {
        animFrameIdRef.current = requestAnimationFrame(processLoop);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(processLoop);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [enabled, modelReady, videoRef]);

  return {
    isLoadingModel,
    modelReady,
    isHandDetected,
    handsCount,
    liveLandmarks,
    currentGesture,
    confidence,
    holdProgress,
    errorMessage
  };
}
