/**
 * Dashboard/src/services/api.js
 * Centralized API client connecting Frontend to Backend (Node.js/Express) and FastAPI
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000/api/v1';

export async function fetchLandingMetrics() {
  try {
    const res = await fetch(`${API_BASE_URL}/landing-metrics`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, trying FastAPI or fallback:', err.message);
  }

  // Fallback to FastAPI
  try {
    const res = await fetch(`${FASTAPI_URL}/landing-metrics`);
    if (res.ok) {
      const json = await res.json();
      return json.metrics;
    }
  } catch (err) {
    console.warn('FastAPI unavailable, using cached seed:', err.message);
  }

  // Default seed fallback - Synchronized with Data/seed_data.json
  return [
    { metric_name: "AI Red-Zone Delineation", metric_value: "98.7%", badge_type: "green" },
    { metric_name: "AI Carrying Capacity Modeling", metric_value: "15+ Factors", badge_type: "blue" },
    { metric_name: "AI Safe-Site & Relocation Dispatch", metric_value: "< 60s", badge_type: "orange" }
  ];
}

export async function fetchFeatures() {
  try {
    const res = await fetch(`${API_BASE_URL}/features`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Backend unavailable, using feature fallback:', err.message);
  }

  return [
    {
      id: 1,
      title: "AI Red Zone Prediction",
      category: "prediction",
      icon_type: "ai_brain",
      color_theme: "blue",
      description: "Machine learning models analyze terrain strain, precipitation thresholds, and seismic fragility to delineate high-risk Red Zones before disasters occur."
    },
    {
      id: 2,
      title: "Dynamic Red Zone Mapping",
      category: "gis",
      icon_type: "map",
      color_theme: "green",
      description: "Interactive multi-layered GIS heatmaps showing high-hazard buffer zones, landslide runout corridors, and flash-flood susceptibility envelopes."
    },
    {
      id: 3,
      title: "Immediate Relocation Alerts",
      category: "alerts",
      icon_type: "bell",
      color_theme: "orange",
      description: "Automated prioritization engine that ranks endangered habitations by urgency score, triggering instant administrative dispatch and evacuation directives."
    },
    {
      id: 4,
      title: "AI Relocation Priority Index",
      category: "priority_index",
      icon_type: "priority",
      color_theme: "amber",
      description: "Multi-criteria machine learning models rank endangered habitations by physical hazard severity, structural density, and displacement urgency."
    },
    {
      id: 5,
      title: "Automatic Safe-Site Discovery",
      category: "safe_site",
      icon_type: "safe_site",
      color_theme: "purple",
      description: "Autonomous geospatial algorithms evaluate terrain slope, hydrology, and access to automatically discover and verify optimal low-risk resettlement zones."
    },
    {
      id: 6,
      title: "Automated Relocation Action Directives",
      category: "directives",
      icon_type: "directives",
      color_theme: "cyan",
      description: "Generates NDMA-compliant phase-by-phase evacuation roadmaps connecting red zone settlements directly to newly discovered safe sites."
    }
  ];
}

export async function fetchHabitations() {
  try {
    const res = await fetch(`${API_BASE_URL}/habitations`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Habitations API offline:', err.message);
  }
  return [];
}

export async function searchML2Samples(query = '') {
  const params = new URLSearchParams({ limit: '50' });
  if (query.trim()) params.set('q', query.trim());

  const res = await fetch(`${FASTAPI_URL}/ml2-samples?${params}`);
  if (!res.ok) throw new Error('Could not load prediction dataset records.');
  const json = await res.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Could not load prediction dataset records.');
  }
  return json.samples || [];
}

export async function predictML2Probability(features) {
  const res = await fetch(`${FASTAPI_URL}/predict-ml2-probability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features)
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.detail?.[0]?.msg || json.message || 'AI prediction failed.');
  }
  return json;
}

export async function runHazardSimulation(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/simulate-hazard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Simulation API call failed, calculating locally:', err.message);
  }

  // Local fallback calculation
  const slope = parseFloat(payload.slope_deg);
  const rain = parseFloat(payload.rainfall_24h_mm);
  const density = parseFloat(payload.density_pop_km2);
  const soil = parseFloat(payload.soil_saturation_pct);

  const baseFoS = 2.2 - (slope / 28) - (rain / 260) - (soil / 180);
  const fos = Math.max(0.42, Math.min(2.5, baseFoS)).toFixed(2);
  const safeLimit = Math.round(2200 * Math.max(0.2, 1 - (slope / 65) * 0.75) * Math.max(0.3, 1 - (soil / 100) * 0.4));
  const capacityLoad = Math.round((density / safeLimit) * 100);

  let score = Math.round((slope * 0.7) + (rain * 0.15) + ((soil / 100) * 25) + (capacityLoad * 0.12));
  score = Math.max(10, Math.min(99, score));

  return {
    hazard_evaluation: {
      tier: score >= 70 || fos < 1.0 ? "RED" : (score >= 45 ? "ORANGE" : "GREEN"),
      status_title: score >= 70 || fos < 1.0 ? "ZONE 1: CRITICAL RED ZONE" : (score >= 45 ? "ZONE 2: VULNERABLE ORANGE ZONE" : "ZONE 3: STABLE GREEN ZONE"),
      directive: score >= 70 || fos < 1.0 ? "Immediate Relocation Mandate Required" : (score >= 45 ? "Pre-Evacuation Warning" : "Settlement Stable"),
      hazard_index: score,
      factor_of_safety: parseFloat(fos),
      theme_color: score >= 70 || fos < 1.0 ? "#DC2626" : (score >= 45 ? "#D97706" : "#16A34A"),
      description: `Carrying capacity load at ${capacityLoad}%. Slope stability factor of safety: ${fos}.`
    },
    carrying_capacity: {
      current_density: density,
      safe_capacity_limit: safeLimit,
      capacity_load_pct: capacityLoad,
      is_overloaded: capacityLoad > 100,
      stress_level: capacityLoad > 150 ? 'CRITICAL' : 'NORMAL'
    },
    relocation_priority: {
      urgency_score: score,
      affected_population: Math.round(3500 * (score / 100)),
      safe_haven: score > 70 ? 'Sector-4 Ridge Buffer Transit Camp' : 'Kalpetta Relief Camp-3',
      transit_corridor: 'NH-72 North Ridge Bypass Corridor',
      phases: [
        { phase: 'Phase 1 (0-2h)', action: `Level-3 broadcast alert dispatched.` },
        { phase: 'Phase 2 (2-6h)', action: 'Clear designated grade-safe bypass corridor.' },
        { phase: 'Phase 3 (6-12h)', action: 'Staging shelters and emergency provisions.' },
        { phase: 'Phase 4 (Continuous)', action: 'Radar InSAR & IoT tiltmeter monitoring locked at 30s cycle.' }
      ]
    }
  };
}

export async function registerUser({ fullName, email, password, role, department }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        role,
        department
      })
    });
    const data = await res.json();
    // Keep local storage in sync as well
    if (data.success && data.user) {
      try {
        const raw = localStorage.getItem('narada_registered_users');
        const users = raw ? JSON.parse(raw) : [];
        const cleanEmail = email.trim().toLowerCase();
        if (!users.find(u => u.email.toLowerCase() === cleanEmail)) {
          users.push({ ...data.user, password });
          localStorage.setItem('narada_registered_users', JSON.stringify(users));
        }
      } catch (e) {}
    }
    return data;
  } catch (err) {
    console.warn('Backend signup request failed, storing in database fallback:', err.message);
    const cleanEmail = email.trim().toLowerCase();
    const raw = localStorage.getItem('narada_registered_users');
    let users = raw ? JSON.parse(raw) : [];
    if (users.find(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email address already exists. Please sign in.' };
    }
    const newUser = {
      id: 'usr_' + Date.now(),
      name: fullName.trim(),
      email: cleanEmail,
      password: password,
      role: role || 'District Magistrate / SDMA Officer',
      department: department ? department.trim() : 'Disaster Management Division',
      badge: '🛡️ ' + (role ? role.split('/')[0].trim() : 'Commander'),
      jurisdiction: 'District Multi-Hazard Operations',
      clearance: 'Verified Authority',
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('narada_registered_users', JSON.stringify(users));
    return {
      success: true,
      message: 'Account created successfully! Please sign in with your credentials.',
      user: newUser
    };
  }
}

export async function loginUser({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend login request failed, checking database fallback:', err.message);
    const cleanEmail = email.trim().toLowerCase();
    const raw = localStorage.getItem('narada_registered_users');
    let users = raw ? JSON.parse(raw) : [];
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, message: 'No account found with this email. Please check your credentials or create an account.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password. Please verify your credentials and try again.' };
    }
    return {
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        badge: user.badge || '🛡️ Commander',
        jurisdiction: user.jurisdiction || 'District Multi-Hazard Operations',
        clearance: user.clearance || 'Verified Authority',
        authTimestamp: new Date().toISOString()
      }
    };
  }
}
