import React, { useState } from 'react';

export const NDRF_COMMANDER_ACCOUNT = {
  id: 'usr_ndrf_01',
  name: 'Cmdr. Vikram Singh Rathore',
  email: 'commander.vikram@ndrf.gov.in',
  password: 'NDRF@Rescue2026!',
  role: 'NDRF / SDRF Incident Commander',
  department: '8th Battalion NDRF (Himalayan Quick Response)',
  badge: '🚨 NDRF Commander',
  jurisdiction: 'Western & Central Himalayan Corridors',
  clearance: 'Incident Response Lead'
};

export const ADMIN_COMMANDER_ACCOUNT = {
  id: 'usr_admin_01',
  name: 'Admin Commander',
  email: 'admin@gmail.com',
  password: 'admin',
  role: 'COMMANDER',
  department: 'Regional Situation Room • NARADA Operational Command',
  badge: '🛡️ Commander',
  jurisdiction: 'Rudraprayag & Chamoli Corridor',
  clearance: 'Operational Lead'
};

export const PRE_ASSIGNED_ACCOUNTS = [ADMIN_COMMANDER_ACCOUNT, NDRF_COMMANDER_ACCOUNT];

export default function PreAssignedCredentialsModal({ isOpen, onClose, onSelectAccount }) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const acc = NDRF_COMMANDER_ACCOUNT;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="modal-backdrop" style={{ display: 'flex', zIndex: 1100 }} onClick={onClose}>
      <div className="modal-card credentials-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <div className="icon-modal">🚨</div>
          <div>
            <h3 className="modal-title">NDRF Commander Credentials</h3>
            <p className="modal-sub">Pre-Assigned Authority Account for SIH Demonstration</p>
          </div>
        </div>

        <div className="modal-content credentials-modal-content">
          <p className="credentials-intro-text">
            Use the official <strong>NDRF Incident Commander</strong> credentials below to authenticate or click <strong>"1-Click Sign In"</strong> for instant verified command access.
          </p>

          <div className="cred-item-card" style={{ borderColor: '#FED7AA', background: '#FFFDFB' }}>
            <div className="cred-card-header">
              <div className="cred-role-tag">{acc.badge}</div>
              <span className="cred-clearance-pill">{acc.clearance}</span>
            </div>

            <div className="cred-card-body">
              <h4 className="cred-name" style={{ fontSize: '1.05rem' }}>{acc.name}</h4>
              <p className="cred-dept">{acc.department}</p>
              
              <div className="cred-fields-grid" style={{ gridTemplateColumns: '1fr', gap: '8px' }}>
                <div className="cred-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                  <div>
                    <span className="field-lbl">Official Email</span>
                    <code className="field-val" style={{ display: 'block', fontSize: '0.85rem' }}>{acc.email}</code>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    onClick={() => handleCopy(acc.email, 'email')}
                  >
                    {copiedField === 'email' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>

                <div className="cred-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                  <div>
                    <span className="field-lbl">Password</span>
                    <code className="field-val" style={{ display: 'block', fontSize: '0.85rem' }}>{acc.password}</code>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    onClick={() => handleCopy(acc.password, 'password')}
                  >
                    {copiedField === 'password' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>

                <div className="cred-field" style={{ paddingTop: '4px' }}>
                  <span className="field-lbl">Command Sector & Clearance</span>
                  <div style={{ fontSize: '0.76rem', color: '#475569', fontWeight: '600' }}>
                    {acc.jurisdiction} • Full Rescue Dispatch Authorization
                  </div>
                </div>
              </div>
            </div>

            <div className="cred-card-footer" style={{ marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-primary btn-auth-submit"
                style={{ width: '100%', margin: 0 }}
                onClick={() => {
                  onSelectAccount(acc);
                  onClose();
                }}
              >
                <span>1-Click Sign In as NDRF Commander</span>
                <span className="action-arrow">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
