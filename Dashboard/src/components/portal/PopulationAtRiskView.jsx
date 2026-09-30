import React from 'react';

const HIGH_RISK_COMMUNITIES = [
  {
    village: 'Joshimath',
    zone: 'Red',
    population: '16,709',
    households: '3,800',
    demand: '~850 fams'
  },
  {
    village: 'Tapovan',
    zone: 'Red',
    population: '2,100',
    households: '480',
    demand: '~210 fams'
  },
  {
    village: 'Sonprayag',
    zone: 'Red',
    population: '1,200',
    households: '280',
    demand: '~130 fams'
  },
  {
    village: 'Helang',
    zone: 'Red',
    population: '1,100',
    households: '260',
    demand: '~113 fams'
  },
  {
    village: 'Pandukeshwar',
    zone: 'Red',
    population: '700',
    households: '160',
    demand: '~92 fams'
  },
  {
    village: 'Gaurikund',
    zone: 'Red',
    population: '600',
    households: '150',
    demand: '~86 fams'
  },
  {
    village: 'Kedarnath (Rambara belt)',
    zone: 'Red',
    population: '450',
    households: '120',
    demand: '~86 fams'
  },
  {
    village: 'Chopta',
    zone: 'Red',
    population: '300',
    households: '70',
    demand: '~31 fams'
  }
];

export default function PopulationAtRiskView({ onNavigateToRelocation }) {
  return (
    <div className="par-page-container">
      {/* 1. Header & Context */}
      <div className="par-page-header">
        <div className="par-header-text-col">
          <span className="par-eyebrow-tag">HUMAN IMPACT ANALYSIS &nbsp;•&nbsp; RUDRAPRAYAG & CHAMOLI</span>
          <h1 className="par-main-title">Population at Risk</h1>
          <p className="par-desc-para">
            Translate multi-hazard exposure into affected households and displaced population demand to prioritize human-centric disaster mitigation.
          </p>
        </div>

        <div className="par-header-badge-col">
          <span className="par-exposed-badge">32.2% exposed</span>
        </div>
      </div>

      {/* 2. Top 4-KPI Row */}
      <div className="par-kpis-grid">
        {/* KPI 1 */}
        <div className="par-kpi-card card-coral-tint">
          <div className="par-kpi-head">
            <span className="par-kpi-eyebrow text-coral">PEOPLE AT HIGH RISK</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C85A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="par-kpi-val text-coral">23,159</h2>
          <span className="par-kpi-sub text-coral">8 high-risk villages</span>
        </div>

        {/* KPI 2 */}
        <div className="par-kpi-card">
          <div className="par-kpi-head">
            <span className="par-kpi-eyebrow">HOUSEHOLDS MAPPED</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h2 className="par-kpi-val">16,260</h2>
          <span className="par-kpi-sub">Mapped across 20 villages</span>
        </div>

        {/* KPI 3 */}
        <div className="par-kpi-card">
          <div className="par-kpi-head">
            <span className="par-kpi-eyebrow">TOTAL REGIONAL POPULATION</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="par-kpi-val">71,959</h2>
          <span className="par-kpi-sub">Rudraprayag & Chamoli districts</span>
        </div>

        {/* KPI 4 */}
        <div className="par-kpi-card">
          <div className="par-kpi-head">
            <span className="par-kpi-eyebrow text-terracotta">ML RELOCATION DEMAND</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B94A48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" />
              <line x1="20" y1="14" x2="23" y2="14" />
              <line x1="1" y1="9" x2="4" y2="9" />
              <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
          </div>
          <h2 className="par-kpi-val text-terracotta">
            ~2,021 <span className="par-val-unit">fams</span>
          </h2>
          <span className="par-kpi-sub">Estimated families requiring relocation</span>
        </div>
      </div>

      {/* 3. Middle Card: Population Distribution Across Risk Zones */}
      <div className="par-distribution-card">
        <div className="par-dist-head">
          <span className="par-dist-eyebrow">HAZARD BAND BREAKDOWN</span>
          <h2 className="par-dist-title">Population Distribution Across Risk Zones</h2>
        </div>

        <div className="par-zones-2x2-grid">
          {/* Red Zone */}
          <div className="par-zone-item">
            <div className="par-zone-top-row">
              <div className="par-zone-name-wrap">
                <span className="par-zone-dot dot-red"></span>
                <span className="par-zone-name">Red Hazard Zone</span>
              </div>
              <span className="par-zone-count">8 villages</span>
            </div>
            <div className="par-zone-metrics">
              <h3 className="par-zone-pop-num">23,159</h3>
              <span className="par-zone-sub">residents · 5,310 households</span>
            </div>
            <div className="par-zone-track">
              <div className="par-zone-fill fill-red" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Orange Zone */}
          <div className="par-zone-item">
            <div className="par-zone-top-row">
              <div className="par-zone-name-wrap">
                <span className="par-zone-dot dot-orange"></span>
                <span className="par-zone-name">Orange Hazard Zone</span>
              </div>
              <span className="par-zone-count">0 villages</span>
            </div>
            <div className="par-zone-metrics">
              <h3 className="par-zone-pop-num">0</h3>
              <span className="par-zone-sub">residents · 0 households</span>
            </div>
            <div className="par-zone-track">
              <div className="par-zone-fill fill-orange" style={{ width: '0%' }}></div>
            </div>
          </div>

          {/* Yellow Zone */}
          <div className="par-zone-item">
            <div className="par-zone-top-row">
              <div className="par-zone-name-wrap">
                <span className="par-zone-dot dot-yellow"></span>
                <span className="par-zone-name">Yellow Hazard Zone</span>
              </div>
              <span className="par-zone-count">10 villages</span>
            </div>
            <div className="par-zone-metrics">
              <h3 className="par-zone-pop-num">43,700</h3>
              <span className="par-zone-sub">residents · 9,790 households</span>
            </div>
            <div className="par-zone-track">
              <div className="par-zone-fill fill-yellow" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Green Zone */}
          <div className="par-zone-item">
            <div className="par-zone-top-row">
              <div className="par-zone-name-wrap">
                <span className="par-zone-dot dot-green"></span>
                <span className="par-zone-name">Green Hazard Zone</span>
              </div>
              <span className="par-zone-count">2 villages</span>
            </div>
            <div className="par-zone-metrics">
              <h3 className="par-zone-pop-num">5,100</h3>
              <span className="par-zone-sub">residents · 1,160 households</span>
            </div>
            <div className="par-zone-track">
              <div className="par-zone-fill fill-green" style={{ width: '22%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Card: High-Risk Communities by Population Size */}
      <div className="par-communities-card">
        <div className="par-comm-head-row">
          <div className="par-comm-title-col">
            <span className="par-comm-eyebrow">PRIORITY EXPOSURE</span>
            <h2 className="par-comm-title">High-Risk Communities by Population Size</h2>
          </div>
          <button
            type="button"
            className="par-btn-urgency-queue"
            onClick={onNavigateToRelocation}
          >
            <span>Urgency Queue</span>
            <span className="arrow">→</span>
          </button>
        </div>

        <div className="par-table-wrap">
          <table className="par-communities-table">
            <thead>
              <tr>
                <th className="th-village">VILLAGE</th>
                <th className="th-zone">HAZARD ZONE</th>
                <th className="th-pop">POPULATION</th>
                <th className="th-hh">HOUSEHOLDS</th>
                <th className="th-demand">ML DEMAND</th>
                <th className="th-action">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {HIGH_RISK_COMMUNITIES.map((item, idx) => (
                <tr key={idx} className="par-table-row">
                  <td className="td-village">
                    <span className="par-village-name">{item.village}</span>
                  </td>
                  <td className="td-zone">
                    <span className="par-red-pill">Red</span>
                  </td>
                  <td className="td-pop">
                    <span className="par-num-bold">{item.population}</span>
                  </td>
                  <td className="td-hh">
                    <span className="par-num-regular">{item.households}</span>
                  </td>
                  <td className="td-demand">
                    <span className="par-demand-bold">{item.demand}</span>
                  </td>
                  <td className="td-action">
                    <button
                      type="button"
                      className="par-btn-relocation-action"
                      onClick={onNavigateToRelocation}
                    >
                      <span>Relocation</span>
                      <span className="arrow">→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
