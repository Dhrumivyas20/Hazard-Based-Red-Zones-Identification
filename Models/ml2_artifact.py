"""Load and run the trained ML2 probability regression pipeline."""

from functools import lru_cache
from pathlib import Path
from typing import Any, Mapping

import joblib
import pandas as pd


ARTIFACT_PATH = (
    Path(__file__).resolve().parent.parent
    / "Model2"
    / "artifact"
    / "ml2_pipeline.joblib"
)


@lru_cache(maxsize=1)
def _load_artifact() -> tuple[Any, tuple[str, ...]]:
    if not ARTIFACT_PATH.is_file():
        raise FileNotFoundError(f"ML2 model artifact not found: {ARTIFACT_PATH}")

    artifact = joblib.load(ARTIFACT_PATH)
    if not isinstance(artifact, dict):
        raise ValueError("ML2 artifact must contain the exported metadata dictionary")
    if artifact.get("task") != "regression":
        raise ValueError("ML2 artifact must be a regression pipeline")
    if artifact.get("target_column") != "Landslide Probability":
        raise ValueError("ML2 artifact has an unexpected target column")

    pipeline = artifact.get("pipeline")
    feature_columns = artifact.get("feature_columns")
    if pipeline is None or not feature_columns:
        raise ValueError("ML2 artifact is missing its pipeline or feature columns")

    return pipeline, tuple(feature_columns)


def predict_landslide_probability(features: Mapping[str, Any]) -> float:
    pipeline, feature_columns = _load_artifact()
    missing = set(feature_columns) - set(features)
    unexpected = set(features) - set(feature_columns)
    if missing or unexpected:
        raise ValueError(
            f"ML2 feature mismatch; missing={sorted(missing)}, "
            f"unexpected={sorted(unexpected)}"
        )

    frame = pd.DataFrame(
        [{column: features[column] for column in feature_columns}],
        columns=feature_columns,
    )
    prediction = float(pipeline.predict(frame)[0])
    if not 0.0 <= prediction <= 1.0:
        raise ValueError(f"ML2 predicted a value outside [0, 1]: {prediction}")
    return prediction