import React, { useState, useMemo } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { tokenizeTextToISL } from '../utils/islMatcher';
import ISLAvatarPlayer from './ISLAvatarPlayer';
import ISLGlossBadge from './ISLGlossBadge';

export default function SpeechToSign({ speechHook }) {
  const {
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
    resetTranscript
  } = useSpeechRecognition();

  const [activeTokenIdx, setActiveTokenIdx] = useState(0);

  const currentFullText = useMemo(() => {
    return [transcript, interimTranscript].filter(Boolean).join(' ').trim();
  }, [transcript, interimTranscript]);

  const islTokens = useMemo(() => {
    if (!currentFullText) return [];
    return tokenizeTextToISL(currentFullText);
  }, [currentFullText]);

  const presetVoiceTests = [
    'Namaste, nice to meet you',
    'Where is the hospital?',
    'I need doctor help please',
    'Thank you, I am fine'
  ];

  return (
    <div className="speech-to-sign-container workbench-grid">
      {/* Left Column: Voice Recording & Live Subtitle Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Microphone Stream Card */}
        <div className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
                Speech-to-Sign Engine
              </h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Convert spoken voice into live ISL demonstration
              </span>
            </div>

            {/* Language Selector */}
            <select
              className="form-control"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '6px 12px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--color-beige)' }}
            >
              <option value="en-IN">English (India) 🇮🇳</option>
              <option value="hi-IN">Hindi (India) 🇮🇳</option>
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
            </select>
          </div>

          {/* Central Microphone Button with Terracotta/Rust Ripples */}
          <div
            style={{
              padding: '30px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-warm-ivory)',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-beige)',
              marginBottom: '18px'
            }}
          >
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              {isListening && (
                <>
                  <span
                    className="mic-ripple"
                    style={{
                      position: 'absolute',
                      inset: '-12px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(166, 83, 56, 0.25)'
                    }}
                  />
                  <span
                    className="mic-ripple"
                    style={{
                      position: 'absolute',
                      inset: '-24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(196, 119, 92, 0.15)',
                      animationDelay: '0.4s'
                    }}
                  />
                </>
              )}

              <button
                className={`btn btn-icon ${isListening ? 'btn-rust' : 'btn-forest'}`}
                onClick={isListening ? stopListening : startListening}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  padding: 0,
                  boxShadow: isListening ? 'var(--shadow-rust)' : 'var(--shadow-forest)',
                  backgroundColor: isListening ? 'var(--color-rust)' : 'var(--color-forest-green)'
                }}
              >
                {isListening ? <MicOff size={28} color="#FFFDF8" /> : <Mic size={28} color="#FFFDF8" />}
              </button>
            </div>

            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-forest-green)', marginBottom: '3px' }}>
              {isListening ? (isSimulated ? 'Simulated Speech Streaming...' : 'Listening to Live Voice...') : 'Click Microphone to Speak'}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {isListening ? 'Speak naturally into your device' : 'Or select a quick audio sample below'}
            </div>
          </div>

          {/* Quick Voice Simulation Buttons */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              Simulate Spoken Audio Sample:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {presetVoiceTests.map((phrase, idx) => (
                <button
                  key={idx}
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    resetTranscript();
                    startSimulatedListening(phrase);
                  }}
                  style={{ fontSize: '0.75rem', padding: '5px 12px', borderRadius: 'var(--radius-pill)' }}
                >
                  🎙️ "{phrase}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Audio Transcript Subtitle Stream */}
        <div className="card" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
              Live Spoken Transcription
            </span>
            {transcript && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={resetTranscript}
                style={{ fontSize: '0.75rem', padding: '3px 10px' }}
              >
                Clear
              </button>
            )}
          </div>

          <div
            style={{
              minHeight: '110px',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warm-ivory)',
              border: '1.5px solid var(--color-beige)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: currentFullText ? 'var(--color-charcoal)' : 'var(--text-muted)'
            }}
          >
            {transcript && <span>{transcript} </span>}
            {interimTranscript && (
              <span style={{ color: 'var(--color-rust)', fontStyle: 'italic', opacity: 0.9 }}>
                {interimTranscript} ...
              </span>
            )}
            {!currentFullText && 'Spoken voice will be transcribed here and immediately transformed to ISL demonstration...'}
          </div>

          {error && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(166, 83, 56, 0.12)',
                color: 'var(--color-rust)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={15} /> {error}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Animated ISL Demonstration Player */}
      <div>
        <ISLAvatarPlayer
          tokens={islTokens.length > 0 ? islTokens : tokenizeTextToISL('Namaste')}
          currentIndex={activeTokenIdx}
          onIndexChange={(idx) => setActiveTokenIdx(idx)}
          onSpeak={(txt) => speechHook.speak(txt)}
          autoPlay={true}
          height={390}
        />
      </div>
    </div>
  );
}
