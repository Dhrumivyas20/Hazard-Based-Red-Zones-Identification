import React, { useState } from 'react';

const VILLAGES_LIST = [
  { id: 'V-01', name: 'Joshimath', urgency: 'Immediate', demand: '~850 families', residents: '16,709' },
  { id: 'V-02', name: 'Tapovan', urgency: 'Immediate', demand: '~210 families', residents: '2,100' },
  { id: 'V-03', name: 'Sonprayag', urgency: 'Short-term', demand: '~130 families', residents: '1,200' },
  { id: 'V-04', name: 'Helang', urgency: 'Short-term', demand: '~113 families', residents: '1,100' },
  { id: 'V-05', name: 'Pandukeshwar', urgency: 'Short-term', demand: '~92 families', residents: '700' },
  { id: 'V-06', name: 'Kedarnath (Rambara belt)', urgency: 'Short-term', demand: '~86 families', residents: '450' },
  { id: 'V-07', name: 'Gaurikund', urgency: 'Short-term', demand: '~80 families', residents: '800' },
  { id: 'V-08', name: 'Munsyari', urgency: 'Short-term', demand: '~70 families', residents: '1,500' },
  { id: 'V-09', name: 'Dharchula', urgency: 'Short-term', demand: '~60 families', residents: '6,200' },
  { id: 'V-10', name: 'Bhatwari', urgency: 'Short-term', demand: '~57 families', residents: '7,300' },
  { id: 'V-11', name: 'Rudraprayag Town', urgency: 'Medium-term', demand: '~46 families', residents: '5,500' },
  { id: 'V-12', name: 'Agastyamuni', urgency: 'Monitor', demand: '~30 families', residents: '4,200' },
  { id: 'V-13', name: 'Chamoli Town', urgency: 'Monitor', demand: '~30 families', residents: '3,900' }
];

const VILLAGE_COMPARISONS_MAP = {
  // 1. Joshimath
  'V-01': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Srinagar (Garhwal) Outskirts',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Insufficient',
      statusType: 'insufficient',
      ahpScore: '88.0 / 100',
      ahpRaw: '0.880',
      capacityStatus: 'Insufficient',
      availableCapacity: '5,500 places',
      roadDist: '0.3 km',
      waterDist: '0.5 km',
      healthcareDist: '1.5 km',
      landAvailability: 'High (Expansive Plateau)',
      coords: '30.222°N, 78.780°E',
      terrainSlope: '8° - 12° (Stable Bedrock)',
      waterSource: 'Alaknanda Perennial Lift Basin',
      roadAccessType: 'NH-58 4-Lane Paved Highway',
      healthcareFacility: 'Government Base Hospital (150-bed)',
      relocationFeasibility: 'High Suitability • Phased Split Intake Required',
      dossierDetails: {
        siteId: 'RELOC-SRI-01',
        elevation: '560 m AMSL',
        waterDischarge: '450 LPM gravity line',
        soilType: 'Quartzite & Phyllite bed',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Pauri Outskirts',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '87.9 / 100',
      ahpRaw: '0.879',
      capacityStatus: 'Limited',
      availableCapacity: '7,000 places',
      roadDist: '0.7 km',
      waterDist: '1.0 km',
      healthcareDist: '2.0 km',
      landAvailability: 'High (Ridge Terraces)',
      coords: '30.147°N, 78.781°E',
      terrainSlope: '11° - 15° (Hard Gneiss)',
      waterSource: 'Municipal Piped Scheme + Spring Supply',
      roadAccessType: 'State Highway 11 Paved Arterial',
      healthcareFacility: 'District Hospital Pauri (100-bed)',
      relocationFeasibility: 'High Suitability • Moderate Infrastructure Extension',
      dossierDetails: {
        siteId: 'RELOC-PAU-02',
        elevation: '1,814 m AMSL',
        waterDischarge: '320 LPM municipal feed',
        soilType: 'Metamorphic Gneissic rock',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Kirtinagar',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '84.7 / 100',
      ahpRaw: '0.847',
      capacityStatus: 'Limited',
      availableCapacity: '8,400 places',
      roadDist: '0.6 km',
      waterDist: '0.8 km',
      healthcareDist: '3.5 km',
      landAvailability: 'High (Valley Terrace)',
      coords: '30.170°N, 78.750°E',
      terrainSlope: '7° - 10° (River Fluvial Terrace)',
      waterSource: 'Riverbank Infiltration Well',
      roadAccessType: 'NH-58 Bypass Link',
      healthcareFacility: 'Sub-divisional Primary Health Center',
      relocationFeasibility: 'High Carrying Capacity • Rapid Deployment Ready',
      dossierDetails: {
        siteId: 'RELOC-KIR-03',
        elevation: '580 m AMSL',
        waterDischarge: '510 LPM river infiltration',
        soilType: 'Compacted Alluvial Gravels',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 2. Tapovan
  'V-02': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Gauchar Plateau Sector B',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '89.4 / 100',
      ahpRaw: '0.894',
      capacityStatus: 'Ready',
      availableCapacity: '9,500 places',
      roadDist: '0.5 km',
      waterDist: '0.9 km',
      healthcareDist: '2.1 km',
      landAvailability: 'High (Flat Airfield Bench)',
      coords: '30.275°N, 79.318°E',
      terrainSlope: '5° - 8° (Flat River Terrace)',
      waterSource: 'Alaknanda Gravity Intake',
      roadAccessType: 'National Highway 07 Link',
      healthcareFacility: 'Gauchar Community Health Centre',
      relocationFeasibility: 'Optimal Site • Complete Family Relocation Feasible in Single Wave',
      dossierDetails: {
        siteId: 'RELOC-GAU-01',
        elevation: '820 m AMSL',
        waterDischarge: '600 LPM municipal pipeline',
        soilType: 'Stable Calcareous Conglomerate',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Simli Buffer Zone',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '82.1 / 100',
      ahpRaw: '0.821',
      capacityStatus: 'Limited',
      availableCapacity: '6,800 places',
      roadDist: '1.1 km',
      waterDist: '1.4 km',
      healthcareDist: '3.5 km',
      landAvailability: 'Medium (Inter-montane Bench)',
      coords: '30.360°N, 79.290°E',
      terrainSlope: '10° - 14° (Stable Schist)',
      waterSource: 'Pindar Valley Sub-surface Feed',
      roadAccessType: 'Karanprayag-Simli Paved Route',
      healthcareFacility: 'Karanprayag Sub-District Hospital',
      relocationFeasibility: 'Medium Feasibility • Minor Retaining Terracing Recommended',
      dossierDetails: {
        siteId: 'RELOC-SIM-02',
        elevation: '890 m AMSL',
        waterDischarge: '380 LPM perennial line',
        soilType: 'Mica-Schist and Slate Formation',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Triyuginarayan Safe Bench',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '78.6 / 100',
      ahpRaw: '0.786',
      capacityStatus: 'Limited',
      availableCapacity: '6,200 places',
      roadDist: '1.2 km',
      waterDist: '1.1 km',
      healthcareDist: '4.0 km',
      landAvailability: 'High (Forested Mountain Terrace)',
      coords: '30.580°N, 78.980°E',
      terrainSlope: '8° - 12° (Granitic Bedrock)',
      waterSource: 'Mandakini Headwaters Line',
      roadAccessType: 'Sonprayag Link Spur',
      healthcareFacility: 'Guptkashi Primary Health Post',
      relocationFeasibility: 'Viable Backup Site • Road Widening In Progress',
      dossierDetails: {
        siteId: 'RELOC-TRI-03',
        elevation: '1,980 m AMSL',
        waterDischarge: '290 LPM spring gravity channel',
        soilType: 'Tourmaline Granite Bedrock',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 3. Sonprayag
  'V-03': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Guptkashi Lower Belt',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '89.1 / 100',
      ahpRaw: '0.891',
      capacityStatus: 'Ready',
      availableCapacity: '5,300 places',
      roadDist: '0.6 km',
      waterDist: '0.7 km',
      healthcareDist: '1.8 km',
      landAvailability: 'High (Agricultural Terraces)',
      coords: '30.520°N, 79.070°E',
      terrainSlope: '9° - 13° (Cohesive Bedrock)',
      waterSource: 'Mandakini Riverbank Infiltration',
      roadAccessType: 'Kedarnath Main Highway Corridor',
      healthcareFacility: 'Guptkashi Block Hospital (50-bed)',
      relocationFeasibility: 'Immediate Priority Match • Direct Road Connectivity to Valley Line',
      dossierDetails: {
        siteId: 'RELOC-GUP-01',
        elevation: '1,319 m AMSL',
        waterDischarge: '420 LPM pumped feeder',
        soilType: 'Cohesive Quartzitic Silt',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Gauchar Plain',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '82.5 / 100',
      ahpRaw: '0.825',
      capacityStatus: 'Limited',
      availableCapacity: '7,800 places',
      roadDist: '0.5 km',
      waterDist: '1.2 km',
      healthcareDist: '3.0 km',
      landAvailability: 'High (Broad Airfield Margin)',
      coords: '30.270°N, 79.311°E',
      terrainSlope: '4° - 7° (Fluvial Flat)',
      waterSource: 'Alaknanda Filtration Tank',
      roadAccessType: 'National Highway 07',
      healthcareFacility: 'Gauchar Municipal Dispensary',
      relocationFeasibility: 'High Capacity Intake • Secondary Transit Corridor Required',
      dossierDetails: {
        siteId: 'RELOC-GAU-02',
        elevation: '800 m AMSL',
        waterDischarge: '550 LPM municipal feed',
        soilType: 'Compacted Gravel Bed',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Tehri Resettlement Zone',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '79.8 / 100',
      ahpRaw: '0.798',
      capacityStatus: 'Limited',
      availableCapacity: '4,800 places',
      roadDist: '0.4 km',
      waterDist: '0.6 km',
      healthcareDist: '2.8 km',
      landAvailability: 'High (Pre-Plotted Colony Ground)',
      coords: '30.380°N, 78.480°E',
      terrainSlope: '6° - 10° (Engineered Plateau)',
      waterSource: 'Bhagirathi Piped Line',
      roadAccessType: 'Chamba-Tehri Arterial Road',
      healthcareFacility: 'New Tehri District Hospital',
      relocationFeasibility: 'Rapid Plotted Resettlement • Ideal for Long-term Permanent Rehabilitation',
      dossierDetails: {
        siteId: 'RELOC-TEH-03',
        elevation: '1,550 m AMSL',
        waterDischarge: '480 LPM reservoir pipeline',
        soilType: 'Engineered Compacted Fill',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 4. Helang
  'V-04': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Chamoli Outskirts (Bairangana)',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '87.6 / 100',
      ahpRaw: '0.876',
      capacityStatus: 'Ready',
      availableCapacity: '5,600 places',
      roadDist: '0.4 km',
      waterDist: '0.8 km',
      healthcareDist: '2.2 km',
      landAvailability: 'High (Bairangana Terrace)',
      coords: '30.410°N, 79.330°E',
      terrainSlope: '7° - 11° (Stable Sandstone)',
      waterSource: 'Balkhila Nadi Catchment Line',
      roadAccessType: 'Gopeshwar-Chamoli Bypass',
      healthcareFacility: 'District Hospital Gopeshwar',
      relocationFeasibility: 'High Local Proximity • Cultural Continuity Maintained for Helang Families',
      dossierDetails: {
        siteId: 'RELOC-CHA-01',
        elevation: '1,050 m AMSL',
        waterDischarge: '410 LPM gravity feeder',
        soilType: 'Massive Quartz Sandstone',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Dewalgarh',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '81.9 / 100',
      ahpRaw: '0.819',
      capacityStatus: 'Limited',
      availableCapacity: '4,400 places',
      roadDist: '1.0 km',
      waterDist: '1.5 km',
      healthcareDist: '4.5 km',
      landAvailability: 'Medium (Hill Ridge Terraces)',
      coords: '30.340°N, 79.250°E',
      terrainSlope: '12° - 16° (Hard Metamorphic)',
      waterSource: 'Karanprayag District Water Scheme',
      roadAccessType: 'Paved Secondary Link Road',
      healthcareFacility: 'Karanprayag Civil Hospital',
      relocationFeasibility: 'Viable Alternative • Ground Levelling Work Scheduled',
      dossierDetails: {
        siteId: 'RELOC-DEW-02',
        elevation: '1,120 m AMSL',
        waterDischarge: '310 LPM spring line',
        soilType: 'Foliated Schistose Rock',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Pauri Outskirts',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '78.5 / 100',
      ahpRaw: '0.785',
      capacityStatus: 'Limited',
      availableCapacity: '7,000 places',
      roadDist: '0.7 km',
      waterDist: '1.0 km',
      healthcareDist: '2.0 km',
      landAvailability: 'High (Ridge Terraces)',
      coords: '30.147°N, 78.781°E',
      terrainSlope: '11° - 15° (Hard Gneiss)',
      waterSource: 'Municipal Piped Scheme',
      roadAccessType: 'State Highway 11',
      healthcareFacility: 'District Hospital Pauri',
      relocationFeasibility: 'High Infrastructure Stability • Extended Transit Required',
      dossierDetails: {
        siteId: 'RELOC-PAU-03',
        elevation: '1,814 m AMSL',
        waterDischarge: '320 LPM municipal line',
        soilType: 'Metamorphic Gneissic rock',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 5. Pandukeshwar
  'V-05': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Triyuginarayan Safe Bench',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '86.7 / 100',
      ahpRaw: '0.867',
      capacityStatus: 'Ready',
      availableCapacity: '6,200 places',
      roadDist: '0.8 km',
      waterDist: '0.7 km',
      healthcareDist: '3.1 km',
      landAvailability: 'High (Forested Glade Bench)',
      coords: '30.580°N, 78.980°E',
      terrainSlope: '8° - 11° (Granite Bedrock)',
      waterSource: 'Gravity Spring Infiltration Basin',
      roadAccessType: 'Sonprayag Link Spur',
      healthcareFacility: 'Guptkashi Primary Health Post',
      relocationFeasibility: 'High Safety Rating • High Elevation Familiarity for Pandukeshwar Residents',
      dossierDetails: {
        siteId: 'RELOC-TRI-01',
        elevation: '1,980 m AMSL',
        waterDischarge: '350 LPM gravity pipeline',
        soilType: 'Tourmaline Granite Bedrock',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Srinagar (Garhwal) Outskirts',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '83.2 / 100',
      ahpRaw: '0.832',
      capacityStatus: 'Limited',
      availableCapacity: '5,500 places',
      roadDist: '0.3 km',
      waterDist: '0.5 km',
      healthcareDist: '1.5 km',
      landAvailability: 'High (Expansive Plateau)',
      coords: '30.222°N, 78.780°E',
      terrainSlope: '8° - 12° (Stable Bedrock)',
      waterSource: 'Alaknanda Perennial Lift Basin',
      roadAccessType: 'NH-58 4-Lane Paved Highway',
      healthcareFacility: 'Government Base Hospital (150-bed)',
      relocationFeasibility: 'Complete Medical & Transit Infrastructure Available',
      dossierDetails: {
        siteId: 'RELOC-SRI-02',
        elevation: '560 m AMSL',
        waterDischarge: '450 LPM gravity line',
        soilType: 'Quartzite & Phyllite bed',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Simli Buffer Zone',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '78.9 / 100',
      ahpRaw: '0.789',
      capacityStatus: 'Limited',
      availableCapacity: '6,800 places',
      roadDist: '1.1 km',
      waterDist: '1.4 km',
      healthcareDist: '3.5 km',
      landAvailability: 'Medium (Buffer Shelf)',
      coords: '30.360°N, 79.290°E',
      terrainSlope: '10° - 14° (Stable Schist)',
      waterSource: 'Pindar Valley Sub-surface Feed',
      roadAccessType: 'Karanprayag-Simli Paved Route',
      healthcareFacility: 'Karanprayag Sub-District Hospital',
      relocationFeasibility: 'Stable Buffer Area • Adequate Land for Livestock & Farming',
      dossierDetails: {
        siteId: 'RELOC-SIM-03',
        elevation: '890 m AMSL',
        waterDischarge: '380 LPM perennial line',
        soilType: 'Mica-Schist and Slate Formation',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 6. Kedarnath (Rambara belt)
  'V-06': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Rudraprayag Outskirts (Jakholi road)',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '88.3 / 100',
      ahpRaw: '0.883',
      capacityStatus: 'Ready',
      availableCapacity: '5,000 places',
      roadDist: '0.7 km',
      waterDist: '0.9 km',
      healthcareDist: '2.0 km',
      landAvailability: 'High (Jakholi Plateau Sector)',
      coords: '30.300°N, 78.950°E',
      terrainSlope: '8° - 12° (Cohesive Siltstone)',
      waterSource: 'Mandakini-Alaknanda Confluence Line',
      roadAccessType: 'Jakholi Arterial Road (NH-107 Link)',
      healthcareFacility: 'Rudraprayag District Hospital',
      relocationFeasibility: 'Optimal Relocation Site • Safe Beyond Flash Flood & Debris Envelopes',
      dossierDetails: {
        siteId: 'RELOC-RUD-01',
        elevation: '950 m AMSL',
        waterDischarge: '460 LPM perennial line',
        soilType: 'Massive Quartzite Formation',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Guptkashi Lower Belt',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '85.2 / 100',
      ahpRaw: '0.852',
      capacityStatus: 'Ready',
      availableCapacity: '5,300 places',
      roadDist: '1.0 km',
      waterDist: '1.3 km',
      healthcareDist: '3.8 km',
      landAvailability: 'Medium (Terraced Shelf)',
      coords: '30.520°N, 79.070°E',
      terrainSlope: '9° - 13° (Cohesive Bedrock)',
      waterSource: 'Mandakini Riverbank Infiltration',
      roadAccessType: 'Kedarnath Main Highway Corridor',
      healthcareFacility: 'Guptkashi Block Hospital',
      relocationFeasibility: 'High Valley Continuity • Rapid Evacuation Pipeline',
      dossierDetails: {
        siteId: 'RELOC-GUP-02',
        elevation: '1,319 m AMSL',
        waterDischarge: '420 LPM pumped feeder',
        soilType: 'Cohesive Quartzitic Silt',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Gauchar Plateau Sector B',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '81.0 / 100',
      ahpRaw: '0.810',
      capacityStatus: 'Limited',
      availableCapacity: '9,500 places',
      roadDist: '0.6 km',
      waterDist: '1.0 km',
      healthcareDist: '2.2 km',
      landAvailability: 'High (Airfield Bench)',
      coords: '30.275°N, 79.318°E',
      terrainSlope: '5° - 8° (Flat River Terrace)',
      waterSource: 'Alaknanda Gravity Intake',
      roadAccessType: 'National Highway 07 Link',
      healthcareFacility: 'Gauchar Community Health Centre',
      relocationFeasibility: 'Large Carrying Capacity Available for Long-Term Resettlement',
      dossierDetails: {
        siteId: 'RELOC-GAU-03',
        elevation: '820 m AMSL',
        waterDischarge: '600 LPM municipal pipeline',
        soilType: 'Stable Calcareous Conglomerate',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 7. Gaurikund
  'V-07': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Gauchar Plain',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '88.7 / 100',
      ahpRaw: '0.887',
      capacityStatus: 'Ready',
      availableCapacity: '7,800 places',
      roadDist: '0.5 km',
      waterDist: '1.2 km',
      healthcareDist: '3.0 km',
      landAvailability: 'High (Broad Airfield Margin)',
      coords: '30.270°N, 79.311°E',
      terrainSlope: '4° - 7° (Fluvial Flat)',
      waterSource: 'Alaknanda Filtration Tank',
      roadAccessType: 'National Highway 07',
      healthcareFacility: 'Gauchar Municipal Dispensary',
      relocationFeasibility: 'Instant Intake Capability • Flat Stable Alluvial Bed',
      dossierDetails: {
        siteId: 'RELOC-GAU-01',
        elevation: '800 m AMSL',
        waterDischarge: '550 LPM municipal feed',
        soilType: 'Compacted Gravel Bed',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Rudraprayag Outskirts (Jakholi road)',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '83.4 / 100',
      ahpRaw: '0.834',
      capacityStatus: 'Ready',
      availableCapacity: '5,000 places',
      roadDist: '1.5 km',
      waterDist: '1.8 km',
      healthcareDist: '4.0 km',
      landAvailability: 'Medium (Hill Ridge)',
      coords: '30.300°N, 78.950°E',
      terrainSlope: '10° - 14° (Stable Metamorphic)',
      waterSource: 'Alaknanda Perennial Pump Scheme',
      roadAccessType: 'Jakholi Arterial Road',
      healthcareFacility: 'District Hospital Rudraprayag',
      relocationFeasibility: 'Solid Ground Conditions • Good Transport Links',
      dossierDetails: {
        siteId: 'RELOC-RUD-02',
        elevation: '950 m AMSL',
        waterDischarge: '460 LPM perennial line',
        soilType: 'Massive Quartzite Formation',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Dewalgarh',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Limited',
      statusType: 'limited',
      ahpScore: '78.1 / 100',
      ahpRaw: '0.781',
      capacityStatus: 'Limited',
      availableCapacity: '4,400 places',
      roadDist: '1.0 km',
      waterDist: '1.5 km',
      healthcareDist: '4.5 km',
      landAvailability: 'Medium (Hill Escarpment Terraces)',
      coords: '30.340°N, 79.250°E',
      terrainSlope: '12° - 16° (Hard Metamorphic)',
      waterSource: 'Karanprayag District Water Scheme',
      roadAccessType: 'Paved Secondary Link Road',
      healthcareFacility: 'Karanprayag Civil Hospital',
      relocationFeasibility: 'Secondary Fallback Site • Infrastructure In Place',
      dossierDetails: {
        siteId: 'RELOC-DEW-03',
        elevation: '1,120 m AMSL',
        waterDischarge: '310 LPM spring line',
        soilType: 'Foliated Schistose Rock',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // 8. Munsyari
  'V-08': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Tehri Resettlement Zone',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '89.6 / 100',
      ahpRaw: '0.896',
      capacityStatus: 'Ready',
      availableCapacity: '4,800 places',
      roadDist: '0.4 km',
      waterDist: '0.6 km',
      healthcareDist: '2.8 km',
      landAvailability: 'High (Engineered Residential Layout)',
      coords: '30.380°N, 78.480°E',
      terrainSlope: '6° - 10° (Pre-graded Terrace)',
      waterSource: 'Bhagirathi Piped Line',
      roadAccessType: 'Chamba-Tehri Arterial Road',
      healthcareFacility: 'New Tehri District Hospital',
      relocationFeasibility: 'Complete Municipal Housing Blocks Ready for Instant Allotment',
      dossierDetails: {
        siteId: 'RELOC-TEH-01',
        elevation: '1,550 m AMSL',
        waterDischarge: '480 LPM reservoir pipeline',
        soilType: 'Engineered Compacted Fill',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Kirtinagar',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '84.8 / 100',
      ahpRaw: '0.848',
      capacityStatus: 'Ready',
      availableCapacity: '8,400 places',
      roadDist: '0.6 km',
      waterDist: '0.8 km',
      healthcareDist: '3.5 km',
      landAvailability: 'High (Valley Terrace)',
      coords: '30.170°N, 78.750°E',
      terrainSlope: '7° - 10° (River Fluvial Terrace)',
      waterSource: 'Riverbank Infiltration Well',
      roadAccessType: 'NH-58 Bypass Link',
      healthcareFacility: 'Sub-divisional Primary Health Center',
      relocationFeasibility: 'Ample Physical Land Area • High Agrarian Potential',
      dossierDetails: {
        siteId: 'RELOC-KIR-02',
        elevation: '580 m AMSL',
        waterDischarge: '510 LPM river infiltration',
        soilType: 'Compacted Alluvial Gravels',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Chamoli Outskirts (Bairangana)',
      isTopPick: false,
      zone: 'Yellow Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '78.2 / 100',
      ahpRaw: '0.782',
      capacityStatus: 'Ready',
      availableCapacity: '5,600 places',
      roadDist: '0.8 km',
      waterDist: '1.0 km',
      healthcareDist: '2.5 km',
      landAvailability: 'Medium (Terraced Shelf)',
      coords: '30.410°N, 79.330°E',
      terrainSlope: '7° - 11° (Stable Sandstone)',
      waterSource: 'Balkhila Nadi Catchment Line',
      roadAccessType: 'Gopeshwar-Chamoli Bypass',
      healthcareFacility: 'District Hospital Gopeshwar',
      relocationFeasibility: 'High Civic Amenities • Accessible Hill Farming Ground',
      dossierDetails: {
        siteId: 'RELOC-CHA-03',
        elevation: '1,050 m AMSL',
        waterDischarge: '410 LPM gravity feeder',
        soilType: 'Massive Quartz Sandstone',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ],

  // Default / Fallback for other villages
  'DEFAULT': [
    {
      rank: 'Rank 01',
      rankNum: '01',
      name: 'Kirtinagar Safe Valley Sector',
      isTopPick: true,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '89.2 / 100',
      ahpRaw: '0.892',
      capacityStatus: 'Ready',
      availableCapacity: '8,400 places',
      roadDist: '0.5 km',
      waterDist: '0.6 km',
      healthcareDist: '2.2 km',
      landAvailability: 'High (Valley Terrace)',
      coords: '30.170°N, 78.750°E',
      terrainSlope: '6° - 9° (Alluvial Stable Bench)',
      waterSource: 'Riverbank Infiltration System',
      roadAccessType: 'NH-58 Bypass Arterial',
      healthcareFacility: 'Kirtinagar Sub-divisional Hospital',
      relocationFeasibility: 'Optimal Regional Settlement • Abundant Water & Infrastructure',
      dossierDetails: {
        siteId: 'RELOC-KIR-GEN',
        elevation: '580 m AMSL',
        waterDischarge: '520 LPM continuous discharge',
        soilType: 'Compacted Gravelly Sand',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 02',
      rankNum: '02',
      name: 'Srinagar (Garhwal) Outskirts',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '85.4 / 100',
      ahpRaw: '0.854',
      capacityStatus: 'Ready',
      availableCapacity: '5,500 places',
      roadDist: '0.3 km',
      waterDist: '0.5 km',
      healthcareDist: '1.5 km',
      landAvailability: 'High (Expansive Plateau)',
      coords: '30.222°N, 78.780°E',
      terrainSlope: '8° - 12° (Stable Bedrock)',
      waterSource: 'Alaknanda Perennial Lift Basin',
      roadAccessType: 'NH-58 4-Lane Paved Highway',
      healthcareFacility: 'Government Base Hospital (150-bed)',
      relocationFeasibility: 'High Urban Connectivity & Educational/Medical Base',
      dossierDetails: {
        siteId: 'RELOC-SRI-GEN',
        elevation: '560 m AMSL',
        waterDischarge: '450 LPM gravity line',
        soilType: 'Quartzite & Phyllite bed',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    },
    {
      rank: 'Rank 03',
      rankNum: '03',
      name: 'Gauchar Plateau Sector B',
      isTopPick: false,
      zone: 'Green Zone',
      status: 'Ready',
      statusType: 'ready',
      ahpScore: '81.7 / 100',
      ahpRaw: '0.817',
      capacityStatus: 'Ready',
      availableCapacity: '9,500 places',
      roadDist: '0.6 km',
      waterDist: '1.0 km',
      healthcareDist: '2.2 km',
      landAvailability: 'High (Airfield Bench)',
      coords: '30.275°N, 79.318°E',
      terrainSlope: '5° - 8° (Flat River Terrace)',
      waterSource: 'Alaknanda Gravity Intake',
      roadAccessType: 'National Highway 07 Link',
      healthcareFacility: 'Gauchar Community Health Centre',
      relocationFeasibility: 'Large Open Carrying Capacity • Immediate Camp Deployment Feasible',
      dossierDetails: {
        siteId: 'RELOC-GAU-GEN',
        elevation: '820 m AMSL',
        waterDischarge: '600 LPM municipal pipeline',
        soilType: 'Stable Calcareous Conglomerate',
        ndmaCompliance: '100% compliant (Category 1 Safe Ground)'
      }
    }
  ]
};

export default function SiteComparisonView() {
  const [selectedVillageId, setSelectedVillageId] = useState('V-01');
  const [activeDossierModal, setActiveDossierModal] = useState(null);

  const selectedVillage =
    VILLAGES_LIST.find((v) => v.id === selectedVillageId) || VILLAGES_LIST[0];

  const currentComparisonCandidates =
    VILLAGE_COMPARISONS_MAP[selectedVillageId] || VILLAGE_COMPARISONS_MAP['DEFAULT'];

  return (
    <div className="sc-page-container">
      {/* 1. Page Header */}
      <div className="sc-page-header">
        <div className="sc-header-text-col">
          <span className="sc-eyebrow-tag">
            COMPARISON DESK &nbsp;•&nbsp; ML DEMAND & AHP RANKS
          </span>
          <h1 className="sc-main-title">Candidate Site Comparison</h1>
          <p className="sc-desc-para">
            Side-by-side comparison of leading candidate sites against ML relocation demand, road access, water distance, healthcare proximity, and verified carrying capacity.
          </p>
        </div>
        <div className="sc-header-badge-col">
          <span className="sc-counter-badge">3 sites compared</span>
        </div>
      </div>

      {/* 2. Source Village Selector Card */}
      <div className="sc-selector-card">
        <div className="sc-selector-left">
          <label className="sc-field-lbl" htmlFor="sc-village-select">SOURCE VILLAGE</label>
          <div className="sc-select-wrap">
            <select
              id="sc-village-select"
              className="sc-village-dropdown"
              value={selectedVillageId}
              onChange={(e) => setSelectedVillageId(e.target.value)}
            >
              {VILLAGES_LIST.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} · {v.urgency}
                </option>
              ))}
            </select>
            <div className="sc-select-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="sc-selector-right">
          <p className="sc-demand-note">
            Evaluating candidate relocation sites for <strong>{selectedVillage.name}</strong> against ML estimated demand of <strong>{selectedVillage.demand}</strong> ({selectedVillage.residents} residents).
          </p>
        </div>
      </div>

      {/* 3. Comparison Matrix Card */}
      <div className="sc-matrix-card">
        {/* Matrix Header */}
        <div className="sc-matrix-header">
          <div className="sc-matrix-title-col">
            <div className="sc-matrix-title-row">
              <div className="sc-matrix-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                  <path d="M7 21h10" />
                  <path d="M12 3v18" />
                  <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
                </svg>
              </div>
              <div>
                <span className="sc-matrix-eyebrow">TOP RANKED RELOCATION CANDIDATES</span>
                <h3 className="sc-matrix-main-heading">{selectedVillage.name} Relocation Matrix</h3>
              </div>
            </div>
          </div>

          <div className="sc-matrix-verified-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2F5941" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>AHP Multi-Criteria Model Verified</span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="sc-table-container">
          <table className="sc-matrix-table">
            <thead>
              <tr>
                <th className="sc-th-metric">
                  <div className="sc-metric-hdr-wrap">
                    <span className="sc-th-primary">EVALUATION METRIC</span>
                    <span className="sc-th-secondary">Multi-Criteria Baseline</span>
                  </div>
                </th>
                {currentComparisonCandidates.map((c) => (
                  <th key={c.rankNum} className="sc-th-candidate">
                    <div className="sc-candidate-hdr-box">
                      <div className="sc-cand-top-line">
                        <span className="sc-cand-rank font-mono">{c.rank}</span>
                        {c.isTopPick && (
                          <span className="sc-cand-top-pick">TOP PICK</span>
                        )}
                      </div>
                      <h4 className="sc-cand-name">{c.name}</h4>
                      <div className="sc-cand-pills">
                        <span className="sc-pill-zone">{c.zone}</span>
                        <span className={`sc-pill-cap cap-${c.statusType}`}>{c.status}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row 1: AHP Suitability Score */}
              <tr className="sc-row">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">AHP Suitability Score</span>
                  <span className="sc-lbl-desc">Composite decision weight (100 Max)</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-value">
                    <span className="sc-val-score font-mono">{c.ahpScore}</span>
                  </td>
                ))}
              </tr>

              {/* Row 2: Carrying Capacity Status */}
              <tr className="sc-row">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">Carrying Capacity Status</span>
                  <span className="sc-lbl-desc">Relocation feasibility threshold</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-value">
                    <span className={`sc-val-status font-mono status-${c.statusType}`}>
                      {c.capacityStatus}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 3: Available Capacity */}
              <tr className="sc-row">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">Available Capacity</span>
                  <span className="sc-lbl-desc">Carrying intake capacity</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-value font-mono">
                    <span className="sc-val-text font-mono">{c.availableCapacity}</span>
                  </td>
                ))}
              </tr>

              {/* Row 4: Distance to Road */}
              <tr className="sc-row">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">Distance to Road</span>
                  <span className="sc-lbl-desc">Primary vehicular access link</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-value font-mono">
                    <span className="sc-val-text font-mono">{c.roadDist}</span>
                  </td>
                ))}
              </tr>

              {/* Row 5: Distance to Water Source */}
              <tr className="sc-row">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">Distance to Water Source</span>
                  <span className="sc-lbl-desc">Potable supply / catchment access</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-value font-mono">
                    <span className="sc-val-text font-mono">{c.waterDist}</span>
                  </td>
                ))}
              </tr>

              {/* Row 6: Distance to Healthcare */}
              <tr className="sc-row">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">Distance to Healthcare</span>
                  <span className="sc-lbl-desc">Community or district hospital</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-value font-mono">
                    <span className="sc-val-text font-mono">{c.healthcareDist}</span>
                  </td>
                ))}
              </tr>

              {/* Row 7: Action / View Dossier */}
              <tr className="sc-row sc-row-actions">
                <td className="sc-td-label">
                  <span className="sc-lbl-title">Full Relocation Dossier</span>
                  <span className="sc-lbl-desc">Technical engineering specs & NDMA log</span>
                </td>
                {currentComparisonCandidates.map((c) => (
                  <td key={c.rankNum} className="sc-td-action">
                    <button
                      type="button"
                      className="sc-btn-view-dossier"
                      onClick={() => setActiveDossierModal(c)}
                    >
                      <span>View Dossier</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dossier Modal Popup */}
      {activeDossierModal && (
        <div className="sc-modal-backdrop" onClick={() => setActiveDossierModal(null)}>
          <div className="sc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="sc-modal-head">
              <div>
                <span className="sc-modal-eyebrow">CANDIDATE SAFE SITE DOSSIER • {activeDossierModal.dossierDetails.siteId}</span>
                <h3 className="sc-modal-title">{activeDossierModal.name}</h3>
              </div>
              <button
                type="button"
                className="sc-modal-close"
                onClick={() => setActiveDossierModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="sc-modal-body">
              <div className="sc-dossier-grid">
                <div className="sc-dos-item">
                  <span className="sc-dos-lbl">AHP SUITABILITY SCORE</span>
                  <span className="sc-dos-val font-mono">{activeDossierModal.ahpScore} ({activeDossierModal.ahpRaw})</span>
                </div>
                <div className="sc-dos-item">
                  <span className="sc-dos-lbl">TERRAIN SLOPE & GEOLOGY</span>
                  <span className="sc-dos-val">{activeDossierModal.terrainSlope}</span>
                </div>
                <div className="sc-dos-item">
                  <span className="sc-dos-lbl">WATER INFRASTRUCTURE</span>
                  <span className="sc-dos-val">{activeDossierModal.waterSource} ({activeDossierModal.dossierDetails.waterDischarge})</span>
                </div>
                <div className="sc-dos-item">
                  <span className="sc-dos-lbl">ROAD & ACCESS CONNECTIVITY</span>
                  <span className="sc-dos-val">{activeDossierModal.roadAccessType} ({activeDossierModal.roadDist})</span>
                </div>
                <div className="sc-dos-item">
                  <span className="sc-dos-lbl">HEALTHCARE FACILITY</span>
                  <span className="sc-dos-val">{activeDossierModal.healthcareFacility} ({activeDossierModal.healthcareDist})</span>
                </div>
                <div className="sc-dos-item">
                  <span className="sc-dos-lbl">NDMA REGULATORY STATUS</span>
                  <span className="sc-dos-val text-green font-bold">{activeDossierModal.dossierDetails.ndmaCompliance}</span>
                </div>
              </div>

              <div className="sc-modal-feasibility-box">
                <span className="sc-fea-title">OPERATIONAL RECOMMENDATION:</span>
                <p>{activeDossierModal.relocationFeasibility}</p>
              </div>
            </div>

            <div className="sc-modal-footer">
              <button
                type="button"
                className="sc-btn-modal-close"
                onClick={() => setActiveDossierModal(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
