import React, { useState, useMemo } from 'react';

const PRIORITY_REGISTER_DATA = [
  {
    rank: '01',
    name: 'Joshimath',
    priorityType: 'Immediate',
    zone: 'Red',
    coords: '30.555°N, 79.565°E',
    residents: '16,709',
    households: '3,800',
    incidents: 1,
    priorityScore: '1.0',
    finalRiskScore: '96.8%',
    mlProb: '89.3%',
    demand: '~850 families',
    movementPattern: 'Creep/Subsidence',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (89.3%)'
    ]
  },
  {
    rank: '02',
    name: 'Tapovan',
    priorityType: 'Immediate',
    zone: 'Red',
    coords: '30.600°N, 79.630°E',
    residents: '2,100',
    households: '480',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '96.3%',
    mlProb: '87.6%',
    demand: '~210 families',
    movementPattern: 'Debris Flow',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (87.6%)'
    ]
  },
  {
    rank: '03',
    name: 'Sonprayag',
    priorityType: 'Short-term',
    zone: 'Red',
    coords: '30.604°N, 78.650°E',
    residents: '1,200',
    households: '280',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '93.9%',
    mlProb: '79.8%',
    demand: '~130 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (79.8%)'
    ]
  },
  {
    rank: '04',
    name: 'Helang',
    priorityType: 'Short-term',
    zone: 'Red',
    coords: '30.570°N, 79.560°E',
    residents: '1,100',
    households: '260',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '94.7%',
    mlProb: '82.4%',
    demand: '~113 families',
    movementPattern: 'Debris Flow',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (82.4%)'
    ]
  },
  {
    rank: '05',
    name: 'Pandukeshwar',
    priorityType: 'Short-term',
    zone: 'Red',
    coords: '30.635°N, 79.580°E',
    residents: '700',
    households: '160',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '95.4%',
    mlProb: '84.5%',
    demand: '~92 families',
    movementPattern: 'Debris Flow',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (84.5%)'
    ]
  },
  {
    rank: '06',
    name: 'Kedarnath (Rambara belt)',
    priorityType: 'Short-term',
    zone: 'Red',
    coords: '30.735°N, 79.067°E',
    residents: '450',
    households: '120',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '95.4%',
    mlProb: '84.8%',
    demand: '~86 families',
    movementPattern: 'Debris Flow',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (84.8%)'
    ]
  },
  {
    rank: '07',
    name: 'Gaurikund',
    priorityType: 'Short-term',
    zone: 'Red',
    coords: '30.609°N, 79.028°E',
    residents: '600',
    households: '150',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '94.7%',
    mlProb: '82.4%',
    demand: '~86 families',
    movementPattern: 'Debris Flow',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (82.4%)'
    ]
  },
  {
    rank: '08',
    name: 'Chopta',
    priorityType: 'Short-term',
    zone: 'Red',
    coords: '30.460°N, 79.180°E',
    residents: '300',
    households: '70',
    incidents: 1,
    priorityScore: '0.6',
    finalRiskScore: '94.2%',
    mlProb: '80.8%',
    demand: '~31 families',
    movementPattern: 'Rock Fall',
    reasons: [
      'High baseline hazard classification in district register',
      '1 recorded historical disaster incident(s)',
      'ML predicts elevated landslide susceptibility (80.8%)'
    ]
  },
  {
    rank: '09',
    name: 'Gopeshwar',
    priorityType: 'Medium-term',
    zone: 'Yellow',
    coords: '30.382°N, 79.336°E',
    residents: '10,800',
    households: '2,400',
    incidents: 0,
    priorityScore: '0.4',
    finalRiskScore: '28.3%',
    mlProb: '30.3%',
    demand: '~49 families',
    movementPattern: 'Rock Fall',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 30.3%',
      'ML estimates approximately 49 families requiring relocation'
    ]
  },
  {
    rank: '10',
    name: 'Karnaprayag',
    priorityType: 'Medium-term',
    zone: 'Yellow',
    coords: '30.266°N, 79.216°E',
    residents: '7,300',
    households: '1,650',
    incidents: 0,
    priorityScore: '0.3',
    finalRiskScore: '30.0%',
    mlProb: '36.0%',
    demand: '~57 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 36.0%',
      'ML estimates approximately 57 families requiring relocation'
    ]
  },
  {
    rank: '11',
    name: 'Rudraprayag Town',
    priorityType: 'Medium-term',
    zone: 'Yellow',
    coords: '30.286°N, 78.981°E',
    residents: '5,500',
    households: '1,200',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '29.6%',
    mlProb: '34.5%',
    demand: '~46 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 34.5%',
      'ML estimates approximately 46 families requiring relocation'
    ]
  },
  {
    rank: '12',
    name: 'Agastyamuni',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.417°N, 79.000°E',
    residents: '4,200',
    households: '966',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '28.8%',
    mlProb: '32.0%',
    demand: '~30 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 32.0%',
      'ML estimates approximately 30 families requiring relocation'
    ]
  },
  {
    rank: '13',
    name: 'Chamoli Town',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.400°N, 79.320°E',
    residents: '3,900',
    households: '886',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '30.0%',
    mlProb: '36.0%',
    demand: '~30 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 36.0%',
      'ML estimates approximately 30 families requiring relocation'
    ]
  },
  {
    rank: '14',
    name: 'Guptkashi',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.530°N, 79.080°E',
    residents: '3,660',
    households: '820',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '29.3%',
    mlProb: '33.4%',
    demand: '~31 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 33.4%',
      'ML estimates approximately 31 families requiring relocation'
    ]
  },
  {
    rank: '15',
    name: 'Pipalkoti',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.200°N, 79.461°E',
    residents: '3,200',
    households: '720',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '30.8%',
    mlProb: '38.5%',
    demand: '~30 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 38.5%',
      'ML estimates approximately 30 families requiring relocation'
    ]
  },
  {
    rank: '16',
    name: 'Ukhimath',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.580°N, 79.100°E',
    residents: '2,800',
    households: '630',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '29.5%',
    mlProb: '34.3%',
    demand: '~30 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 34.3%',
      'ML estimates approximately 30 families requiring relocation'
    ]
  },
  {
    rank: '17',
    name: 'Nandprayag',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.328°N, 79.318°E',
    residents: '1,500',
    households: '340',
    incidents: 0,
    priorityScore: '0.2',
    finalRiskScore: '30.4%',
    mlProb: '37.1%',
    demand: '~30 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 37.1%',
      'ML estimates approximately 30 families requiring relocation'
    ]
  },
  {
    rank: '18',
    name: 'Devprayag',
    priorityType: 'Monitor',
    zone: 'Green',
    coords: '30.140°N, 78.598°E',
    residents: '3,360',
    households: '756',
    incidents: 0,
    priorityScore: '0.1',
    finalRiskScore: '16.1%',
    mlProb: '24.5%',
    demand: '~29 families',
    movementPattern: 'Rock Fall',
    reasons: [
      'ML landslide probability evaluated at 24.5%',
      'ML estimates approximately 29 families requiring relocation',
      'ML classifies movement pattern as Rock Fall'
    ]
  },
  {
    rank: '19',
    name: 'Mandal',
    priorityType: 'Monitor',
    zone: 'Yellow',
    coords: '30.470°N, 79.210°E',
    residents: '900',
    households: '206',
    incidents: 0,
    priorityScore: '0.1',
    finalRiskScore: '29.2%',
    mlProb: '33.3%',
    demand: '~30 families',
    movementPattern: 'Rotational Slide',
    reasons: [
      'Moderate baseline hazard classification in district register',
      'ML landslide probability evaluated at 33.3%',
      'ML estimates approximately 30 families requiring relocation'
    ]
  },
  {
    rank: '20',
    name: 'Bhanwarkund',
    priorityType: 'Monitor',
    zone: 'Green',
    coords: '30.260°N, 79.493°E',
    residents: '1,800',
    households: '410',
    incidents: 0,
    priorityScore: '0.1',
    finalRiskScore: '18.8%',
    mlProb: '33.5%',
    demand: '~31 families',
    movementPattern: 'Rock Fall',
    reasons: [
      'ML landslide probability evaluated at 33.5%',
      'ML estimates approximately 31 families requiring relocation',
      'ML classifies movement pattern as Rock Fall'
    ]
  }
];

export default function RelocationPriorityView({ onScreenSafeSites }) {
  const [activeTabFilter, setActiveTabFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    return PRIORITY_REGISTER_DATA.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.coords.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.movementPattern.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTab =
        activeTabFilter === 'all' ||
        item.priorityType.toLowerCase() === activeTabFilter.toLowerCase();

      return matchSearch && matchTab;
    });
  }, [searchTerm, activeTabFilter]);

  return (
    <div className="rp-page-container">
      {/* 1. Header & Urgency Ranking Title */}
      <div className="rp-page-header">
        <div className="rp-header-text-col">
          <span className="rp-eyebrow-tag">ACTION QUEUE &nbsp;•&nbsp; RELOCATION URGENCY RANKING</span>
          <h1 className="rp-main-title">Village Risk & Relocation Priority</h1>
          <p className="rp-desc-para">
            Authoritative relocation queue combining deterministic multi-hazard exposure with ML landslide intelligence and estimated family relocation demand.
          </p>
        </div>

        <div className="rp-header-badge-col">
          <span className="rp-counter-badge">20 villages ranked</span>
        </div>
      </div>

      {/* 2. Top 4-Card Summary Bar */}
      <div className="rp-summary-grid">
        {/* Card 1: Immediate */}
        <div
          className={`rp-summary-card card-coral ${activeTabFilter === 'immediate' ? 'active-filter' : ''}`}
          onClick={() => setActiveTabFilter(activeTabFilter === 'immediate' ? 'all' : 'immediate')}
        >
          <div className="rp-sum-top">
            <span className="rp-sum-eyebrow text-coral">IMMEDIATE PRIORITY</span>
            <span className="rp-sum-tag-pill tag-coral">Critical</span>
          </div>
          <h2 className="rp-sum-val text-coral">2</h2>
          <span className="rp-sum-sub text-coral">Requires immediate site matching</span>
        </div>

        {/* Card 2: Short-term */}
        <div
          className={`rp-summary-card card-amber ${activeTabFilter === 'short-term' ? 'active-filter' : ''}`}
          onClick={() => setActiveTabFilter(activeTabFilter === 'short-term' ? 'all' : 'short-term')}
        >
          <div className="rp-sum-top">
            <span className="rp-sum-eyebrow text-amber">SHORT-TERM PRIORITY</span>
            <span className="rp-sum-tag-pill tag-amber">Scheduled</span>
          </div>
          <h2 className="rp-sum-val text-amber">6</h2>
          <span className="rp-sum-sub text-amber">Scheduled for district review</span>
        </div>

        {/* Card 3: Medium-term */}
        <div
          className={`rp-summary-card card-yellow ${activeTabFilter === 'medium-term' ? 'active-filter' : ''}`}
          onClick={() => setActiveTabFilter(activeTabFilter === 'medium-term' ? 'all' : 'medium-term')}
        >
          <div className="rp-sum-top">
            <span className="rp-sum-eyebrow text-yellow">MEDIUM-TERM PRIORITY</span>
            <span className="rp-sum-tag-pill tag-yellow">Moderate</span>
          </div>
          <h2 className="rp-sum-val text-yellow">3</h2>
          <span className="rp-sum-sub text-yellow">Periodic assessment & mitigation</span>
        </div>

        {/* Card 4: Monitor */}
        <div
          className={`rp-summary-card card-green ${activeTabFilter === 'monitor' ? 'active-filter' : ''}`}
          onClick={() => setActiveTabFilter(activeTabFilter === 'monitor' ? 'all' : 'monitor')}
        >
          <div className="rp-sum-top">
            <span className="rp-sum-eyebrow text-green">MONITOR</span>
            <span className="rp-sum-tag-pill tag-green">Surveillance</span>
          </div>
          <h2 className="rp-sum-val text-green">9</h2>
          <span className="rp-sum-sub text-green">Routine sensor tracking & surveillance</span>
        </div>
      </div>

      {/* 3. Section Header with Integrated Full-Width Search & Filter Toolbar */}
      <div className="rp-toolbar-card">
        <div className="rp-toolbar-top-row">
          <div className="rp-sec-left">
            <div className="rp-sec-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#46532B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </div>
            <div className="rp-sec-titles">
              <span className="rp-sec-eyebrow">AUTHORITATIVE URGENCY QUEUE</span>
              <h2 className="rp-sec-main-title">Prioritized Decision Register</h2>
            </div>
          </div>

          <span className="rp-ordered-badge">
            ORDERED BY PRIORITY SCORE (100 MAX)
          </span>
        </div>

        {/* Search Input & Filter Chips Bar */}
        <div className="rp-controls-row">
          <div className="rp-search-box-wrap">
            <svg className="rp-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="rp-search-input"
              placeholder="Search by village name, coordinates, or landslide mechanism..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="rp-search-clear-btn"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="rp-filter-chips-group">
            <button
              type="button"
              className={`rp-chip-btn ${activeTabFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTabFilter('all')}
            >
              All Ranked ({PRIORITY_REGISTER_DATA.length})
            </button>
            <button
              type="button"
              className={`rp-chip-btn chip-coral ${activeTabFilter === 'immediate' ? 'active' : ''}`}
              onClick={() => setActiveTabFilter('immediate')}
            >
              Immediate (2)
            </button>
            <button
              type="button"
              className={`rp-chip-btn chip-amber ${activeTabFilter === 'short-term' ? 'active' : ''}`}
              onClick={() => setActiveTabFilter('short-term')}
            >
              Short-term (6)
            </button>
            <button
              type="button"
              className={`rp-chip-btn chip-yellow ${activeTabFilter === 'medium-term' ? 'active' : ''}`}
              onClick={() => setActiveTabFilter('medium-term')}
            >
              Medium-term (3)
            </button>
            <button
              type="button"
              className={`rp-chip-btn chip-green ${activeTabFilter === 'monitor' ? 'active' : ''}`}
              onClick={() => setActiveTabFilter('monitor')}
            >
              Monitor (9)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Ranked Village Decision Cards List */}
      <div className="rp-decision-cards-list">
        {filteredList.length === 0 ? (
          <div className="rp-empty-state-card">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3>No matching settlements found</h3>
            <p>Try refining your search term or selecting a different priority filter.</p>
            <button
              type="button"
              className="rp-btn-reset-filters"
              onClick={() => {
                setSearchTerm('');
                setActiveTabFilter('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredList.map((village) => (
            <div key={village.rank} className="rp-village-decision-card">
              {/* Card Top Row */}
              <div className="rp-card-top-row">
                <div className="rp-card-identity-col">
                  <div className="rp-identity-title-row">
                    <span className="rp-index-badge">{village.rank}</span>
                    <h3 className="rp-village-title">{village.name}</h3>
                    <span className={`rp-pill-priority pill-${village.priorityType.toLowerCase()}`}>
                      {village.priorityType}
                    </span>
                    <span className={`rp-pill-zone pill-${village.zone.toLowerCase()}`}>
                      {village.zone} Zone
                    </span>
                  </div>
                  <span className="rp-card-geo-meta">
                    {village.coords} &nbsp;•&nbsp; <strong>{village.residents}</strong> residents ({village.households} hh) &nbsp;•&nbsp; {village.incidents} incident(s)
                  </span>
                </div>

                <div className="rp-card-actions-col">
                  <div className="rp-score-badge-wrap">
                    <span className="rp-score-caption">PRIORITY SCORE</span>
                    <span className="rp-score-val">{village.priorityScore}</span>
                  </div>

                  <button
                    type="button"
                    className="rp-btn-screen-safe-sites"
                    onClick={() => onScreenSafeSites && onScreenSafeSites(village)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Screen Safe Sites</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* Middle Pale Green Metrics Bar */}
              <div className="rp-metrics-strip">
                <div className="rp-strip-item">
                  <span className="rp-strip-lbl">FINAL RISK SCORE</span>
                  <span className={`rp-strip-val ${village.finalRiskScore.startsWith('9') ? 'text-red-bold' : ''}`}>
                    {village.finalRiskScore}
                  </span>
                </div>

                <div className="rp-strip-item">
                  <span className="rp-strip-lbl">ML LANDSLIDE PROB</span>
                  <span className="rp-strip-val">{village.mlProb}</span>
                </div>

                <div className="rp-strip-item">
                  <span className="rp-strip-lbl">EST. RELOCATION DEMAND</span>
                  <span className="rp-strip-val font-semibold">{village.demand}</span>
                </div>

                <div className="rp-strip-item">
                  <span className="rp-strip-lbl">MOVEMENT PATTERN</span>
                  <span className="rp-strip-val">{village.movementPattern}</span>
                </div>
              </div>

              {/* Bottom Why This Village Row */}
              <div className="rp-why-village-row">
                <span className="rp-why-tag">WHY THIS VILLAGE:</span>
                <div className="rp-why-items-list">
                  {village.reasons.map((r, rIdx) => (
                    <span key={rIdx} className="rp-why-snippet">
                      • {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
