import React, { useState, useMemo } from 'react';
import { Search, Volume2, Sparkles, BookOpen, Eye } from 'lucide-react';
import { ISL_DICTIONARY, ISL_CATEGORIES } from '../data/islDictionary';
import ISLGlossBadge from './ISLGlossBadge';
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
    <div className="signopedia-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header & Search Bar */}
      <div className="card" style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BotanicalBranch size={22} color="var(--color-forest-green)" />
              <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--color-forest-green)' }}>
                ISL Sign-o-Pedia Dictionary
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Curated Indian Sign Language encyclopedia with handshape classifications, movements, and cultural nuances
            </p>
          </div>

          <span className="badge badge-forest" style={{ fontSize: '0.8125rem', padding: '6px 14px' }}>
            🌿 {filteredSigns.length} Verified Signs
          </span>
        </div>

        {/* Search & Filter Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) auto', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              color="var(--color-taupe)"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search signs by English word, Hindi tag, or gesture (e.g. Namaste, Doctor, Hospital, Water, A, 5)..."
              style={{ width: '100%', paddingLeft: '42px', fontSize: '0.9rem', borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-warm-ivory)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              className="form-control"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{ fontSize: '0.8125rem', padding: '8px 14px', borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-warm-ivory)' }}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '16px', paddingBottom: '4px' }}>
          {ISL_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`btn btn-sm ${isActive ? 'btn-forest' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  fontSize: '0.8125rem',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-pill)',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 700 : 500
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Signs Grid */}
      {filteredSigns.length === 0 ? (
        <div className="card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', borderRadius: 'var(--radius-lg)' }}>
          <BookOpen size={44} color="var(--color-taupe)" style={{ opacity: 0.6, marginBottom: '12px' }} />
          <h3 style={{ color: 'var(--color-forest-green)' }}>No signs found</h3>
          <p style={{ fontSize: '0.875rem' }}>Try searching with a different term or resetting category filters.</p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            style={{ marginTop: '10px' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className="signs-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '20px'
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
                border: '1.5px solid var(--color-beige)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <ISLGlossBadge
                    gloss={sign.gloss}
                    isTwoHanded={sign.twoHanded}
                    difficulty={sign.difficulty}
                    size="sm"
                  />
                  <button
                    className="btn btn-secondary btn-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      speechHook.speak(sign.word);
                    }}
                    title="Pronounce word"
                    style={{ width: '30px', height: '30px', padding: 0 }}
                  >
                    <Volume2 size={13} />
                  </button>
                </div>

                <h3 style={{ margin: '6px 0 3px', fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
                  {sign.word}
                </h3>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {sign.englishMeaning}
                </p>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--color-beige)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '190px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {sign.movement}
                </span>

                <button
                  className="btn btn-forest btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  <Eye size={12} style={{ marginRight: '4px' }} /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Detail Drawer for Selected Sign */}
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
              maxWidth: '840px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              backgroundColor: 'var(--color-soft-ivory)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--color-beige)', paddingBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '1.65rem', color: 'var(--color-forest-green)' }}>
                    {selectedSign.word}
                  </h2>
                  <ISLGlossBadge
                    gloss={selectedSign.gloss}
                    isTwoHanded={selectedSign.twoHanded}
                    difficulty={selectedSign.difficulty}
                  />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{selectedSign.englishMeaning}</span>
              </div>

              <button
                className="btn btn-secondary btn-icon"
                onClick={() => setModalOpen(false)}
                style={{ width: '32px', height: '32px' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Demonstration + Anatomy Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
              <div>
                <ISLAvatarPlayer
                  tokens={previewTokens}
                  currentIndex={0}
                  onSpeak={(txt) => speechHook.speak(txt)}
                  autoPlay={true}
                  height={340}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--color-beige)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Handshape Formulation
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>{selectedSign.handshape}</div>
                </div>

                <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--color-beige)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Movement & Trajectory
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>{selectedSign.movement}</div>
                </div>

                <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-warm-ivory)', border: '1px solid var(--color-beige)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Facial Expression (Non-Manual Marker)
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)' }}>{selectedSign.facialExpression}</div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setModalOpen(false);
                      if (onPracticeSign) onPracticeSign(selectedSign);
                    }}
                    style={{ flex: 1, backgroundColor: 'var(--color-rust)', color: '#FFFDF8', fontWeight: 700 }}
                  >
                    <Sparkles size={16} /> Practice in Webcam Mirror
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => speechHook.speak(selectedSign.word)}
                    style={{ padding: '0 16px' }}
                  >
                    <Volume2 size={16} />
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
