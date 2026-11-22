import React from 'react';
import { ArrowRight, CheckCircle2, Heart, Users, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { BotanicalBranch, BotanicalWatermark } from './BotanicalDecorations';
import { BilingualDialogueIllustration, AuthenticISLHandsShowcase } from './HumanISLVisuals';

export default function AboutSection({ onStartCommunicating, onOpenDictionary }) {
  return (
    <div className="about-section-container" style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Top Hero Banner */}
      <div
        className="card"
        style={{
          padding: '40px 32px',
          backgroundColor: 'var(--color-soft-ivory)',
          border: '1.5px solid var(--color-beige)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <BotanicalWatermark opacity={0.04} />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-beige)', border: '1px solid var(--color-taupe)', marginBottom: '16px' }}>
            <BotanicalBranch size={16} color="var(--color-forest-green)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Our Mission & Purpose
            </span>
          </div>

          <h1 style={{ color: 'var(--color-forest-green)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '14px' }}>
            Communication Is a Fundamental Human Right.
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '24px' }}>
            In India, over <strong>18 Million individuals</strong> are Deaf or Hard-of-Hearing. Every day, simple interactions at a doctor’s clinic, a train ticket counter, or a university lecture encounter communication barriers.
            SignSpeak was built to bridge this gap through respectful, private, and accessible Indian Sign Language AI technology.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={onStartCommunicating}
              style={{ backgroundColor: 'var(--color-rust)', color: '#FFFDF8', padding: '12px 24px', fontWeight: 700 }}
            >
              Start Communicating <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={onOpenDictionary}
              style={{ padding: '12px 22px' }}
            >
              <BookOpen size={16} /> Explore ISL Dictionary
            </button>
          </div>
        </div>
      </div>

      {/* Human Illustration & Core Values Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', gap: '28px', alignItems: 'center' }} className="workbench-grid">
        {/* Left: Authentic Bilingual Dialogue Illustration */}
        <div
          className="card"
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-beige)',
            backgroundColor: 'var(--color-soft-ivory)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <BilingualDialogueIllustration height="280px" />
          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-forest-green)' }}>
              Natural Face-to-Face Dialogue
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '2px 0 0', maxWidth: '380px' }}>
              Deaf signers express thoughts in natural ISL; hearing companions receive instant spoken audio and text.
            </p>
          </div>
        </div>

        {/* Right: Four Mission Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-soft-ivory)', border: '1.5px solid var(--color-beige)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(38, 63, 50, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-forest-green)' }}>
                <Users size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-forest-green)' }}>Everyday Independence</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Enables deaf citizens to conduct essential daily transactions—hospitals, banks, metro stations—without needing an interpreter present.
            </p>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-soft-ivory)', border: '1.5px solid var(--color-beige)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(166, 83, 56, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-rust)' }}>
                <Heart size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-forest-green)' }}>Respect for ISL Grammar</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Indian Sign Language is distinct from ASL and BSL. SignSpeak honors authentic two-handed handshapes and non-manual facial markers.
            </p>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-soft-ivory)', border: '1.5px solid var(--color-beige)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(119, 122, 69, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-olive)' }}>
                <ShieldCheck size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-forest-green)' }}>100% In-Browser Privacy</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Camera video frames are processed entirely client-side using WebAssembly neural networks. No video feeds are stored on external servers.
            </p>
          </div>
        </div>
      </div>

      {/* Common Signs Demonstration Showcase */}
      <div className="card" style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1.25rem', color: 'var(--color-forest-green)' }}>
            Authentic Indian Sign Language Foundations
          </h3>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Key gestures taught across Indian inclusive schools and deaf associations:
          </p>
        </div>

        <AuthenticISLHandsShowcase />
      </div>
    </div>
  );
}
