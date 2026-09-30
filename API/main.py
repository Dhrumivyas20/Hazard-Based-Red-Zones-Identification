"""
API/main.py
FastAPI Microservice for AI Hazard Prediction, Carrying Capacity & Relocation Matrix
"""
import sys
import os
import json
from pathlib import Path
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from pydantic import BaseModel, ConfigDict, Field
from typing import Literal, Optional, List, Dict, Any
import pandas as pd

# Add root directory to python path to import Models
current_dir = Path(__file__).resolve().parent
root_dir = current_dir.parent
sys.path.append(str(root_dir))

from Models.ml_pipeline import narada_ml_pipeline
from Models.ml2_artifact import predict_landslide_probability

app = FastAPI(
    title="NARADA Geospatial AI & Relocation API",
    description="Intelligent Hazard-Based Red Zone Identification & Habitation Relocation Engine",
    version="1.0.0"
)

# Enable CORS for Frontend React & Node Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Seed Data from Data folder
SEED_FILE = root_dir / "Data" / "seed_data.json"
ML2_DATASET_FILE = root_dir / "Model2" / "landslide_cleaned.csv"

def load_data() -> Dict[str, Any]:
    if SEED_FILE.exists():
        with open(SEED_FILE, "r") as f:
            return json.load(f)
    return {"landing_metrics": [], "feature_modules": [], "habitations": []}

# Request / Response Schemas
class SimulationRequest(BaseModel):
    slope_deg: float = Field(..., ge=5, le=75, description="Slope inclination angle in degrees")
    rainfall_24h_mm: float = Field(..., ge=0, le=500, description="24-hour cumulative rainfall in mm")
    density_pop_km2: float = Field(..., ge=100, le=15000, description="Settlement population density per sq km")
    soil_saturation_pct: float = Field(..., ge=0, le=100, description="Soil saturation percentage")
    total_population: Optional[int] = Field(3500, description="Total estimated population in hazard polygon")

class RelocationPlanRequest(BaseModel):
    habitation_name: str
    slope_deg: float
    rainfall_24h_mm: float
    density_pop_km2: float
    soil_saturation_pct: float
    total_population: int

class ML2ProbabilityRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    latitude: float
    longitude: float
    elevation_m: float
    annual_rainfall_mm: float
    earthquake_frequency: float
    erosion_index: float
    mining_activity: Literal["No", "Yes"]
    flood_probability: float = Field(..., ge=0, le=1)
    temperature_c: float

# Endpoints
@app.get("/")
def root():
    return {
        "status": "ONLINE",
        "service": "NARADA Geospatial AI & Relocation API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "HEALTHY",
        "service": "NARADA AI Microservice",
        "models_loaded": [
            "ML1 - Vulnerability",
            "ML2 - Landslide Hazard",
            "ML3 - Relocation Demand",
            "ML4 - Site Feasibility",
        ],
    }

@app.post("/api/v1/predict-ml2-probability")
def predict_ml2_probability(req: ML2ProbabilityRequest):
    """Predict the continuous landslide probability using the trained ML2 model."""
    feature_values = {
        "Latitude": req.latitude,
        "Longitude": req.longitude,
        "Elevation (m)": req.elevation_m,
        "Annual Rainfall (mm)": req.annual_rainfall_mm,
        "Earthquake Frequency": req.earthquake_frequency,
        "Erosion Index": req.erosion_index,
        "Mining Activity": req.mining_activity,
        "Flood Probability": req.flood_probability,
        "Temperature (°C)": req.temperature_c,
    }
    probability = predict_landslide_probability(feature_values)
    return {
        "status": "success",
        "model": "ML2 regression pipeline",
        "target": "Landslide Probability",
        "predicted_probability": probability,
    }

@app.get("/api/v1/ml2-samples")
def get_ml2_samples(
    q: str = Query(default="", max_length=100),
    limit: int = Query(default=50, ge=1, le=100),
):
    """Search dataset records that contain the trained ML2 input features."""
    if not ML2_DATASET_FILE.is_file():
        return {"status": "error", "message": "ML2 dataset file is unavailable", "samples": []}

    frame = pd.read_csv(ML2_DATASET_FILE)
    if q.strip():
        query = q.strip()
        matches = (
            frame["City Name"].astype(str).str.contains(query, case=False, regex=False)
            | frame["State"].astype(str).str.contains(query, case=False, regex=False)
        )
        frame = frame.loc[matches]

    samples = []
    for row_index, row in frame.head(limit).iterrows():
        samples.append({
            "id": int(row_index),
            "city_name": str(row["City Name"]),
            "state": str(row["State"]),
            "features": {
                "latitude": float(row["Latitude"]),
                "longitude": float(row["Longitude"]),
                "elevation_m": float(row["Elevation (m)"]),
                "annual_rainfall_mm": float(row["Annual Rainfall (mm)"]),
                "earthquake_frequency": float(row["Earthquake Frequency"]),
                "erosion_index": float(row["Erosion Index"]),
                "mining_activity": str(row["Mining Activity"]),
                "flood_probability": float(row["Flood Probability"]),
                "temperature_c": float(row["Temperature (°C)"]),
            },
        })

    return {"status": "success", "count": len(samples), "samples": samples}

@app.get("/api/v1/landing-metrics")
def get_landing_metrics():
    """Returns dynamic headline statistics for hero section."""
    data = load_data()
    return {
        "status": "success",
        "metrics": data.get("landing_metrics", [])
    }

@app.get("/api/v1/features")
def get_feature_modules():
    """Returns 6 core safety & relocation modules for landing page grid."""
    data = load_data()
    return {
        "status": "success",
        "features": data.get("feature_modules", [])
    }

@app.get("/api/v1/habitations")
def get_vulnerable_habitations():
    """Returns list of monitored vulnerable settlements with risk tiers."""
    data = load_data()
    return {
        "status": "success",
        "count": len(data.get("habitations", [])),
        "habitations": data.get("habitations", [])
    }

@app.post("/api/v1/predict-hazard")
def predict_hazard_and_capacity(req: SimulationRequest):
    """
    Runs the complete NARADA ML pipeline:
    ML1 Vulnerability → ML2 Hazard → Carrying Capacity
    → ML3 Relocation → ML4 Site Selection
    """

    result = narada_ml_pipeline.predict(
        slope_deg=req.slope_deg,
        rainfall_24h_mm=req.rainfall_24h_mm,
        density_pop_km2=req.density_pop_km2,
        soil_saturation_pct=req.soil_saturation_pct,
        total_population=req.total_population or 3500
    )

    return {
        "status": "success",
        "hazard_evaluation": result["hazard"],
        "vulnerability": result["vulnerability"],
        "carrying_capacity": result["carrying_capacity"],
        "relocation_priority": result["relocation"],
        "candidate_sites": result["sites"]["candidate_sites"]
    }

@app.post("/api/v1/generate-relocation-plan")
def generate_relocation_plan(req: RelocationPlanRequest):
    """Generates relocation plan using the complete ML pipeline."""

    result = narada_ml_pipeline.predict(
        slope_deg=req.slope_deg,
        rainfall_24h_mm=req.rainfall_24h_mm,
        density_pop_km2=req.density_pop_km2,
        soil_saturation_pct=req.soil_saturation_pct,
        total_population=req.total_population
    )

    selected_site = result["sites"]["selected_site"]

    return {
        "status": "success",
        "habitation": req.habitation_name,
        "hazard_summary": result["hazard"],
        "vulnerability_summary": result["vulnerability"],
        "carrying_capacity_summary": result["carrying_capacity"],
        "relocation_directive": result["relocation"],
        "selected_relocation_site": selected_site,
        "candidate_sites": result["sites"]["candidate_sites"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
