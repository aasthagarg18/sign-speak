import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SignToSpeechControls({
  speechHook,
  compact = false
}) {
  const {
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
  } = speechHook;

  if (!hasSupport) {
    return (
      <div style={{ fontSize: '0.75rem', padding: '8px 12px', backgroundColor: 'var(--color-beige)', borderRadius: 'var(--radius-sm)', color: 'var(--color-rust)' }}>
        Speech Synthesis is not supported in this browser.
      </div>
    );
  }

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          className={`btn ${autoSpeakEnabled ? 'btn-rust' : 'btn-secondary'} btn-sm`}
          onClick={() => setAutoSpeakEnabled(!autoSpeakEnabled)}
          title={autoSpeakEnabled ? 'Auto-speech enabled' : 'Click to enable auto-speech'}
          style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          {autoSpeakEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          {autoSpeakEnabled ? 'Auto-Voice On' : 'Voice Muted'}
        </button>

        {isSpeaking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ width: '3px', height: '12px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
            <span style={{ width: '3px', height: '16px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
            <span style={{ width: '3px', height: '10px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{
        padding: '18px',
        backgroundColor: 'var(--color-soft-ivory)',
        border: '1.5px solid var(--color-beige)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: 'rgba(38, 63, 50, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-forest-green)'
            }}
          >
            <Volume2 size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
              Speech Synthesis (Sign-to-Speech)
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Natural Indian English & Regional Voices
            </span>
          </div>
        </div>

        {isSpeaking ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-rust)', fontSize: '0.75rem', fontWeight: 700 }}>
            <span>Speaking...</span>
          </div>
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => speak('SignSpeak vocalization engine is active.')}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            Test Voice
          </button>
        )}
      </div>

      {/* Voice selection */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest-green)', marginBottom: '4px' }}>
          Selected Voice ({voices.length} detected):
        </label>
        <select
          className="form-control"
          value={selectedVoice ? selectedVoice.name : ''}
          onChange={(e) => {
            const chosen = voices.find(v => v.name === e.target.value);
            if (chosen) setSelectedVoice(chosen);
          }}
          style={{ width: '100%', fontSize: '0.8125rem', padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}
        >
          {voices.map((v, idx) => (
            <option key={idx} value={v.name}>
              {v.name} ({v.lang}) {v.lang.includes('IN') ? '🇮🇳 [Recommended]' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Speed & Pitch */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
            <span>Speech Speed:</span>
            <span style={{ fontWeight: 700, color: 'var(--color-forest-green)' }}>{rate}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.75"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-forest-green)' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
            <span>Pitch:</span>
            <span style={{ fontWeight: 700, color: 'var(--color-forest-green)' }}>{pitch}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.5"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-forest-green)' }}
          />
        </div>
      </div>

      {/* Auto-Speak Checkbox */}
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '8px 12px',
          backgroundColor: autoSpeakEnabled ? 'var(--color-muted-sage)' : 'var(--color-warm-ivory)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-beige)',
          fontSize: '0.75rem',
          userSelect: 'none'
        }}
      >
        <input
          type="checkbox"
          checked={autoSpeakEnabled}
          onChange={(e) => setAutoSpeakEnabled(e.target.checked)}
          style={{ width: '16px', height: '16px', accentColor: 'var(--color-forest-green)' }}
        />
        <span style={{ color: 'var(--color-forest-green)', fontWeight: 500 }}>
          <strong>Auto-vocalize signs</strong>: speak translated text as soon as recognition completes
        </span>
      </label>
    </div>
  );
}
