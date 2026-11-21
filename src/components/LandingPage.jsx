import React from 'react';
import {
  Camera, Volume2, Type, Mic, ArrowRight, Sparkles, CheckCircle2,
  ShieldCheck, Heart, BookOpen, Users, MessageSquare, Award, Play
} from 'lucide-react';
import { BotanicalBranch, BotanicalWatermark } from './BotanicalDecorations';

export default function LandingPage({ onStartCommunicating, onSelectFeature, onOpenDictionary }) {
  const features = [
    {
      id: 'sign-to-text',
      title: 'Sign-to-Text',
      category: 'Computer Vision',
      desc: 'Real-time 21-point hand tracking through your webcam transforms Indian Sign Language into clear, written text.',
      icon: Camera,
      badge: 'Webcam AI',
      color: 'var(--color-forest-green)',
      sample: 'Namaste, thank you'
    },
    {
      id: 'sign-to-speech',
      title: 'Sign-to-Speech',
      category: 'Vocal Synthesis',
      desc: 'Converts recognized ISL signs into natural spoken words in Indian English or Hindi for seamless audio communication.',
      icon: Volume2,
      badge: 'SpeechSynthesis',
      color: 'var(--color-rust)',
      sample: 'Vocalizes phrases instantly'
    },
    {
      id: 'text-to-sign',
      title: 'Text-to-Sign',
      category: 'Kinematic Demonstration',
      desc: 'Type any message to generate step-by-step ISL animated avatar demonstrations, with finger-spelling fallback for names.',
      icon: Type,
      badge: 'Visual Grammar',
      color: 'var(--color-terracotta)',
      sample: 'Animated Avatar Demonstrations'
    },
    {
      id: 'speech-to-sign',
      title: 'Speech-to-Sign',
      category: 'Live Voice Translation',
      desc: 'Transcribes spoken words using browser voice recognition and maps the sentence directly into corresponding ISL gestures.',
      icon: Mic,
      badge: 'Web Speech API',
      color: 'var(--color-olive)',
      sample: 'Live Hearing-to-Deaf Bridge'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Choose Your Modality',
      desc: 'Sign through your camera, speak with your voice, or type a message. SignSpeak handles bidirectional translation effortlessly.'
    },
    {
      num: '02',
      title: 'Kinematic ISL Processing',
      desc: 'Our browser-based engine evaluates joint angles, palm orientations, and movement patterns against authentic Indian Sign Language rules.'
    },
    {
      num: '03',
      title: 'Meaningful Connection',
      desc: 'Engage in natural, dignified conversations in clinics, classrooms, bank counters, or with family and friends.'
    }
  ];

  const socialImpacts = [
    {
      stat: '18 Million+',
      label: 'Deaf & Hard-of-Hearing Indians',
      sub: 'Providing an independent voice in public and private spaces'
    },
    {
      stat: 'WCAG AAA',
      label: 'Accessibility Compliance',
      sub: 'High contrast, dyslexia typography, deaf visual beacons'
    },
    {
      stat: '100% Client-Side',
      label: 'Privacy First',
      sub: 'Camera frames never leave your device without consent'
    },
    {
      stat: '60+ ISL Signs',
      label: 'Growing Dictionary',
      sub: 'Greetings, healthcare, emergency, education & alphabet'
    }
  ];

  return (
    <div className="landing-page-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Natural Watermark Background */}
      <BotanicalWatermark opacity={0.03} />

      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section style={{ padding: '60px 0 80px', position: 'relative' }}>
        <div className="container">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              {/* Botanical Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-beige)',
                  border: '1px solid var(--color-taupe)',
                  marginBottom: '20px'
                }}
              >
                <BotanicalBranch size={20} color="var(--color-forest-green)" />
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-forest-green)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Indian Sign Language (ISL) AI Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 style={{ marginBottom: '22px', color: 'var(--color-forest-green)' }}>
                Every Sign Deserves to Be Understood.
              </h1>

              {/* Supporting Text */}
              <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '32px', maxWidth: '580px' }}>
                SignSpeak bridges the communication gap between sign language users and the hearing world.
                Translate live webcam signs into spoken voice, or convert spoken voice into beautiful ISL demonstrations — naturally, privately, and with dignity.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={onStartCommunicating}
                  style={{
                    backgroundColor: 'var(--color-rust)',
                    color: '#FFFDF8',
                    padding: '14px 28px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    boxShadow: 'var(--shadow-rust)'
                  }}
                >
                  <span>Start Communicating</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => {
                    const el = document.getElementById('features-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    padding: '14px 26px',
                    fontSize: '1rem'
                  }}
                >
                  <span>Explore Features</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--color-beige)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>Real-time Camera Vision</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>SpeechSynthesis Audio</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>WCAG 2.1 AAA Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition: Floating Botanical Cards */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Main Card (Signer Window) */}
              <div
                className="card animate-float"
                style={{
                  width: '100%',
                  maxWidth: '440px',
                  padding: '24px',
                  backgroundColor: 'var(--color-soft-ivory)',
                  border: '1.5px solid var(--color-beige)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {/* Header of Preview */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-forest-green)' }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Live ISL Recognition
                    </span>
                  </div>
                  <span className="badge badge-sage" style={{ fontSize: '0.75rem' }}>
                    Active 21 Landmarks
                  </span>
                </div>

                {/* Visual Graphic: Stylized Hands & Skeleton Frame */}
                <div
                  style={{
                    height: '240px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-beige)',
                    border: '1px solid var(--color-taupe)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <BotanicalWatermark opacity={0.06} />

                  {/* Stylized Namaste Silhouette in Forest Green */}
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(38, 63, 50, 0.12)',
                      border: '2px solid var(--color-forest-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '38px',
                      marginBottom: '12px',
                      boxShadow: '0 4px 16px rgba(38, 63, 50, 0.15)'
                    }}
                  >
                    🙏
                  </div>

                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
                    "Namaste"
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Recognized with 98.4% Confidence
                  </div>

                  {/* Audio Wave Bar Indicator */}
                  <div style={{ display: 'flex', gap: '3px', marginTop: '12px', alignItems: 'center', height: '18px' }}>
                    <span style={{ width: '3px', height: '10px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
                    <span style={{ width: '3px', height: '18px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
                    <span style={{ width: '3px', height: '14px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
                    <span style={{ width: '3px', height: '8px', backgroundColor: 'var(--color-rust)', borderRadius: '2px' }} />
                  </div>
                </div>

                {/* Bottom Translated Sentence Bar */}
                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    border: '1px solid var(--color-beige)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-taupe)', textTransform: 'uppercase' }}>
                      Translated Speech
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      "Namaste, glad to meet you!"
                    </div>
                  </div>
                  <button
                    className="btn btn-rust btn-sm"
                    onClick={onStartCommunicating}
                    style={{ padding: '6px 12px' }}
                  >
                    <Volume2 size={14} /> Listen
                  </button>
                </div>
              </div>

              {/* Floating Leaf Accent 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-25px',
                  right: '-15px',
                  backgroundColor: 'var(--color-muted-sage)',
                  border: '1.5px solid var(--color-sage)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '8px 16px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--color-deep-forest)',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                🌿 60+ ISL Vocabulary
              </div>

              {/* Floating Leaf Accent 2 */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-15px',
                  backgroundColor: 'var(--color-deep-forest)',
                  color: 'var(--color-warm-ivory)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 18px',
                  fontSize: '0.8125rem',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span>MediaPipe Hands Vision Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION: FOUR CORE COMMUNICATION FEATURES
          ===================================================================== */}
      <section
        id="features-section"
        style={{
          padding: '80px 0',
          backgroundColor: 'var(--color-soft-ivory)',
          borderTop: '1px solid var(--color-beige)',
          borderBottom: '1px solid var(--color-beige)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-rust)',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Comprehensive Modality Suite
            </span>
            <h2 style={{ marginBottom: '14px' }}>Four Ways to Bridge the Gap</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Whether you are a deaf signer, a teacher, a doctor, or a family member, SignSpeak provides intuitive tools for natural two-way exchanges.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="card card-interactive"
                  onClick={() => onSelectFeature(feat.id)}
                  style={{
                    padding: '28px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          backgroundColor: 'var(--color-beige)',
                          border: '1.5px solid var(--color-taupe)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: feat.color
                        }}
                      >
                        <Icon size={24} />
                      </div>

                      <span className="badge badge-sage">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>
                      {feat.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                      {feat.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-beige)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-forest-green)'
                    }}
                  >
                    <span>Launch Tool</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION: HOW IT WORKS (3 SIMPLE STEPS)
          ===================================================================== */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 50px' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-forest-green)',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Frictionless Architecture
            </span>
            <h2 style={{ marginBottom: '14px' }}>How SignSpeak Operates</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Built for instant accessibility directly in the browser — without requiring clunky external hardware or cloud latency.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px'
            }}
          >
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '32px 24px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-beige)',
                  backgroundColor: 'var(--color-soft-ivory)',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: 'var(--color-terracotta)',
                    lineHeight: 1,
                    marginBottom: '16px'
                  }}
                >
                  {st.num}
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>
                  {st.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION: ACCESSIBILITY & SOCIAL IMPACT
          ===================================================================== */}
      <section
        style={{
          padding: '80px 0',
          backgroundColor: 'var(--color-deep-forest)',
          color: 'var(--color-warm-ivory)',
          position: 'relative'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-sage)',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              Inclusivity Without Compromise
            </span>
            <h2 style={{ color: 'var(--color-warm-ivory)', marginBottom: '14px' }}>
              Designed for Dignity & Universal Access
            </h2>
            <p style={{ color: 'var(--color-sage)', fontSize: '1.05rem' }}>
              Sign language is not an afterthought; it is a rich visual language. SignSpeak prioritizes privacy, cultural accuracy, and WCAG AAA compliance.
            </p>
          </div>

          {/* 4 Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px'
            }}
          >
            {socialImpacts.map((si, idx) => (
              <div
                key={idx}
                style={{
                  padding: '28px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(38, 63, 50, 0.6)',
                  border: '1px solid rgba(168, 180, 154, 0.25)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'var(--color-warm-ivory)',
                    marginBottom: '6px'
                  }}
                >
                  {si.stat}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-sage)', marginBottom: '6px' }}>
                  {si.label}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#DCE4D5', opacity: 0.85 }}>
                  {si.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Action Banner inside Dark Section */}
          <div
            style={{
              marginTop: '60px',
              padding: '36px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-forest-green)',
              border: '1px solid rgba(168, 180, 154, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div>
              <h3 style={{ color: 'var(--color-warm-ivory)', margin: '0 0 6px', fontSize: '1.45rem' }}>
                Explore the ISL Sign-o-Pedia Dictionary
              </h3>
              <p style={{ margin: 0, color: 'var(--color-sage)', fontSize: '0.95rem' }}>
                Browse over 60+ Indian Sign Language signs with movement guides and handshape breakdowns.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={onOpenDictionary}
              style={{
                backgroundColor: 'var(--color-rust)',
                color: '#FFFDF8',
                padding: '12px 24px',
                fontWeight: 700
              }}
            >
              <BookOpen size={18} /> Open Dictionary
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LANDING PAGE FOOTER
          ===================================================================== */}
      <footer
        style={{
          padding: '50px 0 30px',
          backgroundColor: 'var(--color-warm-ivory)',
          borderTop: '1px solid var(--color-beige)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', paddingBottom: '30px', borderBottom: '1px solid var(--color-beige)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>🌿</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                  SignSpeak
                </span>
                <span className="badge badge-forest" style={{ fontSize: '0.7rem' }}>
                  ISL AI
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '420px' }}>
                A respectful, accessible technological bridge for Indian Sign Language and spoken dialogue.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-rust" onClick={onStartCommunicating}>
                Launch Application
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '20px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <span>© 2026 SignSpeak Platform. Crafted with care for the Deaf & Hard-of-Hearing community.</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>WCAG 2.1 AAA</span>
              <span>•</span>
              <span>100% In-Browser Privacy</span>
              <span>•</span>
              <span>Indian Sign Language Standard</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
