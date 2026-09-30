"""
Models/ml_pipeline.py

Central ML pipeline:
ML2 -> ML1 -> Carrying Capacity -> ML3 -> ML4
"""

from typing import Dict, Any

from Models.ml1_vulnerability import ml1_model
from Models.ml2_hazard import ml2_model
from Models.ml3_relocation import ml3_model
from Models.ml4_site_selection import ml4_model


class NaradaMLPipeline:

    def predict(
        self,
        slope_deg: float,
        rainfall_24h_mm: float,
        density_pop_km2: float,
        soil_saturation_pct: float,
        total_population: int,
    ) -> Dict[str, Any]:

        # =========================================================
        # ML2 — HAZARD / LANDSLIDE
        # =========================================================

        hazard = ml2_model.predict(
            slope_deg=slope_deg,
            rainfall_24h_mm=rainfall_24h_mm,
            soil_saturation_pct=soil_saturation_pct,
            density_pop_km2=density_pop_km2,
        )

        # =========================================================
        # CARRYING CAPACITY
        # =========================================================

        slope_penalty = max(
            0.2,
            1.0 - (slope_deg / 65.0) * 0.75
        )

        soil_penalty = max(
            0.3,
            1.0 - (soil_saturation_pct / 100.0) * 0.4
        )

        safe_capacity = (
            2200.0
            * slope_penalty
            * soil_penalty
        )

        capacity_load = round(
            (density_pop_km2 / safe_capacity) * 100,
            1
        )

        capacity = {
            "current_density": round(
                density_pop_km2,
                1
            ),
            "safe_capacity_limit": round(
                safe_capacity,
                1
            ),
            "capacity_load_pct": capacity_load,
            "is_overloaded": capacity_load > 100,
            "excess_density_pop_km2": max(
                0,
                int(density_pop_km2 - safe_capacity)
            ),
            "stress_level": (
                "CRITICAL"
                if capacity_load > 150
                else "HIGH"
                if capacity_load > 100
                else "NORMAL"
            ),
        }

        # =========================================================
        # ML1 — EXPOSURE / VULNERABILITY
        # =========================================================

        vulnerability = ml1_model.predict(
            population_density=density_pop_km2,
            total_population=total_population,
            hazard_index=hazard["hazard_index"],
            slope_deg=slope_deg,
            soil_saturation_pct=soil_saturation_pct,
        )

        # =========================================================
        # ML3 — RELOCATION DEMAND
        # =========================================================

        relocation = ml3_model.predict(
            hazard_index=hazard["hazard_index"],
            vulnerability_score=vulnerability[
                "vulnerability_score"
            ],
            total_population=total_population,
            capacity_load_pct=capacity_load,
        )

        # =========================================================
        # ML4 — SITE SELECTION
        # =========================================================

        sites = ml4_model.predict(
            affected_population=relocation[
                "affected_population"
            ],
            hazard_index=hazard["hazard_index"],
        )

        return {
            "hazard": hazard,
            "vulnerability": vulnerability,
            "carrying_capacity": capacity,
            "relocation": relocation,
            "sites": sites,
        }


narada_ml_pipeline = NaradaMLPipeline()