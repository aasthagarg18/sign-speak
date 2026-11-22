import React, { useState } from 'react';
import {
  Sparkles, Camera, Volume2, Eye, History, ShieldAlert,
  MessageSquare, BookOpen, Award, Menu, X, LayoutDashboard, Home, Users
} from 'lucide-react';
import { BrandLeafHand, BotanicalBranch } from './BotanicalDecorations';
import SignToSpeechControls from './SignToSpeechControls';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenA11y,
  onOpenHistory,
  historyCount = 0,
  speechHook,
  showVoiceSettings,
  setShowVoiceSettings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'translator', label: 'Translator Hub', icon: Sparkles, badge: '4-in-1' },
    { id: 'twoway', label: '2-Way Chat', icon: MessageSquare },
    { id: 'signopedia', label: 'Sign-o-Pedia', icon: BookOpen, badge: '60+' },
    { id: 'practice', label: 'Practice', icon: Award },
    { id: 'emergency', label: 'Emergency', icon: ShieldAlert, isAlert: true },
    { id: 'about', label: 'About', icon: Users }
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="botanical-navbar">
      <div
        className="container"
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Brand Logo & Editorial Wordmark */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => handleSelectTab('landing')}
        >
          <BrandLeafHand size={38} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: 'var(--color-forest-green)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1
                }}
              >
                SignSpeak
              </span>
              <span
                className="badge badge-forest"
                style={{ fontSize: '0.6875rem', padding: '2px 6px', fontWeight: 700 }}
              >
                ISL AI
              </span>
            </div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-taupe)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Indian Sign Language Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={
                  item.isAlert && !isActive
                    ? { color: 'var(--color-rust)', fontWeight: 600 }
                    : {}
                }
              >
                <Icon size={15} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.625rem',
                      padding: '1px 5px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isActive ? 'rgba(255, 253, 248, 0.25)' : 'var(--color-beige)',
                      color: isActive ? '#FFFDF8' : 'var(--color-forest-green)',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Primary CTA (if on landing page, quick action) */}
          {activeTab === 'landing' ? (
            <button
              className="btn btn-primary"
              onClick={() => handleSelectTab('dashboard')}
              style={{
                backgroundColor: 'var(--color-rust)',
                color: '#FFFDF8',
                padding: '8px 18px',
                fontWeight: 700,
                fontSize: '0.8125rem'
              }}
            >
              Enter Workspace
            </button>
          ) : (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleSelectTab('translator')}
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '7px 14px',
                borderColor: 'var(--color-taupe)'
              }}
            >
              <Camera size={14} /> Quick Sign
            </button>
          )}

          {/* Voice Settings Popover Trigger */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-icon"
              onClick={() => setShowVoiceSettings(!showVoiceSettings)}
              title="Voice output & speech settings"
              style={{ width: '36px', height: '36px' }}
            >
              <Volume2 size={16} color="var(--color-forest-green)" />
            </button>

            {showVoiceSettings && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '320px',
                  zIndex: 1000,
                  boxShadow: 'var(--shadow-lg)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <SignToSpeechControls speechHook={speechHook} />
              </div>
            )}
          </div>

          {/* Accessibility Settings */}
          <button
            className="btn btn-secondary btn-icon"
            onClick={onOpenA11y}
            title="Accessibility Control Center (WCAG AAA)"
            style={{ width: '36px', height: '36px' }}
          >
            <Eye size={16} color="var(--color-forest-green)" />
          </button>

          {/* History Drawer Trigger */}
          <button
            className="btn btn-secondary btn-icon"
            onClick={onOpenHistory}
            title="Saved Activity History"
            style={{ width: '36px', height: '36px', position: 'relative' }}
          >
            <History size={16} color="var(--color-forest-green)" />
            {historyCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-rust)',
                  color: '#FFFDF8',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {historyCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className="btn btn-secondary btn-icon nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', width: '36px', height: '36px' }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-soft-ivory)',
            borderBottom: '1px solid var(--color-beige)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  padding: '10px 14px'
                }}
              >
                <Icon size={18} />
                <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
