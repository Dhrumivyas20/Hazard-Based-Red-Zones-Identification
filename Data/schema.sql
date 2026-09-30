-- ==============================================================================
-- NARADA - Database Schema (PostgreSQL)
-- Intelligent Red Zone Identification, Carrying Capacity & Relocation System
-- ==============================================================================

-- Users & Authority Accounts Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    department VARCHAR(150) NOT NULL,
    badge VARCHAR(50) DEFAULT '🛡️ Commander',
    jurisdiction VARCHAR(150) DEFAULT 'District Multi-Hazard Operations',
    clearance VARCHAR(100) DEFAULT 'Verified Authority',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habitations Table
CREATE TABLE IF NOT EXISTS habitations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    population INTEGER NOT NULL,
    area_sq_km DOUBLE PRECISION NOT NULL,
    max_safe_carrying_capacity INTEGER NOT NULL,
    current_carrying_capacity_load_pct DOUBLE PRECISION NOT NULL,
    hazard_zone_tier VARCHAR(20) NOT NULL CHECK (hazard_zone_tier IN ('RED', 'ORANGE', 'YELLOW', 'GREEN')),
    relocation_urgency_score INTEGER NOT NULL CHECK (relocation_urgency_score BETWEEN 0 AND 100),
    slope_angle_deg DOUBLE PRECISION NOT NULL,
    rainfall_24h_mm DOUBLE PRECISION NOT NULL,
    soil_saturation_pct DOUBLE PRECISION NOT NULL,
    factor_of_safety DOUBLE PRECISION NOT NULL,
    evacuation_status VARCHAR(50) DEFAULT 'MONITORING',
    safe_haven_location VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sensor Telemetry Table
CREATE TABLE IF NOT EXISTS sensor_telemetry (
    id SERIAL PRIMARY KEY,
    habitation_id INTEGER REFERENCES habitations(id) ON DELETE CASCADE,
    sensor_type VARCHAR(50) NOT NULL, -- 'InSAR', 'TILT_METER', 'PORE_PRESSURE', 'RAINGAUGE'
    sensor_code VARCHAR(50) NOT NULL,
    reading_value DOUBLE PRECISION NOT NULL,
    unit VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relocation Directives & Action Plans
CREATE TABLE IF NOT EXISTS relocation_plans (
    id SERIAL PRIMARY KEY,
    habitation_id INTEGER REFERENCES habitations(id) ON DELETE CASCADE,
    protocol_code VARCHAR(50) UNIQUE NOT NULL,
    hazard_level VARCHAR(20) NOT NULL,
    urgency_score INTEGER NOT NULL,
    affected_population INTEGER NOT NULL,
    designated_safe_haven VARCHAR(200) NOT NULL,
    transit_corridor VARCHAR(200) NOT NULL,
    evacuation_phases JSONB NOT NULL,
    status VARCHAR(30) DEFAULT 'GENERATED', -- 'GENERATED', 'DISPATCHED', 'COMPLETED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- System Landing & Analytics Metrics Cache
CREATE TABLE IF NOT EXISTS landing_metrics (
    id SERIAL PRIMARY KEY,
    metric_key VARCHAR(50) UNIQUE NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value VARCHAR(50) NOT NULL,
    badge_type VARCHAR(20) NOT NULL, -- 'green', 'blue', 'orange'
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feature Modules Catalog
CREATE TABLE IF NOT EXISTS feature_modules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon_type VARCHAR(50) NOT NULL,
    color_theme VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0
);
