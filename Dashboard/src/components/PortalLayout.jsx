import React, { useState } from 'react';
import RiskMapView from './portal/RiskMapView';
import DashboardView from './portal/DashboardView';
import HazardAnalysisView from './portal/HazardAnalysisView';
import VulnerableHabitationsView from './portal/VulnerableHabitationsView';
import PopulationAtRiskView from './portal/PopulationAtRiskView';
import RelocationPriorityView from './portal/RelocationPriorityView';
import SafeSiteDiscoveryView from './portal/SafeSiteDiscoveryView';
import SiteComparisonView from './portal/SiteComparisonView';
import ReportsView from './portal/ReportsView';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  },
  {
    id: 'risk-map',
    label: 'Risk Map',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    )
  },
  {
    id: 'hazard-analysis',
    label: 'Hazard Analysis',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  },
  {
    id: 'vulnerable-habitations',
    label: 'Vulnerable Habitations',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 'population-at-risk',
    label: 'Population at Risk',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    id: 'relocation-priority',
    label: 'Relocation Priority',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  },
  {
    id: 'safe-site-discovery',
    label: 'Safe-Site Discovery',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    id: 'site-comparison',
    label: 'Site Comparison',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 3 4 4-4 4" />
        <path d="M20 7H4" />
        <path d="m8 21-4-4 4-4" />
        <path d="M4 17h16" />
      </svg>
    )
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  }
];

export default function PortalLayout({ user, onLogout }) {
  // Default to 'dashboard' tab on login
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRelocationVillage, setSelectedRelocationVillage] = useState(null);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
    : 'AD';

  return (
    <div className="portal-root-layout">
      {/* 1. Left Full-Height Sidebar (100vh) */}
      <aside className={`portal-sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Brand Header at top of sidebar */}
        <div className="sidebar-brand-box">
          <div className="sidebar-brand-emblem">
            <img src="/logo.png" alt="NARADA Logo" className="sidebar-brand-img" />
          </div>
          {!collapsed && (
            <div className="sidebar-brand-text-col">
              <span className="sidebar-narada-title">NARADA</span>
              <span className="sidebar-narada-subtitle">OPERATIONAL COMMAND</span>
            </div>
          )}
        </div>

        {/* 10 Navigation Items */}
        <nav className="portal-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`portal-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
              >
                <span className="portal-nav-icon-wrap">{item.icon}</span>
                {!collapsed && <span className="portal-nav-text">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom Footer Status */}
        <div className="portal-sidebar-bottom-bar">
          <div className="portal-system-secure-status">
            <span className="system-secure-dot"></span>
            {!collapsed && <span className="system-secure-label">SYSTEM SECURE</span>}
          </div>
          <button
            type="button"
            className="btn-sidebar-collapse-toggle"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d={collapsed ? "m13 15 3-3-3-3" : "m16 15-3-3 3-3"} />
            </svg>
          </button>
        </div>
      </aside>

      {/* 2. Right Main Column */}
      <div className="portal-right-column">
        {/* Top Header Bar */}
        <header className="portal-top-navbar">
          <div className="portal-top-breadcrumb">
            <span>REGIONAL SITUATION ROOM &nbsp;•&nbsp; NARADA OPERATIONAL COMMAND</span>
          </div>

          <div className="portal-top-user-actions">
            <div className="portal-user-profile-pill">
              <div className="portal-user-avatar-tag">{initials}</div>
              <div className="portal-user-details-col">
                <span className="portal-user-email-text">{user?.email || 'admin@gmail.com'}</span>
                <span className="portal-user-role-text">{user?.role?.toUpperCase() || 'COMMANDER'}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-portal-logout"
              onClick={onLogout}
              title="Sign Out"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="portal-main-blank-canvas">
          {activeTab === 'risk-map' && <RiskMapView />}
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onScreenSafeSites={(v) => {
                setSelectedRelocationVillage(v);
                setActiveTab('safe-site-discovery');
              }}
            />
          )}
          {activeTab === 'hazard-analysis' && <HazardAnalysisView />}
          {activeTab === 'vulnerable-habitations' && <VulnerableHabitationsView />}
          {activeTab === 'population-at-risk' && (
            <PopulationAtRiskView onNavigateToRelocation={() => setActiveTab('relocation-priority')} />
          )}
          {activeTab === 'relocation-priority' && (
            <RelocationPriorityView
              onScreenSafeSites={(v) => {
                setSelectedRelocationVillage(v);
                setActiveTab('safe-site-discovery');
              }}
            />
          )}
          {activeTab === 'safe-site-discovery' && (
            <SafeSiteDiscoveryView
              initialVillageContext={selectedRelocationVillage}
              onCompareSite={(s) => setActiveTab('site-comparison')}
            />
          )}
          {activeTab === 'site-comparison' && <SiteComparisonView />}
          {activeTab === 'reports' && <ReportsView />}
          {activeTab !== 'risk-map' &&
            activeTab !== 'dashboard' &&
            activeTab !== 'hazard-analysis' &&
            activeTab !== 'vulnerable-habitations' &&
            activeTab !== 'population-at-risk' &&
            activeTab !== 'relocation-priority' &&
            activeTab !== 'safe-site-discovery' &&
            activeTab !== 'site-comparison' &&
            activeTab !== 'reports' && (
              <div className="portal-tab-placeholder">
                {/* Other tabs remain blank for now as requested */}
              </div>
            )}
        </main>
      </div>
    </div>
  );
}
