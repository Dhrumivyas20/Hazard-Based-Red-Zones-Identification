"""
Models/ml2_hazard.py

ML2: Landslide Susceptibility / Hazard Prediction
"""

from typing import Dict, Any


class ML2HazardModel:

    def predict(
        self,
        slope_deg: float,
        rainfall_24h_mm: float,
        soil_saturation_pct: float,
        density_pop_km2: float,
    ) -> Dict[str, Any]:

        # ---------------------------------------------------------
        # TEMPORARY BACKEND ADAPTER
        # ---------------------------------------------------------
        # Keep this calculation here temporarily.
        #
        # When the trained ML2 artifact is available, replace ONLY
        # this section with:
        #
        # prediction = self.model.predict(...)
        # probability = self.model.predict_proba(...)
        # ---------------------------------------------------------

        slope_score = min(
            100.0,
            (slope_deg / 50.0) * 100.0
        )

        rainfall_score = min(
            100.0,
            (rainfall_24h_mm / 250.0) * 100.0
        )

        saturation_score = min(
            100.0,
            soil_saturation_pct
        )

        density_score = min(
            100.0,
            (density_pop_km2 / 4000.0) * 100.0
        )

        hazard_index = (
            slope_score * 0.35
            + rainfall_score * 0.25
            + saturation_score * 0.25
            + density_score * 0.15
        )

        hazard_index = round(
            min(99.0, max(5.0, hazard_index)),
            2
        )

        # Approximate Factor of Safety
        base_fos = (
            2.2
            - (slope_deg / 28.0)
            - (rainfall_24h_mm / 260.0)
            - (soil_saturation_pct / 180.0)
        )

        factor_of_safety = round(
            max(0.42, min(2.5, base_fos)),
            2
        )

        if factor_of_safety < 1.0 or hazard_index >= 70:
            tier = "RED"
        elif factor_of_safety < 1.25 or hazard_index >= 45:
            tier = "ORANGE"
        else:
            tier = "GREEN"

        susceptibility_probability = round(
            hazard_index / 100.0,
            4
        )

        return {
            "hazard_index": hazard_index,
            "factor_of_safety": factor_of_safety,
            "susceptibility_probability":
                susceptibility_probability,
            "susceptibility_level": tier,
            "tier": tier,
        }


ml2_model = ML2HazardModel()