import React from 'react';

export default function VulnerableHabitationsList({ habitations, loading }) {
  if (loading) {
    return (
      <section className="section-solution" id="habitations">
        <div className="container text-center">
          <p>Connecting to PostgreSQL database for settlement telemetry...</p>
        </div>
      </section>
    );
  }

  if (!habitations || habitations.length === 0) return null;

  return (
    <section className="section-solution" id="habitations" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-pill">
            <span className="pulse-beacon"></span>
            <span>Live Red Zone Registry</span>
          </div>
          <h2 className="section-title">Monitored Vulnerable Habitations</h2>
          <p className="section-subtitle">
            Synchronized live from PostgreSQL with calculated Carrying Capacity loads and relocation flags.
          </p>
        </div>

        <div className="habitations-grid">
          {habitations.map((h) => {
            const isRed = h.hazard_zone_tier === 'RED';
            const isOrange = h.hazard_zone_tier === 'ORANGE';

            return (
              <div
                key={h.id}
                className="habitation-card"
                style={{
                  borderLeft: `4px solid ${isRed ? '#DC2626' : isOrange ? '#D97706' : '#16A34A'}`
                }}
              >
                <div className="hab-top">
                  <div>
                    <h4 className="hab-name">{h.name}</h4>
                    <span className="hab-loc">{h.district}, {h.state}</span>
                  </div>
                  <span
                    className="zone-pill-mini"
                    style={{
                      background: isRed ? '#FEE2E2' : isOrange ? '#FEF3C7' : '#DCFCE7',
                      color: isRed ? '#DC2626' : isOrange ? '#D97706' : '#16A34A'
                    }}
                  >
                    {h.hazard_zone_tier} ZONE
                  </span>
                </div>

                <div className="hab-details-grid">
                  <div>
                    <span className="lbl">Population:</span>
                    <strong>{h.population.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="lbl">Capacity Load:</span>
                    <strong style={{ color: h.current_carrying_capacity_load_pct > 100 ? '#DC2626' : '#16A34A' }}>
                      {h.current_carrying_capacity_load_pct}%
                    </strong>
                  </div>
                  <div>
                    <span className="lbl">Slope / FoS:</span>
                    <strong>{h.slope_angle_deg}° (FoS {h.factor_of_safety})</strong>
                  </div>
                  <div>
                    <span className="lbl">Relocation Urgency:</span>
                    <strong style={{ color: '#EA580C' }}>{h.relocation_urgency_score}/100</strong>
                  </div>
                </div>

                <div className="hab-footer">
                  <span className="safe-loc">📍 Safe Haven: {h.safe_haven_location}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
