import React, { useEffect, useState } from 'react';
import { predictML2Probability, searchML2Samples } from '../../services/api';

const FEATURE_LABELS = [
  ['latitude', 'Latitude'],
  ['longitude', 'Longitude'],
  ['elevation_m', 'Elevation'],
  ['annual_rainfall_mm', 'Annual rainfall'],
  ['earthquake_frequency', 'Earthquake frequency'],
  ['erosion_index', 'Erosion index'],
  ['mining_activity', 'Mining activity'],
  ['flood_probability', 'Flood probability'],
  ['temperature_c', 'Temperature'],
];

export default function ML2ProbabilityPanel() {
  const [query, setQuery] = useState('');
  const [samples, setSamples] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loadingSamples, setLoadingSamples] = useState(true);
  const [searching, setSearching] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState('');

  const selectedSample = samples.find((sample) => String(sample.id) === selectedId);

  useEffect(() => {
    let active = true;
    searchML2Samples()
      .then((records) => {
        if (!active) return;
        setSamples(records);
        setSelectedId(records.length ? String(records[0].id) : '');
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoadingSamples(false);
      });
    return () => { active = false; };
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearching(true);
    setError('');
    setPrediction(null);
    try {
      const records = await searchML2Samples(query);
      setSamples(records);
      setSelectedId(records.length ? String(records[0].id) : '');
    } catch (err) {
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };

  const handlePredict = async () => {
    if (!selectedSample) return;
    setPredicting(true);
    setError('');
    setPrediction(null);
    try {
      const result = await predictML2Probability(selectedSample.features);
      setPrediction(result.predicted_probability);
    } catch (err) {
      setError(err.message);
    } finally {
      setPredicting(false);
    }
  };

  return (
    <section className="ml2-panel" aria-labelledby="ml2-panel-title">
      <div className="ml2-panel-heading">
        <div>
          <span className="hz-section-eyebrow text-coral">AI PREDICTION</span>
          <h2 className="hz-card-title" id="ml2-panel-title">Landslide probability</h2>
          <p className="ml2-panel-intro">Select a record from the training dataset and run its nine model features through the trained pipeline.</p>
        </div>
        <span className="ml2-model-tag">CONTINUOUS OUTPUT</span>
      </div>

      <div className="ml2-data-warning" role="note">
        Dataset preview only. Verify source data and city-coordinate accuracy before using results for operational decisions.
      </div>

      <form className="ml2-search-form" onSubmit={handleSearch}>
        <label className="ml2-field-label" htmlFor="ml2-search">Find a dataset record</label>
        <div className="ml2-search-controls">
          <input
            id="ml2-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city or state"
          />
          <button className="ml2-secondary-button" type="submit" disabled={searching || loadingSamples}>
            {searching ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      <label className="ml2-field-label" htmlFor="ml2-record">Dataset record</label>
      <select
        id="ml2-record"
        className="ml2-record-select"
        value={selectedId}
        disabled={loadingSamples || samples.length === 0}
        onChange={(event) => {
          setSelectedId(event.target.value);
          setPrediction(null);
        }}
      >
        {loadingSamples && <option value="">Loading records…</option>}
        {!loadingSamples && samples.length === 0 && <option value="">No matching records</option>}
        {samples.map((sample) => (
          <option key={sample.id} value={String(sample.id)}>
            {sample.city_name}, {sample.state} · Record {sample.id + 1}
          </option>
        ))}
      </select>

      {selectedSample && (
        <dl className="ml2-feature-grid">
          {FEATURE_LABELS.map(([key, label]) => (
            <div className="ml2-feature-item" key={key}>
              <dt>{label}</dt>
              <dd>{typeof selectedSample.features[key] === 'number'
                ? `${selectedSample.features[key].toLocaleString(undefined, { maximumFractionDigits: 3 })}${key === 'elevation_m' ? ' m' : key === 'annual_rainfall_mm' ? ' mm' : key === 'temperature_c' ? ' °C' : ''}`
                : selectedSample.features[key]}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="ml2-panel-footer">
        <button className="ml2-predict-button" type="button" onClick={handlePredict} disabled={!selectedSample || predicting}>
          {predicting ? 'Running model…' : 'Run AI Prediction'}
        </button>
        {prediction !== null && (
          <div className="ml2-prediction-result" aria-live="polite">
            <span>Predicted probability</span>
            <strong>{(prediction * 100).toFixed(1)}%</strong>
          </div>
        )}
      </div>

      {error && <p className="ml2-error" role="alert">{error}</p>}
    </section>
  );
}