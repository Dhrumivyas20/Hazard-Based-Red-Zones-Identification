import React from 'react';

const ACTION_REGISTER_DATA = [
  {
    name: 'Joshimath',
    coords: '30.555°N / 79.565°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '16,709',
    mlLandslide: '89.3%',
    mlDemand: '~850 fams',
    priorityTier: 'Immediate',
    score: '1.0'
  },
  {
    name: 'Tapovan',
    coords: '30.590°N / 79.530°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '2,100',
    mlLandslide: '87.6%',
    mlDemand: '~210 fams',
    priorityTier: 'Immediate',
    score: '0.6'
  },
  {
    name: 'Sonprayag',
    coords: '30.664°N / 79.050°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '1,200',
    mlLandslide: '79.8%',
    mlDemand: '~130 fams',
    priorityTier: 'Short-term',
    score: '0.6'
  },
  {
    name: 'Helang',
    coords: '30.570°N / 79.550°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '1,100',
    mlLandslide: '82.4%',
    mlDemand: '~113 fams',
    priorityTier: 'Short-term',
    score: '0.6'
  },
  {
    name: 'Pandukeshwar',
    coords: '30.600°N / 79.570°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '700',
    mlLandslide: '84.5%',
    mlDemand: '~92 fams',
    priorityTier: 'Short-term',
    score: '0.6'
  },
  {
    name: 'Kedarnath (Rambara belt)',
    coords: '30.735°N / 79.067°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '450',
    mlLandslide: '84.8%',
    mlDemand: '~86 fams',
    priorityTier: 'Short-term',
    score: '0.6'
  },
  {
    name: 'Gaurikund',
    coords: '30.689°N / 79.029°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '800',
    mlLandslide: '82.4%',
    mlDemand: '~80 fams',
    priorityTier: 'Short-term',
    score: '0.6'
  },
  {
    name: 'Chopta',
    coords: '30.480°N / 79.190°E',
    incidents: '1 incident(s)',
    zone: 'Red',
    population: '360',
    mlLandslide: '80.8%',
    mlDemand: '~31 fams',
    priorityTier: 'Short-term',
    score: '0.6'
  }
];

export default function ReportsView() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rep-page-container">
      {/* 1. Page Header & Print CTA */}
      <div className="rep-page-header">
        <div className="rep-header-text-col">
          <span className="rep-top-eyebrow">
            DISTRICT BRIEFING DESK &nbsp;•&nbsp; OFFICIAL SITUATION REPORT
          </span>
          <h1 className="rep-top-title">Regional Disaster & Relocation Briefing</h1>
          <p className="rep-top-desc">
            Formal print-friendly decision report for district magistrates, SDRF disaster response officers, and rehabilitation planning committees.
          </p>
        </div>

        <div className="rep-header-cta-col">
          <button
            type="button"
            className="rep-btn-print"
            onClick={handlePrint}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>Print Briefing Report</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Top Statistics Cards */}
      <div className="rep-stats-grid">
        {/* Card 1: Operating Corridor */}
        <div className="rep-stat-card card-white">
          <span className="rep-stat-eyebrow">OPERATING CORRIDOR</span>
          <h3 className="rep-stat-title-text">Rudraprayag & Chamoli, Uttarakhand</h3>
          <span className="rep-stat-sub-text font-mono">20 villages &nbsp;·&nbsp; 71,959 population</span>
        </div>

        {/* Card 2: Population at Risk */}
        <div className="rep-stat-card card-coral">
          <span className="rep-stat-eyebrow text-coral">POPULATION AT RISK</span>
          <div className="rep-stat-num-row">
            <span className="rep-stat-big-num text-coral font-mono">23,159</span>
          </div>
          <span className="rep-stat-sub-text text-coral-dark">8 high-hazard villages</span>
        </div>

        {/* Card 3: Immediate Priority Queue */}
        <div className="rep-stat-card card-amber">
          <span className="rep-stat-eyebrow text-amber">IMMEDIATE PRIORITY QUEUE</span>
          <div className="rep-stat-num-row">
            <span className="rep-stat-big-num text-amber font-mono">2</span>
          </div>
          <span className="rep-stat-sub-text text-amber-dark">Requires expedited site matching</span>
        </div>

        {/* Card 4: ML Relocation Demand */}
        <div className="rep-stat-card card-peach">
          <span className="rep-stat-eyebrow text-peach">ML RELOCATION DEMAND</span>
          <div className="rep-stat-num-row">
            <span className="rep-stat-big-num text-peach font-mono">~2,021</span>
          </div>
          <span className="rep-stat-sub-text text-peach-dark">Displaced households requiring sites</span>
        </div>
      </div>

      {/* 3. Main Action Register Table Card */}
      <div className="rep-main-card">
        {/* Card Header */}
        <div className="rep-card-header">
          <div className="rep-header-left">
            <div className="rep-icon-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="rep-header-titles">
              <span className="rep-eyebrow-lbl">ACTION REGISTER</span>
              <h2 className="rep-main-heading">Immediate & Short-Term Relocation Candidates</h2>
            </div>
          </div>

          <div className="rep-header-right">
            <span className="rep-counter-pill font-mono">8 action items</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="rep-table-wrap">
          <table className="rep-action-table">
            <thead>
              <tr>
                <th className="th-village">VILLAGE</th>
                <th className="th-zone">ZONE</th>
                <th className="th-pop">POPULATION</th>
                <th className="th-ml">ML LANDSLIDE</th>
                <th className="th-demand">ML DEMAND</th>
                <th className="th-tier">PRIORITY TIER</th>
                <th className="th-score">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {ACTION_REGISTER_DATA.map((item, idx) => (
                <tr key={idx} className="rep-tr">
                  <td className="td-village">
                    <div className="rep-village-cell">
                      <span className="rep-village-title">{item.name}</span>
                      <span className="rep-village-subtitle font-mono">
                        {item.coords} &nbsp;·&nbsp; {item.incidents}
                      </span>
                    </div>
                  </td>

                  <td className="td-zone">
                    <span className="rep-badge-zone-red">{item.zone}</span>
                  </td>

                  <td className="td-pop font-mono">
                    {item.population}
                  </td>

                  <td className="td-ml font-mono">
                    {item.mlLandslide}
                  </td>

                  <td className="td-demand font-mono">
                    {item.mlDemand}
                  </td>

                  <td className="td-tier">
                    <span className={`rep-tier-badge tier-${item.priorityTier.toLowerCase()}`}>
                      {item.priorityTier}
                    </span>
                  </td>

                  <td className="td-score font-mono bold">
                    {item.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Bottom 2-Card Row */}
      <div className="rep-bottom-grid">
        {/* Left Dark Slate Card: Governance & Protocol */}
        <div className="rep-protocol-dark-card">
          <div className="rep-protocol-head">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rep-shield-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="rep-protocol-eyebrow">GOVERNANCE & DECISION PROTOCOL</span>
          </div>

          <h3 className="rep-protocol-title">Auditable, Transparent Decision Support</h3>

          <div className="rep-protocol-body">
            <p>
              Multi-Hazard Risk scores combine deterministic historical records (70%) with calibrated ML landslide susceptibility (30%).
            </p>
            <p>
              AHP candidate site suitability and carrying capacity constraints ensure all recommendations are operationally feasible before district execution.
            </p>
          </div>

          <div className="rep-protocol-footer font-mono">
            <span>GENERATED FROM LIVE REGIONAL MODEL PIPELINES &nbsp;•&nbsp; PIXELALCHEMY PLATFORM</span>
          </div>
        </div>

        {/* Right White Card: Critical Infrastructure Layer */}
        <div className="rep-lifeline-white-card">
          <div className="rep-lifeline-head">
            <span className="rep-lifeline-eyebrow">CRITICAL INFRASTRUCTURE LAYER</span>
            <h3 className="rep-lifeline-title">Mapped Lifeline Facilities</h3>
          </div>

          <div className="rep-lifeline-tiles-grid">
            <div className="rep-tile-item">
              <span className="rep-tile-num font-mono">6</span>
              <span className="rep-tile-label font-mono">HOSPITALS</span>
            </div>
            <div className="rep-tile-item">
              <span className="rep-tile-num font-mono">7</span>
              <span className="rep-tile-label font-mono">SCHOOLS</span>
            </div>
            <div className="rep-tile-item">
              <span className="rep-tile-num font-mono">7</span>
              <span className="rep-tile-label font-mono">WATER SITES</span>
            </div>
          </div>

          <div className="rep-authority-box">
            <span className="rep-auth-lbl font-mono">ADMINISTRATIVE AUTHORITY:</span>
            <span className="rep-auth-val">
              District Disaster Management Authority (DDMA), Rudraprayag & Chamoli
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
