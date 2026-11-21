import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Camera, CameraOff, Volume2, Copy, Check, Trash2,
  Sparkles, Layers, Sliders, AlertCircle, Eye, ArrowRight, Zap, BookmarkPlus,
  Hand, Play, CheckCircle2, RotateCcw
} from 'lucide-react';
import { useWebcam } from '../hooks/useWebcam';
import { useHandTracking } from '../hooks/useHandTracking';
import HandLandmarkCanvas from './HandLandmarkCanvas';
import { ISL_DICTIONARY } from '../data/islDictionary';

export default function SignToText({
  speechHook,
  onSaveToHistory = null
}) {
  const {
    videoRef,
    isActive,
    isSimulatedVideo,
    errorMessage: webcamError,
    facingMode,
    startCamera,
    stopCamera,
    toggleFacingMode
  } = useWebcam();

  // Mode: 'live' (Real MediaPipe Computer Vision) or 'sim' (Interactive Preset/Simulator)
  const [engineMode, setEngineMode] = useState('live');
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [autoAddEnabled, setAutoAddEnabled] = useState(true);
  const [selectedSimSign, setSelectedSimSign] = useState('namaste');

  const [recognizedSentence, setRecognizedSentence] = useState('Namaste');
  const [copied, setCopied] = useState(false);
  const [historySaved, setHistorySaved] = useState(false);
  const [justAddedSign, setJustAddedSign] = useState(null);

  // Auto-confirm handler when a gesture is held steadily
  const handleStableSignDetected = useCallback((sign) => {
    if (!autoAddEnabled || !sign) return;

    setRecognizedSentence(prev => {
      const words = prev.trim().split(/\s+/).filter(Boolean);
      if (words.length > 0 && words[words.length - 1].toLowerCase() === sign.word.toLowerCase()) {
        return prev;
      }
      const next = prev ? `${prev} ${sign.word}` : sign.word;
      if (speechHook.autoSpeakEnabled) {
        speechHook.speak(sign.word);
      }
      return next;
    });

    setJustAddedSign(sign.word);
    setTimeout(() => setJustAddedSign(null), 1800);
  }, [autoAddEnabled, speechHook]);

  // Real-time MediaPipe Hand Tracking hook
  const {
    isLoadingModel,
    modelReady,
    isHandDetected,
    handsCount,
    liveLandmarks,
    currentGesture,
    confidence: realConfidence,
    holdProgress,
    errorMessage: trackingError
  } = useHandTracking(videoRef, {
    enabled: isActive && !isSimulatedVideo && engineMode === 'live',
    autoConfirmMs: 850,
    onStableSign: handleStableSignDetected
  });

  // Simulated fallback detection state
  const [simDetection, setSimDetection] = useState({
    sign: ISL_DICTIONARY[0],
    confidence: 97.5
  });

  // Auto-start webcam on mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Update simulation sign when user picks from simulator tray
  useEffect(() => {
    const found = ISL_DICTIONARY.find(d => d.id === selectedSimSign) || ISL_DICTIONARY[0];
    setSimDetection({
      sign: found,
      confidence: parseFloat((94 + Math.random() * 5).toFixed(1))
    });
  }, [selectedSimSign]);

  const activeSign = (engineMode === 'live' && isHandDetected && currentGesture)
    ? currentGesture.sign
    : simDetection.sign;

  const activeConfidence = (engineMode === 'live' && isHandDetected)
    ? realConfidence
    : simDetection.confidence;

  const activeGestureLabel = (engineMode === 'live' && isHandDetected && currentGesture)
    ? currentGesture.gestureName
    : activeSign.word;

  // Append sign manually to sentence
  const handleAddSign = (signToAdd = null) => {
    const target = signToAdd || activeSign;
    if (!target) return;

    setRecognizedSentence(prev => {
      const next = prev ? `${prev} ${target.word}` : target.word;
      if (speechHook.autoSpeakEnabled) {
        speechHook.speak(target.word);
      }
      return next;
    });

    setJustAddedSign(target.word);
    setTimeout(() => setJustAddedSign(null), 1500);
  };

  const handleBackspace = () => {
    setRecognizedSentence(prev => {
      const words = prev.trim().split(/\s+/).filter(Boolean);
      if (words.length <= 1) return '';
      words.pop();
      return words.join(' ');
    });
  };

  const handleClear = () => {
    setRecognizedSentence('');
  };

  const handleCopy = () => {
    if (!recognizedSentence) return;
    navigator.clipboard.writeText(recognizedSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeakSentence = () => {
    if (recognizedSentence) {
      speechHook.speak(recognizedSentence);
    }
  };

  const handleSaveSentence = () => {
    if (!recognizedSentence) return;
    if (onSaveToHistory) {
      onSaveToHistory({
        type: 'sign-to-text',
        sourceText: recognizedSentence,
        glossText: activeSign?.gloss || '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setHistorySaved(true);
      setTimeout(() => setHistorySaved(false), 2000);
    }
  };

  return (
    <div className="sign-to-text-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: '24px' }}>
      {/* Left Column: Webcam Video Feed + Hand Landmarks */}
      <div
        className="card"
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-beige)',
          backgroundColor: 'var(--color-soft-ivory)'
        }}
      >
        {/* Stream Top Toolbar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 18px',
            borderBottom: '1px solid var(--color-beige)',
            flexWrap: 'wrap',
            gap: '10px',
            backgroundColor: 'var(--color-soft-ivory)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isActive ? (isHandDetected ? 'var(--color-forest-green)' : 'var(--color-terracotta)') : '#A65338'
              }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
              {isActive ? (isSimulatedVideo ? 'Simulated Camera' : 'Live Webcam Feed') : 'Camera Offline'}
            </span>

            {/* Mode Switcher */}
            <div style={{ display: 'inline-flex', backgroundColor: 'var(--color-beige)', padding: '2px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-taupe)', marginLeft: '4px' }}>
              <button
                onClick={() => setEngineMode('live')}
                className={`btn btn-sm ${engineMode === 'live' ? 'btn-forest' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: 'var(--radius-pill)' }}
                title="Use real computer vision to track your actual hand gestures"
              >
                🌿 Live AI Vision
              </button>
              <button
                onClick={() => setEngineMode('sim')}
                className={`btn btn-sm ${engineMode === 'sim' ? 'btn-forest' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: 'var(--radius-pill)' }}
                title="Simulate signs or test with interactive buttons"
              >
                🎭 Simulator
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className={`btn btn-sm ${showSkeleton ? 'btn-sage' : 'btn-secondary'}`}
              onClick={() => setShowSkeleton(!showSkeleton)}
              title="Toggle 21-point hand skeleton joints overlay"
              style={{ fontSize: '0.75rem', padding: '5px 10px' }}
            >
              <Layers size={13} /> {showSkeleton ? 'Skeleton ON' : 'Skeleton OFF'}
            </button>

            {isActive ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={stopCamera}
                title="Stop webcam"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              >
                <CameraOff size={13} /> Stop
              </button>
            ) : (
              <button
                className="btn btn-forest btn-sm"
                onClick={startCamera}
                title="Start webcam"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              >
                <Camera size={13} /> Start
              </button>
            )}
          </div>
        </div>

        {/* Video Viewport Stage */}
        <div
          className="webcam-viewport"
          style={{
            position: 'relative',
            height: '400px',
            backgroundColor: 'var(--color-deep-forest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Live Webcam Stream */}
          <video
            ref={videoRef}
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              display: isActive && !isSimulatedVideo ? 'block' : 'none'
            }}
          />

          {/* Fallback Screen if camera inactive */}
          {(isSimulatedVideo || !isActive) && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-deep-forest)',
                color: 'var(--color-sage)',
                textAlign: 'center',
                padding: '24px'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(168, 180, 154, 0.15)',
                  border: '1.5px dashed var(--color-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  fontSize: '32px'
                }}
              >
                📷
              </div>
              <div style={{ color: 'var(--color-warm-ivory)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>
                {webcamError || 'Camera Standby'}
              </div>
              <div style={{ fontSize: '0.8125rem', maxWidth: '340px', color: 'var(--color-sage)', lineHeight: 1.5 }}>
                Click "Start Camera" above to enable live gesture tracking, or test with the gesture bar below.
              </div>
            </div>
          )}

          {/* Real Hand Landmarks Canvas Overlay */}
          {isActive && (
            <HandLandmarkCanvas
              liveLandmarks={engineMode === 'live' ? liveLandmarks : null}
              activeGesture={activeSign?.svgType || 'namaste'}
              gestureLabel={activeGestureLabel}
              confidence={activeConfidence}
              isTwoHanded={activeSign?.twoHanded || handsCount >= 2}
              width={640}
              height={480}
              showSkeleton={showSkeleton}
              isLiveMode={engineMode === 'live'}
            />
          )}

          {/* Telemetry HUD Tag in Deep Forest */}
          {isActive && (
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                backgroundColor: 'rgba(28, 48, 39, 0.94)',
                backdropFilter: 'blur(8px)',
                border: isHandDetected ? '1.5px solid var(--color-sage)' : '1px solid rgba(168, 180, 154, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 14px',
                color: '#FFFDF8',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', color: isHandDetected ? 'var(--color-sage)' : 'var(--color-terracotta)', fontWeight: 800, letterSpacing: '0.05em', display: 'block' }}>
                  {engineMode === 'live'
                    ? (isHandDetected ? `🌿 Hand Detected (${handsCount})` : '🔍 Seeking Gesture...')
                    : '🎭 Simulation Mode'}
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFDF8' }}>
                  {isHandDetected || engineMode === 'sim' ? activeGestureLabel : 'Position hand in frame'}
                </span>
              </div>

              {(isHandDetected || engineMode === 'sim') && (
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '10px' }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--color-sage)' }}>Match</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-sage)' }}>
                    {activeConfidence}%
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gesture Hold-to-Add Progress Indicator */}
          {engineMode === 'live' && isHandDetected && autoAddEnabled && holdProgress > 0 && holdProgress < 1 && (
            <div
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                backgroundColor: 'rgba(28, 48, 39, 0.94)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                color: '#FFFDF8',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--color-sage)'
              }}
            >
              <div style={{ width: '60px', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${holdProgress * 100}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-sage)',
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-sage)' }}>Hold to Add</span>
            </div>
          )}

          {/* Confirmation Toast */}
          {justAddedSign && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'var(--color-forest-green)',
                color: '#FFFDF8',
                padding: '12px 24px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <CheckCircle2 size={20} color="var(--color-sage)" /> Added "{justAddedSign}"!
            </div>
          )}

          {/* Helpful Guidance Toast if no hand detected */}
          {engineMode === 'live' && isActive && !isHandDetected && !isLoadingModel && (
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: 'rgba(28, 48, 39, 0.88)',
                backdropFilter: 'blur(8px)',
                color: '#FFFDF8',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                border: '1px solid rgba(168, 180, 154, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.8125rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Hand size={18} color="var(--color-sage)" />
                <span>
                  <strong>Show your hand to the camera:</strong> Try <em>Thumbs Up (Yes)</em>, <em>Peace (V)</em>, <em>Pointing (1)</em>, <em>Open Palm (Hello)</em>, or <em>Namaste</em>.
                </span>
              </div>
            </div>
          )}

          {/* Manual Add Button */}
          {isActive && (isHandDetected || engineMode === 'sim') && activeSign && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleAddSign(activeSign)}
              title="Add this recognized sign to sentence"
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                backgroundColor: 'var(--color-rust)',
                color: '#FFFDF8',
                boxShadow: 'var(--shadow-rust)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>+ Add "{activeSign.word}"</span> <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* Bottom Supported Gestures Test Bar */}
        <div style={{ padding: '14px 18px', backgroundColor: 'var(--color-warm-ivory)', borderTop: '1px solid var(--color-beige)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🌿 Supported Live ISL Gestures & Test Trays:
            </span>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <input
                type="checkbox"
                checked={autoAddEnabled}
                onChange={(e) => setAutoAddEnabled(e.target.checked)}
                style={{ accentColor: 'var(--color-forest-green)' }}
              />
              Auto-add on holding gesture (0.8s)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'thumbs-up', word: '👍 Thumbs Up (Yes)' },
              { id: 'peace', word: '✌️ Peace / V (2)' },
              { id: 'pointing', word: '☝️ Pointing (1 / Where)' },
              { id: 'wave', word: '✋ Open Palm (Hello)' },
              { id: 'namaste', word: '🙏 Namaste (Two Hands)' },
              { id: 'water', word: '🤟 Water (3 Fingers)' },
              { id: 'love', word: '🤟 Love (ILY Sign)' },
              { id: 'fist', word: '✊ Fist (Alphabet A)' },
              { id: 'help', word: '👐 Help (Two Hands)' }
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setSelectedSimSign(g.id);
                  const matched = ISL_DICTIONARY.find(d => d.svgType === g.id || d.id === g.id) || { word: g.word.split(' ')[1], id: g.id };
                  handleAddSign(matched);
                }}
                className={`btn btn-sm ${selectedSimSign === g.id ? 'btn-forest' : 'btn-secondary'}`}
                style={{
                  fontSize: '0.75rem',
                  padding: '5px 12px',
                  whiteSpace: 'nowrap',
                  borderRadius: 'var(--radius-pill)'
                }}
              >
                {g.word}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Sentence Builder, Vocalize & Sign Anatomy */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Sentence Accumulator Card */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
                Translated Sentence Output
              </h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {engineMode === 'live' ? 'Live Webcam Kinematic ISL Stream' : 'Interactive Simulation Workspace'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                className="btn btn-secondary btn-icon"
                onClick={handleBackspace}
                title="Backspace last word"
                disabled={!recognizedSentence}
                style={{ width: '32px', height: '32px' }}
              >
                ⌫
              </button>
              <button
                className="btn btn-secondary btn-icon"
                onClick={handleClear}
                title="Clear sentence"
                disabled={!recognizedSentence}
                style={{ width: '32px', height: '32px' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Text Display Field */}
          <div
            style={{
              flex: 1,
              minHeight: '140px',
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warm-ivory)',
              border: '1.5px solid var(--color-beige)',
              fontSize: '1.15rem',
              fontWeight: 600,
              color: recognizedSentence ? 'var(--color-charcoal)' : 'var(--text-muted)',
              lineHeight: 1.6,
              position: 'relative',
              overflowY: 'auto'
            }}
          >
            {recognizedSentence || 'Perform ISL signs to compose your sentence here...'}
            {recognizedSentence && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '20px',
                  backgroundColor: 'var(--color-rust)',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s infinite'
                }}
              />
            )}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="btn btn-primary"
                onClick={handleSpeakSentence}
                disabled={!recognizedSentence}
                style={{
                  backgroundColor: 'var(--color-rust)',
                  color: '#FFFDF8',
                  boxShadow: 'var(--shadow-rust)'
                }}
              >
                <Volume2 size={16} />
                <span>Vocalize (Sign-to-Speech)</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={handleCopy}
                disabled={!recognizedSentence}
                title="Copy sentence to clipboard"
              >
                {copied ? <Check size={14} color="var(--color-forest-green)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <button
              className="btn btn-secondary"
              onClick={handleSaveSentence}
              disabled={!recognizedSentence}
              title="Save to session history"
            >
              <BookmarkPlus size={15} />
              <span>{historySaved ? 'Saved!' : 'Save Session'}</span>
            </button>
          </div>
        </div>

        {/* Active Sign Details Card */}
        {activeSign && (
          <div className="card" style={{ padding: '20px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-forest-green)', letterSpacing: '0.04em' }}>
                Active Gesture Details
              </span>
              <span className="badge badge-sage">
                {activeSign.twoHanded ? '👐 Two-Handed' : '✋ Single-Handed'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-beige)',
                  border: '1.5px solid var(--color-taupe)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px'
                }}
              >
                {activeSign.twoHanded ? '👐' : '✋'}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
                  {activeSign.word}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {activeSign.englishMeaning || 'Indian Sign Language standard'}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 10px', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--color-charcoal)' }}>Handshape:</strong> <span>{activeSign.handshape || 'Standard ISL Configuration'}</span>
              <strong style={{ color: 'var(--color-charcoal)' }}>Movement:</strong> <span>{activeSign.movement || 'Natural hand motion'}</span>
              <strong style={{ color: 'var(--color-charcoal)' }}>Facial Cue:</strong> <span>{activeSign.facialExpression || 'Direct, attentive gaze'}</span>
            </div>
          </div>
        )}

        {/* Engine Transparency Notice */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-muted-sage)',
            border: '1px solid var(--color-sage)',
            fontSize: '0.75rem',
            color: 'var(--color-deep-forest)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}
        >
          <Sparkles size={16} color="var(--color-forest-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Client-Side Vision AI:</strong> MediaPipe neural keypoint models run locally inside your browser at 30+ FPS. No video stream or personal image data is ever uploaded or stored remotely.
          </div>
        </div>
      </div>
    </div>
  );
}
