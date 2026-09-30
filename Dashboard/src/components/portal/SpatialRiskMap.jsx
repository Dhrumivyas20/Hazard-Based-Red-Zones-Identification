import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

const VILLAGE_PINS = [
  { id: 1, name: 'Joshimath', lat: 30.556, lng: 79.566, score: '1.0', level: 'Red', prob: '94%', color: '#DC2626' },
  { id: 2, name: 'Tapovan', lat: 30.493, lng: 79.627, score: '0.6', level: 'Red', prob: '88%', color: '#DC2626' },
  { id: 3, name: 'Kedarnath / Sonprayag', lat: 30.630, lng: 79.066, score: '0.6', level: 'Orange', prob: '80%', color: '#EA580C' },
  { id: 4, name: 'Helang', lat: 30.528, lng: 79.510, score: '0.6', level: 'Orange', prob: '76%', color: '#EA580C' },
  { id: 5, name: 'Pipalkoti', lat: 30.432, lng: 79.430, score: '0.5', level: 'Yellow', prob: '71%', color: '#D97706' },
  { id: 6, name: 'Gauchar Buffer Safe Haven', lat: 30.290, lng: 79.155, score: '0.1', level: 'Green', prob: '8%', color: '#16A34A' }
];

export default function SpatialRiskMap({ onFullMapView }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapType, setMapType] = useState('Streets');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Destroy previous instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Clear container leaflet ID if any
      if (mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }

      // Initialize Leaflet Map
      const map = L.map(mapContainerRef.current, {
        center: [30.51, 79.35],
        zoom: 10,
        zoomControl: false,
        attributionControl: false
      });

      // Tile URLs
      let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      if (mapType === 'Satellite') {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      } else if (mapType === 'Terrain') {
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      }

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 16,
        subdomains: ['a', 'b', 'c']
      });

      tileLayer.addTo(map);

      // Hazard Corridor Polyline
      const corridorCoords = [
        [30.630, 79.066],
        [30.570, 79.220],
        [30.528, 79.510],
        [30.556, 79.566],
        [30.493, 79.627]
      ];

      L.polyline(corridorCoords, {
        color: '#EA580C',
        weight: 3.5,
        dashArray: '6, 6',
        opacity: 0.85
      }).addTo(map);

      // Hazard Buffer Envelopes
      L.circle([30.556, 79.566], {
        color: '#DC2626',
        fillColor: '#DC2626',
        fillOpacity: 0.22,
        radius: 4200
      }).addTo(map);

      L.circle([30.630, 79.066], {
        color: '#EA580C',
        fillColor: '#EA580C',
        fillOpacity: 0.18,
        radius: 3600
      }).addTo(map);

      L.circle([30.290, 79.155], {
        color: '#16A34A',
        fillColor: '#16A34A',
        fillOpacity: 0.18,
        radius: 3200
      }).addTo(map);

      // Custom Numbered Number Markers
      VILLAGE_PINS.forEach((pin) => {
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="
              background: #0F172A;
              color: #FFFFFF;
              border: 2px solid ${pin.color};
              width: 26px;
              height: 26px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: 800;
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
            ">
              ${pin.id}
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = L.marker([pin.lat, pin.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: inherit; padding: 4px;">
            <strong style="font-size: 13px; color: #0F172A;">${pin.name}</strong><br/>
            <span style="font-size: 11px; color: ${pin.color}; font-weight: 700;">Risk Score: ${pin.score} (${pin.level})</span><br/>
            <span style="font-size: 11px; color: #64748B;">ML Exposure: ${pin.prob}</span>
          </div>
        `);
      });

      mapInstanceRef.current = map;
    } catch (err) {
      console.warn('Leaflet map initialization notice:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, [mapType]);

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!isFullscreen) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="spatial-map-card">
      <div className="spatial-map-header">
        <div>
          <span className="spatial-tag">SPATIAL HEATMAP</span>
          <h3 className="spatial-title">Multi-Hazard Risk Exposure</h3>
        </div>
        <button
          type="button"
          className="spatial-full-link"
          onClick={() => onFullMapView && onFullMapView()}
        >
          <span>Full Map View</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Map Filter Controls Bar matching design */}
      <div className="map-toolbar">
        <div className="map-legend-items">
          <span className="legend-item"><span className="legend-dot dot-corridor"></span> Hazard Corridor</span>
          <span className="legend-item"><span className="legend-dot dot-red"></span> Red</span>
          <span className="legend-item"><span className="legend-dot dot-orange"></span> Orange</span>
          <span className="legend-item"><span className="legend-dot dot-yellow"></span> Yellow</span>
          <span className="legend-item"><span className="legend-dot dot-green"></span> Green</span>
        </div>

        <div className="map-layer-controls">
          <div className="map-layer-switcher">
            {['Streets', 'Satellite', 'Terrain'].map((type) => (
              <button
                key={type}
                type="button"
                className={`btn-map-type ${mapType === type ? 'active' : ''}`}
                onClick={() => setMapType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <button type="button" className="btn-map-tool" title="Toggle Labels">
            <span>A</span>
          </button>

          <button type="button" className="btn-map-tool" onClick={toggleFullscreen} title="Fullscreen">
            <span>⛶ Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="leaflet-map-canvas" style={{ width: '100%', height: '320px', minHeight: '320px' }} />

      {/* 4 Zone Counts Bottom Strip */}
      <div className="map-zone-summary-strip">
        <div className="map-zone-col">
          <span className="map-zone-lbl">RED ZONE</span>
          <span className="map-zone-count font-mono">8</span>
        </div>
        <div className="map-zone-col">
          <span className="map-zone-lbl">ORANGE ZONE</span>
          <span className="map-zone-count font-mono">0</span>
        </div>
        <div className="map-zone-col">
          <span className="map-zone-lbl">YELLOW ZONE</span>
          <span className="map-zone-count font-mono">10</span>
        </div>
        <div className="map-zone-col">
          <span className="map-zone-lbl">GREEN ZONE</span>
          <span className="map-zone-count font-mono">2</span>
        </div>
      </div>
    </div>
  );
}
