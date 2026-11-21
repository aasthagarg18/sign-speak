import React, { useState } from 'react';
import { History, Trash2, Download, Copy, Check, Clock, Volume2 } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, history = [], onClearHistory, speechHook }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const text = history.map(h => `[${h.timestamp}] [${h.type.toUpperCase()}] ${h.sourceText} (ISL: ${h.glossText || ''})`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SignSpeak-History-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="history-drawer-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 48, 39, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div
        className="history-drawer-panel card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          borderRadius: 0,
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          backgroundColor: 'var(--color-soft-ivory)',
          borderLeft: '1.5px solid var(--color-beige)'
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--color-beige)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={20} color="var(--color-forest-green)" />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
              Activity History
            </h3>
          </div>

          <button className="btn btn-secondary btn-icon" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            ✕
          </button>
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {history.length} saved session records
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            {history.length > 0 && (
              <>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleExport}
                  title="Export history as text"
                  style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                >
                  <Download size={13} style={{ marginRight: '4px' }} /> Export
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={onClearHistory}
                  title="Clear all history"
                  style={{ fontSize: '0.75rem', padding: '5px 10px', color: 'var(--color-rust)' }}
                >
                  <Trash2 size={13} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* History List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Clock size={36} color="var(--color-taupe)" style={{ opacity: 0.6, marginBottom: '10px' }} />
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                No history saved yet
              </div>
              <div style={{ fontSize: '0.8125rem', marginTop: '4px' }}>
                Your saved sign recognitions and translation outputs will appear here.
              </div>
            </div>
          ) : (
            history.map((item, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '14px 16px',
                  backgroundColor: 'var(--color-warm-ivory)',
                  border: '1px solid var(--color-beige)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-sage" style={{ fontSize: '0.6875rem', textTransform: 'uppercase' }}>
                    {item.type || 'Translation'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  "{item.sourceText}"
                </div>

                {item.glossText && (
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-forest-green)' }}>
                    ISL: [{item.glossText}]
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '4px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => speechHook.speak(item.sourceText)}
                    title="Vocalize"
                    style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                  >
                    <Volume2 size={13} />
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCopy(idx, item.sourceText)}
                    title="Copy"
                    style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                  >
                    {copiedId === idx ? <Check size={13} color="var(--color-forest-green)" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
