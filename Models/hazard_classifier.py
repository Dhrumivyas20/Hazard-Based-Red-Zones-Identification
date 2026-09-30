"""
Models/hazard_classifier.py
Geotechnical & AI-driven Hazard Susceptibility and Red Zone Classification Model
"""
import math
from typing import Dict, Any

class HazardRedZoneClassifier:
    def __init__(self):
        # Soil mechanical defaults (c: cohesion kPa, phi: internal friction angle deg, gamma: unit weight kN/m3)
        self.default_cohesion = 15.0  # kPa
        self.default_friction_angle = 32.0  # deg
        self.default_soil_unit_weight = 19.5  # kN/m3

    def compute_factor_of_safety(
        self,
        slope_deg: float,
        rainfall_mm: float,
        soil_saturation_pct: float,
        depth_m: float = 2.5
    ) -> float:
        """
        Infinite Slope Model with pore-water pressure ratio (ru).
        FoS = (c' + (gamma * z * cos^2(beta) - u) * tan(phi')) / (gamma * z * sin(beta) * cos(beta))
        """
        beta_rad = math.radians(max(5.0, slope_deg))
        phi_rad = math.radians(self.default_friction_angle)
        
        # Pore pressure factor from rainfall and soil saturation
        saturation_ratio = soil_saturation_pct / 100.0
        rain_factor = min(1.0, rainfall_mm / 250.0)
        ru = 0.5 * saturation_ratio * (1.0 + 0.3 * rain_factor) # pore pressure ratio
        
        gamma = self.default_soil_unit_weight
        c = self.default_cohesion

        driving_force = gamma * depth_m * math.sin(beta_rad) * math.cos(beta_rad)
        resisting_force = c + (gamma * depth_m * (math.cos(beta_rad) ** 2) * (1.0 - ru)) * math.tan(phi_rad)

        if driving_force <= 0:
            return 3.0
        
        fos = resisting_force / driving_force
        return round(float(max(0.35, min(3.5, fos))), 2)

    def classify_hazard_zone(
        self,
        slope_deg: float,
        rainfall_mm: float,
        soil_saturation_pct: float,
        density_pop_km2: float
    ) -> Dict[str, Any]:
        """
        Calculates Hazard Susceptibility Index (0-100), Hazard Zone Tier, and Factor of Safety.
        """
        fos = self.compute_factor_of_safety(slope_deg, rainfall_mm, soil_saturation_pct)

        # Multi-factor weights: Slope (35%), Rainfall (25%), Saturation (25%), Settlement Density (15%)
        slope_score = min(100.0, (slope_deg / 50.0) * 100.0)
        rain_score = min(100.0, (rainfall_mm / 250.0) * 100.0)
        sat_score = min(100.0, soil_saturation_pct)
        density_score = min(100.0, (density_pop_km2 / 4000.0) * 100.0)

        hazard_index = (
            0.35 * slope_score +
            0.25 * rain_score +
            0.25 * sat_score +
            0.15 * density_score
        )
        hazard_index = round(float(max(5.0, min(99.0, hazard_index))), 1)

        if fos < 1.0 or hazard_index >= 70:
            tier = "RED"
            status_title = "ZONE 1: CRITICAL RED ZONE"
            directive = "Immediate Relocation Mandate Required"
            desc = f"Critical slope instability (FoS: {fos}). High probability of catastrophic mass wasting."
            color = "#DC2626"
        elif fos < 1.25 or hazard_index >= 45:
            tier = "ORANGE"
            status_title = "ZONE 2: VULNERABLE ORANGE ZONE"
            directive = "Pre-Evacuation & Active Monitoring"
            desc = f"Marginal slope stability (FoS: {fos}). Heightened risk under sustained precipitation."
            color = "#D97706"
        else:
            tier = "GREEN"
            status_title = "ZONE 3: STABLE GREEN ZONE"
            directive = "Normal Monitoring - Settlement Stable"
            desc = f"Stable geotechnical parameters (FoS: {fos}). Within carrying capacity thresholds."
            color = "#16A34A"

        return {
            "tier": tier,
            "status_title": status_title,
            "directive": directive,
            "description": desc,
            "hazard_index": hazard_index,
            "factor_of_safety": fos,
            "theme_color": color
        }

hazard_model = HazardRedZoneClassifier()
