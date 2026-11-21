import React from 'react';
import { Eye, Type, Contrast, Zap, Bell, Check, RotateCcw } from 'lucide-react';
import { BotanicalBranch } from './BotanicalDecorations';

export default function AccessibilityBar({
  a11ySettings,
  setA11ySettings,
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  const fontSizes = [
    { label: 'Default', value: '100%' },
    { label: 'Medium (+15%)', value: '115%' },
    { label: 'Large (+30%)', value: '130%' }
  ];

  return (
    <div
      className="a11y-modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 48, 39, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="card a11y-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '28px',
          backgroundColor: 'var(--color-soft-ivory)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1.5px solid var(--color-beige)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--color-beige)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(38, 63, 50, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-forest-green)'
              }}
            >
              <Eye size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
                Accessibility Control Center
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                WCAG 2.1 AAA Compliant Adaptations
              </span>
            </div>
          </div>

          <button className="btn btn-secondary btn-icon" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* High Contrast Mode */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>High Contrast Mode (WCAG AAA)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High-visibility borders and enhanced contrast differentiation</div>
            </div>
            <input
              type="checkbox"
              checked={a11ySettings.highContrast}
              onChange={(e) => setA11ySettings(prev => ({ ...prev, highContrast: e.target.checked }))}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest-green)' }}
            />
          </div>

          {/* Dyslexia-Friendly Typography */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Dyslexia-Friendly Typography</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enhanced letter spacing & readable font weight</div>
            </div>
            <input
              type="checkbox"
              checked={a11ySettings.dyslexicFont}
              onChange={(e) => setA11ySettings(prev => ({ ...prev, dyslexicFont: e.target.checked }))}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest-green)' }}
            />
          </div>

          {/* Visual Alert Flash (Deaf-friendly) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Deaf Visual Notification Flash</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Flashes warm perimeter glow on sign or speech arrival</div>
            </div>
            <input
              type="checkbox"
              checked={a11ySettings.visualAlertFlash}
              onChange={(e) => setA11ySettings(prev => ({ ...prev, visualAlertFlash: e.target.checked }))}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest-green)' }}
            />
          </div>

          {/* Reduced Motion */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Reduced Motion Mode</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Minimizes rapid screen animations and bouncing avatars</div>
            </div>
            <input
              type="checkbox"
              checked={a11ySettings.reducedMotion}
              onChange={(e) => setA11ySettings(prev => ({ ...prev, reducedMotion: e.target.checked }))}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest-green)' }}
            />
          </div>

          {/* Font Scaling Buttons */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
              Interface Font Scaling:
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {fontSizes.map((fs) => (
                <button
                  key={fs.value}
                  className={`btn btn-sm ${a11ySettings.fontSize === fs.value ? 'btn-forest' : 'btn-secondary'}`}
                  onClick={() => setA11ySettings(prev => ({ ...prev, fontSize: fs.value }))}
                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8125rem' }}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--color-beige)', display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setA11ySettings({
              highContrast: false,
              dyslexicFont: false,
              fontSize: '100%',
              visualAlertFlash: true,
              reducedMotion: false
            })}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <RotateCcw size={13} /> Reset Defaults
          </button>

          <button className="btn btn-forest btn-sm" onClick={onClose}>
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}
