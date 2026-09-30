"""
Models/ml4_site_selection.py

ML4: Candidate Relocation Site Feasibility
"""

from typing import Dict, Any, List


class ML4SiteSelectionModel:

    def __init__(self):

        # Temporary existing project candidates.
        # Later these should come from your database / ML4 dataset.
        self.candidate_sites = [
            {
                "id": "SH-1",
                "name": "Sector-4 Ridge Buffer Transit Camp",
                "capacity": 5000,
                "elevation_advantage_m": 120,
            },
            {
                "id": "SH-2",
                "name": "High Plateau Administrative Relief Hub",
                "capacity": 3500,
                "elevation_advantage_m": 85,
            },
            {
                "id": "SH-3",
                "name": "Central Valley Multi-Purpose Community Shelter",
                "capacity": 2000,
                "elevation_advantage_m": 45,
            },
        ]

    def predict(
        self,
        affected_population: int,
        hazard_index: float,
    ) -> Dict[str, Any]:

        feasible_sites: List[Dict[str, Any]] = []

        for site in self.candidate_sites:

            capacity_ratio = (
                affected_population / site["capacity"]
            )

            capacity_ok = capacity_ratio <= 1.0

            feasibility_score = (
                min(100.0, site["elevation_advantage_m"] / 120 * 60)
                + (40 if capacity_ok else 0)
            )

            feasible_sites.append({
                **site,
                "capacity_ratio": round(capacity_ratio, 3),
                "capacity_available": capacity_ok,
                "feasibility_score": round(
                    feasibility_score,
                    2
                ),
            })

        feasible_sites.sort(
            key=lambda x: x["feasibility_score"],
            reverse=True
        )

        selected = (
            feasible_sites[0]
            if feasible_sites
            else None
        )

        return {
            "selected_site": selected,
            "candidate_sites": feasible_sites,
        }


ml4_model = ML4SiteSelectionModel()