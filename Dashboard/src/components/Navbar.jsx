import React, { useState } from 'react';

export default function Navbar({ user, onOpenAuth, onLogout, onOpenDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand-logo" onClick={(e) => scrollToSection(e, 'hero')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <img src="/logo.png" alt="NARADA Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          </div>
          <div className="brand-text">
            <span className="brand-title">NARADA</span>
            <span className="brand-subtitle">OPERATIONAL COMMAND · HAZARD & RELOCATION INTELLIGENCE</span>
          </div>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#hero" className="nav-link" onClick={(e) => scrollToSection(e, 'hero')}>Overview</a>
          <a href="#features" className="nav-link" onClick={(e) => scrollToSection(e, 'features')}>Capabilities</a>
          <a href="#actions" className="nav-link" onClick={(e) => scrollToSection(e, 'actions')}>Operations Hub</a>
          <a href="#deploy" className="nav-link" onClick={(e) => scrollToSection(e, 'deploy')}>NDMA Directives</a>
        </nav>

        <div className="header-actions">
          {/* Operations Hub CTA */}
          <button className="btn btn-outline desktop-only" onClick={(e) => scrollToSection(e, 'actions')}>
            Operations Hub
          </button>

          {/* User Session or Get Started Signup CTA */}
          {user ? (
            <div className="logged-in-container">
              <div className="user-profile-badge">
                <span className="user-avatar-dot"></span>
                <span className="user-name-label">{user.name}</span>
                <span className="user-role-label">({user.role?.split('/')[0].trim() || 'COMMANDER'})</span>
              </div>
              <button className="btn btn-outline btn-signout" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => onOpenAuth('signup')}>
              Get Started &rarr;
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
