# NARADA
### Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations

---

## Deployed Working Prototype : https://hazard-based-red-zones-identificati.vercel.app

## 🏗️ Architecture & Folder Structure

```
proto-1/
├── Dashboard/               # Frontend (React 18 + Vite)
│   ├── src/
│   │   ├── components/      # Modular UI (Hero, FeatureGrid, Simulator, Habitations, CTA, Modal)
│   │   ├── services/api.js  # Central API connector (Fetch / REST)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # Responsive styling matching reference design
│   ├── vite.config.js
│   └── package.json
│
├── Backend/                 # API Gateway (Node.js + Express + PostgreSQL ORM)
│   ├── db.js                # PostgreSQL connection pool with automated fallback
│   ├── server.js            # Express server (Port 5000)
│   └── package.json
│
├── API/                     # AI Microservice (FastAPI + Python)
│   ├── main.py              # FastAPI endpoints for real-time AI simulation (Port 8000)
│   └── requirements.txt
│
├── Data/                    # Database & GIS Datasets
│   ├── schema.sql           # PostgreSQL Database Schema
│   └── seed_data.json       # Habitations (Joshimath, Wayanad, Shimla, Munnar), Metrics & Features
│
└── Models/                  # Geotechnical & AI Decision Algorithms
    ├── hazard_classifier.py # Infinite Slope Model & Factor of Safety (FoS)
    ├── carrying_capacity.py # Mountain Habitation Carrying Capacity & Ecological Load Model
    └── relocation_engine.py # Multi-Criteria NDMA Relocation Priority Engine
```

---

## 🚀 How to Run the Services

### 1. Run React Frontend (Dashboard)
```bash
cd Dashboard
npm install
npm run dev
# Accessible at: http://localhost:5173
```

### 2. Run Node.js & PostgreSQL Backend
```bash
cd Backend
npm install
npm start
# Running at: http://localhost:5001
```

### 3. Run FastAPI AI Microservice
```bash
cd API
pip install -r requirements.txt
python3 -m uvicorn main:app --reload --port 8000
# Running at: http://localhost:8000/docs
```

---

## 📡 Key API Endpoints

- **`GET /api/landing-metrics`**: Returns live telemetry statistics for the hero section (Accuracy, 24/7 InSAR, Relocation Priority).
- **`GET /api/features`**: Fetches the 6 safety & relocation modules catalog.
- **`GET /api/habitations`**: Returns monitored high-risk settlement records from PostgreSQL.
- **`POST /api/simulate-hazard`**: Real-time geotechnical Factor of Safety (FoS), Carrying Capacity overload %, and NDMA relocation roadmaps.
