import React from 'react';

/**
 * Botanical Leaf Sprig Motif (Line art SVG)
 */
export function BotanicalBranch({ className = '', style = {}, color = '#263F32', size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      <path
        d="M12 52C22 45 34 32 46 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaves branching off */}
      <path
        d="M26 41C25 35 28 30 33 29C35 34 33 39 26 41Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M20 45C16 41 16 35 20 31C23 35 23 41 20 45Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M36 30C36 24 40 19 45 19C46 25 43 29 36 30Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M45 14C43 8 47 4 52 5C53 10 50 14 45 14Z"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * Hand with Sprouting Leaf (Brand Crest)
 */
export function BrandLeafHand({ size = 38, className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '12px',
        backgroundColor: 'var(--color-forest-green, #263F32)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFDF8',
        boxShadow: '0 4px 14px rgba(38, 63, 50, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg
        width={size * 0.65}
        height={size * 0.65}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
      {/* Tiny terracotta sprout */}
      <span
        style={{
          position: 'absolute',
          top: '2px',
          right: '3px',
          fontSize: '11px'
        }}
      >
        🌿
      </span>
    </div>
  );
}

/**
 * Subtle Botanical Leaf Pattern Watermark
 */
export function BotanicalWatermark({ opacity = 0.04, style = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: `radial-gradient(#263F32 1px, transparent 1px), radial-gradient(#777A45 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
        backgroundPosition: '0 0, 18px 18px',
        ...style
      }}
      aria-hidden="true"
    />
  );
}
