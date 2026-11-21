import React, { useState, useMemo } from 'react';
import { Volume2, Sparkles, ListFilter, ArrowRight } from 'lucide-react';
import { tokenizeTextToISL } from '../utils/islMatcher';
import { QUICK_PROMPTS } from '../data/islDictionary';
import ISLAvatarPlayer from './ISLAvatarPlayer';
import ISLGlossBadge from './ISLGlossBadge';

export default function TextToSign({ speechHook }) {
  const [inputText, setInputText] = useState('Namaste, thank you for your help!');
  const [activeTokenIdx, setActiveTokenIdx] = useState(0);

  const islTokens = useMemo(() => {
    return tokenizeTextToISL(inputText);
  }, [inputText]);

  const handlePromptClick = (prompt) => {
    setInputText(prompt);
    setActiveTokenIdx(0);
  };

  const handleSpeak = (textToSpeak) => {
    if (speechHook) {
      speechHook.speak(textToSpeak || inputText);
    }
  };

  return (
    <div className="text-to-sign-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1.35fr)', gap: '24px' }}>
      {/* Left Column: Text Input & Gloss Sequence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Input Card */}
        <div className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
                Enter Text to Convert to ISL
              </h3>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Type English or Indian phrases to see ISL sign demonstration
              </span>
            </div>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleSpeak(inputText)}
              title="Vocalize this text"
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Volume2 size={14} /> Listen
            </button>
          </div>

          {/* Textarea */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <textarea
              className="form-control"
              rows={4}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setActiveTokenIdx(0);
              }}
              placeholder="e.g. Namaste, where is the hospital? I need a doctor..."
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                lineHeight: 1.6,
                resize: 'vertical',
                backgroundColor: 'var(--color-warm-ivory)'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>{inputText.length} characters</span>
              <span style={{ fontWeight: 600, color: 'var(--color-forest-green)' }}>{islTokens.length} ISL signs parsed</span>
            </div>
          </div>

          {/* Quick Prompts */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sparkles size={13} color="var(--color-rust)" /> Try Quick Phrases:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className={`btn btn-sm ${inputText === prompt ? 'btn-forest' : 'btn-secondary'}`}
                  style={{
                    fontSize: '0.75rem',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Parsed Sign Tokens Breakdown */}
        <div className="card" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-forest-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ListFilter size={15} /> Grammatical Translation Breakdown
            </span>
            <span className="badge badge-sage">
              {islTokens.length} Tokens
            </span>
          </div>

          {islTokens.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Type text above to generate the Indian Sign Language sequence.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {islTokens.map((token, idx) => {
                const isActive = idx === activeTokenIdx;
                const item = token.item;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTokenIdx(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isActive ? 'var(--color-muted-sage)' : 'var(--color-warm-ivory)',
                      border: isActive ? '1.5px solid var(--color-forest-green)' : '1px solid var(--color-beige)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? 'var(--color-forest-green)' : 'var(--color-beige)',
                          color: isActive ? '#FFFDF8' : 'var(--color-charcoal)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.6875rem',
                          fontWeight: 700
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>
                          {token.display}
                          {token.type === 'letter' && <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: '6px' }}>(Finger-spelling: {token.parentWord})</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item?.movement || 'ISL Gesture'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ISLGlossBadge
                        gloss={item?.gloss || token.gloss}
                        isTwoHanded={item?.twoHanded}
                        size="sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: ISL Avatar Player */}
      <div>
        <ISLAvatarPlayer
          tokens={islTokens}
          currentIndex={activeTokenIdx}
          onIndexChange={(idx) => setActiveTokenIdx(idx)}
          onSpeak={(txt) => handleSpeak(txt)}
          autoPlay={true}
          height={390}
        />
      </div>
    </div>
  );
}
