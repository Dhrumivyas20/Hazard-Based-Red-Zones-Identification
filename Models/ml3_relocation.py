"""
Models/ml3_relocation.py

ML3: Relocation Demand / Priority
"""

from typing import Dict, Any


class ML3RelocationModel:

    def predict(
        self,
        hazard_index: float,
        vulnerability_score: float,
        total_population: int,
        capacity_load_pct: float,
    ) -> Dict[str, Any]:

        relocation_demand = (
            hazard_index * 0.45
            + vulnerability_score * 0.35
            + min(200.0, capacity_load_pct) * 0.20
        )

        relocation_demand = round(
            min(99.0, max(0.0, relocation_demand)),
            2
        )

        if relocation_demand >= 70:
            priority = "HIGH"
        elif relocation_demand >= 45:
            priority = "MODERATE"
        else:
            priority = "LOW"

        affected_population = round(
            total_population * relocation_demand / 100
        )

        return {
            "relocation_demand_score": relocation_demand,
            "priority": priority,
            "affected_population": affected_population,
        }


ml3_model = ML3RelocationModel()