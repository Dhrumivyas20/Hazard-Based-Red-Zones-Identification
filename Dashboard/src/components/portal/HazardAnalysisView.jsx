import React from 'react';

const HAZARD_BANDS = [
  {
    name: 'Red Zone',
    color: '#B94A48',
    count: 8,
    avgScore: '95.2%',
    pct: 40
  },
  {
    name: 'Orange Zone',
    color: '#D4622B',
    count: 0,
    avgScore: '0.0%',
    pct: 0
  },
  {
    name: 'Yellow Zone',
    color: '#D99B26',
    count: 10,
    avgScore: '29.6%',
    pct: 50
  },
  {
    name: 'Green Zone',
    color: '#3B7A57',
    count: 2,
    avgScore: '17.4%',
    pct: 10
  }
];

const HIGHEST_HAZARD_SCORES = [
  {
    num: '01',
    name: 'Joshimath',
    meta: 'High baseline · ML: 89% · 16,709 people',
    score: '96.8%'
  },
  {
    num: '02',
    name: 'Tapovan',
    meta: 'High baseline · ML: 88% · 2,100 people',
    score: '96.3%'
  },
  {
    num: '03',
    name: 'Kedarnath (Rambara belt)',
    meta: 'High baseline · ML: 85% · 450 people',
    score: '95.4%'
  },
  {
    num: '04',
    name: 'Pandukeshwar',
    meta: 'High baseline · ML: 85% · 700 people',
    score: '95.4%'
  },
  {
    num: '05',
    name: 'Gaurikund',
    meta: 'High baseline · ML: 82% · 600 people',
    score: '94.7%'
  },
  {
    num: '06',
    name: 'Helang',
    meta: 'High baseline · ML: 82% · 1,100 people',
    score: '94.7%'
  }
];

export default function HazardAnalysisView() {
  return (
    <div className="hz-page-container">
      {/* Top Header & Context Description */}
      <div className="hz-page-header">
        <div className="hz-header-text-col">
          <span className="hz-eyebrow-tag">ANALYSIS DESK &nbsp;•&nbsp; MULTI-HAZARD & ML FUSION</span>
          <h1 className="hz-main-title">Hazard Analysis</h1>
          <p className="hz-desc-para">
            Compare zone distribution with calibrated village scores. Multi-hazard risk is derived from 70% deterministic indicators and 30% ML landslide susceptibility.
          </p>
        </div>

        <div className="hz-header-badge-col">
          <span className="hz-risk-fusion-badge">Risk Fusion 70/30</span>
        </div>
      </div>

      {/* Main 2-Card Grid */}
      <div className="hz-cards-grid">
        
        {/* Left Card: Zone Distribution */}
        <div className="hz-display-card">
          <div className="hz-card-head">
            <div className="hz-card-label-col">
              <span className="hz-section-eyebrow">ZONE DISTRIBUTION</span>
              <h2 className="hz-card-title">Villages by Hazard Band</h2>
            </div>
            <div className="hz-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E381F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
          </div>

          <div className="hz-bands-list">
            {HAZARD_BANDS.map((band) => (
              <div key={band.name} className="hz-band-item">
                <div className="hz-band-top">
                  <div className="hz-band-name-row">
                    <span className="hz-band-dot" style={{ backgroundColor: band.color }}></span>
                    <span className="hz-band-name">{band.name}</span>
                  </div>
                  <span className="hz-band-stats">
                    {band.count} villages &nbsp;·&nbsp; {band.avgScore} avg score
                  </span>
                </div>
                <div className="hz-band-track">
                  <div
                    className="hz-band-fill"
                    style={{
                      width: `${band.pct}%`,
                      backgroundColor: band.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Exposure Signal (Highest Hazard Scores) */}
        <div className="hz-display-card">
          <div className="hz-card-head">
            <div className="hz-card-label-col">
              <span className="hz-section-eyebrow text-coral">EXPOSURE SIGNAL</span>
              <h2 className="hz-card-title">Highest Hazard Scores</h2>
            </div>
            <div className="hz-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C85A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>

          <div className="hz-scores-list">
            {HIGHEST_HAZARD_SCORES.map((item) => (
              <div key={item.num} className="hz-score-row">
                <span className="hz-score-index">{item.num}</span>
                <div className="hz-score-details">
                  <h3 className="hz-score-village">{item.name}</h3>
                  <span className="hz-score-meta">{item.meta}</span>
                </div>
                <div className="hz-score-right">
                  <span className="hz-score-num">{item.score}</span>
                  <span className="hz-score-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Methodology Dark Banner */}
      <div className="hz-bottom-banner">
        <div className="hz-banner-text-col">
          <span className="hz-banner-eyebrow">MULTI-HAZARD METHODOLOGY</span>
          <p className="hz-banner-p">
            Final hazard scores combine historical disaster exposure (70%) with ML landslide probability (30%).
          </p>
          <p className="hz-banner-p">
            Population pressure and household exposure are factored in to rank actionable relocation priorities.
          </p>
        </div>

        <button type="button" className="hz-banner-action-btn">
          <span>View Urgency Queue</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
