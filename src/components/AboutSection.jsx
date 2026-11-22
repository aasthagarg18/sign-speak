import React from 'react';
import { ArrowRight, Heart, Users, BookOpen, ShieldCheck } from 'lucide-react';
import { BotanicalBranch, BotanicalWatermark } from './BotanicalDecorations';
import { AuthenticISLHandsShowcase } from './HumanISLVisuals';

export default function AboutSection({ onStartCommunicating, onOpenDictionary }) {
  return (
    <div className="about-section-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Hero Banner */}
      <div
        className="card"
        style={{
          padding: '36px 32px',
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

          <h1 style={{ color: 'var(--color-forest-green)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '14px' }}>
            Communication Is a Fundamental Human Right.
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '24px' }}>
            In India, over <strong>18 Million individuals</strong> are Deaf or Hard-of-Hearing. SignSpeak provides an accessible, client-side bridge between Indian Sign Language and spoken dialogue — designed with dignity, privacy, and cultural accuracy.
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

      {/* Real Photography & Core Values Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)', gap: '28px', alignItems: 'center' }} className="workbench-grid">
        {/* Left: Authentic Photography Card */}
        <div
          className="card"
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-beige)',
            backgroundColor: 'var(--color-soft-ivory)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
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
              loading="lazy"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-forest-green)' }}>
              Natural Face-to-Face Dialogue
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Deaf signers express thoughts in natural ISL; hearing companions receive instant spoken audio and text.
            </p>
          </div>
        </div>

        {/* Right: Three Mission Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-soft-ivory)', border: '1.5px solid var(--color-beige)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(38, 63, 50, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-forest-green)' }}>
                <Users size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-forest-green)' }}>Everyday Independence</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Enables deaf citizens to conduct daily interactions in clinics, banks, and transport hubs without requiring an external interpreter.
            </p>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-soft-ivory)', border: '1.5px solid var(--color-beige)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(166, 83, 56, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-rust)' }}>
                <Heart size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-forest-green)' }}>Authentic ISL Grammar</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Indian Sign Language has its own distinct structure. SignSpeak respects authentic two-handed handshapes and facial markers.
            </p>
          </div>

          <div style={{ padding: '18px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-soft-ivory)', border: '1.5px solid var(--color-beige)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(119, 122, 69, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-olive)' }}>
                <ShieldCheck size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-forest-green)' }}>100% In-Browser Privacy</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Video frames are processed entirely on your device. Camera streams are never recorded or transmitted to external servers.
            </p>
          </div>
        </div>
      </div>

      {/* Common Signs Demonstration Showcase */}
      <div className="card" style={{ padding: '24px 28px', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-beige)' }}>
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1.2rem', color: 'var(--color-forest-green)' }}>
            Authentic Indian Sign Language Foundations
          </h3>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Core gestures taught across Indian inclusive schools and deaf associations:
          </p>
        </div>

        <AuthenticISLHandsShowcase onExploreDict={onOpenDictionary} />
      </div>
    </div>
  );
}
