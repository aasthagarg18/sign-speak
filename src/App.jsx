import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AccessibilityBar from './components/AccessibilityBar';
import HistoryDrawer from './components/HistoryDrawer';
import SignToText from './components/SignToText';
import TextToSign from './components/TextToSign';
import SpeechToSign from './components/SpeechToSign';
import TwoWayConversation from './components/TwoWayConversation';
import Signopedia from './components/Signopedia';
import PracticeStudio from './components/PracticeStudio';
import EmergencyCards from './components/EmergencyCards';
import AboutSection from './components/AboutSection';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { Camera, Type, Mic, Sparkles } from 'lucide-react';
import { BotanicalBranch } from './components/BotanicalDecorations';

export default function App() {
  // Navigation: 'landing', 'dashboard', 'translator', 'twoway', 'signopedia', 'practice', 'emergency'
  const [activeTab, setActiveTab] = useState('landing');
  const [translatorSubMode, setTranslatorSubMode] = useState('sign-to-text'); // 'sign-to-text', 'text-to-sign', 'speech-to-sign'

  // Accessibility Settings
  const [a11ySettings, setA11ySettings] = useState(() => {
    const saved = localStorage.getItem('signspeak_a11y');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      highContrast: false,
      dyslexicFont: false,
      fontSize: '100%',
      visualAlertFlash: true,
      reducedMotion: false
    };
  });

  // History State
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('signspeak_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        type: 'sign-to-text',
        sourceText: 'Namaste, I need help.',
        glossText: 'NAMASTE HELP NEED',
        timestamp: '10:14 AM'
      },
      {
        type: 'text-to-sign',
        sourceText: 'Where is the hospital?',
        glossText: 'HOSPITAL WHERE?',
        timestamp: '10:18 AM'
      }
    ];
  });

  // Modals & Panels
  const [showA11yModal, setShowA11yModal] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [flashAlert, setFlashAlert] = useState(false);

  // Global Speech Hook
  const speechHook = useSpeechSynthesis();

  // Save A11y Settings to LocalStorage
  useEffect(() => {
    localStorage.setItem('signspeak_a11y', JSON.stringify(a11ySettings));
    document.documentElement.style.fontSize = a11ySettings.fontSize;
    if (a11ySettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    if (a11ySettings.dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
    if (a11ySettings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [a11ySettings]);

  // Save History to LocalStorage
  useEffect(() => {
    localStorage.setItem('signspeak_history', JSON.stringify(history));
  }, [history]);

  const handleSaveToHistory = (item) => {
    setHistory(prev => [item, ...prev].slice(0, 50));
    if (a11ySettings.visualAlertFlash) {
      triggerVisualFlash();
    }
  };

  const triggerVisualFlash = () => {
    setFlashAlert(true);
    setTimeout(() => setFlashAlert(false), 700);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleLaunchTranslatorMode = (modeId) => {
    setActiveTab('translator');
    setTranslatorSubMode(modeId);
  };

  const handlePracticeSignFromDict = (sign) => {
    setActiveTab('translator');
    setTranslatorSubMode('sign-to-text');
  };

  return (
    <div className={`app-wrapper ${flashAlert ? 'visual-flash-active' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Botanical Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenA11y={() => setShowA11yModal(true)}
        onOpenHistory={() => setShowHistoryDrawer(true)}
        historyCount={history.length}
        speechHook={speechHook}
        showVoiceSettings={showVoiceSettings}
        setShowVoiceSettings={setShowVoiceSettings}
      />

      {/* Main Workspace Content */}
      <main style={{ flex: 1 }}>
        {/* Tab 1: Editorial Landing Page */}
        {activeTab === 'landing' && (
          <LandingPage
            onStartCommunicating={() => setActiveTab('dashboard')}
            onSelectFeature={(featId) => handleLaunchTranslatorMode(featId)}
            onOpenDictionary={() => setActiveTab('signopedia')}
          />
        )}

        {/* Tab 2: SaaS Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <Dashboard
              onNavigateTab={(tab) => setActiveTab(tab)}
              onLaunchTranslatorMode={handleLaunchTranslatorMode}
              history={history}
              speechHook={speechHook}
            />
          </div>
        )}

        {/* Tab 3: Translator Hub (3-in-1 Suite) */}
        {activeTab === 'translator' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <BotanicalBranch size={22} color="var(--color-forest-green)" />
                    <h1 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--color-forest-green)' }}>
                      Translation Suite
                    </h1>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Translate between Indian Sign Language, spoken voice, and text
                  </p>
                </div>

                {/* 3 Translation Modality Tabs */}
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: 'var(--color-soft-ivory)',
                    padding: '4px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1.5px solid var(--color-beige)',
                    gap: '4px'
                  }}
                >
                  <button
                    className={`btn btn-sm ${translatorSubMode === 'sign-to-text' ? 'btn-forest' : 'btn-ghost'}`}
                    onClick={() => setTranslatorSubMode('sign-to-text')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', padding: '6px 14px' }}
                  >
                    <Camera size={14} /> Sign-to-Text
                  </button>
                  <button
                    className={`btn btn-sm ${translatorSubMode === 'text-to-sign' ? 'btn-forest' : 'btn-ghost'}`}
                    onClick={() => setTranslatorSubMode('text-to-sign')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', padding: '6px 14px' }}
                  >
                    <Type size={14} /> Text-to-Sign
                  </button>
                  <button
                    className={`btn btn-sm ${translatorSubMode === 'speech-to-sign' ? 'btn-forest' : 'btn-ghost'}`}
                    onClick={() => setTranslatorSubMode('speech-to-sign')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', padding: '6px 14px' }}
                  >
                    <Mic size={14} /> Speech-to-Sign
                  </button>
                </div>
              </div>

              {/* Modality View Render */}
              {translatorSubMode === 'sign-to-text' && (
                <SignToText speechHook={speechHook} onSaveToHistory={handleSaveToHistory} />
              )}
              {translatorSubMode === 'text-to-sign' && (
                <TextToSign speechHook={speechHook} />
              )}
              {translatorSubMode === 'speech-to-sign' && (
                <SpeechToSign speechHook={speechHook} />
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Two-Way Conversation */}
        {activeTab === 'twoway' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <TwoWayConversation speechHook={speechHook} />
          </div>
        )}

        {/* Tab 5: ISL Sign-o-Pedia Dictionary */}
        {activeTab === 'signopedia' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <Signopedia speechHook={speechHook} onPracticeSign={handlePracticeSignFromDict} />
          </div>
        )}

        {/* Tab 6: Practice & Quiz Studio */}
        {activeTab === 'practice' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <PracticeStudio speechHook={speechHook} />
          </div>
        )}

        {/* Tab 7: Emergency Quick Cards */}
        {activeTab === 'emergency' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <EmergencyCards speechHook={speechHook} />
          </div>
        )}

        {/* Tab 8: About & Mission */}
        {activeTab === 'about' && (
          <div className="container" style={{ padding: '36px 24px 60px' }}>
            <AboutSection
              onStartCommunicating={() => setActiveTab('dashboard')}
              onOpenDictionary={() => setActiveTab('signopedia')}
            />
          </div>
        )}
      </main>

      {/* Accessibility Control Modal */}
      <AccessibilityBar
        a11ySettings={a11ySettings}
        setA11ySettings={setA11ySettings}
        isOpen={showA11yModal}
        onClose={() => setShowA11yModal(false)}
      />

      {/* Activity History Drawer */}
      <HistoryDrawer
        isOpen={showHistoryDrawer}
        onClose={() => setShowHistoryDrawer(false)}
        history={history}
        onClearHistory={handleClearHistory}
        speechHook={speechHook}
      />

      {/* Global Botanical Footer (When not on Landing Page, since landing has its own footer) */}
      {activeTab !== 'landing' && (
        <footer style={{ borderTop: '1px solid var(--color-beige)', padding: '24px 0', backgroundColor: 'var(--color-soft-ivory)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🌿</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-forest-green)' }}>
                SignSpeak
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Empowering India's Deaf & Hard-of-Hearing Community through ISL AI
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>WCAG 2.1 AAA Compliant</span>
              <span>•</span>
              <span>100% In-Browser Privacy</span>
              <span>•</span>
              <span>Indian Sign Language (ISL) Standard</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
