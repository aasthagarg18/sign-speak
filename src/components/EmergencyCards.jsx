import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, HeartPulse, Flame, AlertTriangle, Volume2, BellRing } from 'lucide-react';
import ISLAvatarPlayer from './ISLAvatarPlayer';
import { tokenizeTextToISL } from '../utils/islMatcher';
import { BotanicalBranch } from './BotanicalDecorations';

export const EMERGENCY_CARDS = [
  {
    id: 'em-doctor',
    title: 'Need Urgent Doctor',
    phrase: 'I need a doctor urgently. Please assist me.',
    signWord: 'Doctor',
    icon: HeartPulse,
    color: 'var(--color-rust)',
    bgLight: 'rgba(166, 83, 56, 0.1)',
    instruction: 'Tap pulse on non-dominant wrist twice',
    priority: 'High'
  },
  {
    id: 'em-police',
    title: 'Call Police / Help',
    phrase: 'Emergency! Please call the police right away.',
    signWord: 'Police',
    icon: ShieldAlert,
    color: 'var(--color-forest-green)',
    bgLight: 'rgba(38, 63, 50, 0.1)',
    instruction: 'Tap upper chest badge location twice',
    priority: 'High'
  },
  {
    id: 'em-fire',
    title: 'Fire Emergency',
    phrase: 'Fire emergency! Evacuate immediately.',
    signWord: 'Fire',
    icon: Flame,
    color: 'var(--color-terracotta)',
    bgLight: 'rgba(196, 119, 92, 0.12)',
    instruction: 'Flicker both 5-hands upward like flames',
    priority: 'Critical'
  },
  {
    id: 'em-deaf',
    title: 'I am Deaf / Need Notes',
    phrase: 'I am Deaf. Please write down instructions on paper or phone.',
    signWord: 'I am Deaf',
    icon: AlertTriangle,
    color: 'var(--color-olive)',
    bgLight: 'rgba(119, 122, 69, 0.12)',
    instruction: 'Touch ear then mouth then point to self',
    priority: 'Informative'
  },
  {
    id: 'em-hospital',
    title: 'Where is Hospital?',
    phrase: 'Please direct me to the nearest hospital.',
    signWord: 'Hospital',
    icon: PhoneCall,
    color: 'var(--color-forest-green)',
    bgLight: 'rgba(38, 63, 50, 0.1)',
    instruction: 'Draw cross on shoulder arm',
    priority: 'Moderate'
  }
];

export default function EmergencyCards({ speechHook }) {
  const [selectedCard, setSelectedCard] = useState(EMERGENCY_CARDS[0]);
  const [isAlerting, setIsAlerting] = useState(false);

  const handleTriggerEmergency = (card) => {
    setSelectedCard(card);
    setIsAlerting(true);
    speechHook.speak(card.phrase);
    setTimeout(() => {
      setIsAlerting(false);
    }, 4000);
  };

  const previewTokens = selectedCard ? tokenizeTextToISL(selectedCard.signWord) : [];

  return (
    <div className="emergency-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Alert Banner in Terracotta/Rust */}
      <div
        className="card"
        style={{
          padding: '24px 28px',
          backgroundColor: 'var(--color-soft-ivory)',
          border: '2px solid var(--color-rust)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-rust)',
              color: '#FFFDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-rust)'
            }}
          >
            <BellRing size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <BotanicalBranch size={18} color="var(--color-rust)" />
              <h2 style={{ margin: 0, fontSize: '1.45rem', color: 'var(--color-forest-green)' }}>
                Emergency Quick-Assist Cards
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              One-tap high-visibility visual and vocal alerts for critical medical, safety, and transit scenarios
            </p>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => handleTriggerEmergency(selectedCard)}
          style={{
            backgroundColor: 'var(--color-rust)',
            color: '#FFFDF8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 22px',
            fontSize: '0.95rem',
            fontWeight: 700,
            boxShadow: 'var(--shadow-rust)'
          }}
        >
          <Volume2 size={18} /> Broadcast Voice Siren
        </button>
      </div>

      {/* Grid of Emergency Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1.15fr)', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {EMERGENCY_CARDS.map(card => {
            const Icon = card.icon;
            const isSelected = selectedCard.id === card.id;

            return (
              <div
                key={card.id}
                className="card card-interactive"
                onClick={() => setSelectedCard(card)}
                style={{
                  padding: '18px 22px',
                  cursor: 'pointer',
                  border: isSelected ? `2px solid ${card.color}` : '1.5px solid var(--color-beige)',
                  backgroundColor: isSelected ? card.bgLight : 'var(--color-soft-ivory)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: card.color,
                      color: '#FFFDF8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      "{card.phrase}"
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerEmergency(card);
                  }}
                  title="Vocalize immediately"
                  style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                >
                  <Volume2 size={14} style={{ marginRight: '4px' }} /> Alert
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Card Large Visual Display & ISL Animation */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', borderRadius: 'var(--radius-lg)' }}>
          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: selectedCard.bgLight,
              borderRadius: 'var(--radius-md)',
              border: `1.5px solid ${selectedCard.color}`
            }}
          >
            <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 800, color: selectedCard.color, letterSpacing: '0.06em' }}>
              EMERGENCY BROADCAST CARD
            </span>
            <h2 style={{ margin: '8px 0', fontSize: '1.65rem', color: 'var(--color-charcoal)' }}>
              {selectedCard.title}
            </h2>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              "{selectedCard.phrase}"
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '8px' }}>
              Corresponding ISL Sign Demonstration:
            </div>
            <ISLAvatarPlayer
              tokens={previewTokens}
              currentIndex={0}
              onSpeak={(txt) => speechHook.speak(txt)}
              autoPlay={true}
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
