import React from 'react';

export default function ISLGlossBadge({ gloss, isTwoHanded, category, difficulty, size = 'md' }) {
  const sizeStyles = {
    sm: { fontSize: '0.6875rem', padding: '2px 6px' },
    md: { fontSize: '0.75rem', padding: '3px 8px' },
    lg: { fontSize: '0.875rem', padding: '5px 12px' }
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div className="isl-gloss-badge-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      {/* Main Gloss Tag */}
      <span
        className="isl-gloss-tag"
        title={`ISL Gloss: ${gloss}`}
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          backgroundColor: 'var(--color-beige, #E8DDCA)',
          color: 'var(--color-forest-green, #263F32)',
          border: '1px solid var(--color-taupe, #A89986)',
          borderRadius: 'var(--radius-xs, 6px)',
          textTransform: 'uppercase',
          ...selectedSize
        }}
      >
        [{gloss}]
      </span>

      {/* Two-Handed Indicator */}
      {isTwoHanded && (
        <span
          className="isl-two-handed-pill"
          title="Two-handed ISL sign"
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '2px 7px',
            borderRadius: 'var(--radius-pill, 9999px)',
            backgroundColor: 'rgba(196, 119, 92, 0.15)',
            color: 'var(--color-rust, #A65338)',
            border: '1px solid rgba(166, 83, 56, 0.3)'
          }}
        >
          👐 2-Handed
        </span>
      )}

      {/* Difficulty Level */}
      {difficulty && (
        <span
          className="isl-difficulty-pill"
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '2px 7px',
            borderRadius: 'var(--radius-pill, 9999px)',
            backgroundColor: difficulty === 'Beginner' ? 'var(--color-muted-sage, #DCE4D5)' : 'rgba(119, 122, 69, 0.15)',
            color: difficulty === 'Beginner' ? 'var(--color-forest-green, #263F32)' : 'var(--color-olive, #777A45)',
            border: `1px solid ${difficulty === 'Beginner' ? 'var(--color-sage, #A8B49A)' : 'rgba(119, 122, 69, 0.3)'}`
          }}
        >
          {difficulty}
        </span>
      )}
    </div>
  );
}
