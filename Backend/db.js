/**
 * Backend/db.js
 * PostgreSQL Connection Pool with Seed-Fallback for resilient zero-fail operation
 */
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// PostgreSQL Config from Environment or Defaults
const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'terrashield_db',
  connectionTimeoutMillis: 2000
});

const seedFilePath = path.join(__dirname, '..', 'Data', 'seed_data.json');
const usersFilePath = path.join(__dirname, '..', 'Data', 'users.json');

// Read fallback seed data
function getFallbackData() {
  try {
    if (fs.existsSync(seedFilePath)) {
      const raw = fs.readFileSync(seedFilePath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading fallback seed data:', err.message);
  }
  return { landing_metrics: [], feature_modules: [], habitations: [] };
}

// Read users from Data/users.json
function getUsers() {
  try {
    if (fs.existsSync(usersFilePath)) {
      const raw = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading users file:', err.message);
  }
  return [];
}

// Save user into Data/users.json
function saveUser(user) {
  try {
    const users = getUsers();
    const existingIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIdx >= 0) {
      users[existingIdx] = { ...users[existingIdx], ...user };
    } else {
      users.push(user);
    }
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return user;
  } catch (err) {
    console.error('Error saving user to file:', err.message);
    throw err;
  }
}

async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    return { rows: res.rows, source: 'postgres' };
  } catch (err) {
    // If PostgreSQL instance is not connected locally, gracefully fall back to structured Data/ JSON
    // so the prototype works immediately!
    const data = getFallbackData();
    if (text.includes('landing_metrics')) {
      return { rows: data.landing_metrics, source: 'fallback_json' };
    }
    if (text.includes('feature_modules')) {
      return { rows: data.feature_modules, source: 'fallback_json' };
    }
    if (text.includes('habitations')) {
      return { rows: data.habitations, source: 'fallback_json' };
    }
    if (text.includes('users')) {
      return { rows: getUsers(), source: 'fallback_json' };
    }
    return { rows: [], source: 'fallback_json' };
  }
}

module.exports = {
  pool,
  query,
  getFallbackData,
  getUsers,
  saveUser
};
