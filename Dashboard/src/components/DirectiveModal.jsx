import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const directiveDetails = {
  'sop-42': {
    docRef: 'NDMA/HZ-ZONATION/2026/SOP-4.2',
    orderType: 'STATUTORY HAZARD GAZETTE NOTIFICATION & RED-ZONE DELINEATION',
    authority: 'Disaster Management Act, 2005 (Sec 34/38) & NDMA Guidelines',
    summary: 'Continuous multi-temporal InSAR satellite radar and digital elevation slope strain models have detected acute ground displacement (> 4.8 mm/day) and slope shear failure risk across high-risk settlement envelopes.',
    pills: [
      { text: '🔴 Red Zone Severity: Level 4 (Critical)', class: 'badge-crit' },
      { text: 'Slope Safety Margin: FoS = 0.74', class: 'badge-stat' },
      { text: 'Delineated Area: 18 Hill Parcels', class: 'badge-stat' }
    ],
    actionTitle: 'MANDATED GAZETTE DIRECTIVES FOR DISTRICT MAGISTRATE',
    steps: [
      { num: 'A', title: 'Perimeter Cordon & Section 144 Notification (Within 2 Hours):', desc: 'Promulgate official gazette red-zone notification and restrict heavy vehicular movement across vulnerable slope contours.' },
      { num: 'B', title: 'Automated GIS Map Bundle Push to SDMA/EOC:', desc: 'Transmit real-time GIS polygons and runout hazard envelopes directly to State Disaster Emergency Operations Center.' },
      { num: 'C', title: 'Geotechnical Drone & Ground Verification Dispatch:', desc: 'Deploy SDRF geotechnical field verification units to validate surface fissures and tension cracks.' }
    ],
    safeHaven: {
      site: 'Buffer Safe Haven Site Bravo-2 (Elevation 1,820m)',
      geotech: 'Stable Quartzite Bedrock | Factor of Safety > 2.60',
      capacity: 'Emergency Holding Capacity: 3,200 Persons',
      access: 'All-Weather Link Road Ch. 14 (Zero Slope Runout Hazard)'
    }
  },
  'sop-71': {
    docRef: 'NDMA/CAPACITY-AUDIT/2026/SOP-7.1',
    orderType: 'HILL-TOWN SATURATION NOTICE & STATUTORY CONSTRUCTION MORATORIUM',
    authority: 'NDMA Hill Area Carrying Capacity Standards & NGT Guidelines',
    summary: 'Multi-dimensional socio-ecological modeling indicates local settlement density, groundwater withdrawal, and structural slope load have exceeded the environmental carrying threshold by 142%.',
    pills: [
      { text: '⚠️ Overcapacity Index: 142% (Critical Load)', class: 'badge-crit' },
      { text: 'Aquifer Depletion: Extreme Alert', class: 'badge-stat' },
      { text: 'Structural Density: 68 bldgs/hectare', class: 'badge-stat' }
    ],
    actionTitle: 'MANDATED MORATORIUM DIRECTIVES FOR MUNICIPAL AUTHORITIES',
    steps: [
      { num: 'A', title: 'Immediate Construction Moratorium Enforcement:', desc: 'Freeze all ongoing multi-tier RCC foundation excavations and commercial resort constructions in high-stress slope zones.' },
      { num: 'B', title: 'Structural & Bearing Capacity Audit:', desc: 'Conduct compulsory structural health audits for all buildings exceeding 3 storeys on slopes steeper than 30 degrees.' },
      { num: 'C', title: 'Demographic Load Re-distribution Protocol:', desc: 'Initiate zoning restrictions preventing future building permits until ecological mitigation and drainage retrofitting is completed.' }
    ],
    safeHaven: {
      site: 'Low-Density Expansion Zone Delta-1 (Greenfield Sector)',
      geotech: 'Gentle Gradient (< 12°) | Natural Porous Drainage Matrix',
      capacity: 'Sustainable Carrying Capacity: 8,500 Habitations',
      access: 'Dual-Lane Arterial Corridor (High Structural Bearing Capacity)'
    }
  },
  'sop-34': {
    docRef: 'NDMA/MCDA-RELOC/2026/ACT-34',
    orderType: 'STATUTORY MULTI-CRITERIA RESETTLEMENT ALLOCATION DIRECTIVE',
    authority: 'Disaster Management Act 2005 (Section 34 - Relief & Rehabilitation)',
    summary: 'Multi-Criteria Decision Analysis (MCDA) algorithmic evaluation has ranked endangered mountain habitations by physical hazard severity, structural fragility, and displacement urgency score.',
    pills: [
      { text: '🚨 Priority Tier: Tier 1 Immediate Dispatch', class: 'badge-crit' },
      { text: 'MCDA Urgency Score: 88.4 / 100', class: 'badge-stat' },
      { text: 'Verified Habitations: 450 Households', class: 'badge-stat' }
    ],
    actionTitle: 'MANDATED RESETTLEMENT DIRECTIVES FOR DISTRICT COLLECTOR',
    steps: [
      { num: 'A', title: 'Biometric Household Entitlement Issuance:', desc: 'Register all 450 Tier-1 households and issue statutory resettlement rehabilitation certificates.' },
      { num: 'B', title: 'Greenfield Land Parcel Allocation:', desc: 'Assign pre-surveyed permanent rehabilitation plots in low-risk Zone G-4 with deed guarantees.' },
      { num: 'C', title: 'Contingency Fund Disbursement:', desc: 'Release State Disaster Response Fund (SDRF) interim relocation stipends to beneficiaries.' }
    ],
    safeHaven: {
      site: 'Designated Greenfield Resettlement Sector G-4',
      geotech: 'Stable Low-Gradient Fluvial Terrace | Factor of Safety > 2.80',
      capacity: 'Permanent Habitation Capacity: 600 Resettlement Plots',
      access: 'Paved Primary Highway NH-7 (Fully Service-Connected)'
    }
  },
  'sop-108': {
    docRef: 'NDMA/IRS-EVAC/2026/SOP-108',
    orderType: 'INCIDENT RESPONSE SYSTEM (IRS) PHASED EVACUATION DISPATCH ORDER',
    authority: 'NDRF / SDRF Incident Response System Operational Guidelines',
    summary: 'Precipitation threshold exceedance (> 180 mm in 24 hours) combined with accelerated slope creeping warrants immediate phase-by-phase evacuation of high-vulnerability settlements.',
    pills: [
      { text: 'Operational Status: Code Red Evacuation Active', class: 'badge-crit' },
      { text: 'Rainfall Exceedance: 210 mm / 24h', class: 'badge-stat' },
      { text: 'Transit Window: 90 Minutes Remaining', class: 'badge-stat' }
    ],
    actionTitle: 'MANDATED EMERGENCY LOGISTICS DIRECTIVES FOR EOC & NDRF',
    steps: [
      { num: 'A', title: 'One-Way Transit Corridor Activation:', desc: 'Deploy traffic police and SDRF to enforce dedicated one-way evacuation convoys along Route Blue-7.' },
      { num: 'B', title: 'Emergency Triage & Relief Camp Setup:', desc: 'Activate 500-bed pre-stocked emergency shelters with medical supplies, power backups, and potable water.' },
      { num: 'C', title: 'Vulnerable Population Transport Priority:', desc: 'Deploy specialized emergency mini-buses for senior citizens, patients, and children to shelter sites.' }
    ],
    safeHaven: {
      site: 'District Emergency Operations Shelter Alpha-1',
      geotech: 'Flood-Protected High Plain | Zero Landslide Runout Susceptibility',
      capacity: 'Emergency Holding Capacity: 2,500 Evacuees',
      access: 'Direct 4-Lane Bypass Route Blue-7 (Monitored 24/7)'
    }
  }
};

export const exportDirectiveToPdf = (detail, protocol) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(15, 23, 42); // #0F172A
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Republic / NDMA Emblem Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('GOVERNMENT OF INDIA • NATIONAL DISASTER MANAGEMENT AUTHORITY', pageWidth / 2, 11, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(254, 215, 170); // #FED7AA
  doc.text('MINISTRY OF HOME AFFAIRS • STATUTORY EMERGENCY DIRECTIVE DISPATCH', pageWidth / 2, 17, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`Doc Ref: ${detail.docRef} | Dispatch Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}`, pageWidth / 2, 23, { align: 'center' });

  let y = 36;

  // Order Title
  doc.setTextColor(194, 65, 12); // Terracotta #C2410C
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  const titleLines = doc.splitTextToSize(detail.orderType, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 5.5 + 2;

  // Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Statutory Authority:', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(detail.authority, margin + 35, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Issuing System:', margin + 4, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('NARADA Geospatial AI Core & Multi-Hazard Zonation Engine', margin + 35, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Target Persona:', margin + 4, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(protocol?.authority || 'District Multi-Hazard Incident Command', margin + 35, y + 18);

  y += 28;

  // Section 1: Executive Summary & Metrics
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. EXECUTIVE SUMMARY & THREAT CLASSIFICATION', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(detail.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.5 + 4;

  // Pills / Metric Badges
  doc.setFontSize(8);
  let pillX = margin;
  detail.pills.forEach((pill) => {
    const cleanText = pill.text.replace(/^[^\w]+/, '').trim();
    const pillWidth = doc.getTextWidth(cleanText) + 8;
    const isCrit = pill.class === 'badge-crit';
    
    doc.setFillColor(isCrit ? 254 : 241, isCrit ? 242 : 245, isCrit ? 242 : 249);
    doc.setDrawColor(isCrit ? 254 : 203, isCrit ? 202 : 213, isCrit ? 202 : 225);
    doc.roundedRect(pillX, y, pillWidth, 6.5, 1.5, 1.5, 'FD');
    doc.setTextColor(isCrit ? 220 : 30, isCrit ? 38 : 41, isCrit ? 38 : 59);
    doc.setFont('helvetica', 'bold');
    doc.text(cleanText, pillX + 4, y + 4.5);
    pillX += pillWidth + 4;
  });
  y += 12;

  // Section 2: Mandated Directives
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`2. ${detail.actionTitle}`, margin, y);
  y += 6;

  detail.steps.forEach((step) => {
    // Step circle
    doc.setFillColor(15, 23, 42);
    doc.circle(margin + 3, y + 2, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(step.num, margin + 3, y + 3, { align: 'center' });

    // Step Title & description
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(step.title, margin + 9, y + 2);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const descLines = doc.splitTextToSize(step.desc, contentWidth - 10);
    doc.text(descLines, margin + 9, y + 6);
    y += descLines.length * 4 + 7;
  });

  y += 2;

  // Section 3: Safe Haven Parameters
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. DESIGNATED SAFE HAVEN & REHABILITATION PARAMETERS', margin, y);
  y += 5;

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('• Target Site:', margin + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(detail.safeHaven.site, margin + 30, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('• Geotech Safety:', margin + 4, y + 10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(detail.safeHaven.geotech, margin + 30, y + 10);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('• Capacity Load:', margin + 4, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(detail.safeHaven.capacity, margin + 30, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('• Transit Access:', margin + 4, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(detail.safeHaven.access, margin + 30, y + 20);

  // Footer / Verification Seal
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('NARADA Automated Resettlement Intelligence System • Smart India Hackathon (SIH)', margin, pageHeight - 13);
  doc.text('STATUTORY VERIFICATION: DIGITALLY SIGNED & NOTIFIED UNDER NDMA ACT §34/38', margin, pageHeight - 9);

  const cleanFilename = detail.docRef.replace(/[\/\s:]+/g, '_') + '.pdf';
  doc.save(cleanFilename);
};

export default function DirectiveModal({ protocol, onClose, onDownload }) {
  const [downloading, setDownloading] = useState(false);

  if (!protocol) return null;

  const detail = directiveDetails[protocol.id] || directiveDetails['sop-42'];

  const handleExportPdf = () => {
    setDownloading(true);
    try {
      exportDirectiveToPdf(detail, protocol);
      if (onDownload) {
        onDownload(detail);
      }
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  return (
    <div className="modal-backdrop" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-card directive-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <div className="icon-modal">🏛️</div>
          <div>
            <h3 className="modal-title">{detail.orderType}</h3>
            <p className="modal-sub">National Disaster Management Authority Protocol #{protocol.badge}</p>
          </div>
        </div>

        <div className="modal-content directive-modal-content">
          <div className="directive-official-header">
            <div className="gov-seal">NATIONAL DISASTER MANAGEMENT AUTHORITY — OFFICIAL DISPATCH</div>
            <div className="directive-meta-grid">
              <div><strong>Document Ref:</strong> {detail.docRef}</div>
              <div><strong>Date & Timestamp:</strong> {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</div>
              <div><strong>Issuing Engine:</strong> NARADA Geospatial AI Core</div>
              <div><strong>Statutory Authority:</strong> {detail.authority}</div>
            </div>
          </div>

          <div className="directive-body-section">
            <h4 className="directive-section-heading">1. EXECUTIVE SUMMARY & THREAT CLASSIFICATION</h4>
            <p className="directive-p">
              {detail.summary}
            </p>
            <div className="directive-stat-pill-row">
              {detail.pills.map((pill, idx) => (
                <span key={idx} className={pill.class}>{pill.text}</span>
              ))}
            </div>
          </div>

          <div className="directive-body-section">
            <h4 className="directive-section-heading">2. {detail.actionTitle}</h4>
            <div className="directive-steps-list">
              {detail.steps.map((step, idx) => (
                <div key={idx} className="directive-step-item">
                  <span className="step-num">{step.num}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="directive-body-section">
            <h4 className="directive-section-heading">3. DESIGNATED SAFE HAVEN & RESETTLEMENT PARAMETERS</h4>
            <div className="safe-haven-box">
              <div className="haven-detail"><strong>Target Site:</strong> {detail.safeHaven.site}</div>
              <div className="haven-detail"><strong>Geotechnical Safety:</strong> {detail.safeHaven.geotech}</div>
              <div className="haven-detail"><strong>Capacity:</strong> {detail.safeHaven.capacity}</div>
              <div className="haven-detail"><strong>Transit Corridor:</strong> {detail.safeHaven.access}</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={handleExportPdf}
            disabled={downloading}
          >
            <span>{downloading ? '⏳ Generating PDF...' : '📥 Export Official PDF Directive'}</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Acknowledge & Confirm Dispatch
          </button>
        </div>
      </div>
    </div>
  );
}
