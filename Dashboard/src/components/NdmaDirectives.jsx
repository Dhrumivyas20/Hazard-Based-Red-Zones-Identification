import React, { useState } from 'react';

export default function NdmaDirectives({ onShowDirectiveModal }) {
  const [selectedProtocol, setSelectedProtocol] = useState(0);

  const protocols = [
    {
      id: 'sop-42',
      badge: 'SOP §4.2 (ZONATION)',
      docId: 'REF: NDMA/GSI-SOP-4.2/2026',
      title: 'Hazard Zonation & Gazette Red-Flagging',
      authority: 'Geological Survey of India (GSI) & NDMA Guidelines',
      btnText: 'View Gazette Red-Flagging Directive',
      desc: 'Automatic conversion of InSAR displacement thresholds and slope stability indices into legally recognized Red-Zone notifications for District Authorities.',
      keyPoints: [
        'Automated Factor of Safety (FoS < 1.0) red-flagging & polygon bounding',
        'Official geospatial shapefile & contour bundle generation for District Collector',
        'Direct integration with State Disaster Management Authorities (SDMA)'
      ],
      compliance: 'NDMA Landslide Code 2019',
      dispatchStatus: 'Instant Gazette Alert (2h SLA)',
      targetRecipients: 'District Magistrate & Town Planning',
      legalStandard: 'DM Act 2005 (Sec 38) & Revenue Code'
    },
    {
      id: 'sop-71',
      badge: 'SOP §7.1 (CAPACITY)',
      docId: 'REF: NDMA/NGT-CAP-7.1/2026',
      title: 'Carrying Capacity & Construction Moratorium',
      authority: 'National Green Tribunal (NGT) & Ministry of Environment',
      btnText: 'View Construction Moratorium Directive',
      desc: 'Algorithmic assessment of land-stress threshold limits, infrastructure overload, and ecological saturation to trigger statutory development pauses.',
      keyPoints: [
        'Dynamic multi-factor socio-ecological load index calculation (> 140% alert)',
        'Immediate statutory construction moratorium on slopes steeper than 30°',
        'Mandatory structural load audit for commercial multi-tier buildings (> 45 kPa)'
      ],
      compliance: 'NGT Hill Town Norms',
      dispatchStatus: 'Statutory Municipal Freeze',
      targetRecipients: 'Municipal Commissioner & Development Auth',
      legalStandard: 'Environment Protection Act 1986'
    },
    {
      id: 'sop-34',
      badge: 'ACT §34 (RESETTLEMENT)',
      docId: 'REF: NDMA/MHA-RELOC-34/2026',
      title: 'Vulnerability-Ranked Relocation Matrix',
      authority: 'Ministry of Home Affairs (MHA) & NDMA Resettlement Norms',
      btnText: 'View Priority Resettlement Directive',
      desc: 'Multi-criteria decision analysis (MCDA) assigning transparent urgency scores to vulnerable habitations for staged, prioritized resettlement.',
      keyPoints: [
        'Weighted physical hazard & demographic exposure scoring (> 85/100 threshold)',
        'Automated resettlement plot assignment to certified Greenfield Sector G-4',
        'Direct biometric verification & legal land deed entitlement guarantee'
      ],
      compliance: 'Statutory Disaster Relief Act',
      dispatchStatus: 'Direct Land Deed + Fund Tranche',
      targetRecipients: 'District Collector & Relief Commissioner',
      legalStandard: 'DM Act 2005 (Sec 34) & SDRF Norms'
    },
    {
      id: 'sop-108',
      badge: 'SOP §108 (EVACUATION)',
      docId: 'REF: NDMA/IRS-EVAC-108/2026',
      title: 'Emergency Evacuation & Resettlement Corridors',
      authority: 'National Disaster Response Force (NDRF) & SDRF Command',
      btnText: 'View Emergency Transit Directive',
      desc: 'Generates real-time, phase-by-phase evacuation roadmaps and transit corridor directives to safely relocate endangered populations to pre-verified sites.',
      keyPoints: [
        'Dynamic hazard-avoiding transit routing bypassing landslide runouts and flood basins',
        'One-way evacuation convoy logistics deployed on Route Blue-7 with SDRF escorts',
        'Operationalization of 500-bed pre-stocked emergency field shelters & medical triage'
      ],
      compliance: 'IRS Command Standard',
      dispatchStatus: 'Live IRS Convoy Radio Dispatch',
      targetRecipients: 'NDRF Battalion, SDRF & Police Dept',
      legalStandard: 'Incident Response System (IRS 2022)'
    }
  ];

  const current = protocols[selectedProtocol];

  return (
    <section className="ndma-section" id="deploy">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-pill">
            <span className="pulse-beacon"></span>
            <span>National Disaster Management Authority (NDMA) Standards</span>
          </div>
          <h2 className="section-title">Automated NDMA Directives & Compliance Protocol</h2>
          <p className="section-subtitle">
            Bridging AI hazard modeling with statutory disaster governance to produce actionable, compliant administrative directives for district authorities.
          </p>
        </div>

        <div className="ndma-grid">
          {/* Left Column: Protocol Selectors */}
          <div className="ndma-protocol-list">
            {protocols.map((p, idx) => (
              <div
                key={p.id}
                className={`ndma-protocol-item ${selectedProtocol === idx ? 'active' : ''}`}
                onClick={() => setSelectedProtocol(idx)}
              >
                <div className="protocol-item-top">
                  <span className="protocol-badge">{p.badge}</span>
                  <span className="protocol-compliance">{p.compliance}</span>
                </div>
                <h4 className="protocol-title">{p.title}</h4>
                <p className="protocol-authority">{p.authority}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Active Directive Dossier */}
          <div className="ndma-dossier-card">
            <div className="dossier-header">
              <div className="dossier-tag">
                <span className="dossier-dot"></span>
                <span>Statutory Directive Specification</span>
              </div>
              <span className="dossier-id">{current.docId}</span>
            </div>

            <div className="dossier-body">
              <h3 className="dossier-title">{current.title}</h3>
              <p className="dossier-authority-sub">{current.authority}</p>
              <p className="dossier-desc">{current.desc}</p>

              <div className="dossier-key-points">
                <h5 className="key-points-title">Core Directives & Enforcement Criteria:</h5>
                <ul>
                  {current.keyPoints.map((point, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dossier-meta-box">
                <div className="meta-item">
                  <span className="meta-label">DISPATCH STATUS</span>
                  <span className="meta-val status-live">{current.dispatchStatus}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">TARGET RECIPIENTS</span>
                  <span className="meta-val">{current.targetRecipients}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">LEGAL STANDARD</span>
                  <span className="meta-val">{current.legalStandard}</span>
                </div>
              </div>

              <div className="dossier-action-row">
                <button
                  className="btn btn-primary btn-dossier"
                  onClick={() => onShowDirectiveModal(current)}
                >
                  <span>📋 {current.btnText}</span>
                  <span className="action-arrow">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
