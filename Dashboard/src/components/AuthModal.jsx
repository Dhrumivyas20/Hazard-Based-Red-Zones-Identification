import React, { useState } from 'react';
import PreAssignedCredentialsModal, { PRE_ASSIGNED_ACCOUNTS } from './PreAssignedCredentialsModal';
import { registerUser, loginUser } from '../services/api';

export default function AuthModal({ isOpen, initialMode = 'signup', onClose, onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('District Magistrate / SDMA Officer');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Credentials directory modal state
  const [showCredsModal, setShowCredsModal] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setErrorMsg('Please provide both official email and password.');
      setIsLoading(false);
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please provide your full official name.');
        setIsLoading(false);
        return;
      }

      if (password.length < 4) {
        setErrorMsg('Password must be at least 4 characters long.');
        setIsLoading(false);
        return;
      }

      try {
        const res = await registerUser({
          fullName: fullName.trim(),
          email: cleanEmail,
          password,
          role,
          department: department.trim()
        });

        if (!res.success) {
          setErrorMsg(res.message || 'Registration failed. Please try again.');
          setIsLoading(false);
          return;
        }

        // Successfully created and stored in database!
        setMode('login');
        setPassword('');
        setSuccessMsg('🎉 Account created successfully in database! Please sign in with your password to continue.');
      } catch (err) {
        setErrorMsg(err.message || 'An error occurred during registration.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (mode === 'login') {
      try {
        const res = await loginUser({ email: cleanEmail, password });

        if (!res.success) {
          setErrorMsg(res.message || 'Invalid email or password.');
          setIsLoading(false);
          return;
        }

        // Credentials matched!
        onAuthSuccess(res.user);
        onClose();
      } catch (err) {
        setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSelectFromDirectory = (account) => {
    const userProfile = {
      name: account.name,
      email: account.email,
      role: account.role,
      department: account.department,
      badge: account.badge,
      jurisdiction: account.jurisdiction,
      clearance: account.clearance,
      authTimestamp: new Date().toISOString()
    };
    onAuthSuccess(userProfile);
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop" style={{ display: 'flex' }} onClick={onClose}>
        <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>&times;</button>
          
          {/* Modal Brand Header */}
          <div className="auth-header">
            <div className="auth-icon-badge">
              <img src="/logo.png" alt="NARADA Emblem" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            </div>
            <div>
              <span className="auth-eyebrow font-mono">NARADA OPERATIONAL COMMAND</span>
              <h3 className="auth-title">
                {mode === 'signup' ? 'Create Official Command Account' : 'Operational Command Login'}
              </h3>
              <p className="auth-sub">
                {mode === 'signup'
                  ? 'Join NARADA Operational Command to access multi-hazard zonation & evacuation decision matrices'
                  : 'Sign in to access verified geospatial telemetry, carrying capacity models & relief dispatch'}
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="auth-tab-row">
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Create Account
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              Sign In
            </button>
          </div>

          {/* Success Flash Banner */}
          {successMsg && (
            <div className="auth-success-banner">
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Alert Banner */}
          {errorMsg && (
            <div className="auth-error-banner">
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label">Full Name & Official Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Commander Vikram Singh / Dr. Rajesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={mode === 'signup'}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Official Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder={mode === 'signup' ? 'e.g. officer@ndrf.gov.in' : 'admin@gmail.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label className="form-label">Security Password</label>
                {mode === 'login' && (
                  <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); setShowCredsModal(true); }}>
                    Use Test Credentials?
                  </a>
                )}
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === 'signup' && (
              <div className="form-checkbox-row">
                <input
                  type="checkbox"
                  id="termsCheckClean"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label htmlFor="termsCheckClean" className="checkbox-label">
                  I agree to the <strong>NDMA Statutory Data Compliance Protocol</strong>.
                </label>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-auth-submit" disabled={isLoading}>
              <span>
                {isLoading
                  ? 'Processing...'
                  : mode === 'signup'
                  ? 'Create Account & Save to Database'
                  : 'Authenticate & Open Command Center'}
              </span>
              <span className="action-arrow">&rarr;</span>
            </button>
          </form>

          {/* Single Clean Trigger Button at the Bottom */}
          <div className="auth-bottom-helper">
            <button
              type="button"
              className="btn-creds-directory-trigger"
              onClick={() => setShowCredsModal(true)}
            >
              <span className="key-icon">🚨</span>
              <span>View Pre-Assigned NDRF Commander Credentials</span>
              <span className="trigger-arrow">&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Credentials Modal */}
      {showCredsModal && (
        <PreAssignedCredentialsModal
          isOpen={showCredsModal}
          onClose={() => setShowCredsModal(false)}
          onSelectAccount={handleSelectFromDirectory}
        />
      )}
    </>
  );
}
