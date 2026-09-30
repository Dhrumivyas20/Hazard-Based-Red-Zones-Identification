/**
 * Backend/server.js
 * Node.js & Express API Gateway for NARADA
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./db');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 5001;
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';

app.use(cors());
app.use(express.json());

// Serve static compiled frontend if available
const distPath = path.join(__dirname, '../Dashboard/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// 1. Health check
app.get('/api/health', async (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'NARADA Node.js Express Gateway',
    timestamp: new Date().toISOString()
  });
});

// Auth: Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // Check if user exists
    let existingUser = null;
    try {
      const checkRes = await db.query('SELECT * FROM users WHERE LOWER(email) = $1', [cleanEmail]);
      if (checkRes.rows && checkRes.rows.length > 0) {
        existingUser = checkRes.rows[0];
      }
    } catch {
      const users = db.getUsers();
      existingUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.'
      });
    }

    const userObj = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: role || 'District Magistrate / SDMA Officer',
      department: department ? department.trim() : 'Disaster Management Division',
      badge: '🛡️ ' + (role ? role.split('/')[0].trim() : 'Commander'),
      jurisdiction: 'District Multi-Hazard Operations',
      clearance: 'Verified Authority',
      created_at: new Date().toISOString()
    };

    // Attempt PostgreSQL insert
    try {
      await db.query(
        'INSERT INTO users (name, email, password_hash, role, department, badge, jurisdiction, clearance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [userObj.name, userObj.email, userObj.password, userObj.role, userObj.department, userObj.badge, userObj.jurisdiction, userObj.clearance]
      );
    } catch (dbErr) {
      // Fallback handled by Data/users.json
    }

    // Always ensure Data/users.json is updated
    db.saveUser(userObj);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Please sign in with your credentials.',
      user: {
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        role: userObj.role,
        department: userObj.department,
        badge: userObj.badge,
        jurisdiction: userObj.jurisdiction,
        clearance: userObj.clearance
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

// Auth: Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both email and password are required.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // Find user
    let user = null;
    try {
      const checkRes = await db.query('SELECT * FROM users WHERE LOWER(email) = $1', [cleanEmail]);
      if (checkRes.rows && checkRes.rows.length > 0) {
        user = checkRes.rows[0];
        user.password = user.password || user.password_hash;
      }
    } catch {
      const users = db.getUsers();
      user = users.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (!user) {
      const users = db.getUsers();
      user = users.find(u => u.email.toLowerCase() === cleanEmail);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email. Please check your credentials or create an account.'
      });
    }

    const userPassword = user.password || user.password_hash;
    if (userPassword !== password) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please verify your credentials and try again.'
      });
    }

    // Success
    return res.json({
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
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
});

// Auth: List Users (Sanitized)
app.get('/api/auth/users', async (req, res) => {
  try {
    const users = db.getUsers();
    const sanitized = users.map(({ password, password_hash, ...rest }) => rest);
    res.json({ success: true, count: sanitized.length, users: sanitized });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Root route handler
app.get('/', (req, res) => {
  const distIndex = path.join(__dirname, '../Dashboard/dist/index.html');
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
  } else {
    res.redirect('http://localhost:5173');
  }
});

// 2. Landing Metrics API (Fetched from PostgreSQL/Data)
app.get('/api/landing-metrics', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM landing_metrics ORDER BY id ASC');
    res.json({
      success: true,
      source: result.source,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Features Catalog API (Fetched from PostgreSQL/Data)
app.get('/api/features', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM feature_modules ORDER BY id ASC');
    res.json({
      success: true,
      source: result.source,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Vulnerable Habitations API (Fetched from PostgreSQL/Data)
app.get('/api/habitations', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM habitations ORDER BY relocation_urgency_score DESC');
    res.json({
      success: true,
      source: result.source,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Proxy AI Hazard Simulation to FastAPI
app.post('/api/simulate-hazard', async (req, res) => {
  try {
    const response = await fetch(`${FASTAPI_URL}/api/v1/predict-hazard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slope_deg: Number(req.body.slope_deg),
        rainfall_24h_mm: Number(req.body.rainfall_24h_mm),
        density_pop_km2: Number(req.body.density_pop_km2),
        soil_saturation_pct: Number(req.body.soil_saturation_pct),
        total_population: Number(req.body.total_population || 3500)
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);

  } catch (error) {
    console.error('FastAPI prediction error:', error);

    res.status(500).json({
      success: false,
      message: 'AI prediction service unavailable',
      error: error.message
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`🚀 NARADA Node.js & PostgreSQL Backend running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.warn(`⚠️ Port ${PORT} in use, trying port ${nextPort}...`);
    app.listen(nextPort, () => {
      console.log(`🚀 NARADA Backend running on fallback port ${nextPort}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
