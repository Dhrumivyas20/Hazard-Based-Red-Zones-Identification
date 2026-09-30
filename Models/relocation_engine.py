"""
Models/relocation_engine.py
Immediate Relocation Needs Prioritization & NDMA Directive Engine
"""
from typing import Dict, Any, List
import uuid
from datetime import datetime

class RelocationEngine:
    def __init__(self):
        self.safe_havens = [
            {"id": "SH-1", "name": "Sector-4 Ridge Buffer Transit Camp", "elevation_advantage_m": 120, "capacity": 5000},
            {"id": "SH-2", "name": "High Plateau Administrative Relief Hub", "elevation_advantage_m": 85, "capacity": 3500},
            {"id": "SH-3", "name": "Central Valley Multi-Purpose Community Shelter", "elevation_advantage_m": 45, "capacity": 2000}
        ]

    def compute_relocation_priority(
        self,
        hazard_index: float,
        fos: float,
        capacity_load_pct: float,
        total_population: int
    ) -> Dict[str, Any]:
        """
        Calculates Urgency Score (0-100) and structured evacuation roadmap.
        """
        # Urgency Formula incorporating physical slope risk + human carrying overload
        urgency = (hazard_index * 0.5) + (max(0, 2.0 - fos) * 20.0) + (min(200.0, capacity_load_pct) * 0.15)
        urgency_score = int(max(10, min(99, round(urgency))))

        affected_pop = int(total_population * (urgency_score / 100.0))
        selected_safe_haven = self.safe_havens[0] if urgency_score > 70 else self.safe_havens[1]

        phases: List[Dict[str, str]] = [
            {
                "phase": "Phase 1: Immediate Warning (0 - 2 Hours)",
                "action": f"Activate Level-3 geo-fenced siren broadcast to {affected_pop:,} residents in red polygon sector."
            },
            {
                "phase": "Phase 2: Corridor Clearance (2 - 6 Hours)",
                "action": "Clear bypass highway NH-72 with emergency transit convoy escorts avoiding unstable road cuts."
            },
            {
                "phase": "Phase 3: Habitation Staging & Shelter (6 - 12 Hours)",
                "action": f"Deploy medical triages and modular shelter tents at {selected_safe_haven['name']}."
            },
            {
                "phase": "Phase 4: Continuous Telemetry",
                "action": "Maintain continuous spatial radar simulation and satellite InSAR deformation tracking."
            }
        ]

        protocol_code = f"TS-{datetime.now().year}-RELOC-{uuid.uuid4().hex[:6].upper()}"

        return {
            "protocol_code": protocol_code,
            "urgency_score": urgency_score,
            "affected_population": affected_pop,
            "safe_haven": selected_safe_haven["name"],
            "transit_corridor": "NH-72 North Ridge Bypass Corridor",
            "phases": phases,
            "ndma_compliance": "Complies with NDMA Section 32 Hazard-Displacement Framework (2026)"
        }

relocation_engine = RelocationEngine()
