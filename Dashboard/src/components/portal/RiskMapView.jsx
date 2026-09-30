import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';

// 20 Mapped Settlements across Rudraprayag & Chamoli Corridor
const SETTLEMENTS_DATA = [
  // High-Risk Red Zone
  { id: 1, name: 'Joshimath Core Sector', district: 'Chamoli', lat: 30.556, lng: 79.566, destLat: 30.412, destLng: 79.328, level: 'Red', score: 0.94, pop: 16709, fams: 850, mlProb: '94%', shear: '4.8 mm/d', evacTarget: 'Gopeshwar Resettlement Hub', evacDist: '8.4 km (~58m)', pinNum: '1', status: 'Mandatory Evac', hazard: 'High Subsidence & Valley Scarp' },
  { id: 2, name: 'Tapovan Gorge', district: 'Chamoli', lat: 30.493, lng: 79.627, destLat: 30.412, destLng: 79.328, level: 'Red', score: 0.88, pop: 2183, fams: 210, mlProb: '88%', shear: '3.9 mm/d', evacTarget: 'Gopeshwar Resettlement Hub', evacDist: '9.2 km (~1h 10m)', pinNum: '2', status: 'Active Relocation', hazard: 'Flash Flood & Debris Fan' },
  { id: 3, name: 'Kedarnath Upper Valley', district: 'Rudraprayag', lat: 30.630, lng: 79.066, destLat: 30.517, destLng: 79.098, level: 'Red', score: 0.91, pop: 3200, fams: 340, mlProb: '91%', shear: '4.2 mm/d', evacTarget: 'Ukhimath Relief Base', evacDist: '2.1 km (~34m)', pinNum: '1', status: 'High Alert', hazard: 'Glacial Outburst & Scree Creep' },
  { id: 4, name: 'Sonprayag Valley', district: 'Rudraprayag', lat: 30.590, lng: 79.020, destLat: 30.517, destLng: 79.098, level: 'Red', score: 0.80, pop: 1290, fams: 130, mlProb: '80%', shear: '3.1 mm/d', evacTarget: 'Ukhimath Relief Base', evacDist: '1.9 km (~51m)', pinNum: '2', status: 'Active Relocation', hazard: 'Riverbank Toe Erosion' },
  { id: 5, name: 'Badrinath Access Sector', district: 'Chamoli', lat: 30.744, lng: 79.493, destLat: 30.412, destLng: 79.328, level: 'Red', score: 0.79, pop: 1800, fams: 190, mlProb: '79%', shear: '2.9 mm/d', evacTarget: 'Gopeshwar Resettlement Hub', evacDist: '12.0 km (~1h 30m)', pinNum: '3', status: 'Monitoring', hazard: 'Rockfall & Snow Avalanche' },

  // Orange Moderate-High Hazard
  { id: 6, name: 'Helang Slope', district: 'Chamoli', lat: 30.528, lng: 79.510, destLat: 30.412, destLng: 79.328, level: 'Orange', score: 0.76, pop: 840, fams: 95, mlProb: '76%', shear: '2.4 mm/d', evacTarget: 'Gopeshwar Resettlement Hub', evacDist: '7.1 km (~45m)', pinNum: '1', status: 'Pre-Evacuation', hazard: 'Bedrock Slump' },
  { id: 7, name: 'Pipalkoti Hill', district: 'Chamoli', lat: 30.432, lng: 79.430, destLat: 30.412, destLng: 79.328, level: 'Orange', score: 0.71, pop: 3420, fams: 340, mlProb: '71%', shear: '2.1 mm/d', evacTarget: 'Gopeshwar Resettlement Hub', evacDist: '6.5 km (~40m)', pinNum: '2', status: 'Pre-Evacuation', hazard: 'Slope Creep' },
  { id: 8, name: 'Kund Junction', district: 'Rudraprayag', lat: 30.510, lng: 79.080, destLat: 30.517, destLng: 79.098, level: 'Orange', score: 0.68, pop: 1100, fams: 120, mlProb: '68%', shear: '1.9 mm/d', evacTarget: 'Ukhimath Relief Base', evacDist: '3.4 km (~25m)', pinNum: '3', status: 'Advisory Active', hazard: 'Splay Faulting' },
  { id: 9, name: 'Guptkashi Slope', district: 'Rudraprayag', lat: 30.522, lng: 79.076, destLat: 30.517, destLng: 79.098, level: 'Orange', score: 0.66, pop: 2450, fams: 260, mlProb: '66%', shear: '1.8 mm/d', evacTarget: 'Ukhimath Relief Base', evacDist: '2.8 km (~20m)', pinNum: '2', status: 'Advisory Active', hazard: 'Overburden Sliding' },

  // Yellow Moderate Risk
  { id: 10, name: 'Ukhimath Town Hub', district: 'Rudraprayag', lat: 30.517, lng: 79.098, destLat: 30.285, destLng: 78.980, level: 'Yellow', score: 0.42, pop: 4800, fams: 510, mlProb: '42%', shear: '0.8 mm/d', evacTarget: 'Local Base', evacDist: '0.5 km (~5m)', pinNum: 'S', status: 'Reception Ready', hazard: 'Moderate Slump' },
  { id: 11, name: 'Agastmuni Valley', district: 'Rudraprayag', lat: 30.392, lng: 78.980, destLat: 30.285, destLng: 78.980, level: 'Yellow', score: 0.38, pop: 5200, fams: 580, mlProb: '38%', shear: '0.7 mm/d', evacTarget: 'Rudraprayag EOC', evacDist: '8.0 km (~30m)', pinNum: 'S', status: 'Stable', hazard: 'Alluvial Settling' },
  { id: 12, name: 'Nandaprayag Confluence', district: 'Chamoli', lat: 30.332, lng: 79.324, destLat: 30.290, destLng: 79.155, level: 'Yellow', score: 0.35, pop: 1950, fams: 210, mlProb: '35%', shear: '0.6 mm/d', evacTarget: 'Gauchar Plain Hub', evacDist: '11.2 km (~40m)', pinNum: 'S', status: 'Stable', hazard: 'Confluence Surge' },
  { id: 13, name: 'Ghat Foothills', district: 'Chamoli', lat: 30.256, lng: 79.460, destLat: 30.260, destLng: 79.220, level: 'Yellow', score: 0.32, pop: 2800, fams: 310, mlProb: '32%', shear: '0.5 mm/d', evacTarget: 'Gauchar Plain Hub', evacDist: '14.0 km (~50m)', pinNum: 'S', status: 'Stable', hazard: 'Terrace Shear' },
  { id: 14, name: 'Chamoli Bazaar', district: 'Chamoli', lat: 30.410, lng: 79.330, destLat: 30.412, destLng: 79.328, level: 'Yellow', score: 0.40, pop: 6100, fams: 690, mlProb: '40%', shear: '0.7 mm/d', evacTarget: 'Gopeshwar Hub', evacDist: '4.5 km (~15m)', pinNum: 'S', status: 'Stable', hazard: 'Slope Saturation' },
  { id: 20, name: 'Triyuginarayan Ridge', district: 'Rudraprayag', lat: 30.560, lng: 78.980, destLat: 30.517, destLng: 79.098, level: 'Yellow', score: 0.28, pop: 1400, fams: 150, mlProb: '28%', shear: '0.4 mm/d', evacTarget: 'Ukhimath Base', evacDist: '5.2 km (~35m)', pinNum: 'S', status: 'Stable', hazard: 'Ridge Fractures' },

  // Green Safe Havens / Resettlement Hubs
  { id: 15, name: 'Gopeshwar Resettlement Hub', district: 'Chamoli', lat: 30.412, lng: 79.328, destLat: 30.290, destLng: 79.155, level: 'Green', score: 0.08, pop: 21440, fams: 2300, mlProb: '8%', shear: '0.1 mm/d', evacTarget: 'Primary Safe Base', evacDist: 'Receiving Base', pinNum: 'S', status: '100% Operational', hazard: 'Stable Granitic Bedrock' },
  { id: 16, name: 'Gauchar Airfield Plain', district: 'Chamoli', lat: 30.290, lng: 79.155, destLat: 30.285, destLng: 78.980, level: 'Green', score: 0.05, pop: 8500, fams: 920, mlProb: '5%', shear: '0.0 mm/d', evacTarget: 'Aviation & Hospital Base', evacDist: 'Receiving Base', pinNum: 'S', status: '100% Operational', hazard: 'Broad Fluvial Terrace' },
  { id: 17, name: 'Rudraprayag Administrative Base', district: 'Rudraprayag', lat: 30.285, lng: 78.980, destLat: 30.285, destLng: 78.980, level: 'Green', score: 0.09, pop: 9300, fams: 1050, mlProb: '9%', shear: '0.1 mm/d', evacTarget: 'District EOC Base', evacDist: 'Receiving Base', pinNum: 'S', status: '100% Operational', hazard: 'Stable Ridge Complex' },
  { id: 18, name: 'Karanprayag Expansion Plateau', district: 'Chamoli', lat: 30.260, lng: 79.220, destLat: 30.290, destLng: 79.155, level: 'Green', score: 0.07, pop: 8200, fams: 880, mlProb: '7%', shear: '0.1 mm/d', evacTarget: 'SDRF Base Alpha', evacDist: 'Receiving Base', pinNum: 'S', status: '100% Operational', hazard: 'High Terrace Basin' },
  { id: 19, name: 'Pokhari Valley Terrace', district: 'Chamoli', lat: 30.350, lng: 79.200, destLat: 30.412, destLng: 79.328, level: 'Green', score: 0.06, pop: 3100, fams: 340, mlProb: '6%', shear: '0.1 mm/d', evacTarget: 'Secondary Haven', evacDist: 'Receiving Base', pinNum: 'S', status: '100% Operational', hazard: 'Low Slope Terrace' }
];

// Helper to open Google Maps navigation directions
const openGoogleMapsDirections = (originLat, originLng, destLat, destLng) => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=driving`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default function RiskMapView() {
  const mapContainerRef = useRef(null);
  const mapPaneRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerLayersRef = useRef({});
  
  const [mapType, setMapType] = useState('Streets'); // 'Streets' | 'Satellite' | 'Terrain'
  const [selectedSettlement, setSelectedSettlement] = useState(SETTLEMENTS_DATA[0]); // Default to Joshimath Core
  const [showLabels, setShowLabels] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterTier, setFilterTier] = useState('All'); // 'All' | 'Red' | 'Orange' | 'Yellow' | 'Green'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConsoleTab, setActiveConsoleTab] = useState('queue'); // 'queue' | 'evac' | 'telemetry'

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    const el = mapPaneRef.current || mapContainerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (mapInstanceRef.current) {
        setTimeout(() => mapInstanceRef.current.invalidateSize(), 200);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Zoom handlers for buttons
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Filtered settlements for right queue
  const filteredSettlements = useMemo(() => {
    return SETTLEMENTS_DATA.filter((s) => {
      const matchTier = filterTier === 'All' || s.level === filterTier;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTier && matchSearch;
    });
  }, [filterTier, searchQuery]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }

      // Initialize Leaflet Map
      const map = L.map(mapContainerRef.current, {
        center: [30.50, 79.32],
        zoom: 10,
        zoomControl: false,
        attributionControl: true
      });

      // MapTiler / Basemap Tile URLs
      const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;
      let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      let attr = '© OpenStreetMap contributors';

      if (maptilerKey) {
        attr = '© MapTiler © OpenStreetMap contributors';
        if (mapType === 'Satellite') {
          tileUrl = `https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${maptilerKey}`;
        } else if (mapType === 'Terrain') {
          tileUrl = `https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=${maptilerKey}`;
        } else {
          tileUrl = `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerKey}`;
        }
      } else {
        if (mapType === 'Satellite') {
          tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
          attr = '© Esri, Maxar, Earthstar Geographics';
        } else if (mapType === 'Terrain') {
          tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
          attr = '© OpenTopoMap';
        }
      }

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19,
        attribution: attr,
        subdomains: maptilerKey ? [] : ['a', 'b', 'c']
      });

      tileLayer.addTo(map);

      // ==========================================
      // 1. DEDICATED NAVIGATION LINES (RED/ORANGE ➔ RELOCATED GREEN SPOTS)
      // ==========================================

      const NAVIGATION_ROUTES = [
        // Joshimath High-Risk Cluster ➔ Gopeshwar Resettlement Hub (Green Spot)
        { from: 'Joshimath Core', to: 'Gopeshwar Hub', fromCoords: [30.556, 79.566], toCoords: [30.412, 79.328], label: '8.4 km (~58m)', labelPos: [30.490, 79.450], tier: 'Red' },
        { from: 'Tapovan Gorge', to: 'Gopeshwar Hub', fromCoords: [30.493, 79.627], toCoords: [30.412, 79.328], label: '9.2 km (~1h 10m)', labelPos: [30.455, 79.485], tier: 'Red' },
        { from: 'Helang Slope', to: 'Gopeshwar Hub', fromCoords: [30.528, 79.510], toCoords: [30.412, 79.328], label: '7.1 km (~45m)', labelPos: [30.470, 79.420], tier: 'Orange' },
        { from: 'Pipalkoti Hill', to: 'Gopeshwar Hub', fromCoords: [30.432, 79.430], toCoords: [30.412, 79.328], label: '6.5 km (~40m)', labelPos: [30.422, 79.380], tier: 'Orange' },
        { from: 'Badrinath Access', to: 'Gopeshwar Hub', fromCoords: [30.744, 79.493], toCoords: [30.556, 79.566], label: '12.0 km (~1h 30m)', labelPos: [30.650, 79.530], tier: 'Red' },
        
        // Kedarnath High-Risk Cluster ➔ Ukhimath Safe Hub / Rudraprayag Admin Base (Green Spot)
        { from: 'Kedarnath Valley', to: 'Ukhimath Base', fromCoords: [30.630, 79.066], toCoords: [30.517, 79.098], label: '2.1 km (~34m)', labelPos: [30.585, 79.080], tier: 'Red' },
        { from: 'Sonprayag Valley', to: 'Ukhimath Base', fromCoords: [30.590, 79.020], toCoords: [30.517, 79.098], label: '1.9 km (~51m)', labelPos: [30.555, 79.055], tier: 'Red' },
        { from: 'Guptkashi Slope', to: 'Ukhimath Base', fromCoords: [30.522, 79.076], toCoords: [30.517, 79.098], label: '2.8 km (~20m)', labelPos: [30.520, 79.088], tier: 'Orange' },
        { from: 'Kund Junction', to: 'Ukhimath Base', fromCoords: [30.510, 79.080], toCoords: [30.517, 79.098], label: '1.1 km (~15m)', labelPos: [30.514, 79.089], tier: 'Orange' },
        { from: 'Triyuginarayan', to: 'Ukhimath Base', fromCoords: [30.560, 78.980], toCoords: [30.517, 79.098], label: '5.2 km (~35m)', labelPos: [30.540, 79.040], tier: 'Yellow' },

        // Secondary Inter-Hub Relocation Corridors ➔ Gauchar Plain & Karanprayag (Green Spots)
        { from: 'Nandaprayag', to: 'Gauchar Plain', fromCoords: [30.332, 79.324], toCoords: [30.290, 79.155], label: '11.2 km (~40m)', labelPos: [30.310, 79.240], tier: 'Yellow' },
        { from: 'Ghat Foothills', to: 'Karanprayag Plateau', fromCoords: [30.256, 79.460], toCoords: [30.260, 79.220], label: '14.0 km (~50m)', labelPos: [30.258, 79.340], tier: 'Yellow' },
        { from: 'Ukhimath Hub', to: 'Rudraprayag Base', fromCoords: [30.517, 79.098], toCoords: [30.285, 78.980], label: '18.4 km (~45m)', labelPos: [30.400, 79.040], tier: 'Green' },
        { from: 'Gopeshwar Hub', to: 'Gauchar Plain', fromCoords: [30.412, 79.328], toCoords: [30.290, 79.155], label: 'Air-Transit Axis', labelPos: [30.350, 79.240], tier: 'Green' }
      ];

      NAVIGATION_ROUTES.forEach((route) => {
        // Outer glow polyline
        L.polyline([route.fromCoords, route.toCoords], {
          color: '#0284C7',
          weight: 6,
          opacity: 0.25
        }).addTo(map);

        // Crisp Cyan Dashed Navigation Polyline
        L.polyline([route.fromCoords, route.toCoords], {
          color: '#00B4D8',
          weight: 3.5,
          dashArray: '7, 6',
          opacity: 0.95
        }).addTo(map);

        // Floating Transit Distance & ETA Label
        if (route.labelPos && route.label) {
          const navLabelIcon = L.divIcon({
            className: 'evac-nav-label-marker',
            html: `
              <div style="
                background: rgba(2, 132, 199, 0.92);
                color: #FFFFFF;
                padding: 1.5px 6px;
                border-radius: 9999px;
                font-size: 9.5px;
                font-weight: 800;
                letter-spacing: 0.02em;
                white-space: nowrap;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                border: 1px solid #7DD3FC;
                pointer-events: none;
              ">
                ${route.label}
              </div>
            `,
            iconSize: [80, 18],
            iconAnchor: [40, 9]
          });
          L.marker(route.labelPos, { icon: navLabelIcon }).addTo(map);
        }
      });

      // ==========================================
      // 2. REFINED HAZARD FAULT LINES & ZONES
      // ==========================================

      // Red High-Strain Corridor (Badrinath to Joshimath)
      L.polyline([[30.744, 79.493], [30.556, 79.566]], {
        color: '#DC2626',
        weight: 3.5,
        dashArray: '8, 5',
        opacity: 0.9
      }).addTo(map);

      // Orange Lower Valley Route (Chamoli to Nandaprayag to Ghat)
      L.polyline([[30.410, 79.330], [30.332, 79.324], [30.256, 79.460]], {
        color: '#FF6B00',
        weight: 3,
        dashArray: '8, 5',
        opacity: 0.85
      }).addTo(map);

      // Risk Buffer Perimeters
      L.circle([30.556, 79.566], {
        color: '#DC2626',
        fillColor: '#DC2626',
        fillOpacity: 0.2,
        weight: 1.5,
        radius: 3500
      }).addTo(map);

      L.circle([30.630, 79.066], {
        color: '#DC2626',
        fillColor: '#DC2626',
        fillOpacity: 0.2,
        weight: 1.5,
        radius: 3000
      }).addTo(map);

      L.circle([30.412, 79.328], {
        color: '#16A34A',
        fillColor: '#16A34A',
        fillOpacity: 0.15,
        weight: 1.5,
        radius: 3200
      }).addTo(map);

      // ==========================================
      // 3. SETTLEMENT MARKER PINS
      // ==========================================
      const markers = {};

      SETTLEMENTS_DATA.forEach((s) => {
        const pinBorderColor = 
          s.level === 'Red' ? '#DC2626' :
          s.level === 'Orange' ? '#FF6B00' :
          s.level === 'Yellow' ? '#EAB308' : '#16A34A';

        const pinBadgeBg = 
          s.level === 'Red' ? '#FEF2F2' :
          s.level === 'Orange' ? '#FFF7ED' :
          s.level === 'Yellow' ? '#FEFCE8' : '#F0FDF4';

        const pinBadgeTextColor = 
          s.level === 'Red' ? '#DC2626' :
          s.level === 'Orange' ? '#C2410C' :
          s.level === 'Yellow' ? '#854D0E' : '#15803D';

        const pinBg = s.level === 'Green' ? '#16A34A' : '#0F172A';

        const customIcon = L.divIcon({
          className: 'settlement-map-marker',
          html: `
            <div style="
              background: ${pinBg};
              color: #FFFFFF;
              border: 2px solid ${pinBorderColor};
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 10px;
              font-weight: 850;
              box-shadow: 0 2px 6px rgba(0,0,0,0.35);
              cursor: pointer;
            ">
              ${s.pinNum}
            </div>
            ${showLabels ? `
              <div style="
                position: absolute;
                top: 25px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.95);
                color: #0F172A;
                padding: 1px 5px;
                border-radius: 3px;
                font-size: 9px;
                font-weight: 800;
                white-space: nowrap;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                border: 1px solid #CBD5E1;
                pointer-events: none;
              ">
                ${s.name.split(' ')[0]}
              </div>
            ` : ''}
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([s.lat, s.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          setSelectedSettlement(s);
        });

        const gmapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${s.lat},${s.lng}&destination=${s.destLat},${s.destLng}&travelmode=driving`;

        // Popup Content with direct Google Maps redirection button
        marker.bindPopup(`
          <div style="font-family: inherit; padding: 4px; min-width: 215px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="font-size: 13px; color: #0F172A;">${s.name}</strong>
              <span style="font-size: 10px; font-weight: 800; color: ${pinBadgeTextColor}; background: ${pinBadgeBg}; border: 1px solid ${pinBorderColor}; padding: 1px 6px; border-radius: 4px;">
                ${s.level} Tier
              </span>
            </div>
            <div style="font-size: 11px; color: #64748B; margin-bottom: 3px;">
              ${s.district} • ${s.pop.toLocaleString()} Population (${s.fams} fams)
            </div>
            <div style="font-size: 11px; color: #1E293B; margin-bottom: 2px;">
              <strong>InSAR Shear:</strong> ${s.shear} | <strong>ML:</strong> ${s.mlProb}
            </div>
            <div style="font-size: 11px; color: #0284C7; font-weight: 700; margin-bottom: 5px;">
              ↳ Evac: ${s.evacTarget} (${s.evacDist})
            </div>
            <a href="${gmapsDirectionsUrl}" 
               target="_blank" 
               rel="noopener noreferrer" 
               style="display: flex; align-items: center; justify-content: center; gap: 5px; background: #0284C7; color: #FFFFFF; font-size: 10.5px; font-weight: 750; padding: 5px 10px; border-radius: 4px; text-decoration: none; margin-top: 6px; box-shadow: 0 1px 4px rgba(2,132,199,0.3);">
              🧭 Navigate in Google Maps ↗
            </a>
          </div>
        `);

        markers[s.id] = marker;
      });

      markerLayersRef.current = markers;
      mapInstanceRef.current = map;
    } catch (err) {
      console.warn('Risk map notice:', err);
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
  }, [mapType, showLabels]);

  // Function to pan map to clicked settlement
  const handleSelectSettlementFromQueue = (settlement) => {
    setSelectedSettlement(settlement);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([settlement.lat, settlement.lng], 12, {
        animate: true,
        duration: 1.2
      });
      const marker = markerLayersRef.current[settlement.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 1200);
      }
    }
  };

  return (
    <div className="risk-map-console-root">
      {/* 1. Top Header Row */}
      <div className="risk-console-top-strip">
        <div className="console-header-brand">
          <div className="gis-emblem-badge">GIS</div>
          <div>
            <h1 className="console-title">Multi-Hazard Spatial Operations Hub</h1>
            <p className="console-subtitle">OPERATIONAL SPATIAL INTELLIGENCE &nbsp;•&nbsp; RUDRAPRAYAG & CHAMOLI CORRIDOR</p>
          </div>
        </div>

        <div className="console-header-right">
          <span className="console-settlement-count-pill">
            <strong>20</strong> settlements mapped
          </span>
          <div className="console-live-badge">
            <span className="live-dot-beacon"></span>
            <span>Live Telemetry</span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Next-Line KPI Cards Row with Increased Height */}
      <div className="console-kpi-cards-row">
        {/* Card 1: High Risk */}
        <div className="console-kpi-box card-red">
          <div className="kpi-box-top">
            <span className="chip-dot-pulse red"></span>
            <span className="kpi-box-label">High Risk:</span>
          </div>
          <div className="kpi-box-main-val">25,182 <span className="kpi-unit">Pop</span></div>
          <div className="kpi-box-subtext">(5 Sectors)</div>
        </div>

        {/* Card 2: Evac Corridors */}
        <div className="console-kpi-box card-cyan">
          <div className="kpi-box-top">
            <span className="kpi-box-label">Evac Corridors:</span>
          </div>
          <div className="kpi-box-main-val">2 Active</div>
          <div className="kpi-box-subtext">(~44m ETA)</div>
        </div>

        {/* Card 3: Peak Shear */}
        <div className="console-kpi-box card-orange">
          <div className="kpi-box-top">
            <span className="kpi-box-label">Peak Shear:</span>
          </div>
          <div className="kpi-box-main-val">4.8 <span className="kpi-unit">mm/d</span></div>
          <div className="kpi-box-subtext">(Sentinel-1)</div>
        </div>

        {/* Card 4: Safe Haven */}
        <div className="console-kpi-box card-green">
          <div className="kpi-box-top">
            <span className="kpi-box-label">Safe Haven:</span>
          </div>
          <div className="kpi-box-main-val">48,540</div>
          <div className="kpi-box-subtext">(100% Ready)</div>
        </div>
      </div>

      {/* 3. Main Unified Split Grid (Left Map + Right Console) */}
      <div className="risk-console-main-grid">
        
        {/* Left Side: Interactive Map Centerpiece */}
        <div ref={mapPaneRef} className={`risk-map-main-pane ${isFullscreen ? 'is-fullscreen' : ''}`}>
          {/* Floating Map Controls Toolbar */}
          <div className="map-glass-toolbar">
            {/* Legend Group */}
            <div className="toolbar-legend-pills">
              <span className="tb-legend-item"><span className="tb-dot corridor"></span> Hazard Axis</span>
              <span className="tb-legend-item"><span className="tb-dot red"></span> Red</span>
              <span className="tb-legend-item"><span className="tb-dot orange"></span> Orange</span>
              <span className="tb-legend-item"><span className="tb-dot yellow"></span> Yellow</span>
              <span className="tb-legend-item"><span className="tb-dot green"></span> Safe</span>
              <span className="tb-legend-item evac"><span className="tb-dashed-line"></span> Evac Line</span>
            </div>

            {/* Basemap Switcher & Actions Controls */}
            <div className="toolbar-controls-group">
              {/* Zoom Controls: Zoom In (+) and Zoom Out (-) */}
              <div className="map-zoom-btn-group">
                <button
                  type="button"
                  className="btn-toolbar-zoom"
                  onClick={handleZoomIn}
                  title="Zoom In (+)"
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn-toolbar-zoom"
                  onClick={handleZoomOut}
                  title="Zoom Out (-)"
                >
                  −
                </button>
              </div>

              {/* Layer Switcher (Topo removed: Streets, Satellite, Terrain) */}
              <div className="map-segmented-pill">
                {['Streets', 'Satellite', 'Terrain'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`btn-seg-pill ${mapType === type ? 'active' : ''}`}
                    onClick={() => setMapType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Village Labels Toggle */}
              <button
                type="button"
                className={`btn-toolbar-icon ${showLabels ? 'active' : ''}`}
                onClick={() => setShowLabels(!showLabels)}
                title="Toggle Village Labels"
              >
                <span>A</span>
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                className={`btn-toolbar-fullscreen ${isFullscreen ? 'active' : ''}`}
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                <span>{isFullscreen ? '🗗 Exit' : '⛶ Fullscreen'}</span>
              </button>
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div ref={mapContainerRef} className="gis-leaflet-canvas" />

          {/* Floating Settlement Inspection Drawer on Map */}
          {selectedSettlement && (
            <div className="map-floating-dossier-card">
              <div className="dossier-card-top">
                <div className="dossier-title-col">
                  <div className="dossier-badge-row">
                    <span className={`tier-badge-pill tier-${selectedSettlement.level.toLowerCase()}`}>
                      {selectedSettlement.level} Tier
                    </span>
                    <span className="dossier-district-text">{selectedSettlement.district} District</span>
                  </div>
                  <h3 className="dossier-settlement-title">{selectedSettlement.name}</h3>
                </div>
                <button
                  type="button"
                  className="btn-dossier-close"
                  onClick={() => setSelectedSettlement(null)}
                >
                  ×
                </button>
              </div>

              <div className="dossier-stats-strip">
                <div className="dossier-stat-item">
                  <span className="d-stat-label">POPULATION</span>
                  <span className="d-stat-value">{selectedSettlement.pop.toLocaleString()} <small>({selectedSettlement.fams} fams)</small></span>
                </div>
                <div className="dossier-stat-item">
                  <span className="d-stat-label">INSAR SHEAR</span>
                  <span className="d-stat-value text-orange">{selectedSettlement.shear}</span>
                </div>
                <div className="dossier-stat-item">
                  <span className="d-stat-label">ML PROBABILITY</span>
                  <span className="d-stat-value text-red">{selectedSettlement.mlProb}</span>
                </div>
              </div>

              <div className="dossier-evac-footer">
                <span className="evac-label-icon">↳</span>
                <div className="evac-info-text">
                  <span>Evacuation Destination: <strong>{selectedSettlement.evacTarget}</strong></span>
                  <span className="evac-eta-badge">{selectedSettlement.evacDist}</span>
                </div>
              </div>

              <button
                type="button"
                className="dossier-gmaps-btn"
                onClick={() => openGoogleMapsDirections(selectedSettlement.lat, selectedSettlement.lng, selectedSettlement.destLat, selectedSettlement.destLng)}
              >
                🧭 Navigate in Google Maps ↗
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Operational Intelligence Panel */}
        <div className="risk-console-side-panel">
          {/* Panel Top Navigation Tabs */}
          <div className="console-panel-tabs-bar">
            <button
              type="button"
              className={`console-tab-btn ${activeConsoleTab === 'queue' ? 'active' : ''}`}
              onClick={() => setActiveConsoleTab('queue')}
            >
              <span>Vulnerability Queue</span>
              <span className="tab-counter-badge">{SETTLEMENTS_DATA.length}</span>
            </button>
            <button
              type="button"
              className={`console-tab-btn ${activeConsoleTab === 'evac' ? 'active' : ''}`}
              onClick={() => setActiveConsoleTab('evac')}
            >
              <span>Evacuation</span>
            </button>
            <button
              type="button"
              className={`console-tab-btn ${activeConsoleTab === 'telemetry' ? 'active' : ''}`}
              onClick={() => setActiveConsoleTab('telemetry')}
            >
              <span>Live Feed</span>
            </button>
          </div>

          {/* TAB 1: VULNERABILITY QUEUE */}
          {activeConsoleTab === 'queue' && (
            <div className="console-tab-content queue-tab">
              {/* Filter & Search Bar */}
              <div className="queue-filter-toolbar">
                <div className="queue-tier-filters">
                  {['All', 'Red', 'Orange', 'Yellow', 'Green'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      className={`btn-tier-filter ${filterTier === tier ? 'active' : ''} ${tier.toLowerCase()}`}
                      onClick={() => setFilterTier(tier)}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                <div className="queue-search-box">
                  <input
                    type="text"
                    placeholder="Search village or district..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="queue-search-input"
                  />
                </div>
              </div>

              {/* Scrollable Settlement Items List */}
              <div className="queue-settlement-list">
                {filteredSettlements.map((item) => {
                  const isSelected = selectedSettlement?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`settlement-queue-card ${isSelected ? 'selected' : ''} tier-${item.level.toLowerCase()}`}
                      onClick={() => handleSelectSettlementFromQueue(item)}
                    >
                      <div className="queue-card-header">
                        <div className="queue-card-left">
                          <span className={`queue-tier-tag tier-${item.level.toLowerCase()}`}>
                            {item.level}
                          </span>
                          <strong className="queue-settlement-name">{item.name}</strong>
                        </div>
                        <span className="queue-shear-tag">{item.shear}</span>
                      </div>

                      <div className="queue-card-meta">
                        <span>{item.district}</span>
                        <span>•</span>
                        <span>{item.pop.toLocaleString()} Residents</span>
                        <span>•</span>
                        <span className="queue-ml-tag">ML: {item.mlProb}</span>
                      </div>

                      <div className="queue-card-evac-row">
                        <div className="queue-evac-dest-col">
                          <span className="queue-evac-dest">↳ {item.evacTarget}</span>
                          <span className="queue-evac-dist">{item.evacDist}</span>
                        </div>
                        <button
                          type="button"
                          className="btn-queue-gmaps-nav"
                          title="Open navigation in Google Maps"
                          onClick={(e) => {
                            e.stopPropagation();
                            openGoogleMapsDirections(item.lat, item.lng, item.destLat, item.destLng);
                          }}
                        >
                          🧭 Map ↗
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: EVACUATION LOGISTICS */}
          {activeConsoleTab === 'evac' && (
            <div className="console-tab-content evac-tab">
              <div className="evac-corridor-card">
                <div className="evac-corridor-header">
                  <div className="evac-corridor-title-row">
                    <span className="corridor-id-tag">CORRIDOR 01</span>
                    <span className="corridor-status-tag green">CLEAR & ACTIVE</span>
                  </div>
                  <h4 className="corridor-route-name">Alaknanda Axis: Joshimath ➔ Gopeshwar Base</h4>
                  <p className="corridor-desc">Primary 48.2 km transit corridor connecting high-subsidence core to primary resettlement hub.</p>
                </div>
                
                <div className="corridor-metric-grid">
                  <div className="corridor-m-box">
                    <span className="cm-label">TRANSIT DISTANCE</span>
                    <span className="cm-val">48.2 km</span>
                  </div>
                  <div className="corridor-m-box">
                    <span className="cm-label">AVG CONVOY ETA</span>
                    <span className="cm-val">~58 mins</span>
                  </div>
                  <div className="corridor-m-box">
                    <span className="cm-label">ESCORT UNITS</span>
                    <span className="cm-val text-green">4 NDRF Teams</span>
                  </div>
                  <div className="corridor-m-box">
                    <span className="cm-label">DESTINATION CAPACITY</span>
                    <span className="cm-val text-cyan">21,440 Beds</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-corridor-gmaps-nav"
                  onClick={() => openGoogleMapsDirections(30.556, 79.566, 30.412, 79.328)}
                >
                  🧭 Open Alaknanda Corridor Route in Google Maps ↗
                </button>
              </div>

              <div className="evac-corridor-card">
                <div className="evac-corridor-header">
                  <div className="evac-corridor-title-row">
                    <span className="corridor-id-tag">CORRIDOR 02</span>
                    <span className="corridor-status-tag green">CLEAR & ACTIVE</span>
                  </div>
                  <h4 className="corridor-route-name">Mandakini Axis: Kedarnath ➔ Ukhimath Shelter</h4>
                  <p className="corridor-desc">High-altitude 31.0 km alpine transit corridor with 3 staging medical triage points.</p>
                </div>

                <div className="corridor-metric-grid">
                  <div className="corridor-m-box">
                    <span className="cm-label">TRANSIT DISTANCE</span>
                    <span className="cm-val">31.0 km</span>
                  </div>
                  <div className="corridor-m-box">
                    <span className="cm-label">AVG CONVOY ETA</span>
                    <span className="cm-val">~34 mins</span>
                  </div>
                  <div className="corridor-m-box">
                    <span className="cm-label">ESCORT UNITS</span>
                    <span className="cm-val text-green">2 SDRF Teams</span>
                  </div>
                  <div className="corridor-m-box">
                    <span className="cm-label">DESTINATION CAPACITY</span>
                    <span className="cm-val text-cyan">4,800 Beds</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-corridor-gmaps-nav"
                  onClick={() => openGoogleMapsDirections(30.630, 79.066, 30.517, 79.098)}
                >
                  🧭 Open Mandakini Corridor Route in Google Maps ↗
                </button>
              </div>

              <div className="evac-shelters-summary">
                <h5 className="summary-title">Resettlement Base Intake Status</h5>
                <div className="shelter-progress-item">
                  <div className="sp-header">
                    <span>Gopeshwar Resettlement Hub</span>
                    <strong>2,300 / 21,440 (11%)</strong>
                  </div>
                  <div className="sp-bar-track">
                    <div className="sp-bar-fill bg-green" style={{ width: '11%' }}></div>
                  </div>
                </div>

                <div className="shelter-progress-item">
                  <div className="sp-header">
                    <span>Gauchar Airfield Base</span>
                    <strong>920 / 8,500 (10%)</strong>
                  </div>
                  <div className="sp-bar-track">
                    <div className="sp-bar-fill bg-green" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE TELEMETRY FEED */}
          {activeConsoleTab === 'telemetry' && (
            <div className="console-tab-content telemetry-tab">
              <div className="sensor-item-card">
                <div className="sensor-card-top">
                  <span className="sensor-badge red">Piezometer Alert</span>
                  <span className="sensor-time">2m ago</span>
                </div>
                <strong className="sensor-title">Joshimath Borehole Piezometer (BH-04)</strong>
                <p className="sensor-desc">Pore water pressure spike to 4.2 bar; slope displacement accelerated at 0.3mm in past 6h.</p>
                <div className="sensor-tags">
                  <span className="s-tag">Sensor #4</span>
                  <span className="s-tag red">Critical Strain</span>
                </div>
              </div>

              <div className="sensor-item-card">
                <div className="sensor-card-top">
                  <span className="sensor-badge cyan">SAR Radar Telemetry</span>
                  <span className="sensor-time">18m ago</span>
                </div>
                <strong className="sensor-title">ISRO NISAR / Sentinel-1 Interferogram Pass</strong>
                <p className="sensor-desc">Ascending orbit SAR processing complete. Mandakini Valley wedge shear verified at 4.2 mm/day.</p>
                <div className="sensor-tags">
                  <span className="s-tag">SAR Orbit 142</span>
                  <span className="s-tag orange">Wedge Creep</span>
                </div>
              </div>

              <div className="sensor-item-card">
                <div className="sensor-card-top">
                  <span className="sensor-badge green">Route Clearance</span>
                  <span className="sensor-time">35m ago</span>
                </div>
                <strong className="sensor-title">NH-58 Chamoli-Gopeshwar Route Survey</strong>
                <p className="sensor-desc">Evacuation route clear. 4 NDRF transit escort convoys stationed at Helang & Pipalkoti choke points.</p>
                <div className="sensor-tags">
                  <span className="s-tag">Road Open</span>
                  <span className="s-tag green">100% Transit Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
