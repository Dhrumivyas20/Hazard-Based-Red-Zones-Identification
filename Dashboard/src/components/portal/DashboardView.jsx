import React, { useState } from 'react';
import SpatialRiskMap from './SpatialRiskMap';

const ALL_PRIORITY_VILLAGES = [
  {
    rank: '01',
    initial: 'J',
    name: 'Joshimath',
    pop: '16,709 pop',
    prob: 'ML Prob: 89%',
    families: '~850 fams',
    score: '1.0',
    urgency: 'Immediate',
    urgencyType: 'immediate',
    bg: '#FDF2F0',
    color: '#C85A48',
    hazard: 'Subsidence & Rockfall'
  },
  {
    rank: '02',
    initial: 'T',
    name: 'Tapovan',
    pop: '2,100 pop',
    prob: 'ML Prob: 88%',
    families: '~210 fams',
    score: '0.6',
    urgency: 'Immediate',
    urgencyType: 'immediate',
    bg: '#FDF2F0',
    color: '#C85A48',
    hazard: 'Debris Flow & Flash Flood'
  },
  {
    rank: '03',
    initial: 'S',
    name: 'Sonprayag',
    pop: '1,200 pop',
    prob: 'ML Prob: 80%',
    families: '~130 fams',
    score: '0.6',
    urgency: 'Short-term',
    urgencyType: 'short-term',
    bg: '#FFF8F0',
    color: '#C2410C',
    hazard: 'River Bank Erosion'
  },
  {
    rank: '04',
    initial: 'H',
    name: 'Helang',
    pop: '1,100 pop',
    prob: 'ML Prob: 82%',
    families: '~113 fams',
    score: '0.6',
    urgency: 'Short-term',
    urgencyType: 'short-term',
    bg: '#FFF8F0',
    color: '#C2410C',
    hazard: 'Slope Instability'
  },
  {
    rank: '05',
    initial: 'P',
    name: 'Pandukeshwar',
    pop: '700 pop',
    prob: 'ML Prob: 85%',
    families: '~92 fams',
    score: '0.6',
    urgency: 'Short-term',
    urgencyType: 'short-term',
    bg: '#FFF8F0',
    color: '#C2410C',
    hazard: 'Toe Erosion & Landslide'
  }
];

export default function DashboardView({ onNavigateToTab, onScreenSafeSites }) {
  const [filterUrgency, setFilterUrgency] = useState('ALL');

  const filteredVillages = filterUrgency === 'ALL'
    ? ALL_PRIORITY_VILLAGES
    : ALL_PRIORITY_VILLAGES.filter(v => v.urgency.toLowerCase() === filterUrgency.toLowerCase());

  const handleVillageClick = (v) => {
    if (onScreenSafeSites) {
      onScreenSafeSites(v.name);
    } else if (onNavigateToTab) {
      onNavigateToTab('relocation-priority');
    }
  };

  return (
    <div className="dash-root-container">
      {/* 0. Top Situation Report Banner matching exact user screenshot */}
      <div className="dash-situation-banner">
        <div className="dash-situation-left">
          <span className="dash-situation-eyebrow font-mono">
            SITUATION REPORT &nbsp;·&nbsp; RUDRAPRAYAG & CHAMOLI
          </span>
          <h1 className="dash-situation-title">
            Protective Action, Made Legible.
          </h1>
          <p className="dash-situation-desc">
            A live decision-support view of community exposure across Rudraprayag & Chamoli, Uttarakhand.
            <br />
            Integrating deterministic risk baselines with ML hazard intelligence.
          </p>
        </div>

        <div className="dash-situation-right">
          <div className="dash-pipeline-status-chip font-mono">
            <span className="pipeline-dot"></span>
            <span className="pipeline-label">ML & Risk Pipeline Active</span>
            <span className="pipeline-state-badge">Operational</span>
          </div>
        </div>
      </div>

      {/* 1. Row 1: Demographics & Exposure KPI Cards */}
      <div className="dash-top-kpi-grid dash-demo-kpi-grid">
        {/* Card 1: Communities Tracked */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">COMMUNITIES TRACKED</span>
            <span className="dash-kpi-chip chip-olive">Pilot Corridor</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val font-mono">20</span>
          </div>
          <div className="dash-card-divider"></div>
          <span className="dash-kpi-sub sub-bullet">
            <span className="sub-bullet-dot dot-dark">●</span> Across Rudraprayag & Chamoli
          </span>
        </div>

        {/* Card 2: People Exposed */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">PEOPLE EXPOSED</span>
            <span className="dash-kpi-chip chip-coral">8 High-Risk</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val text-coral font-mono">23,159</span>
          </div>
          <div className="dash-card-divider"></div>
          <span className="dash-kpi-sub sub-bullet text-coral-sub">
            <span className="sub-bullet-dot dot-coral">●</span> Hazard mitigation priority queue
          </span>
        </div>

        {/* Card 3: Immediate Priority */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">IMMEDIATE PRIORITY</span>
            <span className="dash-kpi-chip chip-amber">Urgent Action</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val text-amber font-mono">2</span>
          </div>
          <div className="dash-card-divider"></div>
          <span className="dash-kpi-sub sub-bullet">
            <span className="sub-bullet-dot dot-amber">●</span> Scheduled for rapid relocation screening
          </span>
        </div>

        {/* Card 4: Households Mapped */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">HOUSEHOLDS MAPPED</span>
            <span className="dash-kpi-chip chip-olive">Full Census</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val font-mono">16,260</span>
          </div>
          <div className="dash-card-divider"></div>
          <span className="dash-kpi-sub sub-bullet">
            <span className="sub-bullet-dot dot-dark">●</span> 71,959 total population baseline
          </span>
        </div>
      </div>

      {/* 2. Row 2: ML Models & Fusion KPI Cards */}
      <div className="dash-top-kpi-grid dash-model-kpi-grid">
        {/* Card 1: ML Landslide Risk */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">ML LANDSLIDE RISK</span>
            <span className="dash-kpi-chip chip-olive">Calibrated</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val font-mono">53.7%</span>
          </div>
          <div className="dash-kpi-track">
            <div className="dash-kpi-fill fill-olive" style={{ width: '53.7%' }}></div>
          </div>
          <span className="dash-kpi-sub">Regional mean across pilot corridor</span>
        </div>

        {/* Card 2: Relocation Demand */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">RELOCATION DEMAND</span>
            <span className="dash-kpi-chip chip-amber">Demand Model</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val text-amber font-mono">2,021</span>
            <span className="dash-kpi-unit font-mono">families</span>
          </div>
          <div className="dash-kpi-track">
            <div className="dash-kpi-fill fill-amber" style={{ width: '42%' }}></div>
          </div>
          <span className="dash-kpi-sub">ML demand calibrated to village exposure</span>
        </div>

        {/* Card 3: Evaluated Habitations */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">EVALUATED HABITATIONS</span>
            <span className="dash-kpi-chip chip-olive">100% Coverage</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val font-mono">20</span>
            <span className="dash-kpi-denom font-mono">/ 20</span>
          </div>
          <div className="dash-kpi-track">
            <div className="dash-kpi-fill fill-olive" style={{ width: '100%' }}></div>
          </div>
          <span className="dash-kpi-sub">Full regional dataset evaluated with ML</span>
        </div>

        {/* Card 4: Multi-Hazard Fusion */}
        <div className="dash-kpi-card" tabIndex={0}>
          <div className="dash-kpi-head">
            <span className="dash-kpi-lbl">MULTI-HAZARD FUSION</span>
            <span className="dash-kpi-chip chip-olive">Dual Model</span>
          </div>
          <div className="dash-kpi-num-row">
            <span className="dash-kpi-val font-mono fusion-text">70% Det + 30% ML</span>
          </div>
          <div className="dash-kpi-track dual-track">
            <div className="dash-kpi-fill fill-olive" style={{ width: '70%' }} title="Deterministic 70%"></div>
            <div className="dash-kpi-fill fill-amber" style={{ width: '30%' }} title="ML Machine Learning 30%"></div>
          </div>
          <span className="dash-kpi-sub">Auditable deterministic base + ML blend</span>
        </div>
      </div>

      {/* 3. Middle Row: Spatial Heatmap & Priority Villages Queue */}
      <div className="dash-middle-grid">
        {/* Left Col: Spatial Heatmap with 4-Zone Footer */}
        <div className="dash-map-col">
          <SpatialRiskMap onFullMapView={() => onNavigateToTab && onNavigateToTab('risk-map')} />
        </div>

        {/* Right Col: Priority Villages Queue */}
        <div className="dash-queue-col">
          <div className="dash-queue-card">
            <div className="dash-queue-header">
              <div>
                <span className="dash-queue-eyebrow">URGENCY QUEUE</span>
                <h3 className="dash-queue-title">Priority Villages</h3>
              </div>
              <div className="dash-queue-header-actions">
                <div className="dash-queue-filter-pills">
                  <button
                    type="button"
                    className={`dash-pill-filter ${filterUrgency === 'ALL' ? 'active' : ''}`}
                    onClick={() => setFilterUrgency('ALL')}
                  >
                    All ({ALL_PRIORITY_VILLAGES.length})
                  </button>
                  <button
                    type="button"
                    className={`dash-pill-filter ${filterUrgency === 'Immediate' ? 'active' : ''}`}
                    onClick={() => setFilterUrgency('Immediate')}
                  >
                    Immediate (2)
                  </button>
                  <button
                    type="button"
                    className={`dash-pill-filter ${filterUrgency === 'Short-term' ? 'active' : ''}`}
                    onClick={() => setFilterUrgency('Short-term')}
                  >
                    Short-term (3)
                  </button>
                </div>
                <button
                  type="button"
                  className="dash-queue-arrow-btn"
                  onClick={() => onNavigateToTab && onNavigateToTab('relocation-priority')}
                  title="View full queue in Relocation Priority tab"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="dash-queue-list">
              {filteredVillages.map((v) => (
                <div
                  key={v.rank}
                  className="dash-village-row"
                  onClick={() => handleVillageClick(v)}
                  title={`Click to inspect ${v.name} and screen safe sites`}
                >
                  <span className="dash-v-rank font-mono">{v.rank}</span>
                  <div className="dash-v-initial" style={{ backgroundColor: v.bg, color: v.color }}>
                    {v.initial}
                  </div>
                  <div className="dash-v-details">
                    <div className="dash-v-name-row">
                      <h4 className="dash-v-name">{v.name}</h4>
                      <span className="dash-v-hazard-tag">{v.hazard}</span>
                    </div>
                    <p className="dash-v-metrics font-mono">
                      {v.pop} &nbsp;·&nbsp; {v.prob} &nbsp;·&nbsp; {v.families}
                    </p>
                  </div>
                  <div className="dash-v-score-box">
                    <span className="dash-v-score font-mono">{v.score}</span>
                    <span className={`dash-v-pill pill-${v.urgencyType}`}>
                      {v.urgency}
                    </span>
                  </div>
                  <div className="dash-v-arrow-link">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Urgency Distribution & Decision Architecture */}
      <div className="dash-bottom-grid">
        {/* Left Card: Relocation Urgency Distribution */}
        <div className="dash-distrib-card">
          <div className="dash-distrib-head">
            <div>
              <span className="dash-distrib-eyebrow">PRIORITY BREAKDOWN</span>
              <h3 className="dash-distrib-title">Relocation Urgency Distribution</h3>
            </div>
            <div className="dash-distrib-auditable-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2E381F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span className="dash-auditable-chip font-mono">Auditable</span>
            </div>
          </div>

          <div className="dash-distrib-bars-list">
            {/* Immediate */}
            <div className="dash-d-row" title="Immediate Priority (Joshimath, Tapovan)">
              <div className="dash-d-label-line">
                <span className="dash-d-name">Immediate</span>
                <div className="dash-d-counts font-mono">
                  <span className="dash-d-count">2.0</span>
                  <span className="dash-d-pct">(10%)</span>
                </div>
              </div>
              <div className="dash-d-track">
                <div className="dash-d-fill fill-red" style={{ width: '22%' }}></div>
              </div>
            </div>

            {/* Short-term */}
            <div className="dash-d-row" title="Short-term Relocation Urgency (6 habitations)">
              <div className="dash-d-label-line">
                <span className="dash-d-name">Short-term</span>
                <div className="dash-d-counts font-mono">
                  <span className="dash-d-count">6.0</span>
                  <span className="dash-d-pct">(30%)</span>
                </div>
              </div>
              <div className="dash-d-track">
                <div className="dash-d-fill fill-amber" style={{ width: '66%' }}></div>
              </div>
            </div>

            {/* Medium-term */}
            <div className="dash-d-row" title="Medium-term Mitigation (3 habitations)">
              <div className="dash-d-label-line">
                <span className="dash-d-name">Medium-term</span>
                <div className="dash-d-counts font-mono">
                  <span className="dash-d-count">3.0</span>
                  <span className="dash-d-pct">(15%)</span>
                </div>
              </div>
              <div className="dash-d-track">
                <div className="dash-d-fill fill-yellow" style={{ width: '33%' }}></div>
              </div>
            </div>

            {/* Monitor */}
            <div className="dash-d-row" title="Active Monitoring & Early Warning (9 habitations)">
              <div className="dash-d-label-line">
                <span className="dash-d-name">Monitor</span>
                <div className="dash-d-counts font-mono">
                  <span className="dash-d-count">9.0</span>
                  <span className="dash-d-pct">(45%)</span>
                </div>
              </div>
              <div className="dash-d-track">
                <div className="dash-d-fill fill-green" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          <div className="dash-distrib-footer-note font-mono">
            <span>TOTAL: 20 PILOT HABITATIONS · 100% REGIONAL AUDIT COMPLETE</span>
          </div>
        </div>

        {/* Right Card: Evidence-Based Decision Architecture */}
        <div className="dash-architecture-card">
          <div className="dash-arch-head">
            <div className="dash-arch-titles">
              <span className="dash-arch-eyebrow font-mono">DECISION ARCHITECTURE</span>
              <h3 className="dash-arch-title">Evidence-Based Risk & Relocation</h3>
            </div>
            <div className="dash-arch-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>

          <p className="dash-arch-desc">
            The system uses ML to estimate hazard susceptibility and relocation demand, combines that intelligence with deterministic risk indicators, prioritizes villages, and uses predicted demand to screen carrying capacity before ranking safe sites via AHP.
          </p>

          <div className="dash-arch-pipeline-strip">
            <span className="arch-step-badge">1. ML Susceptibility</span>
            <span className="arch-step-arrow">→</span>
            <span className="arch-step-badge">2. Relocation Demand</span>
            <span className="arch-step-arrow">→</span>
            <span className="arch-step-badge">3. Capacity Screen</span>
            <span className="arch-step-arrow">→</span>
            <span className="arch-step-badge">4. AHP Ranking</span>
          </div>

          <div className="dash-arch-actions">
            <button
              type="button"
              className="dash-btn-review-queue"
              onClick={() => onNavigateToTab && onNavigateToTab('relocation-priority')}
            >
              <span>Review Priority Queue</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button
              type="button"
              className="dash-btn-safe-sites-secondary"
              onClick={() => onNavigateToTab && onNavigateToTab('safe-site-discovery')}
            >
              <span>Explore Safe Sites</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
