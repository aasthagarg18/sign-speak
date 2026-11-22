import React, { useState } from 'react';
import {
  MessageSquare, Volume2, Mic, Video, Send, Download, Sparkles, User, RefreshCw, Check
} from 'lucide-react';
import { SAMPLE_CONVERSATIONS } from '../data/sampleConversations';
import { tokenizeTextToISL } from '../utils/islMatcher';
import ISLAvatarPlayer from './ISLAvatarPlayer';
import ISLGlossBadge from './ISLGlossBadge';

export default function TwoWayConversation({ speechHook }) {
  const [activeScenarioId, setActiveScenarioId] = useState('clinic');
  const [messages, setMessages] = useState(SAMPLE_CONVERSATIONS[0].messages);
  const [signerInput, setSignerInput] = useState('');
  const [speakerInput, setSpeakerInput] = useState('');
  const [selectedDemoMessage, setSelectedDemoMessage] = useState(messages[0]);

  const handleScenarioChange = (scenarioId) => {
    setActiveScenarioId(scenarioId);
    const found = SAMPLE_CONVERSATIONS.find(s => s.id === scenarioId);
    if (found) {
      setMessages(found.messages);
      setSelectedDemoMessage(found.messages[0]);
    }
  };

  const handleAddSignerMessage = () => {
    if (!signerInput.trim()) return;
    const newMsg = {
      id: `signer-${Date.now()}`,
      sender: 'signer',
      senderName: 'Deaf Signer',
      role: 'Signer',
      text: signerInput.trim(),
      signGloss: signerInput.trim().toUpperCase(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      audioSpoken: true
    };
    setMessages(prev => [...prev, newMsg]);
    setSelectedDemoMessage(newMsg);
    speechHook.speak(signerInput.trim());
    setSignerInput('');
  };

  const handleAddSpeakerMessage = () => {
    if (!speakerInput.trim()) return;
    const newMsg = {
      id: `speaker-${Date.now()}`,
      sender: 'speaker',
      senderName: 'Hearing Person',
      role: 'Speaker',
      text: speakerInput.trim(),
      signGloss: speakerInput.trim().toUpperCase(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      audioSpoken: true
    };
    setMessages(prev => [...prev, newMsg]);
    setSelectedDemoMessage(newMsg);
    setSpeakerInput('');
  };

  const handleExportChat = () => {
    const transcript = messages.map(m => `[${m.timestamp}] ${m.senderName}: ${m.text} (ISL Gloss: ${m.signGloss})`).join('\n\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SignSpeak-Conversation-${activeScenarioId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const demoTokens = selectedDemoMessage ? tokenizeTextToISL(selectedDemoMessage.text) : [];

  return (
    <div className="two-way-conversation-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Scenario Switcher & Controls */}
      <div
        className="card"
        style={{
          padding: '16px 22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            🌿 Real Life Scenarios:
          </span>
          {SAMPLE_CONVERSATIONS.map(sc => (
            <button
              key={sc.id}
              className={`btn btn-sm ${activeScenarioId === sc.id ? 'btn-forest' : 'btn-secondary'}`}
              onClick={() => handleScenarioChange(sc.id)}
              style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: 'var(--radius-pill)' }}
            >
              {sc.title}
            </button>
          ))}
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleExportChat}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', padding: '6px 14px' }}
        >
          <Download size={14} /> Export Transcript (.txt)
        </button>
      </div>

      {/* Main 2-Way Layout */}
      <div className="workbench-grid">
        {/* Left Column: Live Split Dialogue Stream */}
        <div className="card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', minHeight: '420px', maxHeight: '620px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--color-beige)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(38, 63, 50, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-forest-green)'
                }}
              >
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--color-forest-green)' }}>
                  Bilingual Dialogue Stream
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Indian Sign Language ⇄ Spoken Speech Bridge
                </span>
              </div>
            </div>

            <span className="badge badge-sage">
              {messages.length} Messages
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div
            className="messages-stream"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: 'var(--color-warm-ivory)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-beige)',
              marginBottom: '16px'
            }}
          >
            {messages.map((msg) => {
              const isSigner = msg.sender === 'signer';
              const isSelected = selectedDemoMessage?.id === msg.id;

              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedDemoMessage(msg)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isSigner ? 'flex-start' : 'flex-end',
                    maxWidth: '82%',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', alignSelf: isSigner ? 'flex-start' : 'flex-end' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isSigner ? 'var(--color-forest-green)' : 'var(--color-rust)' }}>
                      {isSigner ? '🤟 ' : '🗣️ '} {msg.senderName}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{msg.timestamp}</span>
                  </div>

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: isSigner ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                      backgroundColor: isSigner ? 'var(--color-forest-green)' : 'var(--color-terracotta)',
                      color: '#FFFDF8',
                      boxShadow: isSelected ? '0 0 0 2px var(--color-warm-ivory), 0 0 0 4px var(--color-rust)' : 'var(--shadow-sm)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>
                      {msg.text}
                    </div>

                    {msg.signGloss && (
                      <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,253,248,0.2)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', opacity: 0.9 }}>
                        ISL: [{msg.signGloss}]
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', alignSelf: isSigner ? 'flex-start' : 'flex-end' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechHook.speak(msg.text);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 4px'
                      }}
                    >
                      <Volume2 size={12} /> Play Audio
                    </button>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>• Click for ISL demonstration</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dual Input Trays */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid var(--color-beige)', paddingTop: '12px' }}>
            {/* Signer Side */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', marginBottom: '5px' }}>
                <Video size={13} /> Signer Output (Webcam Sign to Voice):
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={signerInput}
                  onChange={(e) => setSignerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSignerMessage()}
                  placeholder="Signer signs message..."
                  style={{ fontSize: '0.8125rem', padding: '8px 12px' }}
                />
                <button className="btn btn-forest btn-sm" onClick={handleAddSignerMessage} title="Send and vocalize">
                  <Send size={14} />
                </button>
              </div>
            </div>

            {/* Hearing Speaker Side */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-terracotta)', marginBottom: '5px' }}>
                <Mic size={13} /> Speaker Input (Spoken Voice to ISL):
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={speakerInput}
                  onChange={(e) => setSpeakerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSpeakerMessage()}
                  placeholder="Hearing person speaks..."
                  style={{ fontSize: '0.8125rem', padding: '8px 12px' }}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAddSpeakerMessage}
                  style={{ backgroundColor: 'var(--color-terracotta)', color: '#FFFDF8' }}
                  title="Send and animate ISL"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Message ISL Demonstration Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="card" style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Demonstration Target:
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px', color: 'var(--color-charcoal)' }}>
              "{selectedDemoMessage?.text}"
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Spoken by {selectedDemoMessage?.senderName} ({selectedDemoMessage?.role})
            </div>
          </div>

          <ISLAvatarPlayer
            tokens={demoTokens}
            currentIndex={0}
            onSpeak={(txt) => speechHook.speak(txt)}
            autoPlay={true}
            height={440}
          />
        </div>
      </div>
    </div>
  );
}
