import React, { useState, useMemo } from 'react';
import { Search, Volume2, BookOpen, Eye, X, Sparkles, Video } from 'lucide-react';
import { ISL_DICTIONARY, ISL_CATEGORIES } from '../data/islDictionary';
import ISLAvatarPlayer from './ISLAvatarPlayer';
import { tokenizeTextToISL } from '../utils/islMatcher';
import { BotanicalBranch } from './BotanicalDecorations';

export default function Signopedia({ speechHook, onPracticeSign = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedSign, setSelectedSign] = useState(ISL_DICTIONARY[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredSigns = useMemo(() => {
    return ISL_DICTIONARY.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (difficultyFilter !== 'all' && item.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesGloss = item.gloss.toLowerCase().includes(q);
        const matchesMeaning = item.englishMeaning.toLowerCase().includes(q);
        const matchesTags = item.tags && item.tags.some(t => t.toLowerCase().includes(q));
        return matchesWord || matchesGloss || matchesMeaning || matchesTags;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, difficultyFilter]);

  const handleOpenSign = (sign) => {
    setSelectedSign(sign);
    setModalOpen(true);
  };

  const previewTokens = selectedSign ? tokenizeTextToISL(selectedSign.word) : [];

  return (
    <div className="signopedia-container" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Search Header Bar */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-beige)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <BotanicalBranch size={20} color="var(--color-forest-green)" />
              <h2 style={{ margin: 0, fontSize: '1.55rem', color: 'var(--color-forest-green)' }}>
                ISL Sign Dictionary
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Search Indian Sign Language vocabulary with animated demonstrations and handshape guides
            </p>
          </div>

          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-beige)',
              color: 'var(--color-forest-green)',
              border: '1px solid var(--color-taupe)'
            }}
          >
            {filteredSigns.length} Signs Available
          </span>
        </div>

        {/* Search Input & Difficulty Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              color="var(--color-taupe)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sign by name, meaning, or topic (e.g., Namaste, Hospital, Water, A)..."
              style={{
                width: '100%',
                paddingLeft: '44px',
                paddingRight: searchQuery ? '40px' : '16px',
                fontSize: '0.925rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-warm-ivory)',
                height: '46px'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-taupe)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0
                }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            className="form-control"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{
              fontSize: '0.8125rem',
              padding: '0 16px',
              height: '46px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-warm-ivory)',
              fontWeight: 600,
              color: 'var(--color-forest-green)',
              minWidth: '150px'
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </div>

        {/* Category Filter Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            marginTop: '16px',
            paddingBottom: '4px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {ISL_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`btn btn-sm ${isActive ? 'btn-forest' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  fontSize: '0.8125rem',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 700 : 500,
                  flexShrink: 0
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Signs Cards Grid */}
      {filteredSigns.length === 0 ? (
        <div
          className="card"
          style={{
            padding: '48px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-beige)'
          }}
        >
          <BookOpen size={40} color="var(--color-taupe)" style={{ opacity: 0.6, marginBottom: '12px' }} />
          <h3 style={{ color: 'var(--color-forest-green)', marginBottom: '6px' }}>No matching signs found</h3>
          <p style={{ fontSize: '0.875rem', margin: '0 0 16px' }}>
            Try searching for another word or reset your filters to browse the complete library.
          </p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setDifficultyFilter('all'); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className="signs-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '18px'
          }}
        >
          {filteredSigns.map(sign => (
            <div
              key={sign.id}
              className="card card-interactive"
              onClick={() => handleOpenSign(sign)}
              style={{
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-beige)',
                backgroundColor: 'var(--color-soft-ivory)'
              }}
            >
              <div>
                {/* Top Row: Word & Listen Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.3rem',
                        color: 'var(--color-forest-green)',
                        fontFamily: 'var(--font-serif)'
                      }}
                    >
                      {sign.word}
                    </h3>
                    <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-taupe)', marginTop: '2px' }}>
                      [{sign.gloss}] {sign.twoHanded ? '• 2-Handed' : ''}
                    </div>
                  </div>

                  <button
                    className="btn btn-secondary btn-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      speechHook.speak(sign.word);
                    }}
                    title="Pronounce word"
                    style={{ width: '32px', height: '32px', flexShrink: 0 }}
                    aria-label={`Pronounce ${sign.word}`}
                  >
                    <Volume2 size={14} color="var(--color-forest-green)" />
                  </button>
                </div>

                {/* Meaning */}
                <p style={{ margin: '8px 0 0', fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {sign.englishMeaning}
                </p>
              </div>

              {/* Bottom Tray: Movement Trajectory & View Action */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--color-beige)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-taupe)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '170px'
                  }}
                  title={sign.movement}
                >
                  {sign.movement}
                </span>

                <button
                  className="btn btn-forest btn-sm"
                  style={{ fontSize: '0.75rem', padding: '5px 12px', borderRadius: 'var(--radius-pill)', flexShrink: 0 }}
                >
                  <Eye size={13} style={{ marginRight: '4px' }} /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Full Sign Demonstration & Guide */}
      {modalOpen && selectedSign && (
        <div
          className="modal-backdrop"
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(28, 48, 39, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            className="modal-content card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              backgroundColor: 'var(--color-soft-ivory)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--color-beige)'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid var(--color-beige)',
                paddingBottom: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '1.75rem',
                      color: 'var(--color-forest-green)',
                      fontFamily: 'var(--font-serif)'
                    }}
                  >
                    {selectedSign.word}
                  </h2>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--color-beige)',
                      color: 'var(--color-forest-green)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    [{selectedSign.gloss}]
                  </span>
                  {selectedSign.twoHanded && (
                    <span className="badge badge-sage" style={{ fontSize: '0.6875rem' }}>
                      Two-Handed
                    </span>
                  )}
                  <span className="badge badge-beige" style={{ fontSize: '0.6875rem' }}>
                    {selectedSign.difficulty}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {selectedSign.englishMeaning}
                </div>
              </div>

              <button
                className="btn btn-secondary btn-icon"
                onClick={() => setModalOpen(false)}
                style={{ width: '34px', height: '34px' }}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body: Demonstration + Step Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', gap: '22px' }} className="workbench-grid">
              {/* Left: Animated Demonstration Player */}
              <div>
                <ISLAvatarPlayer
                  tokens={previewTokens}
                  currentIndex={0}
                  onSpeak={(txt) => speechHook.speak(txt)}
                  autoPlay={true}
                  height={340}
                />
              </div>

              {/* Right: Technical Sign Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    border: '1px solid var(--color-beige)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Handshape
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    {selectedSign.handshape}
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    border: '1px solid var(--color-beige)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Movement & Trajectory
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                    {selectedSign.movement}
                  </div>
                </div>

                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    border: '1px solid var(--color-beige)'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Facial Expression (Non-Manual Marker)
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)' }}>
                    {selectedSign.facialExpression}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setModalOpen(false);
                      if (onPracticeSign) onPracticeSign(selectedSign);
                    }}
                    style={{ flex: 1, backgroundColor: 'var(--color-rust)', color: '#FFFDF8', fontWeight: 700 }}
                  >
                    <Video size={16} /> Practice with Camera
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => speechHook.speak(selectedSign.word)}
                    style={{ padding: '0 16px' }}
                    title="Listen pronunciation"
                    aria-label="Listen pronunciation"
                  >
                    <Volume2 size={16} color="var(--color-forest-green)" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
