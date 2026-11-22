import React from 'react';
import {
  Camera, Volume2, Type, Mic, ArrowRight, CheckCircle2, BookOpen
} from 'lucide-react';
import { BotanicalBranch, BotanicalWatermark } from './BotanicalDecorations';
import { AuthenticISLHandsShowcase } from './HumanISLVisuals';

export default function LandingPage({ onStartCommunicating, onSelectFeature, onOpenDictionary }) {
  const features = [
    {
      id: 'sign-to-text',
      title: 'Sign-to-Text',
      category: 'Computer Vision',
      desc: 'Point your camera to translate Indian Sign Language into written text in real time.',
      icon: Camera,
      badge: 'Live Camera',
      color: 'var(--color-forest-green)'
    },
    {
      id: 'sign-to-speech',
      title: 'Sign-to-Speech',
      category: 'Audio Voice',
      desc: 'Vocalize recognized ISL signs aloud in natural Indian English or Hindi for hearing companions.',
      icon: Volume2,
      badge: 'Voice Audio',
      color: 'var(--color-rust)'
    },
    {
      id: 'text-to-sign',
      title: 'Text-to-Sign',
      category: 'Kinematics',
      desc: 'Type words or sentences to view animated, step-by-step ISL sign demonstrations.',
      icon: Type,
      badge: 'Animated Sign',
      color: 'var(--color-terracotta)'
    },
    {
      id: 'speech-to-sign',
      title: 'Speech-to-Sign',
      category: 'Live Voice',
      desc: 'Speak into your microphone to convert spoken voice directly into corresponding ISL gestures.',
      icon: Mic,
      badge: 'Microphone',
      color: 'var(--color-olive)'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Choose Your Modality',
      desc: 'Sign via camera, speak with your voice, or type a phrase. SignSpeak translates both directions seamlessly.'
    },
    {
      num: '02',
      title: 'Real-Time Recognition',
      desc: 'In-browser computer vision maps hand movements and joint angles against authentic ISL gestures.'
    },
    {
      num: '03',
      title: 'Dignified Dialogue',
      desc: 'Communicate with ease in medical clinics, classrooms, bank counters, and everyday family life.'
    }
  ];

  const socialImpacts = [
    {
      stat: '18 Million+',
      label: 'Deaf & Hard-of-Hearing Indians',
      sub: 'Supporting independent daily communication across public and private spaces'
    },
    {
      stat: 'WCAG AAA',
      label: 'Universal Accessibility',
      sub: 'High contrast themes, dyslexia-friendly typography, and visual flash alerts'
    },
    {
      stat: '100% Client-Side',
      label: 'In-Browser Privacy',
      sub: 'Camera streams are processed on your device and are never sent to remote servers'
    },
    {
      stat: '60+ Signs',
      label: 'Growing ISL Library',
      sub: 'Everyday greetings, healthcare, emergency essentials, and fingerspelling'
    }
  ];

  return (
    <div className="landing-page-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Natural Watermark Background */}
      <BotanicalWatermark opacity={0.03} />

      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section style={{ padding: '56px 0 76px', position: 'relative' }}>
        <div className="container">
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '44px', alignItems: 'center' }}>
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
              <h1 style={{ marginBottom: '20px', color: 'var(--color-forest-green)', lineHeight: 1.2 }}>
                Every Sign Deserves to Be Understood.
              </h1>

              {/* Supporting Text */}
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '32px', maxWidth: '560px' }}>
                SignSpeak bridges the communication gap between sign language users and the hearing world in real time.
                Translate live webcam signs into spoken voice, or convert speech and text into clear ISL demonstrations.
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginTop: '36px', paddingTop: '22px', borderTop: '1px solid var(--color-beige)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>Real-time Camera Vision</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>Spoken Voice Synthesis</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={16} color="var(--color-forest-green)" />
                  <span>100% In-Browser Privacy</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Authentic Photograph Frame */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="card"
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  padding: '16px',
                  backgroundColor: 'var(--color-soft-ivory)',
                  border: '1.5px solid var(--color-beige)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'relative'
                }}
              >
                {/* Image Header Pill */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-forest-green)' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Sign Language Communication
                    </span>
                  </div>
                  <span className="badge badge-sage" style={{ fontSize: '0.6875rem' }}>
                    Authentic ISL Dialogue
                  </span>
                </div>

                {/* Realistic Photograph */}
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-beige)',
                    border: '1px solid var(--color-taupe-light)',
                    aspectRatio: '16/11'
                  }}
                >
                  <img
                    src="/images/sign-language-communication.jpg"
                    alt="Two people communicating genuinely through sign language in a warm, welcoming setting"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="eager"
                  />
                  {/* Subtle warm tint overlay to harmonize with Vintage Botanical palette */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(28, 48, 39, 0.45) 0%, rgba(28, 48, 39, 0) 50%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Photo Caption Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      right: '14px',
                      color: '#FFFDF8'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      "Namaste • How can I assist you?"
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '2px' }}>
                      Deaf Signer ⇄ Hearing Companion Everyday Exchange
                    </div>
                  </div>
                </div>

                {/* Bottom Translated Sentence Bar */}
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-warm-ivory)',
                    border: '1px solid var(--color-beige)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-taupe)', textTransform: 'uppercase' }}>
                      Translated Speech
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      "Namaste, glad to meet you!"
                    </div>
                  </div>
                  <button
                    className="btn btn-rust btn-sm"
                    onClick={onStartCommunicating}
                    style={{ padding: '6px 12px', flexShrink: 0 }}
                  >
                    <Volume2 size={13} /> Listen
                  </button>
                </div>
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
          padding: '70px 0',
          backgroundColor: 'var(--color-soft-ivory)',
          borderTop: '1px solid var(--color-beige)',
          borderBottom: '1px solid var(--color-beige)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 44px' }}>
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
              Translation Tools
            </span>
            <h2 style={{ marginBottom: '12px' }}>Four Modalities for Natural Communication</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Whether you communicate via sign, voice, or text, SignSpeak bridges conversations directly in your browser.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '22px'
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
                    padding: '26px',
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
                          backgroundColor: 'var(--color-beige)',
                          border: '1.5px solid var(--color-taupe)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: feat.color
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <span className="badge badge-sage">
                        {feat.badge}
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
                      fontWeight: 600,
                      color: 'var(--color-forest-green)'
                    }}
                  >
                    <span>Launch Modality</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION: AUTHENTIC ISL FOUNDATIONS
          ===================================================================== */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--color-warm-ivory)', borderBottom: '1px solid var(--color-beige)' }}>
        <div className="container">
          <AuthenticISLHandsShowcase onExploreDict={onOpenDictionary} />
        </div>
      </section>

      {/* =====================================================================
          SECTION: HOW IT WORKS (3 SIMPLE STEPS)
          ===================================================================== */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 44px' }}>
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
              How It Works
            </span>
            <h2 style={{ marginBottom: '12px' }}>Simple, Three-Step Workflow</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Built for immediate access on desktop and mobile without special hardware.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '28px 22px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-beige)',
                  backgroundColor: 'var(--color-soft-ivory)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'var(--color-terracotta)',
                    lineHeight: 1,
                    marginBottom: '14px'
                  }}
                >
                  {st.num}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                  {st.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
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
          padding: '70px 0',
          backgroundColor: 'var(--color-deep-forest)',
          color: 'var(--color-warm-ivory)',
          position: 'relative'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 44px' }}>
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
              Universal Inclusion
            </span>
            <h2 style={{ color: 'var(--color-warm-ivory)', marginBottom: '12px' }}>
              Designed for Dignity & Everyday Independence
            </h2>
            <p style={{ color: 'var(--color-sage)', fontSize: '0.95rem' }}>
              Indian Sign Language is a complete visual language with its own grammar and regional richness.
            </p>
          </div>

          {/* 4 Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '20px'
            }}
          >
            {socialImpacts.map((si, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(38, 63, 50, 0.65)',
                  border: '1px solid rgba(168, 180, 154, 0.25)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--color-warm-ivory)',
                    marginBottom: '6px'
                  }}
                >
                  {si.stat}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-sage)', marginBottom: '6px' }}>
                  {si.label}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#DCE4D5', opacity: 0.85, lineHeight: 1.45 }}>
                  {si.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Action Banner inside Dark Section */}
          <div
            style={{
              marginTop: '50px',
              padding: '30px 32px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-forest-green)',
              border: '1px solid rgba(168, 180, 154, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px'
            }}
          >
            <div>
              <h3 style={{ color: 'var(--color-warm-ivory)', margin: '0 0 6px', fontSize: '1.35rem' }}>
                Explore the ISL Sign-o-Pedia Dictionary
              </h3>
              <p style={{ margin: 0, color: 'var(--color-sage)', fontSize: '0.875rem' }}>
                Browse over 60+ verified Indian Sign Language signs with video animations and movement guides.
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={onOpenDictionary}
              style={{
                backgroundColor: 'var(--color-rust)',
                color: '#FFFDF8',
                padding: '12px 22px',
                fontWeight: 700
              }}
            >
              <BookOpen size={16} /> Open Dictionary
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LANDING PAGE FOOTER
          ===================================================================== */}
      <footer
        style={{
          padding: '40px 0 24px',
          backgroundColor: 'var(--color-warm-ivory)',
          borderTop: '1px solid var(--color-beige)'
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid var(--color-beige)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '22px' }}>🌿</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-forest-green)' }}>
                  SignSpeak
                </span>
                <span className="badge badge-forest" style={{ fontSize: '0.6875rem' }}>
                  ISL AI
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: '420px' }}>
                Empowering India's Deaf & Hard-of-Hearing community through respectful, accessible AI communication.
              </p>
            </div>

            <button className="btn btn-rust" onClick={onStartCommunicating} style={{ padding: '10px 20px', fontWeight: 700 }}>
              Launch Application
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '18px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>© 2026 SignSpeak Platform. WCAG 2.1 AAA Compliant.</span>
            <div style={{ display: 'flex', gap: '14px' }}>
              <span>Indian Sign Language Standard</span>
              <span>•</span>
              <span>100% In-Browser Privacy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
