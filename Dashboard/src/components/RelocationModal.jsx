import React from 'react';

export default function RelocationModal({ isOpen, onClose, simData, onDispatchAlert }) {
  if (!isOpen || !simData) return null;

  const hazard = simData.hazard_evaluation;
  const reloc = simData.relocation_priority;
  const capacity = simData.carrying_capacity;

  return (
    <div className="modal-backdrop open" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <div className="icon-modal">🚨</div>
          <div>
            <h3 className="modal-title">Immediate Relocation & Action Directive</h3>
            <p className="modal-sub">
              Protocol Code: {reloc?.protocol_code || 'TS-2026-RELOC-889A'}
            </p>
          </div>
        </div>

        <div className="modal-content">
          <div style={{ marginBottom: '12px' }}>
            <strong>Hazard Classification:</strong>{' '}
            <span style={{ color: hazard?.theme_color || '#DC2626', fontWeight: 'bold' }}>
              {hazard?.status_title}
            </span>
            <br />
            <strong>Calculated Urgency:</strong> {reloc?.urgency_score}/100 |{' '}
            <strong>Carrying Capacity Load:</strong> {capacity?.capacity_load_pct}%
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '10px', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: '#0F172A' }}>
              Action Directives for District Administration:
            </h4>
            <ul style={{ paddingLeft: '18px', color: '#475569', fontSize: '0.86rem' }}>
              {reloc?.phases?.map((p, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  <strong>{p.phase}:</strong> {p.action}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ fontSize: '0.8rem', background: '#FFF4EE', border: '1px solid #FFEDD5', padding: '10px', borderRadius: '8px', color: '#C2410C' }}>
            🔒 Safe Haven Designated: <strong>{reloc?.safe_haven}</strong> | Transit Route: <strong>{reloc?.transit_corridor}</strong>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onDispatchAlert}>
            Confirm Emergency Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}
