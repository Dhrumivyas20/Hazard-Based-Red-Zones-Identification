import React from 'react';

export default function CtaBanner({ onOpenAction }) {
  return (
    <section className="cta-section" id="deploy">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <span className="cta-eyebrow font-mono">OPERATIONAL READINESS</span>
            <h2 className="cta-title">Ready to Safeguard Vulnerable Habitations?</h2>
            <p className="cta-subtitle">
              Experience the state-of-the-art predictive hazard zonation, carrying capacity modeling, and automated relocation planning with NARADA Operational Command.
            </p>
            <button className="btn btn-cta-action" onClick={onOpenAction}>
              <span>Enter Operational Portal</span>
              <span className="arrow">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
