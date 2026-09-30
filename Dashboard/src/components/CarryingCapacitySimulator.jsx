import React, { useState, useEffect } from 'react';
import { runHazardSimulation } from '../services/api';

export default function CarryingCapacitySimulator({ onOpenPlanModal }) {
  const [slope, setSlope] = useState(38);
  const [rain, setRain] = useState(185);
  const [density, setDensity] = useState(4800);
  const [soil, setSoil] = useState(82);

  const [simResult, setSimResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(async () => {
      const res = await runHazardSimulation({
        slope_deg: slope,
        rainfall_24h_mm: rain,
        density_pop_km2: density,
        soil_saturation_pct: soil,
        total_population: 3500
      });
      if (isMounted && res) {
        setSimResult(res);
        setLoading(false);
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [slope, rain, density, soil]);

  const hazard = simResult?.hazard_evaluation;
  const capacity = simResult?.carrying_capacity;
  const reloc = simResult?.relocation_priority;

  const isRed = hazard?.tier === 'RED';
  const isOrange = hazard?.tier === 'ORANGE';

  return (
    <section className="simulator-section" id="simulator">
      <div className="container">
        <div className="sim-wrapper">
          <div className="sim-header">
            <div className="badge-pill">
              <span className="pulse-beacon"></span>
              <span>Dynamic API & Database Connected</span>
            </div>
            <h2 className="sim-title">Carrying Capacity & Red Zone Relocation Assessor</h2>
            <p className="sim-sub">
              Real-time calculation communicating with Node.js, FastAPI & PostgreSQL AI models.
            </p>
          </div>

          <div className="sim-body-grid">
            {/* Interactive Sliders */}
            <div className="sim-controls">
              <div className="control-group">
                <label className="control-label">
                  <span>Slope Angle (Degrees)</span>
                  <span className="control-value">{slope}°</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="65"
                  value={slope}
                  onChange={(e) => setSlope(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="range-markers">
                  <span>Gentle (5°)</span>
                  <span>Moderate (30°)</span>
                  <span>Critical (65°)</span>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">
                  <span>24-Hour Rainfall (mm)</span>
                  <span className="control-value">{rain} mm</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="350"
                  value={rain}
                  onChange={(e) => setRain(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="range-markers">
                  <span>Light (10mm)</span>
                  <span>Heavy (150mm)</span>
                  <span>Extreme (350mm)</span>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">
                  <span>Habitation Density (Pop/km²)</span>
                  <span className="control-value">{density.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="100"
                  value={density}
                  onChange={(e) => setDensity(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="range-markers">
                  <span>Sparse</span>
                  <span>Safe Capacity Limit</span>
                  <span>Overloaded</span>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">
                  <span>Soil Saturation & Pore Pressure</span>
                  <span className="control-value">{soil}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={soil}
                  onChange={(e) => setSoil(Number(e.target.value))}
                  className="range-slider"
                />
              </div>
            </div>

            {/* Live Model Output */}
            <div className="sim-results">
              <div
                className="result-status-card"
                style={{
                  background: isRed
                    ? 'linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%)'
                    : isOrange
                      ? 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
                      : 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
                  borderColor: isRed ? '#FECACA' : isOrange ? '#FDE68A' : '#A7F3D0'
                }}
              >
                <div className="status-top">
                  <span
                    className="zone-pill"
                    style={{
                      background: isRed ? '#DC2626' : isOrange ? '#D97706' : '#16A34A'
                    }}
                  >
                    {hazard?.status_title || 'Calculating...'}
                  </span>
                  <span
                    className="urgency-score"
                    style={{
                      color: isRed ? '#B91C1C' : isOrange ? '#B45309' : '#15803D'
                    }}
                  >
                    Urgency: {reloc?.urgency_score || 0}/100
                  </span>
                </div>

                <h3
                  className="zone-title"
                  style={{
                    color: isRed ? '#991B1B' : isOrange ? '#92400E' : '#166534'
                  }}
                >
                  {hazard?.directive || 'Evaluating Terrain...'}
                </h3>
                <p
                  className="zone-desc"
                  style={{
                    color: isRed ? '#7F1D1D' : isOrange ? '#78350F' : '#14532D'
                  }}
                >
                  {hazard?.description}
                </p>

                <div className="metrics-mini-grid">
                  <div className="metric-item">
                    <div className="m-label">Factor of Safety (FoS)</div>
                    <div className={`m-val ${isRed ? 'text-red' : isOrange ? 'text-amber' : 'text-green'}`}>
                      {hazard?.factor_of_safety || '--'} {isRed && <small>(Critical)</small>}
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="m-label">Carrying Capacity Load</div>
                    <div className={`m-val ${capacity?.is_overloaded ? 'text-red' : 'text-green'}`}>
                      {capacity?.capacity_load_pct || 100}% {capacity?.is_overloaded ? 'Exceeded' : 'Optimal'}
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="m-label">Target Habitations at Risk</div>
                    <div className="m-val">
                      {reloc?.affected_population?.toLocaleString() || 0} People
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="m-label">Designated Safe Haven</div>
                    <div className="m-val text-green">{reloc?.safe_haven || 'Safe Transit Camp'}</div>
                  </div>
                </div>

                <div className="action-bar-sim">
                  <button
                    className="btn btn-danger-action"
                    onClick={() => onOpenPlanModal(simResult)}
                  >
                    🚨 Generate Actionable Relocation Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
