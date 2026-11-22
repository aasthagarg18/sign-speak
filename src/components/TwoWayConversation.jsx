import React, { useState } from 'react';
import {
  MessageSquare, Volume2, Mic, Video, Send, Download, Sparkles, User, RefreshCw
} from 'lucide-react';
import { SAMPLE_CONVERSATIONS } from '../data/sampleConversations';
import { tokenizeTextToISL } from '../utils/islMatcher';
import ISLAvatarPlayer from './ISLAvatarPlayer';

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
      {/* Top Scenario Switcher & Header Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--color-beige)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={18} color="var(--color-forest-green)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-forest-green)' }}>
              Conversation Scenario:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {SAMPLE_CONVERSATIONS.map(sc => (
              <button
                key={sc.id}
                className={`btn btn-sm ${activeScenarioId === sc.id ? 'btn-forest' : 'btn-secondary'}`}
                onClick={() => handleScenarioChange(sc.id)}
                style={{
                  fontSize: '0.8125rem',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: activeScenarioId === sc.id ? 700 : 500
                }}
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={handleExportChat}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', padding: '6px 14px' }}
        >
          <Download size={14} /> Export Transcript (.txt)
        </button>
      </div>

      {/* Main 2-Way Layout */}
      <div className="workbench-grid">
        {/* Left Column: Clean Natural Conversation Feed */}
        <div
          className="card"
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '480px',
            maxHeight: '660px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--color-beige)'
          }}
        >
          {/* Conversation Stream Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--color-beige)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-forest-green)' }} />
                <span style={{ fontWeight: 600, color: 'var(--color-forest-green)' }}>Deaf Signer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-rust)' }} />
                <span style={{ fontWeight: 600, color: 'var(--color-rust)' }}>Hearing Companion</span>
              </div>
            </div>

            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {messages.length} messages
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div
            className="messages-stream"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
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
                  {/* Sender metadata */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px',
                      padding: '0 4px',
                      alignSelf: isSigner ? 'flex-start' : 'flex-end'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isSigner ? 'var(--color-forest-green)' : 'var(--color-rust)'
                      }}
                    >
                      {isSigner ? '🤟 Deaf Signer' : '🗣️ Hearing Companion'}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: isSigner ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                      backgroundColor: isSigner ? 'var(--color-forest-green)' : 'var(--color-soft-ivory)',
                      color: isSigner ? '#FFFDF8' : 'var(--color-charcoal)',
                      border: isSigner ? 'none' : '1.5px solid var(--color-beige)',
                      boxShadow: isSelected
                        ? '0 0 0 2px var(--color-warm-ivory), 0 0 0 4px var(--color-rust)'
                        : 'var(--shadow-sm)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontSize: '0.925rem', lineHeight: 1.55 }}>
                      {msg.text}
                    </div>

                    {msg.signGloss && (
                      <div
                        style={{
                          marginTop: '6px',
                          paddingTop: '6px',
                          borderTop: isSigner ? '1px solid rgba(255, 253, 248, 0.2)' : '1px solid var(--color-beige)',
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono, monospace)',
                          opacity: isSigner ? 0.9 : 0.75,
                          color: isSigner ? '#FFFDF8' : 'var(--color-forest-green)'
                        }}
                      >
                        ISL: [{msg.signGloss}]
                      </div>
                    )}
                  </div>

                  {/* Actions underneath bubble */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '3px',
                      padding: '0 4px',
                      alignSelf: isSigner ? 'flex-start' : 'flex-end'
                    }}
                  >
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
                        padding: '2px 0'
                      }}
                      title="Vocalize sentence"
                    >
                      <Volume2 size={12} /> Listen
                    </button>

                    {isSelected && (
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-rust)', fontWeight: 600 }}>
                        • Showing on avatar
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inputs Composer Section */}
          <div
            style={{
              borderTop: '1.5px solid var(--color-beige)',
              paddingTop: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {/* Signer Input Row */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Video size={13} /> Signer Message (Sign to Speech):
                </label>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={signerInput}
                  onChange={(e) => setSignerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSignerMessage()}
                  placeholder="Type or sign a message (will vocalize)..."
                  style={{ fontSize: '0.85rem', padding: '9px 12px', borderRadius: 'var(--radius-pill)' }}
                />
                <button
                  className="btn btn-forest btn-sm"
                  onClick={handleAddSignerMessage}
                  style={{ padding: '0 16px', borderRadius: 'var(--radius-pill)', flexShrink: 0 }}
                  title="Send message and speak aloud"
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>

            {/* Hearing Speaker Input Row */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-rust)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Mic size={13} /> Companion Message (Speech to Sign):
                </label>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={speakerInput}
                  onChange={(e) => setSpeakerInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSpeakerMessage()}
                  placeholder="Type spoken response (will animate ISL)..."
                  style={{ fontSize: '0.85rem', padding: '9px 12px', borderRadius: 'var(--radius-pill)' }}
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAddSpeakerMessage}
                  style={{
                    backgroundColor: 'var(--color-rust)',
                    color: '#FFFDF8',
                    padding: '0 16px',
                    borderRadius: 'var(--radius-pill)',
                    flexShrink: 0
                  }}
                  title="Send response and demonstrate in sign"
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Message ISL Demonstration Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            className="card"
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-beige)'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-green)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Sign Demonstration
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px', color: 'var(--color-charcoal)' }}>
              "{selectedDemoMessage?.text}"
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {selectedDemoMessage?.senderName} ({selectedDemoMessage?.role})
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
