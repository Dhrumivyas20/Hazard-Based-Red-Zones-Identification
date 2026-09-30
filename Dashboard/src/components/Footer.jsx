import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="brand-logo footer-logo">
            <div className="brand-icon">
              <img src="/logo.png" alt="NARADA Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            </div>
            <span className="brand-title">NARADA</span>
          </div>
          <p className="footer-desc">
            Operational command system for multi-hazard susceptibility prediction, carrying capacity assessment, and evidence-based safe site relocation intelligence across Uttarakhand.
          </p>
        </div>

        <div className="footer-links">
          <div className="link-col">
            <h4>Core Platform</h4>
            <a href="#features">AI Red Zone Prediction</a>
            <a href="#features">Carrying Capacity Screen</a>
            <a href="#features">Relocation Directives</a>
            <a href="#features">AHP Multi-Criteria Ranking</a>
          </div>
          <div className="link-col">
            <h4>Integrations</h4>
            <a href="#features">PostgreSQL Database</a>
            <a href="#features">FastAPI AI Microservice</a>
            <a href="#features">InSAR Radar Feeds</a>
            <a href="#features">OpenStreetMap GIS Engine</a>
          </div>
          <div className="link-col">
            <h4>Governance & Standards</h4>
            <a href="#deploy">Disaster Management Authority</a>
            <a href="#deploy">District Collector Portal</a>
            <a href="#deploy">NDMA Section 38 Compliance</a>
            <a href="#deploy">Auditable Risk Matrices</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 NARADA Operational Command. Developed for Resilient Community Protection & Relocation.</p>
          <div className="sys-badge font-mono">
            <span className="status-dot"></span> PostgreSQL & FastAPI ML Models Synced
          </div>
        </div>
      </div>
    </footer>
  );
}
