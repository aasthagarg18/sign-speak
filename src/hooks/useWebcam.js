import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Optimized Webcam Hook for Real-Time Computer Vision
 * - Ideal 640x480 resolution at 30 FPS target
 * - Graceful fallback for unsupported constraints
 * - Strict track cleanup preventing duplicate streams and camera leaks
 * - Safe async startup/shutdown handling for React Strict Mode
 */
export function useWebcam() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const isStartingRef = useRef(false);
  const isMountedRef = useRef(true);
  const facingModeRef = useRef('user');

  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSimulatedVideo, setIsSimulatedVideo] = useState(false);

  // Keep facingModeRef in sync
  useEffect(() => {
    facingModeRef.current = facingMode;
  }, [facingMode]);

  // Helper to safely stop all active media stream tracks
  const stopMediaTracks = useCallback(() => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      for (let i = 0; i < tracks.length; i++) {
        try {
          tracks[i].stop();
        } catch (e) {
          // Ignore track shutdown error
        }
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startCamera = useCallback(async (targetFacingMode) => {
    const desiredFacing = targetFacingMode || facingModeRef.current;
    if (targetFacingMode) {
      facingModeRef.current = targetFacingMode;
      setFacingMode(targetFacingMode);
    }

    // Prevent concurrent camera initializations
    if (isStartingRef.current) return;
    isStartingRef.current = true;

    setErrorMessage(null);

    // Check browser mediaDevices support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (isMountedRef.current) {
        setErrorMessage('Camera API is not supported in this browser. Running in simulated camera mode.');
        setIsSimulatedVideo(true);
        setIsActive(true);
      }
      isStartingRef.current = false;
      return;
    }

    // Stop any existing tracks before acquiring new stream
    stopMediaTracks();

    let mediaStream = null;

    try {
      // 1. Primary constraints: Ideal 640x480 resolution at target ~30 FPS
      const primaryConstraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 30, min: 15, max: 30 },
          facingMode: desiredFacing
        },
        audio: false
      };

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(primaryConstraints);
      } catch (constraintErr) {
        // 2. Graceful fallback constraints if device is overconstrained
        if (constraintErr.name === 'OverconstrainedError' || constraintErr.name === 'ConstraintNotSatisfiedError') {
          console.warn('Primary camera constraints not satisfied, attempting fallback constraints...');
          const fallbackConstraints = {
            video: {
              facingMode: desiredFacing
            },
            audio: false
          };
          mediaStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
        } else {
          throw constraintErr;
        }
      }

      // Check if hook unmounted during async acquisition
      if (!isMountedRef.current) {
        if (mediaStream) {
          mediaStream.getTracks().forEach(t => t.stop());
        }
        isStartingRef.current = false;
        return;
      }

      streamRef.current = mediaStream;
      setPermissionState('granted');
      setIsSimulatedVideo(false);
      setIsActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current && isMountedRef.current) {
            videoRef.current.play().catch(e => {
              if (e.name !== 'AbortError') {
                console.warn('Video auto-play interrupted:', e);
              }
            });
          }
        };
      }
    } catch (err) {
      console.warn('Webcam permission error or not found:', err.name, err.message);
      if (isMountedRef.current) {
        setPermissionState('denied');
        setErrorMessage(
          err.name === 'NotAllowedError'
            ? 'Camera permission was denied. Interactive simulated camera feed has been activated.'
            : `Camera error (${err.name}). Using interactive simulated video feed.`
        );
        // Seamless fallback to simulated mode
        setIsSimulatedVideo(true);
        setIsActive(true);
      }
    } finally {
      isStartingRef.current = false;
    }
  }, [stopMediaTracks]);

  const stopCamera = useCallback(() => {
    stopMediaTracks();
    if (isMountedRef.current) {
      setIsActive(false);
      setIsSimulatedVideo(false);
    }
  }, [stopMediaTracks]);

  const toggleFacingMode = useCallback(() => {
    const nextMode = facingModeRef.current === 'user' ? 'environment' : 'user';
    facingModeRef.current = nextMode;
    setFacingMode(nextMode);

    // If camera is currently active, seamlessly switch lens
    if (isActive && !isSimulatedVideo) {
      startCamera(nextMode);
    }
  }, [isActive, isSimulatedVideo, startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      stopMediaTracks();
    };
  }, [stopMediaTracks]);

  return {
    videoRef,
    isActive,
    isSimulatedVideo,
    permissionState,
    errorMessage,
    facingMode,
    startCamera,
    stopCamera,
    toggleFacingMode
  };
}
