import { useState, useEffect, useRef, useCallback } from 'react';

export function useWebcam() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt', 'granted', 'denied'
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSimulatedVideo, setIsSimulatedVideo] = useState(false);

  const startCamera = useCallback(async () => {
    setErrorMessage(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage('Camera API is not supported in this browser. Running in simulated camera mode.');
      setIsSimulatedVideo(true);
      setIsActive(true);
      return;
    }

    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: facingMode
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setPermissionState('granted');
      setIsSimulatedVideo(false);
      setIsActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => console.warn('Video auto-play interrupted:', e));
        };
      }
    } catch (err) {
      console.warn('Webcam permission error or not found:', err.name, err.message);
      setPermissionState('denied');
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Camera permission was denied. Interactive simulated camera feed has been activated.'
          : `Camera error (${err.name}). Using interactive simulated video feed.`
      );
      // Auto-fallback to interactive simulated camera stream so user experience is smooth!
      setIsSimulatedVideo(true);
      setIsActive(true);
    }
  }, [facingMode, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setIsSimulatedVideo(false);
  }, [stream]);

  const toggleFacingMode = useCallback(() => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
