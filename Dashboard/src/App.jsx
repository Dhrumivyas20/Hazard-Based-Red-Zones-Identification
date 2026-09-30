import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import FeatureCtaHub from './components/FeatureCtaHub';
import NdmaDirectives from './components/NdmaDirectives';
import DirectiveModal from './components/DirectiveModal';
import AuthModal from './components/AuthModal';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import PortalLayout from './components/PortalLayout';
import { fetchLandingMetrics, fetchFeatures } from './services/api';

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeDirective, setActiveDirective] = useState(null);
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('terrashield_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login'
  const [isEnteringPortal, setIsEnteringPortal] = useState(false);
  const [isExitingPortal, setIsExitingPortal] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      try {
        const [metricsData, featuresData] = await Promise.all([
          fetchLandingMetrics(),
          fetchFeatures()
        ]);
        setMetrics(metricsData || []);
        setFeatures(featuresData || []);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLaunchFeature = (featureName) => {
    showToast(`Launching ${featureName} workflow...`);
  };

  const handleAction = () => {
    const el = document.getElementById('actions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('✨ NARADA - Operations Hub');
  };

  const handleOpenAuth = (mode = 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userProfile) => {
    setAuthModalOpen(false);
    setIsEnteringPortal(true);
    
    setTimeout(() => {
      setCurrentUser(userProfile);
      try {
        localStorage.setItem('terrashield_user', JSON.stringify(userProfile));
      } catch (e) {
        console.error(e);
      }
      setIsEnteringPortal(false);
      showToast(`🎉 Welcome, ${userProfile.name}! Connected as ${userProfile.role}.`);
    }, 2500);
  };

  const handleLogout = () => {
    setIsExitingPortal(true);
    setTimeout(() => {
      setCurrentUser(null);
      try {
        localStorage.removeItem('terrashield_user');
      } catch (e) {
        console.error(e);
      }
      setIsExitingPortal(false);
      showToast('🔒 You have safely logged out of NARADA.');
    }, 2000);
  };

  const handleGetStarted = () => {
    if (currentUser) {
      handleAction();
    } else {
      handleOpenAuth('signup');
    }
  };

  const handleDownloadDirective = (detail) => {
    showToast(`📥 Official NDMA PDF Directive (${detail?.docRef || 'SOP'}) downloaded to your local device!`);
  };

  if (isEnteringPortal) {
    return (
      <div className="portal-loading-screen">
        <div className="loader-content">
          <img src="/logo.png" alt="NARADA Logo" className="loader-logo" />
          <h2 className="loader-title font-mono">INITIALIZING SECURE CONNECTION</h2>
          <p className="loader-subtitle">Establishing secure link to NARADA Operational Command...</p>
          <div className="loader-progress-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isExitingPortal) {
    return (
      <div className="portal-loading-screen portal-logout-screen">
        <div className="loader-content">
          <img src="/logo.png" alt="NARADA Logo" className="loader-logo loader-logo-exit" />
          <h2 className="loader-title font-mono">TERMINATING SECURE SESSION</h2>
          <p className="loader-subtitle">Safely closing NARADA Operational Command link...</p>
          <div className="loader-progress-bar">
            <div className="loader-progress loader-progress-exit"></div>
          </div>
        </div>
      </div>
    );
  }

  // If user is authenticated, render the dedicated Portal / Dashboard with Sidebar & Blank Main Area
  if (currentUser) {
    return (
      <div className="app-container">
        <PortalLayout user={currentUser} onLogout={handleLogout} />

        {/* Floating System Toast */}
        {toastMessage && (
          <div className="toast-notice">
            <span>🛡️</span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // Public Landing Page View (when not logged in)
  return (
    <div className="app-container">
      <Navbar
        user={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenDemo={handleGetStarted}
      />
      
      <main>
        <Hero metrics={metrics} loadingMetrics={loading} />
        <FeatureGrid features={features} loading={loading} />
        <FeatureCtaHub onLaunchFeature={handleLaunchFeature} />
        <NdmaDirectives onShowDirectiveModal={(protocol) => setActiveDirective(protocol)} />
        <CtaBanner onOpenAction={handleGetStarted} />
      </main>

      <Footer />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* NDMA Statutory Directive Modal */}
      {activeDirective && (
        <DirectiveModal
          protocol={activeDirective}
          onClose={() => setActiveDirective(null)}
          onDownload={handleDownloadDirective}
        />
      )}

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="toast-notice">
          <span>🛡️</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
