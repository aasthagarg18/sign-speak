import React from 'react';

/**
 * High-quality authentic SVG illustrations of Indian Sign Language communication,
 * deaf and hearing human connection, and inclusive education.
 * Designed with the Vintage Botanical palette: Forest Green, Warm Ivory, Terracotta, Sage, Rust.
 */

// 1. Two People in Natural Bilingual Communication (Deaf Signer & Hearing Partner)
export function BilingualDialogueIllustration({ width = '100%', height = '100%', className = '' }) {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width, height, maxWidth: '100%', maxHeight: '100%' }}
      aria-label="Illustration of a Deaf woman signing and a hearing companion communicating warmly"
    >
      <defs>
        <linearGradient id="warmBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="100%" stopColor="#F8F5ED" />
        </linearGradient>
        <linearGradient id="skinTone1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D0B5" />
          <stop offset="100%" stopColor="#DF9F7A" />
        </linearGradient>
        <linearGradient id="skinTone2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EBC3A4" />
          <stop offset="100%" stopColor="#C98963" />
        </linearGradient>
      </defs>

      {/* Background Soft Window Arch */}
      <rect x="20" y="15" width="480" height="310" rx="24" fill="url(#warmBgGrad)" stroke="#E8DDCA" strokeWidth="2" />
      <path d="M260 25 L260 315" stroke="#E8DDCA" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Decorative Botanical Leaf Sprig in Corner */}
      <path d="M40 50 C50 40 65 42 75 55 C65 60 50 62 40 50 Z" fill="#A8B49A" fillOpacity="0.4" />
      <path d="M50 45 C60 35 75 37 85 50" stroke="#263F32" strokeWidth="1.5" strokeLinecap="round" />

      {/* ================= PERSON 1 (LEFT: DEAF SIGNER) ================= */}
      <g id="person-signer">
        {/* Torso & Kurti (Forest Green) */}
        <path d="M90 280 C90 230 115 210 160 210 C205 210 230 230 230 280 L240 325 L80 325 Z" fill="#263F32" />
        {/* Terracotta neckline */}
        <path d="M152 210 C152 225 168 225 168 210 Z" fill="#C4775C" />
        {/* Neck */}
        <rect x="150" y="175" width="20" height="36" rx="4" fill="url(#skinTone1)" />
        {/* Head */}
        <ellipse cx="160" cy="140" rx="36" ry="42" fill="url(#skinTone1)" />
        {/* Hair - Elegant Bun */}
        <path d="M124 140 C120 100 138 78 160 78 C182 78 200 100 196 140 C190 120 178 102 160 102 C142 102 130 120 124 140 Z" fill="#343831" />
        <circle cx="160" cy="74" r="16" fill="#343831" />
        {/* Expressive Warm Face (Eyes, Eyebrows, Smile) */}
        <path d="M142 122 Q148 118 154 121" stroke="#343831" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M166 121 Q172 118 178 122" stroke="#343831" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="148" cy="132" rx="4" ry="4.5" fill="#1C3027" />
        <ellipse cx="172" cy="132" rx="4" ry="4.5" fill="#1C3027" />
        <circle cx="149" cy="131" r="1.2" fill="#FFFDF8" />
        <circle cx="173" cy="131" r="1.2" fill="#FFFDF8" />
        {/* Bindi dot */}
        <circle cx="160" cy="122" r="2.2" fill="#A65338" />
        {/* Warm Open Smile */}
        <path d="M150 155 Q160 166 170 155" stroke="#A65338" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* ACTIVE SIGNING HANDS: Demonstrating "Namaste / Welcome" Gesture */}
        {/* Left Forearm */}
        <path d="M110 240 Q130 245 152 215" stroke="url(#skinTone1)" strokeWidth="15" strokeLinecap="round" fill="none" />
        {/* Right Forearm */}
        <path d="M210 240 Q190 245 168 215" stroke="url(#skinTone1)" strokeWidth="15" strokeLinecap="round" fill="none" />
        {/* Pressed Palms meeting with energy radiating */}
        <ellipse cx="157" cy="200" rx="7" ry="18" fill="url(#skinTone1)" transform="rotate(-8 157 200)" />
        <ellipse cx="163" cy="200" rx="7" ry="18" fill="url(#skinTone1)" transform="rotate(8 163 200)" />
        {/* Gesture Motion Marks (Rust) */}
        <path d="M140 185 C146 175 174 175 180 185" stroke="#A65338" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
      </g>

      {/* Speech / Sign Connection Bridge Motif */}
      <g id="connection-flow">
        {/* Flowing Ribbon between both communicators */}
        <path d="M185 160 C230 140 290 190 335 165" stroke="#C4775C" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" />
        {/* Central Heart/Leaf Connection Tag */}
        <circle cx="260" cy="165" r="16" fill="#FFFDF8" stroke="#A8B49A" strokeWidth="1.5" />
        <text x="260" y="170" textAnchor="middle" fontSize="13">🤟</text>
      </g>

      {/* ================= PERSON 2 (RIGHT: HEARING PARTNER) ================= */}
      <g id="person-listener">
        {/* Torso (Terracotta & Beige collar) */}
        <path d="M330 280 C330 230 355 210 400 210 C445 210 470 230 470 280 L480 325 L320 325 Z" fill="#C4775C" />
        <path d="M392 210 C392 225 408 225 408 210 Z" fill="#E8DDCA" />
        {/* Neck */}
        <rect x="390" y="175" width="20" height="36" rx="4" fill="url(#skinTone2)" />
        {/* Head */}
        <ellipse cx="400" cy="140" rx="36" ry="42" fill="url(#skinTone2)" />
        {/* Hair - Short Trimmed */}
        <path d="M362 135 C360 95 380 80 400 80 C420 80 440 95 438 135 C434 115 425 105 400 105 C375 105 366 115 362 135 Z" fill="#263F32" />
        {/* Attentive, Smiling Face */}
        <path d="M382 122 Q388 118 394 121" stroke="#343831" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M406 121 Q412 118 418 122" stroke="#343831" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <ellipse cx="388" cy="132" rx="4" ry="4.5" fill="#1C3027" />
        <ellipse cx="412" cy="132" rx="4" ry="4.5" fill="#1C3027" />
        <circle cx="389" cy="131" r="1.2" fill="#FFFDF8" />
        <circle cx="413" cy="131" r="1.2" fill="#FFFDF8" />
        {/* Understanding, Attentive Smile */}
        <path d="M390 155 Q400 165 410 155" stroke="#A65338" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Hand in friendly greeting wave / acknowledgment */}
        <path d="M350 240 Q330 220 335 190" stroke="url(#skinTone2)" strokeWidth="15" strokeLinecap="round" fill="none" />
        <ellipse cx="335" cy="180" rx="9" ry="14" fill="url(#skinTone2)" />
        <circle cx="335" cy="168" r="4" fill="url(#skinTone2)" />
      </g>

      {/* Floating ISL Badge Tag below */}
      <rect x="180" y="275" width="160" height="34" rx="17" fill="#1C3027" />
      <text x="260" y="296" textAnchor="middle" fill="#FFFDF8" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.04em">
        INDIAN SIGN LANGUAGE
      </text>
    </svg>
  );
}

// 2. Authentic ISL Hands Diagram Showing 4 Real Core Signs
export function AuthenticISLHandsShowcase({ className = '' }) {
  const signs = [
    { name: 'Namaste', gloss: 'NAMASTE', icon: '🙏', tip: 'Palms pressed at heart', color: '#263F32' },
    { name: 'Thank You', gloss: 'THANK-YOU', icon: '✋', tip: 'Hand chin to forward', color: '#A65338' },
    { name: 'Yes / Agree', gloss: 'YES', icon: '👍', tip: 'Nodding thumbs-up', color: '#777A45' },
    { name: 'Love / Care', gloss: 'LOVE', icon: '🤟', tip: 'Thumb, index & pinky', color: '#C4775C' }
  ];

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px',
        width: '100%'
      }}
    >
      {signs.map((s, idx) => (
        <div
          key={idx}
          style={{
            padding: '14px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-soft-ivory)',
            border: '1.5px solid var(--color-beige)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-warm-ivory)',
              border: `1.5px solid ${s.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              marginBottom: '8px'
            }}
          >
            {s.icon}
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-forest-green)' }}>
            {s.name}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {s.tip}
          </div>
        </div>
      ))}
    </div>
  );
}
