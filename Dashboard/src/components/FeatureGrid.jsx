import React from 'react';

// Rich aesthetic SVG icons for core solution pillars
function renderFeatureIcon(type) {
  switch (type) {
    case 'ai_brain':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a6 6 0 0 1 6 6c0 2.22-1.2 4.16-3 5.2V15a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1.8C7.2 12.16 6 10.22 6 8a6 6 0 0 1 6-6z"></path>
          <path d="M9 19h6"></path>
          <path d="M10 22h4"></path>
        </svg>
      );
    case 'map':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
      );
    case 'bell':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      );
    case 'priority':
    case 'mountain':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
      );
    case 'safe_site':
    case 'analytics':
    case 'sensor':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'directives':
    case 'cloud':
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
  }
}

const featureMetadata = [
  {
    id: 1,
    tag: 'SPATIAL AI',
    badge: '98.7% Accuracy',
    title: 'AI Red Zone Prediction',
    desc: 'Deep neural networks analyze multi-temporal terrain strain, precipitation thresholds, and seismic fragility to delineate high-risk Red Zones before disasters occur.',
    iconType: 'ai_brain'
  },
  {
    id: 2,
    tag: 'GIS MAPPING',
    badge: 'InSAR & DEM Heatmaps',
    title: 'Dynamic Red Zone Mapping',
    desc: 'Interactive multi-layered GIS heatmaps showing high-hazard buffer zones, landslide runout corridors, and flash-flood susceptibility envelopes.',
    iconType: 'map'
  },
  {
    id: 3,
    tag: 'SMART ALERTS',
    badge: '< 60s Dispatch',
    title: 'Immediate Relocation Alerts',
    desc: 'Automated prioritization engine that ranks endangered habitations by urgency score, triggering instant administrative dispatch and evacuation directives.',
    iconType: 'bell'
  },
  {
    id: 4,
    tag: 'MCDA ENGINE',
    badge: 'Multi-Criteria Scoring',
    title: 'AI Relocation Priority Index',
    desc: 'Multi-criteria machine learning models rank endangered habitations by physical hazard severity, structural density, and displacement urgency.',
    iconType: 'priority'
  },
  {
    id: 5,
    tag: 'AUTONOMOUS SCAN',
    badge: 'Hydrology & Slope Verified',
    title: 'Automatic Safe-Site Discovery',
    desc: 'Autonomous geospatial algorithms evaluate terrain slope, hydrology, and access to automatically discover and verify optimal low-risk resettlement zones.',
    iconType: 'safe_site'
  },
  {
    id: 6,
    tag: 'NDMA DIRECTIVE',
    badge: 'Phase-by-Phase Roadmap',
    title: 'Automated Relocation Directives',
    desc: 'Generates NDMA-compliant phase-by-phase evacuation roadmaps connecting red zone settlements directly to newly discovered safe sites.',
    iconType: 'directives'
  }
];

export default function FeatureGrid({ features, loading }) {
  const displayItems = (features && features.length === 6)
    ? features.map((f, i) => ({
        ...f,
        tag: featureMetadata[i]?.tag || 'CORE AI',
        badge: featureMetadata[i]?.badge || 'Verified Module',
        iconType: f.icon_type || featureMetadata[i]?.iconType
      }))
    : featureMetadata;

  return (
    <section className="section-solution" id="features">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge-pill">
            <span className="pulse-beacon"></span>
            <span>Intelligent Core Capabilities</span>
          </div>
          <h2 className="section-title">Comprehensive Hazard & Relocation Solution</h2>
          <p className="section-subtitle">
            Powered by cutting-edge geospatial AI, carrying capacity modeling, and real-time vulnerability analytics.
          </p>
        </div>

        <div className="features-grid">
          {displayItems.map((item) => (
            <div key={item.id} className="feature-card">
              <div className="card-top-row">
                <div className="icon-box">
                  {renderFeatureIcon(item.iconType || item.icon_type)}
                </div>
                <span className="feature-category-tag">{item.tag}</span>
              </div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.description || item.desc}</p>
              <div className="card-bottom-row">
                <span className="feature-meta-badge">
                  <span className="meta-dot"></span>
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
