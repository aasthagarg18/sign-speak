import React from 'react';
import {
  Camera, Volume2, Type, Mic, MessageSquare, BookOpen, Award,
  ShieldAlert, Sparkles, Clock, ArrowRight, History, Heart, Play, CheckCircle2
} from 'lucide-react';
import { BotanicalBranch, BotanicalWatermark } from './BotanicalDecorations';
import { ISL_DICTIONARY } from '../data/islDictionary';

export default function Dashboard({
  onNavigateTab,
  onLaunchTranslatorMode,
  history = [],
  speechHook
}) {
  const featureCards = [
    {
      id: 'sign-to-text',
      title: 'Sign-to-Text',
      category: 'Webcam AI',
      desc: 'Capture ISL hand signs via webcam. Computer vision tracks 21 joints in real-time to compose text.',
      icon: Camera,
      tag: 'Live Vision',
      color: 'var(--color-forest-green)',
      accentBg: 'rgba(38, 63, 50, 0.08)'
    },
    {
      id: 'sign-to-speech',
      title: 'Sign-to-Speech',
      category: 'Audio Synthesis',
      desc: 'Seamlessly vocalize recognized ISL signs in Indian English or Hindi for hearing non-signers.',
      icon: Volume2,
      tag: 'Speech Engine',
      color: 'var(--color-rust)',
      accentBg: 'rgba(166, 83, 56, 0.08)'
    },
    {
      id: 'text-to-sign',
      title: 'Text-to-Sign',
      category: 'Kinematics',
      desc: 'Type words or phrases to generate fluid animated ISL avatar demonstrations with finger-spelling.',
      icon: Type,
      tag: 'Animated Avatar',
      color: 'var(--color-terracotta)',
      accentBg: 'rgba(196, 119, 92, 0.08)'
    },
    {
      id: 'speech-to-sign',
      title: 'Speech-to-Sign',
      category: 'Voice-to-ISL',
      desc: 'Speak into your microphone to convert live voice into an immediate ISL demonstration stream.',
      icon: Mic,
      tag: 'Live Microphone',
      color: 'var(--color-olive)',
      accentBg: 'rgba(119, 122, 69, 0.08)'
    }
  ];

  const quickNav = [
    {
      tab: 'twoway',
      title: '2-Way Live Dialogue',
      desc: 'Split-screen conversation for Signer & Hearing Speaker',
      icon: MessageSquare,
      badge: 'Interactive Bridge'
    },
    {
      tab: 'signopedia',
      title: 'ISL Sign-o-Pedia',
      desc: 'Explore 60+ categorized Indian Sign Language signs',
      icon: BookOpen,
      badge: 'Library'
    },
    {
      tab: 'practice',
      title: 'Practice & Quiz Studio',
      desc: 'Test your sign comprehension with interactive quizzes',
      icon: Award,
      badge: 'Studio'
    },
    {
      tab: 'emergency',
      title: 'Emergency Quick-Cards',
      desc: 'High-visibility medical, safety, and transit SOS cards',
      icon: ShieldAlert,
      badge: 'SOS Alert'
    }
  ];

  // Daily Featured ISL Sign
  const featuredSign = ISL_DICTIONARY[0]; // Namaste

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* =====================================================================
          WELCOME BANNER
          ===================================================================== */}
      <div
        className="card"
        style={{
          padding: '36px 40px',
          backgroundColor: 'var(--color-deep-forest)',
          color: 'var(--color-warm-ivory)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <BotanicalWatermark opacity={0.05} />

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: 'var(--radius-pill)', backgroundColor: 'rgba(168, 180, 154, 0.15)', border: '1px solid rgba(168, 180, 154, 0.3)', marginBottom: '16px' }}>
            <BotanicalBranch size={16} color="var(--color-sage)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-sage)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Universal Accessibility Hub
            </span>
          </div>

          <h1 style={{ color: 'var(--color-warm-ivory)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '10px' }}>
            Welcome to SignSpeak
          </h1>

          <p style={{ color: 'var(--color-sage)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Your all-in-one Indian Sign Language communication workbench. Choose a modality below to translate live signs, vocalize text, or practice vocabulary.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => onLaunchTranslatorMode('sign-to-text')}
              style={{
                backgroundColor: 'var(--color-rust)',
                color: '#FFFDF8',
                padding: '12px 22px',
                fontWeight: 700
              }}
            >
              <Camera size={18} /> Launch Camera Vision
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => onNavigateTab('twoway')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--color-warm-ivory)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                padding: '12px 20px'
              }}
            >
              <MessageSquare size={18} /> Open 2-Way Chat Room
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          FOUR CORE COMMUNICATION FEATURE CARDS
          ===================================================================== */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Core Translation Modalities</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Select a specialized translation tool to begin communicating
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="card card-interactive"
                onClick={() => onLaunchTranslatorMode(feat.id)}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  border: '1.5px solid var(--color-beige)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: feat.accentBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: feat.color
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="badge badge-sage">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
                    {feat.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {feat.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--color-beige)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: feat.color
                  }}
                >
                  <span>Open {feat.title}</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          MIDDLE ROW: QUICK ACCESS & REAL STATISTICS
          ===================================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '24px' }}>
        {/* Quick Access Grid */}
        <div className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Frequent Workspaces</h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>4 Modules</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {quickNav.map((q) => {
              const Icon = q.icon;
              return (
                <div
                  key={q.tab}
                  className="card card-interactive"
                  onClick={() => onNavigateTab(q.tab)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Icon size={18} color="var(--color-forest-green)" />
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-forest-green)' }}>
                        {q.title}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {q.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Statistics Card */}
        <div className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 4px' }}>Platform Telemetry</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '0 0 18px' }}>
              Verified client-side capabilities
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-beige)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                  60+
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  Verified ISL Signs
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-beige)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-rust)' }}>
                  21 Joints
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  MediaPipe Keypoints
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-beige)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  Client-Side Privacy
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-beige)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-olive)' }}>
                  AAA
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                  WCAG Compliance
                </div>
              </div>
            </div>
          </div>

          {/* Featured Sign Snippet */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-muted-sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🙏</span>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-deep-forest)', textTransform: 'uppercase' }}>
                  Sign of the Day
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                  {featuredSign.word} (Respectful Greeting)
                </div>
              </div>
            </div>
            <button
              className="btn btn-forest btn-sm"
              onClick={() => onNavigateTab('signopedia')}
            >
              Learn
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM ROW: RECENT SESSIONS ACTIVITY
          ===================================================================== */}
      <div className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Recent Activity & Translations</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Saved communications from your current session
            </p>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateTab('twoway')}
          >
            <History size={14} /> Full History
          </button>
        </div>

        {history && history.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-warm-ivory)',
                  border: '1px solid var(--color-beige)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span className="badge badge-sage" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      {item.type || 'Translation'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    "{item.sourceText}"
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => speechHook.speak(item.sourceText)}
                  title="Vocalize sentence"
                  style={{ padding: '5px 12px' }}
                >
                  <Volume2 size={13} /> Speak
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No recent translations recorded yet. Start by performing a sign in the camera or typing text.
          </div>
        )}
      </div>
    </div>
  );
}
