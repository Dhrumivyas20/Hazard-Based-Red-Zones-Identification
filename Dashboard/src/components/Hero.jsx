import React from 'react';

export default function Hero({ metrics, loadingMetrics }) {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-grid">
        {/* Left Hero Content */}
        <div className="hero-content">
          <div className="badge-pill">
            <span className="pulse-beacon"></span>
            <span className="badge-text">AI-Powered Hazard Zonation System</span>
          </div>

          <h1 className="hero-title">
            Predicting Hazard Red Zones <br />
            <span className="gradient-highlight">Before Disaster Strikes</span>
          </h1>

          <p className="hero-description">
            Intelligent identification of hazard-based red zones, multi-dimensional carrying capacity assessment, and automated immediate relocation planning for vulnerable habitations.
          </p>

          {/* Polished Stat Cards Row */}
          <div className="stats-row">
            {loadingMetrics ? (
              <div className="stat-loading">Loading telemetry metrics...</div>
            ) : (
              metrics.map((m, idx) => (
                <div key={idx} className={`stat-card stat-${m.badge_type || 'blue'}`}>
                  <div className="stat-card-top">
                    <span className={`stat-dot dot-${m.badge_type || 'blue'}`}></span>
                    <span className="stat-value">{m.metric_value}</span>
                  </div>
                  <div className="stat-label">{m.metric_name}</div>
                  <div className="stat-subtext">
                    {idx === 0 ? 'Satellite GIS Zonation' : idx === 1 ? 'Socio-Ecological Load' : 'Instant Safe-Site Match'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Hero Visual with High-Tech Radar & Glassmorphism Chips */}
        <div className="hero-visual">
          <div className="radar-display-card">
            {/* Ambient radar grid & rings */}
            <div className="radar-grid-axis"></div>
            <div className="radar-circle radar-c1"></div>
            <div className="radar-circle radar-c2"></div>
            <div className="radar-circle radar-c3"></div>
            <div className="radar-sweep"></div>

            {/* Central Glowing Shield with Ripple Waves */}
            <div className="core-shield-container">
              <div className="pulse-ring ring-1"></div>
              <div className="pulse-ring ring-2"></div>
              <div className="core-shield">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6V12C4 17.55 7.42 22.7 12 24C16.58 22.7 20 17.55 20 12V6L12 2Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Floating Glassmorphism Chips with Status Badges */}
            <div className="floating-chip chip-top-left float-anim-1">
              <div className="chip-icon-box chip-icon-red">🔴</div>
              <div className="chip-content">
                <span className="chip-title">Hazard-Based Red Zones</span>
                <span className="chip-badge badge-red">Critical Severity</span>
              </div>
            </div>

            <div className="floating-chip chip-top-right float-anim-2">
              <div className="chip-icon-box chip-icon-green">⚖️</div>
              <div className="chip-content">
                <span className="chip-title">Carrying Capacity Assessment</span>
                <span className="chip-badge badge-green">142% Overload</span>
              </div>
            </div>

            <div className="floating-chip chip-bottom-left float-anim-3">
              <div className="chip-icon-box chip-icon-orange">🚨</div>
              <div className="chip-content">
                <span className="chip-title">Immediate Relocation Needs</span>
                <span className="chip-badge badge-orange">Priority 1 Active</span>
              </div>
            </div>

            <div className="floating-chip chip-bottom-right float-anim-4">
              <div className="chip-icon-box chip-icon-purple">🧭</div>
              <div className="chip-content">
                <span className="chip-title">Automatic Safe-Site Discovery</span>
                <span className="chip-badge badge-purple">3 Safe Zones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
