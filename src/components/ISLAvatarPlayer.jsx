import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, Sparkles, Info } from 'lucide-react';
import ISLGlossBadge from './ISLGlossBadge';

/**
 * ISLAvatarPlayer — Vintage Botanical Edition
 * Animated sign demonstration visualizer with earthy tones,
 * articulated hand gestures, directional motion arrows, and timeline controls.
 */
export default function ISLAvatarPlayer({
  tokens = [],
  currentIndex = 0,
  onIndexChange = null,
  onSpeak = null,
  autoPlay = true,
  height = 360
}) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const [activeStep, setActiveStep] = useState(currentIndex);
  const [motionPhase, setMotionPhase] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setActiveStep(currentIndex);
  }, [currentIndex]);

  const currentToken = tokens && tokens.length > 0 ? tokens[activeStep] : null;
  const currentSign = currentToken ? currentToken.item : null;

  // Playback loop
  useEffect(() => {
    if (!isPlaying || !tokens || tokens.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const durationPerSign = Math.max(1400 / speed, 600);
    const tickInterval = 50;
    let elapsed = 0;

    timerRef.current = setInterval(() => {
      elapsed += tickInterval;
      setMotionPhase((elapsed % durationPerSign) / durationPerSign);

      if (elapsed >= durationPerSign) {
        elapsed = 0;
        setActiveStep(prev => {
          const next = prev + 1;
          if (next >= tokens.length) {
            if (loop) {
              if (onIndexChange) onIndexChange(0);
              return 0;
            } else {
              setIsPlaying(false);
              return prev;
            }
          }
          if (onIndexChange) onIndexChange(next);
          return next;
        });
      }
    }, tickInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, tokens, speed, loop, onIndexChange]);

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeStep - 1);
    setActiveStep(nextIdx);
    if (onIndexChange) onIndexChange(nextIdx);
  };

  const handleNext = () => {
    if (!tokens || tokens.length === 0) return;
    const nextIdx = (activeStep + 1) % tokens.length;
    setActiveStep(nextIdx);
    if (onIndexChange) onIndexChange(nextIdx);
  };

  const handleReset = () => {
    setActiveStep(0);
    setMotionPhase(0);
    if (onIndexChange) onIndexChange(0);
  };

  const signType = currentSign ? currentSign.svgType : 'neutral';
  const twoHanded = currentSign ? currentSign.twoHanded : false;

  const bounceY = Math.sin(motionPhase * Math.PI * 2) * 8;
  const pulseScale = 1 + Math.sin(motionPhase * Math.PI * 2) * 0.04;

  return (
    <div
      className="card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg, 20px)',
        border: '1.5px solid var(--color-beige, #E8DDCA)',
        backgroundColor: 'var(--color-soft-ivory, #FFFDF8)'
      }}
    >
      {/* Top Header & Gloss Display */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          borderBottom: '1px solid var(--color-beige, #E8DDCA)',
          backgroundColor: 'var(--color-soft-ivory, #FFFDF8)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-forest" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={13} color="var(--color-forest-green)" /> ISL Visual Demonstration
          </span>
          {currentSign && (
            <ISLGlossBadge
              gloss={currentSign.gloss}
              isTwoHanded={twoHanded}
              difficulty={currentSign.difficulty}
              size="md"
            />
          )}
        </div>

        {currentSign && onSpeak && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onSpeak(currentSign.word)}
            title="Hear spoken pronunciation"
            style={{ padding: '5px 12px', fontSize: '0.75rem' }}
          >
            <Volume2 size={13} /> Speak
          </button>
        )}
      </div>

      {/* Main Avatar Stage */}
      <div
        className="avatar-stage"
        style={{
          position: 'relative',
          height: `${height}px`,
          backgroundColor: 'var(--color-warm-ivory, #F8F5ED)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Botanical dotted grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#A89986 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.18
          }}
        />

        {/* Expressive SVG Avatar in Vintage Botanical Garments */}
        <svg
          viewBox="0 0 400 380"
          width="100%"
          height="100%"
          style={{ maxWidth: '420px', maxHeight: '100%', filter: 'drop-shadow(0 10px 20px rgba(52, 56, 49, 0.12))' }}
        >
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D0B5" />
              <stop offset="100%" stopColor="#DF9F7A" />
            </linearGradient>
            <linearGradient id="clothForest" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#263F32" />
              <stop offset="100%" stopColor="#1C3027" />
            </linearGradient>
            <linearGradient id="terracottaAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A65338" />
              <stop offset="100%" stopColor="#C4775C" />
            </linearGradient>
          </defs>

          {/* Torso & Traditional Kurta in Forest Green */}
          <path
            d="M130 260 C130 220 160 210 200 210 C240 210 270 220 270 260 L285 380 L115 380 Z"
            fill="url(#clothForest)"
          />

          {/* Terracotta Kurta Collar Placket */}
          <path
            d="M196 210 L204 210 L204 270 L196 270 Z"
            fill="url(#terracottaAccent)"
          />

          {/* Neck */}
          <rect x="185" y="175" width="30" height="40" rx="6" fill="url(#skinGrad)" />

          {/* Head */}
          <ellipse
            cx="200"
            cy="135"
            rx="46"
            ry="55"
            fill="url(#skinGrad)"
            transform={`translate(0, ${signType === 'namaste' ? bounceY * 0.4 : 0})`}
          />

          {/* Hair in Charcoal */}
          <path
            d="M152 135 C150 90 170 70 200 70 C230 70 250 90 248 135 C244 110 230 95 200 95 C170 95 156 110 152 135 Z"
            fill="#343831"
          />

          {/* Eyebrows */}
          {currentSign?.category === 'questions' ? (
            <g stroke="#343831" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M172 110 Q182 104 190 108" />
              <path d="M210 108 Q218 104 228 110" />
            </g>
          ) : (
            <g stroke="#343831" strokeWidth="2.8" strokeLinecap="round" fill="none">
              <path d="M172 114 Q182 110 190 113" />
              <path d="M210 113 Q218 110 228 114" />
            </g>
          )}

          {/* Eyes */}
          <ellipse cx="182" cy="126" rx="5" ry={signType === 'sleep' ? 1.5 : 5} fill="#1C3027" />
          <ellipse cx="218" cy="126" rx="5" ry={signType === 'sleep' ? 1.5 : 5} fill="#1C3027" />
          <circle cx="184" cy="124" r="1.5" fill="#FFFDF8" />
          <circle cx="220" cy="124" r="1.5" fill="#FFFDF8" />

          {/* Nose */}
          <path d="M200 128 L197 142 L203 142" stroke="#A89986" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Mouth */}
          <path
            d={
              currentSign?.category === 'greetings' || currentSign?.id === 'happy'
                ? "M188 155 Q200 168 212 155"
                : "M190 158 Q200 162 210 158"
            }
            stroke="#A65338"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* ARMS & GESTURAL MECHANICS */}
          {signType === 'namaste' && (
            <g transform={`translate(200, 230) scale(${pulseScale}) translate(-200, -230)`}>
              <path d="M135 250 Q160 260 190 230" stroke="url(#skinGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <path d="M265 250 Q240 260 210 230" stroke="url(#skinGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <ellipse cx="196" cy="215" rx="9" ry="24" fill="url(#skinGrad)" transform="rotate(-6 196 215)" />
              <ellipse cx="204" cy="215" rx="9" ry="24" fill="url(#skinGrad)" transform="rotate(6 204 215)" />
              {/* Botanical energy aura ring */}
              <circle cx="200" cy="215" r="32" stroke="#A8B49A" strokeWidth="2" fill="none" opacity="0.8" strokeDasharray="4 4" />
            </g>
          )}

          {signType === 'wave' && (
            <g transform={`translate(${bounceY}, 0)`}>
              <path d="M260 240 Q290 200 270 140" stroke="url(#skinGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <ellipse cx="270" cy="130" rx="14" ry="20" fill="url(#skinGrad)" transform={`rotate(${bounceY * 3} 270 130)`} />
              <path d="M295 115 C305 125 305 140 295 150" stroke="#A65338" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M305 105 C320 120 320 145 305 160" stroke="#C4775C" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
            </g>
          )}

          {signType === 'chin-forward' && (
            <g>
              <path
                d={`M260 250 Q${250 + motionPhase * 20} 210 ${200 + motionPhase * 40} ${165 + motionPhase * 30}`}
                stroke="url(#skinGrad)"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse
                cx={200 + motionPhase * 40}
                cy={165 + motionPhase * 30}
                rx="14"
                ry="18"
                fill="url(#skinGrad)"
              />
              <path d="M210 185 L260 210" stroke="#777A45" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {signType === 'help-lift' && (
            <g transform={`translate(0, ${bounceY * 0.7})`}>
              <path d="M135 270 L195 260" stroke="url(#skinGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <rect x="175" y="250" width="45" height="14" rx="7" fill="url(#skinGrad)" />
              <path d="M265 270 L210 240" stroke="url(#skinGrad)" strokeWidth="18" strokeLinecap="round" fill="none" />
              <circle cx="205" cy="235" r="14" fill="url(#skinGrad)" />
              <rect x="200" y="205" width="10" height="22" rx="5" fill="url(#skinGrad)" />
              <path d="M205 195 L205 165" stroke="#A65338" strokeWidth="3" strokeLinecap="round" />
              <path d="M198 175 L205 165 L212 175" stroke="#A65338" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          )}

          {!['namaste', 'wave', 'chin-forward', 'help-lift'].includes(signType) && (
            <g transform={`translate(0, ${bounceY * 0.5})`}>
              <path
                d={twoHanded ? "M140 250 Q160 230 170 210" : "M140 250 L135 310"}
                stroke="url(#skinGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              {twoHanded && <circle cx="170" cy="205" r="13" fill="url(#skinGrad)" />}
              <path
                d="M260 250 Q235 220 230 195"
                stroke="url(#skinGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="230" cy="190" r="14" fill="url(#skinGrad)" />
              <path d="M245 175 C255 185 255 200 245 210" stroke="#777A45" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          )}
        </svg>

        {/* Floating Sign Guidance Pill in Deep Forest */}
        {currentSign && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              right: '16px',
              backgroundColor: 'rgba(28, 48, 39, 0.92)',
              backdropFilter: 'blur(8px)',
              color: '#FFFDF8',
              borderRadius: 'var(--radius-sm, 8px)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid rgba(168, 180, 154, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="var(--color-sage)" />
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFDF8' }}>
                  {currentSign.word}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-sage)' }}>
                  {currentSign.movement}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--color-terracotta)', fontWeight: 700, textAlign: 'right' }}>
              {currentSign.handshape.split('-')[0] || 'ISL Handshape'}
            </div>
          </div>
        )}
      </div>

      {/* Sequential Word Timeline Bar */}
      {tokens && tokens.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: 'var(--color-beige, #E8DDCA)',
            overflowX: 'auto',
            borderTop: '1px solid var(--color-beige, #E8DDCA)',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Queue ({tokens.length}):
          </span>

          {tokens.map((tok, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStep(idx);
                  if (onIndexChange) onIndexChange(idx);
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  border: isActive ? '1.5px solid var(--color-forest-green)' : '1px solid var(--color-taupe)',
                  backgroundColor: isActive ? 'var(--color-forest-green)' : 'var(--color-soft-ivory)',
                  color: isActive ? '#FFFDF8' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap'
                }}
              >
                {tok.display || tok.gloss}
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          borderTop: '1px solid var(--color-beige, #E8DDCA)',
          backgroundColor: 'var(--color-soft-ivory, #FFFDF8)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            className="btn btn-secondary btn-icon"
            onClick={handleReset}
            title="Reset from beginning"
            style={{ width: '34px', height: '34px' }}
          >
            <RotateCcw size={14} />
          </button>
          <button
            className="btn btn-secondary btn-icon"
            onClick={handlePrev}
            title="Previous sign"
            disabled={!tokens || tokens.length <= 1}
            style={{ width: '34px', height: '34px' }}
          >
            <SkipBack size={14} />
          </button>
          <button
            className="btn btn-primary btn-icon"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause' : 'Play'}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-rust)',
              color: '#FFFDF8',
              boxShadow: 'var(--shadow-rust)'
            }}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: '2px' }} />}
          </button>
          <button
            className="btn btn-secondary btn-icon"
            onClick={handleNext}
            title="Next sign"
            disabled={!tokens || tokens.length <= 1}
            style={{ width: '34px', height: '34px' }}
          >
            <SkipForward size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Speed:</span>
            {[0.5, 0.75, 1, 1.25].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                style={{
                  border: 'none',
                  backgroundColor: speed === s ? 'var(--color-forest-green)' : 'transparent',
                  color: speed === s ? '#FFFDF8' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setLoop(!loop)}
            style={{
              backgroundColor: loop ? 'rgba(38, 63, 50, 0.1)' : 'transparent',
              color: loop ? 'var(--color-forest-green)' : 'var(--text-muted)',
              border: '1px solid var(--color-beige)',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {loop ? '🔁 Loop' : '➡️ Once'}
          </button>
        </div>
      </div>
    </div>
  );
}
