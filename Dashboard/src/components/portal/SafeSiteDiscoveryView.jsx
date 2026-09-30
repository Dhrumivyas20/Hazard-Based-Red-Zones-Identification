import React, { useState, useMemo } from 'react';

export const CANDIDATE_SAFE_SITES = [
  {
    rank: '01',
    name: 'Srinagar (Garhwal) Outskirts',
    isTopRecommendation: true,
    capacityStatus: 'Insufficient',
    zone: 'Green Hazard Zone',
    landAvailability: 'High Land Availability',
    coords: '30.222°N, 78.780°E',
    roadAccess: '0.3 km',
    waterDist: '0.5 km',
    healthcare: '1.5 km',
    capacityCurrent: '5,500',
    capacityMax: '12,000',
    capacityPct: 46,
    availPlaces: '5,500 available places',
    ahpScoreDisplay: '88.0',
    ahpRawScore: '0.880',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Green Zone (Low Hazard)', score: '+0.300' },
      { criterion: 'Land Availability (25%)', raw: 'High (Expansive Plateau)', score: '+0.250' },
      { criterion: 'Road Proximity (15%)', raw: '0.3 km (National Highway)', score: '+0.150' },
      { criterion: 'Water Proximity (15%)', raw: '0.5 km (Alaknanda Basin)', score: '+0.150' },
      { criterion: 'Healthcare Access (15%)', raw: '1.5 km (Base Hospital)', score: '+0.150' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.120' }
    ]
  },
  {
    rank: '02',
    name: 'Pauri Outskirts',
    isTopRecommendation: false,
    capacityStatus: 'Limited',
    zone: 'Green Hazard Zone',
    landAvailability: 'High Land Availability',
    coords: '30.147°N, 78.781°E',
    roadAccess: '0.7 km',
    waterDist: '1.0 km',
    healthcare: '2.0 km',
    capacityCurrent: '7,000',
    capacityMax: '12,000',
    capacityPct: 58,
    availPlaces: '7,000 available places',
    ahpScoreDisplay: '87.9',
    ahpRawScore: '0.879',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Green Zone (Stable Bedrock)', score: '+0.300' },
      { criterion: 'Land Availability (25%)', raw: 'High (Ridge Terraces)', score: '+0.250' },
      { criterion: 'Road Proximity (15%)', raw: '0.7 km (State Highway 11)', score: '+0.135' },
      { criterion: 'Water Proximity (15%)', raw: '1.0 km (Municipal Line)', score: '+0.134' },
      { criterion: 'Healthcare Access (15%)', raw: '2.0 km (District Hospital)', score: '+0.140' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Partial Intake Feasible', score: '-0.080' }
    ]
  },
  {
    rank: '03',
    name: 'Kirtinagar',
    isTopRecommendation: false,
    capacityStatus: 'Limited',
    zone: 'Green Hazard Zone',
    landAvailability: 'High Land Availability',
    coords: '30.170°N, 78.750°E',
    roadAccess: '0.6 km',
    waterDist: '0.8 km',
    healthcare: '3.5 km',
    capacityCurrent: '8,400',
    capacityMax: '12,000',
    capacityPct: 70,
    availPlaces: '8,400 available places',
    ahpScoreDisplay: '84.7',
    ahpRawScore: '0.847',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Green Zone (Low Hazard)', score: '+0.300' },
      { criterion: 'Land Availability (25%)', raw: 'High (Valley Terrace)', score: '+0.250' },
      { criterion: 'Road Proximity (15%)', raw: '0.6 km (NH-58)', score: '+0.140' },
      { criterion: 'Water Proximity (15%)', raw: '0.8 km (Riverbank)', score: '+0.142' },
      { criterion: 'Healthcare Access (15%)', raw: '3.5 km (Sub-divisional Clinic)', score: '+0.095' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Partial Intake Feasible', score: '-0.080' }
    ]
  },
  {
    rank: '04',
    name: 'Tehri Resettlement Zone',
    isTopRecommendation: false,
    capacityStatus: 'Insufficient',
    zone: 'Green Hazard Zone',
    landAvailability: 'High Land Availability',
    coords: '30.380°N, 78.480°E',
    roadAccess: '0.4 km',
    waterDist: '0.6 km',
    healthcare: '2.8 km',
    capacityCurrent: '4,800',
    capacityMax: '12,000',
    capacityPct: 40,
    availPlaces: '4,800 available places',
    ahpScoreDisplay: '80.2',
    ahpRawScore: '0.802',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Green Zone (Low Hazard)', score: '+0.300' },
      { criterion: 'Land Availability (25%)', raw: 'High (Plotted Sector)', score: '+0.250' },
      { criterion: 'Road Proximity (15%)', raw: '0.4 km (Connecting Arterial)', score: '+0.148' },
      { criterion: 'Water Proximity (15%)', raw: '0.6 km (Gravity Aqueduct)', score: '+0.144' },
      { criterion: 'Healthcare Access (15%)', raw: '2.8 km (Community Health Center)', score: '+0.110' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.150' }
    ]
  },
  {
    rank: '05',
    name: 'Gauchar Plain',
    isTopRecommendation: false,
    capacityStatus: 'Limited',
    zone: 'Yellow Hazard Zone',
    landAvailability: 'High Land Availability',
    coords: '30.270°N, 79.311°E',
    roadAccess: '0.5 km',
    waterDist: '1.2 km',
    healthcare: '3.0 km',
    capacityCurrent: '7,800',
    capacityMax: '12,000',
    capacityPct: 65,
    availPlaces: '7,800 available places',
    ahpScoreDisplay: '73.6',
    ahpRawScore: '0.736',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Yellow Zone (Moderate Slope)', score: '+0.220' },
      { criterion: 'Land Availability (25%)', raw: 'High (Flat Airfield Margin)', score: '+0.250' },
      { criterion: 'Road Proximity (15%)', raw: '0.5 km (NH Corridor)', score: '+0.145' },
      { criterion: 'Water Proximity (15%)', raw: '1.2 km (Pumping Station)', score: '+0.121' },
      { criterion: 'Healthcare Access (15%)', raw: '3.0 km (Town Dispensary)', score: '+0.100' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Partial Intake Feasible', score: '-0.100' }
    ]
  },
  {
    rank: '06',
    name: 'Chamoli Outskirts (Bairangana)',
    isTopRecommendation: false,
    capacityStatus: 'Insufficient',
    zone: 'Yellow Hazard Zone',
    landAvailability: 'Medium Land Availability',
    coords: '30.410°N, 79.330°E',
    roadAccess: '0.8 km',
    waterDist: '1.0 km',
    healthcare: '2.5 km',
    capacityCurrent: '5,600',
    capacityMax: '6,500',
    capacityPct: 86,
    availPlaces: '5,600 available places',
    ahpScoreDisplay: '53.2',
    ahpRawScore: '0.532',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Yellow Zone (Slope Instability)', score: '+0.180' },
      { criterion: 'Land Availability (25%)', raw: 'Medium (Terraced Slopes)', score: '+0.150' },
      { criterion: 'Road Proximity (15%)', raw: '0.8 km (Link Road)', score: '+0.115' },
      { criterion: 'Water Proximity (15%)', raw: '1.0 km (Spring Supply)', score: '+0.110' },
      { criterion: 'Healthcare Access (15%)', raw: '2.5 km (District Clinic)', score: '+0.097' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.120' }
    ]
  },
  {
    rank: '07',
    name: 'Guptkashi Lower Belt',
    isTopRecommendation: false,
    capacityStatus: 'Insufficient',
    zone: 'Yellow Hazard Zone',
    landAvailability: 'Medium Land Availability',
    coords: '30.520°N, 79.070°E',
    roadAccess: '1.0 km',
    waterDist: '1.3 km',
    healthcare: '3.8 km',
    capacityCurrent: '5,300',
    capacityMax: '6,500',
    capacityPct: 81,
    availPlaces: '5,300 available places',
    ahpScoreDisplay: '42.1',
    ahpRawScore: '0.421',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Yellow Zone (Moderate Risk)', score: '+0.160' },
      { criterion: 'Land Availability (25%)', raw: 'Medium (Fragmented Plots)', score: '+0.140' },
      { criterion: 'Road Proximity (15%)', raw: '1.0 km (Secondary Route)', score: '+0.095' },
      { criterion: 'Water Proximity (15%)', raw: '1.3 km (Mountain Stream)', score: '+0.096' },
      { criterion: 'Healthcare Access (15%)', raw: '3.8 km (Primary Health Unit)', score: '+0.070' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.140' }
    ]
  },
  {
    rank: '08',
    name: 'Dewalgarh',
    isTopRecommendation: false,
    capacityStatus: 'Insufficient',
    zone: 'Yellow Hazard Zone',
    landAvailability: 'Medium Land Availability',
    coords: '30.340°N, 79.250°E',
    roadAccess: '1.0 km',
    waterDist: '1.5 km',
    healthcare: '4.5 km',
    capacityCurrent: '4,400',
    capacityMax: '6,500',
    capacityPct: 68,
    availPlaces: '4,400 available places',
    ahpScoreDisplay: '37.1',
    ahpRawScore: '0.371',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Yellow Zone (Slope Gradient > 25°)', score: '+0.150' },
      { criterion: 'Land Availability (25%)', raw: 'Medium (Hill Escarpment)', score: '+0.120' },
      { criterion: 'Road Proximity (15%)', raw: '1.0 km (Paved Link)', score: '+0.090' },
      { criterion: 'Water Proximity (15%)', raw: '1.5 km (Valley Base)', score: '+0.081' },
      { criterion: 'Healthcare Access (15%)', raw: '4.5 km (Rural Dispensary)', score: '+0.050' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.120' }
    ]
  },
  {
    rank: '09',
    name: 'Rudraprayag Outskirts (Jakholi road)',
    isTopRecommendation: false,
    capacityStatus: 'Insufficient',
    zone: 'Yellow Hazard Zone',
    landAvailability: 'Medium Land Availability',
    coords: '30.300°N, 78.950°E',
    roadAccess: '1.5 km',
    waterDist: '1.8 km',
    healthcare: '4.0 km',
    capacityCurrent: '5,000',
    capacityMax: '6,500',
    capacityPct: 77,
    availPlaces: '5,000 available places',
    ahpScoreDisplay: '30.0',
    ahpRawScore: '0.300',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Yellow Zone (High Weathering)', score: '+0.120' },
      { criterion: 'Land Availability (25%)', raw: 'Medium (Discontinuous Terraces)', score: '+0.110' },
      { criterion: 'Road Proximity (15%)', raw: '1.5 km (Winding Rural Road)', score: '+0.065' },
      { criterion: 'Water Proximity (15%)', raw: '1.8 km (Pump Lift Required)', score: '+0.065' },
      { criterion: 'Healthcare Access (15%)', raw: '4.0 km (Sub-Center)', score: '+0.060' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.120' }
    ]
  },
  {
    rank: '10',
    name: 'Simli',
    isTopRecommendation: false,
    capacityStatus: 'Insufficient',
    zone: 'Yellow Hazard Zone',
    landAvailability: 'Medium Land Availability',
    coords: '30.360°N, 79.290°E',
    roadAccess: '1.2 km',
    waterDist: '2.0 km',
    healthcare: '5.0 km',
    capacityCurrent: '4,700',
    capacityMax: '6,500',
    capacityPct: 72,
    availPlaces: '4,700 available places',
    ahpScoreDisplay: '27.5',
    ahpRawScore: '0.275',
    breakdown: [
      { criterion: 'Hazard Zone Suitability (30%)', raw: 'Yellow Zone (Moderate Slope)', score: '+0.110' },
      { criterion: 'Land Availability (25%)', raw: 'Medium (Buffer Zone)', score: '+0.100' },
      { criterion: 'Road Proximity (15%)', raw: '1.2 km (Unpaved Spur)', score: '+0.075' },
      { criterion: 'Water Proximity (15%)', raw: '2.0 km (Pindar Tributary)', score: '+0.050' },
      { criterion: 'Healthcare Access (15%)', raw: '5.0 km (Block Hospital)', score: '+0.040' },
      { criterion: 'Capacity Feasibility Adjustment', raw: 'Insufficient Net Ground', score: '-0.100' }
    ]
  }
];

export default function SafeSiteDiscoveryView({ onCompareSite, initialVillageContext }) {
  const [viewMode, setViewMode] = useState(initialVillageContext ? 'decision-workflow' : 'overview'); // 'overview' | 'decision-workflow'
  const [selectedSiteContext, setSelectedSiteContext] = useState(
    initialVillageContext
      ? {
          villageContext: initialVillageContext.name,
          estDemand: initialVillageContext.demand,
          population: initialVillageContext.residents,
          hazardScore: initialVillageContext.finalRiskScore
        }
      : null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedSiteBreakdowns, setExpandedSiteBreakdowns] = useState({});

  const toggleBreakdown = (rank) => {
    setExpandedSiteBreakdowns((prev) => ({
      ...prev,
      [rank]: !prev[rank]
    }));
  };

  const handleInspectSite = (site) => {
    setSelectedSiteContext({
      name: site.name,
      villageContext: site.name,
      estDemand: '~850',
      population: site.capacityCurrent,
      hazardScore: '96.8%'
    });
    setViewMode('decision-workflow');
  };

  const filteredSites = useMemo(() => {
    return CANDIDATE_SAFE_SITES.filter((site) => {
      const matchSearch =
        site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.landAvailability.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'all' ||
        site.capacityStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [searchTerm, statusFilter]);

  /* ==========================================================
     VIEW: DECISION WORKFLOW / AHP MULTI-STAGE SCREENING
     (Exactly as shown in User Reference Screenshots)
     ========================================================== */
  if (viewMode === 'decision-workflow') {
    const targetVillageName = selectedSiteContext?.villageContext || 'Joshimath';
    const targetEstDemand = selectedSiteContext?.estDemand || '~850';
    const targetResidents = selectedSiteContext?.population || '16,709';
    const targetHazard = selectedSiteContext?.hazardScore || '96.8%';

    return (
      <div className="ssd-page-container">
        {/* Top Back Navigation Bar */}
        <div className="ssd-back-nav-row">
          <button
            type="button"
            className="ssd-back-btn"
            onClick={() => setViewMode('overview')}
          >
            ← Back to Safe-Site Discovery
          </button>
        </div>

        {/* Page Header */}
        <div className="ssd-workflow-header">
          <div className="ssd-header-text-col">
            <span className="ssd-workflow-eyebrow">
              DECISION WORKFLOW &nbsp;•&nbsp; ML DEMAND → CAPACITY → AHP RANKING
            </span>
            <h1 className="ssd-workflow-title">
              Safe Relocation Sites for {targetVillageName}
            </h1>
            <p className="ssd-workflow-desc">
              Transparent multi-stage site recommendation: ML estimates relocation demand, carrying capacity filters viable ground, and explainable AHP ranks site suitability.
            </p>
          </div>
          <div className="ssd-workflow-badge-col">
            <span className="ssd-candidate-badge">10 candidate sites</span>
          </div>
        </div>

        {/* Pipeline: 4 Steps */}
        <div className="ssd-pipeline-card">
          <span className="ssd-pipeline-lbl">RELOCATION DECISION PIPELINE</span>
          <div className="ssd-pipeline-grid">
            <div className="ssd-pipeline-step step-orange">
              <span className="ssd-pipe-num">1. ML DEMAND</span>
              <span className="ssd-pipe-val">{targetEstDemand} Families</span>
            </div>
            <div className="ssd-pipeline-step">
              <span className="ssd-pipe-num">2. REQUIRED CAP</span>
              <span className="ssd-pipe-val">{targetResidents} People</span>
            </div>
            <div className="ssd-pipeline-step">
              <span className="ssd-pipe-num">3. CAPACITY CHECK</span>
              <span className="ssd-pipe-val">0 Ready &nbsp;•&nbsp; 3 Lim</span>
            </div>
            <div className="ssd-pipeline-step step-green">
              <span className="ssd-pipe-num">4. AHP SUITABILITY</span>
              <span className="ssd-pipe-val">#1 Srinagar (Garhwal) Outskirts</span>
            </div>
          </div>
        </div>

        {/* 2-Card Row: Relocation Demand (Olive) & AHP Weights Formula (White) */}
        <div className="ssd-demand-weights-grid">
          {/* Left Dark Olive Card */}
          <div className="ssd-demand-olive-box">
            <div className="ssd-demand-olive-head">
              <div className="ssd-olive-head-left">
                <span className="ssd-olive-eyebrow">RELOCATION DEMAND</span>
                <span className="ssd-olive-live-tag">LIVE REGIONAL MODEL</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ssd-olive-icon">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </div>

            <div className="ssd-demand-center-block">
              <div className="ssd-demand-town-row">
                <h2 className="ssd-demand-town-title">{targetVillageName}</h2>
                <div className="ssd-demand-pills-row">
                  <span className="ssd-demand-pill pill-priority">Immediate Priority</span>
                  <span className="ssd-demand-pill pill-red-zone">Red Zone</span>
                </div>
              </div>
              <div className="ssd-demand-geo-line">
                <span>📍 Chamoli District</span>
                <span className="ssd-bullet">•</span>
                <span>Subsidence & Slope Creep Corridor</span>
                <span className="ssd-bullet">•</span>
                <span className="font-mono">30.555°N, 79.565°E</span>
              </div>
            </div>

            <div className="ssd-demand-stats-row">
              <div className="ssd-stat-item">
                <span className="ssd-stat-lbl">ML EST. FAMILIES</span>
                <span className="ssd-stat-val font-mono">{targetEstDemand}</span>
                <span className="ssd-stat-micro">Priority Demand</span>
              </div>
              <div className="ssd-stat-item">
                <span className="ssd-stat-lbl">TOTAL RESIDENTS</span>
                <span className="ssd-stat-val font-mono">{targetResidents}</span>
                <span className="ssd-stat-micro">3,800 Households</span>
              </div>
              <div className="ssd-stat-item">
                <span className="ssd-stat-lbl">FINAL HAZARD</span>
                <span className="ssd-stat-val font-mono text-coral-light">{targetHazard}</span>
                <span className="ssd-stat-micro">Critical Risk</span>
              </div>
            </div>
          </div>

          {/* Right White Card: Multi-Criteria Formula */}
          <div className="ssd-formula-white-box">
            <div className="ssd-formula-head">
              <span className="ssd-formula-eyebrow">AHP CRITERIA WEIGHTS</span>
              <span className="ssd-help-bubble" title="Analytical Hierarchy Process Weight Matrix">?</span>
            </div>
            <h3 className="ssd-formula-title">Multi-Criteria Formula</h3>
            <div className="ssd-formula-list">
              <div className="ssd-formula-row">
                <span>Hazard Zone</span>
                <span className="ssd-pct-val font-mono">30%</span>
              </div>
              <div className="ssd-formula-row">
                <span>Land Availability</span>
                <span className="ssd-pct-val font-mono">25%</span>
              </div>
              <div className="ssd-formula-row">
                <span>Distance To Road Km</span>
                <span className="ssd-pct-val font-mono">15%</span>
              </div>
              <div className="ssd-formula-row">
                <span>Distance To Water Km</span>
                <span className="ssd-pct-val font-mono">15%</span>
              </div>
              <div className="ssd-formula-row">
                <span>Distance To Healthcare Km</span>
                <span className="ssd-pct-val font-mono">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2: Capacity Screening */}
        <div className="ssd-stage-panel">
          <div className="ssd-stage-panel-head">
            <div className="ssd-stage-text-col">
              <span className="ssd-stage-tag">STAGE 2: CAPACITY SCREENING</span>
              <h3 className="ssd-stage-heading">Carrying Capacity Feasibility Check</h3>
            </div>
            <div className="ssd-stage-pills">
              <span className="ssd-stage-pill pill-ready">0 Ready</span>
              <span className="ssd-stage-pill pill-limited">3 Limited</span>
              <span className="ssd-stage-pill pill-insufficient">7 Insufficient</span>
            </div>
          </div>
          <p className="ssd-stage-explanation">
            Candidate site available capacity (carrying_capacity - existing_population) is evaluated against village demand. Ready sites receive a feasibility incentive (+0.08 AHP boost), while insufficient sites receive a penalty (-0.12).
          </p>
        </div>

        {/* Stage 3: AHP Site Suitability List */}
        <div className="ssd-stage-panel">
          <div className="ssd-stage-panel-head">
            <div className="ssd-stage-text-col">
              <span className="ssd-stage-tag">STAGE 3: AHP SITE SUITABILITY</span>
              <h3 className="ssd-stage-heading">Ranked Safe Relocation Sites</h3>
            </div>
            <span className="ssd-top-leader-note">
              Top match: <strong>Srinagar (Garhwal) Outskirts</strong> (AHP Score: 0.880)
            </span>
          </div>

          <div className="ssd-ranked-sites-container">
            {CANDIDATE_SAFE_SITES.map((site) => {
              const isExpanded = !!expandedSiteBreakdowns[site.rank];
              return (
                <div key={site.rank} className="ssd-ranked-site-card">
                  {/* Top Site Summary Row */}
                  <div className="ssd-ranked-main-row">
                    {/* Left Details */}
                    <div className="ssd-ranked-left">
                      <div className="ssd-ranked-title-line">
                        <span className="ssd-ranked-num-badge">{site.rank}</span>
                        <h4 className="ssd-ranked-name">{site.name}</h4>
                        {site.isTopRecommendation && (
                          <span className="ssd-badge-top-rec">Top Recommendation</span>
                        )}
                        <span className={`ssd-badge-cap-status pill-${site.capacityStatus.toLowerCase()}`}>
                          Capacity: {site.capacityStatus}
                        </span>
                      </div>

                      <div className="ssd-ranked-zone-coords">
                        <span>{site.zone.toUpperCase()}</span>
                        <span className="ssd-dot">•</span>
                        <span>{site.landAvailability.toUpperCase()}</span>
                        <span className="ssd-dot">•</span>
                        <span className="font-mono">{site.coords}</span>
                      </div>

                      <div className="ssd-ranked-metrics-line">
                        <span>Road: <strong>{site.roadAccess}</strong></span>
                        <span className="ssd-metric-spacer"></span>
                        <span>Water: <strong>{site.waterDist}</strong></span>
                        <span className="ssd-metric-spacer"></span>
                        <span>Healthcare: <strong>{site.healthcare}</strong></span>
                      </div>
                    </div>

                    {/* Right AHP Score & Capacity Bar */}
                    <div className="ssd-ranked-right">
                      <div className="ssd-ranked-score-wrap">
                        <span className="ssd-score-sublabel">AHP SUITABILITY SCORE</span>
                        <div className="ssd-score-val-row">
                          <span className="ssd-score-big font-mono">{site.ahpScoreDisplay}</span>
                          <span className="ssd-score-denom font-mono">/ 100</span>
                          <span className="ssd-score-raw font-mono">({site.ahpRawScore})</span>
                        </div>
                      </div>

                      <div className="ssd-ranked-bar-wrap">
                        <div className="ssd-ranked-bar-track">
                          <div
                            className="ssd-ranked-bar-fill"
                            style={{ width: `${site.capacityPct}%` }}
                          ></div>
                        </div>
                        <span className="ssd-ranked-bar-label font-mono">
                          {site.capacityCurrent} available / {site.capacityMax} max capacity
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Button for AHP Breakdown */}
                  <div className="ssd-ranked-toggle-row">
                    <button
                      type="button"
                      className="ssd-btn-breakdown-toggle"
                      onClick={() => toggleBreakdown(site.rank)}
                    >
                      <svg
                        className={`ssd-chevron-icon ${isExpanded ? 'open' : ''}`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      <span>{isExpanded ? 'Hide AHP Criteria Score Breakdown' : 'View AHP Criteria Score Breakdown'}</span>
                    </button>
                  </div>

                  {/* Expandable Breakdown Drawer */}
                  {isExpanded && (
                    <div className="ssd-breakdown-drawer">
                      <div className="ssd-breakdown-grid">
                        {site.breakdown.map((item, idx) => (
                          <div key={idx} className="ssd-bd-item">
                            <span className="ssd-bd-crit">{item.criterion}</span>
                            <span className="ssd-bd-raw">{item.raw}</span>
                            <span className={`ssd-bd-score font-mono ${item.score.startsWith('-') ? 'text-coral' : 'text-green'}`}>
                              {item.score}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="ssd-breakdown-total-row">
                        <span>Total Weighted Composite AHP Index</span>
                        <span className="ssd-bd-final font-mono">
                          {site.ahpRawScore} &nbsp;({site.ahpScoreDisplay} / 100)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Advisory Banner */}
        <div className="ssd-advisory-banner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#46532B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>
            AHP suitability rankings and capacity verifications provide transparent decision support for district planning. Final relocation site agreements are conducted in consultation with village leadership.
          </span>
        </div>
      </div>
    );
  }

  /* ==========================================================
     DEFAULT VIEW: CANDIDATE SITES OVERVIEW
     ========================================================== */
  return (
    <div className="ssd-page-container">
      {/* 1. Header & Context */}
      <div className="ssd-page-header">
        <div className="ssd-header-text-col">
          <span className="ssd-eyebrow-tag">TERRAIN SCREENING &nbsp;•&nbsp; CAPACITY & MULTI-CRITERIA AHP SUITABILITY</span>
          <h1 className="ssd-main-title">Safe-Site Discovery</h1>
          <p className="ssd-desc-para">
            Screen and evaluate candidate relocation sites based on multi-hazard buffer zones, available carrying capacity, infrastructure accessibility, and AHP suitability rankings.
          </p>
        </div>

        <div className="ssd-header-badge-col">
          <span className="ssd-counter-badge">10 candidate sites</span>
        </div>
      </div>

      {/* 2. Toolbar: Search Input + Quick Filter Chips */}
      <div className="ssd-toolbar-card">
        <div className="ssd-search-box-wrap">
          <svg className="ssd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="ssd-search-input"
            placeholder="Search safe site by name, hazard zone, or land availability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="ssd-search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="ssd-filter-chips-group">
          <button
            type="button"
            className={`ssd-chip-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Sites ({CANDIDATE_SAFE_SITES.length})
          </button>
          <button
            type="button"
            className={`ssd-chip-btn chip-green ${statusFilter === 'ready' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ready')}
          >
            Ready (0)
          </button>
          <button
            type="button"
            className={`ssd-chip-btn chip-amber ${statusFilter === 'limited' ? 'active' : ''}`}
            onClick={() => setStatusFilter('limited')}
          >
            Limited (3)
          </button>
          <button
            type="button"
            className={`ssd-chip-btn chip-coral ${statusFilter === 'insufficient' ? 'active' : ''}`}
            onClick={() => setStatusFilter('insufficient')}
          >
            Insufficient (7)
          </button>
        </div>
      </div>

      {/* 3. Candidate Safe Sites List */}
      <div className="ssd-sites-list">
        {filteredSites.length === 0 ? (
          <div className="ssd-empty-state-card">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3>No candidate sites found</h3>
            <p>Try refining your search keyword or clearing the capacity filter.</p>
            <button
              type="button"
              className="ssd-btn-reset"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredSites.map((site) => {
            const isExpanded = !!expandedSiteBreakdowns[site.rank];
            return (
              <div key={site.rank} className="ssd-site-card">
                {/* Main Content Row */}
                <div className="ssd-site-main-row">
                  
                  {/* Left Col: Rank Badge, Title, Pills, Geo Subtitle */}
                  <div className="ssd-site-left-col">
                    <div className="ssd-site-title-line">
                      <span className="ssd-site-rank-badge">{site.rank}</span>
                      <h3 className="ssd-site-name">{site.name}</h3>
                      {site.isTopRecommendation && (
                        <span className="ssd-badge-top-rec">Top Recommendation</span>
                      )}
                      <span className={`ssd-status-pill pill-${site.capacityStatus.toLowerCase()}`}>
                        {site.capacityStatus}
                      </span>
                    </div>

                    <div className="ssd-site-meta-line">
                      <span className="ssd-pin-icon">📍</span>
                      <span className="ssd-zone-text">{site.zone}</span>
                      <span className="ssd-bullet">•</span>
                      <span className="ssd-land-text">{site.landAvailability}</span>
                      {site.coords && (
                        <>
                          <span className="ssd-bullet">•</span>
                          <span className="ssd-coords-text font-mono">{site.coords}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Col: 3 Metric Columns + AHP Suitability */}
                  <div className="ssd-site-right-col">
                    {/* Available Capacity */}
                    <div className="ssd-metric-col col-capacity">
                      <span className="ssd-col-lbl">AVAILABLE CAPACITY</span>
                      <span className="ssd-col-val font-mono">
                        <strong>{site.capacityCurrent}</strong> / {site.capacityMax}
                      </span>
                      <div className="ssd-col-track">
                        <div
                          className="ssd-col-fill"
                          style={{ width: `${site.capacityPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Road Access */}
                    <div className="ssd-metric-col">
                      <span className="ssd-col-lbl">ROAD ACCESS</span>
                      <span className="ssd-col-val font-mono bold">{site.roadAccess}</span>
                    </div>

                    {/* Healthcare */}
                    <div className="ssd-metric-col">
                      <span className="ssd-col-lbl">HEALTHCARE</span>
                      <span className="ssd-col-val font-mono bold">{site.healthcare}</span>
                    </div>

                    {/* AHP Suitability + Arrow Button */}
                    <div className="ssd-ahp-box">
                      <div className="ssd-ahp-num-wrap">
                        <span className="ssd-col-lbl">AHP SUITABILITY</span>
                        <span className="ssd-ahp-big-val font-mono">{site.ahpScoreDisplay}</span>
                      </div>

                      <button
                        type="button"
                        className="ssd-btn-action-arrow"
                        onClick={() => handleInspectSite(site)}
                        title={`Open Decision Workflow for ${site.name}`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Footer Line with Accordion Toggle */}
                <div className="ssd-site-footer-row">
                  <div className="ssd-footer-left">
                    <span className="ssd-compass-icon">🧭</span>
                    <span>{site.availPlaces} &nbsp;·&nbsp; {site.waterDist} to water</span>
                  </div>

                  <div className="ssd-footer-right">
                    <button
                      type="button"
                      className="ssd-btn-breakdown-toggle-simple"
                      onClick={() => toggleBreakdown(site.rank)}
                    >
                      <svg
                        className={`ssd-chevron-icon ${isExpanded ? 'open' : ''}`}
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      <span>{isExpanded ? 'Hide AHP Criteria' : 'View AHP Criteria Score Breakdown'}</span>
                    </button>
                    <span className="ssd-ahp-raw-score">
                      AHP Score: {site.ahpRawScore}
                    </span>
                  </div>
                </div>

                {/* Inline Breakdown Drawer if Expanded in Overview */}
                {isExpanded && (
                  <div className="ssd-breakdown-drawer">
                    <div className="ssd-breakdown-grid">
                      {site.breakdown.map((item, idx) => (
                        <div key={idx} className="ssd-bd-item">
                          <span className="ssd-bd-crit">{item.criterion}</span>
                          <span className="ssd-bd-raw">{item.raw}</span>
                          <span className={`ssd-bd-score font-mono ${item.score.startsWith('-') ? 'text-coral' : 'text-green'}`}>
                            {item.score}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="ssd-breakdown-total-row">
                      <span>Total Weighted Composite AHP Index</span>
                      <span className="ssd-bd-final font-mono">
                        {site.ahpRawScore} &nbsp;({site.ahpScoreDisplay} / 100)
                      </span>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
