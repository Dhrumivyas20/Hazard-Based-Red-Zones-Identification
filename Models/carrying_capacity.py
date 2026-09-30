"""
Models/carrying_capacity.py
Habitation Carrying Capacity & Ecological Load Assessor
"""
from typing import Dict, Any

class CarryingCapacityModel:
    def __init__(self, base_safe_density: float = 2200.0):
        # Default safe threshold population density per km2 for mountainous/hilly terrain
        self.base_safe_density = base_safe_density

    def evaluate_carrying_capacity(
        self,
        population_density: float,
        slope_deg: float,
        soil_saturation_pct: float
    ) -> Dict[str, Any]:
        """
        Calculates terrain-adjusted carrying capacity threshold and overcapacity load %.
        """
        # Steeper slopes reduce safe carrying capacity exponentially
        slope_penalty = max(0.2, 1.0 - (slope_deg / 65.0) * 0.75)
        # High soil moisture reduces foundation support capacity
        soil_penalty = max(0.3, 1.0 - (soil_saturation_pct / 100.0) * 0.4)

        adjusted_safe_capacity = self.base_safe_density * slope_penalty * soil_penalty
        load_percentage = round((population_density / adjusted_safe_capacity) * 100.0, 1)

        is_overloaded = load_percentage > 100.0
        deficit_pop = max(0, int(population_density - adjusted_safe_capacity))

        return {
            "current_density": round(population_density, 1),
            "safe_capacity_limit": round(adjusted_safe_capacity, 1),
            "capacity_load_pct": load_percentage,
            "is_overloaded": is_overloaded,
            "excess_density_pop_km2": deficit_pop,
            "stress_level": "CRITICAL" if load_percentage > 150 else ("HIGH" if load_percentage > 100 else "NORMAL")
        }

carrying_capacity_model = CarryingCapacityModel()
