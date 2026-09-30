import React, { useState, useEffect } from 'react';

const PIPELINE_NODES = [
  {
    id: 'ingestion',
    step: '01',
    phase: 'GEOSPATIAL INGESTION',
    title: 'Multi-Hazard Telemetry & Satellite InSAR',
    subtitle: 'Raw Data Layer',
    badge: 'Real-time Feeds',
    badgeType: 'orange',
    accentColor: '#FF6B35',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
    headline: 'Continuous Ingestion of Earth Observation & Sensor Streams',
    desc: 'Ingests high-resolution 30m DEM elevation models, Sentinel-1 InSAR surface displacement interferograms, IMD Doppler precipitation radar, and lithological shear fault lines across the pilot corridor.',
    features: [
      '30m Digital Elevation Model (DEM)',
      'Satellite InSAR Ground Displacement mm/yr',
      '24h Precipitation Threshold Feeds',
      'Structural Geology & Fault Buffers'
    ],
    telemetry: {
      sensorsActive: '20 / 20 Habitations',
      refreshRate: '15 min cycle',
      sourceType: 'InSAR + IMD Radar',
      accuracy: '98.9% Georeference'
    },
    portalModule: 'Risk Map'
  },
  {
    id: 'fusion',
    step: '02',
    phase: 'AI PREDICTIVE FUSION',
    title: 'Dual-Model Multi-Hazard Risk Zonation',
    subtitle: '70% Det + 30% ML',
    badge: 'Dual Algorithm',
    badgeType: 'orange',
    accentColor: '#EA580C',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    headline: 'Physics-Based Factor of Safety Blended with Neural Classifiers',
    desc: 'Combines infinite slope stability physics (FoS, geotechnical friction angle, shear strain) with gradient-boosted decision trees to classify the corridor into transparent Red (High), Orange (Medium), Yellow (Low), and Green (Safe) hazard zones.',
    features: [
      'Deterministic Geotechnical FoS Engine',
      'Gradient Boosted Landslide Probability',
      '4-Tier Multi-Hazard Zonation Envelopes',
      'Auditable Safety Factor Calibration'
    ],
    telemetry: {
      redZones: '8 High-Hazard Habitations',
      meanProbability: '53.7% Regional Mean',
      blendRatio: '70% Physics : 30% ML',
      validation: 'NDMA Standard Compliant'
    },
    portalModule: 'Hazard Analysis'
  },
  {
    id: 'exposure',
    step: '03',
    phase: 'SOCIO-ECOLOGICAL IMPACT',
    title: 'Population Exposure & Relocation Demand',
    subtitle: 'Urgency Queue',
    badge: '2,021 Families',
    badgeType: 'amber',
    accentColor: '#F59E0B',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    headline: 'MCDA Urgency Scoring to Triage Immediate Resettlement Needs',
    desc: 'Cross-references hazard zonation with census demographics, building vulnerability, road isolation risk, and slope angle to dynamically calculate relocation demand (families needing immediate or short-term resettlement).',
    features: [
      'Village Urgency Score (0.0 to 1.0)',
      'Joshimath (~850 fams) & Tapovan (~210 fams) Immediate Triage',
      'Road Cut-Off & Lifeline Isolation Risk',
      'Relocation Demand Model Calibration'
    ],
    telemetry: {
      immediateUrgency: '2 Habitations (Score 1.0 - 0.6)',
      shortTermUrgency: '6 Habitations (Score 0.6)',
      totalDemand: '2,021 Families Forecast',
      totalPopExposed: '23,159 People'
    },
    portalModule: 'Relocation Priority'
  },
  {
    id: 'safe_site',
    step: '04',
    phase: 'AUTONOMOUS SCREENING',
    title: 'Safe-Site Carrying Capacity Discovery',
    subtitle: 'Carrying Capacity',
    badge: '10 Safe Sites Evaluated',
    badgeType: 'green',
    accentColor: '#10B981',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    headline: 'Topographic Spatial Search for Viable Resettlement Havens',
    desc: 'Autonomously scans regional geography outside danger zones, applying rigorous screening for gentle slopes (<15°), distance to active thrust faults (>500m), water security, and infrastructure capacity to eliminate secondary disaster risks.',
    features: [
      'Slope Stability Filter (<15° Threshold)',
      'Geological Fault Buffer Exclusion',
      'Net Carrying Capacity Load Calculation',
      'Secondary Disaster Risk Prevention'
    ],
    telemetry: {
      candidateSites: '10 Qualified Grounds',
      capacityStatus: 'Ready / Limited / Multi-split',
      greenZoneRatio: '100% Outside Red Zones',
      waterSecurity: 'Spring & River Catchment Checked'
    },
    portalModule: 'Safe-Site Discovery'
  },
  {
    id: 'ahp_ranking',
    step: '05',
    phase: 'MCDA RANKING ENGINE',
    title: 'AHP Multi-Criteria Safe Site Optimization',
    subtitle: 'Analytic Hierarchy',
    badge: 'Mathematical Ranking',
    badgeType: 'blue',
    accentColor: '#3B82F6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 3 4 4-4 4" />
        <path d="M20 7H4" />
        <path d="m8 21-4-4 4-4" />
        <path d="M4 17h16" />
      </svg>
    ),
    headline: 'Pairwise Mathematical Matrix for Village-Specific Relocation Matching',
    desc: 'Computes Analytic Hierarchy Process (AHP) matrices evaluating Hazard Safety (40%), Road Proximity (20%), Water Access (20%), and Land Availability (20%) with strict Consistency Ratio (CR < 0.10) to deliver Rank 01, 02, and 03 safe sites.',
    features: [
      'AHP Pairwise Comparative Math',
      'Village-Specific Optimal Match Engine',
      'Technical Feasibility Suitability Score (0-100)',
      'Side-by-Side Multi-Site Dossier Matrix'
    ],
    telemetry: {
      consistencyRatio: 'CR = 0.04 (< 0.10 Passed)',
      topPick: 'Srinagar Outskirts (88.0 Score)',
      rank02: 'Pauri Outskirts (82.5 Score)',
      rank03: 'Kirtinagar Safe Plateau'
    },
    portalModule: 'Site Comparison'
  },
  {
    id: 'directives',
    step: '06',
    phase: 'AUDITABLE GOVERNANCE',
    title: 'NDMA Executive Reports & Relocation Directives',
    subtitle: 'Action Register',
    badge: 'NDMA Section 38',
    badgeType: 'orange',
    accentColor: '#FF6B35',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    headline: 'Audit-Proof Briefings & Official Printable Directives',
    desc: 'Transforms mathematical and GIS decisions into verifiable, transparent executive briefs. Generates statutory action registers, transit corridors, and official one-click print reports for District Magistrates and NDRF Commanders.',
    features: [
      'One-Click Official Print Dossier',
      'NDMA Section 38 Statutory Compliance',
      'Action Register with Immediate Lead Officers',
      'Lifeline Infrastructure Security Plan'
    ],
    telemetry: {
      auditStatus: '100% Auditable Deterministic Trace',
      legalFramework: 'NDMA Act 2005 Compliant',
      exportFormat: 'Browser Print + PDF Dossier',
      clearanceLevel: 'Commander Executive Brief'
    },
    portalModule: 'Reports'
  }
];

export default function FeatureCtaHub({ onLaunchFeature }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto step progression when autoplay is enabled (faster cycling)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % PIPELINE_NODES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeNode = PIPELINE_NODES[activeNodeIndex];

  return (
    <section className="creative-workflow-section" id="actions">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill">
            <span className="pulse-beacon"></span>
            <span>EVIDENCE-BASED RISK & RELOCATION PIPELINE</span>
          </div>
          <h2 className="section-title">End-to-End Decision Architecture</h2>
          <p className="section-subtitle">
            An automated 6-stage operational pipeline transforming multi-spectral geospatial telemetry into auditable community relocation directives.
          </p>
        </div>

        {/* 1. Interactive Pipeline Circuit Flow Track */}
        <div className="circuit-flow-container">
          <div className="circuit-track-header">
            <span className="circuit-track-title font-mono">OPERATIONAL INTELLIGENCE PIPELINE</span>
            <div className="circuit-controls">
              <button
                type="button"
                className={`btn-circuit-play ${isPlaying ? 'playing' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause auto-cycle' : 'Start auto-cycle'}
              >
                <span>{isPlaying ? '⏸ Auto-Cycling' : '▶ Play Pipeline'}</span>
              </button>
            </div>
          </div>

          <div className="circuit-nodes-rail">
            {PIPELINE_NODES.map((node, idx) => {
              const isActive = activeNodeIndex === idx;
              const isPast = idx < activeNodeIndex;
              return (
                <div key={node.id} className="circuit-node-wrapper">
                  <button
                    type="button"
                    className={`circuit-node-btn ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                    onClick={() => {
                      setActiveNodeIndex(idx);
                      setIsPlaying(false);
                    }}
                  >
                    <div className="node-step-circle font-mono">
                      {isPast ? '✓' : node.step}
                    </div>
                    <div className="node-btn-text">
                      <span className="node-phase font-mono">{node.phase}</span>
                      <span className="node-title-compact">{node.portalModule}</span>
                    </div>
                  </button>

                  {idx < PIPELINE_NODES.length - 1 && (
                    <div className={`circuit-wire ${isPast || isActive ? 'flowing' : ''}`}>
                      <span className="wire-pulse"></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Spotlight Command Terminal Card */}
        <div className="circuit-terminal-card">
          {/* Top terminal bar */}
          <div className="terminal-top-bar">
            <div className="terminal-left-meta">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-amber"></span>
              <span className="terminal-dot dot-green"></span>
              <span className="terminal-stage-label font-mono">
                STAGE {activeNode.step} OF 06 &nbsp;·&nbsp; {activeNode.phase}
              </span>
            </div>

            <div className="terminal-right-tag font-mono">
              <span className="portal-indicator-dot"></span>
              <span>PORTAL DESTINATION:</span>
              <strong>{activeNode.portalModule}</strong>
            </div>
          </div>

          {/* Terminal Body Grid: Left Content + Right Live Telemetry Screen */}
          <div className="terminal-body-grid">
            {/* Left Col: Explanations & Capabilities */}
            <div className="terminal-info-col">
              <div className="terminal-heading-row">
                <div className="terminal-icon-box">
                  {activeNode.icon}
                </div>
                <div>
                  <span className="terminal-sub-label font-mono">{activeNode.subtitle}</span>
                  <h3 className="terminal-main-title">{activeNode.title}</h3>
                </div>
              </div>

              <h4 className="terminal-headline">{activeNode.headline}</h4>
              <p className="terminal-desc">{activeNode.desc}</p>

              {/* Bullet Features with Checks */}
              <div className="terminal-features-list">
                <span className="features-list-title font-mono">ENGINEERING CAPABILITIES:</span>
                <div className="features-checklist-grid">
                  {activeNode.features.map((feat, i) => (
                    <div key={i} className="feat-check-item">
                      <div className="feat-check-icon">✓</div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Live Telemetry Glass Console */}
            <div className="terminal-telemetry-col">
              <div className="telemetry-screen-card">
                <div className="telemetry-screen-header">
                  <span className="screen-header-title font-mono">LIVE MODEL TELEMETRY</span>
                  <span className="screen-live-chip font-mono">● LIVE</span>
                </div>

                <div className="telemetry-metrics-grid">
                  {Object.entries(activeNode.telemetry).map(([key, val], i) => (
                    <div key={i} className="telemetry-metric-tile">
                      <span className="tel-key font-mono">
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </span>
                      <span className="tel-val font-mono">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Simulated Pipeline Signal Progress */}
                <div className="telemetry-signal-box">
                  <div className="signal-header">
                    <span className="signal-lbl font-mono">STAGE CONFIDENCE & CONVERGENCE</span>
                    <span className="signal-pct font-mono">99.2%</span>
                  </div>
                  <div className="signal-track">
                    <div
                      className="signal-fill"
                      style={{
                        width: `${((activeNodeIndex + 1) / PIPELINE_NODES.length) * 100}%`,
                        background: 'linear-gradient(90deg, #FF6B35 0%, #EA580C 100%)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Bottom Controls Bar */}
          <div className="terminal-bottom-nav">
            <div className="terminal-step-pills">
              {PIPELINE_NODES.map((n, i) => (
                <button
                  key={n.id}
                  type="button"
                  className={`term-pill-btn ${activeNodeIndex === i ? 'active' : ''}`}
                  onClick={() => {
                    setActiveNodeIndex(i);
                    setIsPlaying(false);
                  }}
                >
                  {n.step} {n.portalModule}
                </button>
              ))}
            </div>

            <div className="terminal-nav-arrows">
              <button
                type="button"
                className="btn-term-nav"
                disabled={activeNodeIndex === 0}
                onClick={() => {
                  setActiveNodeIndex((prev) => Math.max(0, prev - 1));
                  setIsPlaying(false);
                }}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="btn-term-nav"
                disabled={activeNodeIndex === PIPELINE_NODES.length - 1}
                onClick={() => {
                  setActiveNodeIndex((prev) => Math.min(PIPELINE_NODES.length - 1, prev + 1));
                  setIsPlaying(false);
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
