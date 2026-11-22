import { useState, useEffect, useRef } from 'react';
import { classifyISLGesture } from '../utils/gestureClassifier';

/**
 * Target inference frame rate: ~12-14 FPS (75ms interval)
 * Decoupled from camera preview rate (30 FPS) to maintain smooth UI and low CPU usage.
 */
const INFERENCE_INTERVAL_MS = 75;

/**
 * Optimized React hook for MediaPipe Live Hand Tracking & Real-Time ISL Classification
 * - Loads model once per mounted lifecycle
 * - modelComplexity: 0 (Lite model for real-time mobile/desktop performance)
 * - Decoupled inference throttling (~12-14 FPS) preventing frame drops on video element
 * - Strictly prevents overlapping inferences
 * - Stabilized callbacks using refs to prevent teardown/reload cycles
 * - Throttles React state updates to avoid excessive re-renders
 */
export function useHandTracking(videoRef, options = {}) {
  const {
    enabled = true,
    autoConfirmMs = 900,
    onStableSign = null
  } = options;

  // Stabilize callbacks and config via refs
  const onStableSignRef = useRef(onStableSign);
  const autoConfirmMsRef = useRef(autoConfirmMs);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    onStableSignRef.current = onStableSign;
  }, [onStableSign]);

  useEffect(() => {
    autoConfirmMsRef.current = autoConfirmMs;
  }, [autoConfirmMs]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Hook states
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [handsCount, setHandsCount] = useState(0);
  const [liveLandmarks, setLiveLandmarks] = useState(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 1
  const [errorMessage, setErrorMessage] = useState(null);

  // Instance and loop refs
  const handsInstanceRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const isProcessingRef = useRef(false);
  const lastInferenceTimeRef = useRef(0);
  const isMountedRef = useRef(true);

  // Gesture hold tracking refs
  const lastGestureIdRef = useRef(null);
  const holdStartTimeRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const lastReportedProgressRef = useRef(0);

  // Value cache refs to prevent duplicate React state updates
  const lastHandsCountRef = useRef(0);
  const lastHandDetectedRef = useRef(false);
  const lastConfidenceRef = useRef(0);

  // Initialize MediaPipe Hands ONCE per mounted lifecycle
  useEffect(() => {
    isMountedRef.current = true;
    let retryTimeout = null;

    async function initMediaPipe() {
      try {
        setIsLoadingModel(true);

        // 1. Check window.Hands first (from CDN script in index.html)
        let HandsClass = window.Hands;

        // 2. Fallback to npm package dynamic import if not yet available
        if (!HandsClass) {
          try {
            const mpHands = await import('@mediapipe/hands');
            HandsClass = mpHands.Hands || mpHands.default?.Hands || window.Hands;
          } catch (impErr) {
            console.warn('Dynamic import of @mediapipe/hands unavailable, waiting for script...', impErr);
          }
        }

        if (!HandsClass) {
          // If script is still loading, retry briefly
          retryTimeout = setTimeout(() => {
            if (isMountedRef.current) initMediaPipe();
          }, 600);
          return;
        }

        const hands = new HandsClass({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        // Use modelComplexity: 0 (Lite model for smooth real-time performance)
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 0,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        hands.onResults((results) => {
          if (!isMountedRef.current || !enabledRef.current) return;

          const multiLandmarks = results.multiHandLandmarks || [];
          const count = multiLandmarks.length;

          // Only update handsCount state if changed
          if (count !== lastHandsCountRef.current) {
            lastHandsCountRef.current = count;
            setHandsCount(count);
          }

          if (count > 0) {
            if (!lastHandDetectedRef.current) {
              lastHandDetectedRef.current = true;
              setIsHandDetected(true);
            }

            setLiveLandmarks(multiLandmarks);

            // Run optimized ISL Gesture Classification
            const classification = classifyISLGesture(multiLandmarks);
            if (classification) {
              const gestureKey = classification.sign?.id || classification.gestureName;
              const roundedConf = Math.round(classification.confidence * 10) / 10;

              // Only update currentGesture if gesture changed or confidence shifted
              if (
                lastGestureIdRef.current !== gestureKey ||
                Math.abs(roundedConf - lastConfidenceRef.current) >= 1.5
              ) {
                lastConfidenceRef.current = roundedConf;
                setCurrentGesture(classification);
                setConfidence(roundedConf);
              }

              // Hold progress tracking
              const now = Date.now();
              const autoConfirmLimit = autoConfirmMsRef.current || 900;

              if (lastGestureIdRef.current === gestureKey) {
                const elapsed = now - (holdStartTimeRef.current || now);
                const progress = Math.min(1, elapsed / autoConfirmLimit);

                // Throttle progress state updates to avoid continuous re-renders
                if (Math.abs(progress - lastReportedProgressRef.current) >= 0.05 || progress === 1) {
                  lastReportedProgressRef.current = progress;
                  setHoldProgress(progress);
                }

                // Trigger stable sign callback once per hold
                if (progress >= 1 && !hasTriggeredRef.current) {
                  hasTriggeredRef.current = true;
                  if (onStableSignRef.current) {
                    onStableSignRef.current(classification.sign);
                  }
                }
              } else {
                lastGestureIdRef.current = gestureKey;
                holdStartTimeRef.current = now;
                hasTriggeredRef.current = false;
                lastReportedProgressRef.current = 0;
                setHoldProgress(0);
              }
            }
          } else {
            if (lastHandDetectedRef.current) {
              lastHandDetectedRef.current = false;
              setIsHandDetected(false);
              setLiveLandmarks(null);
              setCurrentGesture(null);
              setConfidence(0);
              lastConfidenceRef.current = 0;
            }
            if (lastReportedProgressRef.current !== 0) {
              lastReportedProgressRef.current = 0;
              setHoldProgress(0);
            }
            lastGestureIdRef.current = null;
            hasTriggeredRef.current = false;
          }
        });

        handsInstanceRef.current = hands;

        if (isMountedRef.current) {
          setModelReady(true);
          setIsLoadingModel(false);
        }
      } catch (err) {
        console.error('Error initializing MediaPipe Hands:', err);
        if (isMountedRef.current) {
          setErrorMessage('Could not initialize MediaPipe hand tracking. Using simulation mode.');
          setIsLoadingModel(false);
        }
      }
    }

    initMediaPipe();

    return () => {
      isMountedRef.current = false;
      if (retryTimeout) clearTimeout(retryTimeout);
      if (handsInstanceRef.current) {
        try {
          handsInstanceRef.current.close();
        } catch (e) {}
        handsInstanceRef.current = null;
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []); // Strictly mount-once lifecycle

  // Decoupled inference loop targeting ~12-14 FPS
  useEffect(() => {
    if (!enabled || !modelReady) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      return;
    }

    let isRunning = true;

    const processLoop = async (timestamp) => {
      if (!isRunning) return;

      const video = videoRef.current;
      const now = timestamp || performance.now();
      const elapsed = now - lastInferenceTimeRef.current;

      // Only send frame when target interval has elapsed, not already processing, and video ready
      if (
        elapsed >= INFERENCE_INTERVAL_MS &&
        !isProcessingRef.current &&
        handsInstanceRef.current &&
        video &&
        video.readyState >= 2 &&
        video.videoWidth > 0 &&
        video.videoHeight > 0 &&
        !video.paused &&
        !video.ended
      ) {
        try {
          isProcessingRef.current = true;
          lastInferenceTimeRef.current = now;
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
