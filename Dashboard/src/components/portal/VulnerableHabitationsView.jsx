import React, { useState, useMemo } from 'react';

const VILLAGES_DATA = [
  {
    id: 'V001',
    name: 'Joshimath',
    avatar: 'J',
    coords: '30.555°N / 79.565°E',
    incidents: 1,
    zone: 'Red',
    population: '16,709',
    popNum: 16709,
    households: '3,800 hh',
    mlProb: '89.3%',
    mlProbNum: 89.3,
    mlType: 'Creep/Subsidence',
    estDemand: '~850 fams',
    estDemandNum: 851,
    priorityScore: '1.0',
    priorityScoreNum: 1.0,
    priorityLevel: 'Immediate',
    finalRiskScore: '97.7%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (92.3%) = 0.977',
    householdDensity: '4.4 persons/hh',
    lat: '30.5548°N',
    lng: '79.5651°E',
    facilities: [
      { name: 'Base Hospital Joshimath', type: 'HOSPITAL', meta: '30.55°N' },
      { name: 'Govt Degree College Joshimath', type: 'SCHOOL', meta: '0.06 km' },
      { name: 'Vishnuprayag Water Source', type: 'WATER SOURCE', meta: '1.78 km' },
      { name: 'Govt Inter College Gopeshwar', type: 'SCHOOL', meta: '28.46 km' },
      { name: 'Community Health Centre Gopeshwar', type: 'HOSPITAL', meta: '28.53 km' },
      { name: 'Community Water Tank Gopeshwar', type: 'WATER SOURCE', meta: '28.6 km' },
      { name: 'Govt Inter College Chamoli', type: 'SCHOOL', meta: '29.05 km' },
      { name: 'Govt Primary School Pipalkoti', type: 'SCHOOL', meta: '30.39 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Srinagar (Garhwal) Outskirts', tag: 'Top Recommendation', capacity: 'Capacity: Insufficient', score: '88.0%', zone: 'Green Zone', dist: '48.2 km' },
      { rank: '02', name: 'Gauchar Plateau Sector B', tag: 'High Feasibility', capacity: 'Capacity: Limited', score: '84.6%', zone: 'Green Zone', dist: '36.5 km' },
      { rank: '03', name: 'Simli Buffer Zone', tag: 'Candidate Site', capacity: 'Capacity: Limited', score: '79.2%', zone: 'Yellow Zone', dist: '29.1 km' }
    ]
  },
  {
    id: 'V002',
    name: 'Kedarnath (Rambara belt)',
    avatar: 'K',
    coords: '30.735°N / 79.067°E',
    incidents: 1,
    zone: 'Red',
    population: '450',
    popNum: 450,
    households: '126 hh',
    mlProb: '84.8%',
    mlProbNum: 84.8,
    mlType: 'Debris Flow',
    estDemand: '~86 fams',
    estDemandNum: 86,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Short-term',
    finalRiskScore: '95.4%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (84.8%) = 0.954',
    householdDensity: '3.6 persons/hh',
    lat: '30.7350°N',
    lng: '79.0670°E',
    facilities: [
      { name: 'Kedarnath Emergency Aid Post', type: 'HOSPITAL', meta: '0.8 km' },
      { name: 'Govt Higher Secondary Guptkashi', type: 'SCHOOL', meta: '22.4 km' },
      { name: 'Mandakini River Intake Point', type: 'WATER SOURCE', meta: '1.2 km' },
      { name: 'Sonprayag Medical Dispensary', type: 'HOSPITAL', meta: '14.5 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Guptkashi South Ridge Plateau', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '87.4%', zone: 'Green Zone', dist: '18.5 km' },
      { rank: '02', name: 'Agastyamuni Terrace Sector 1', tag: 'High Feasibility', capacity: 'Capacity: Ready', score: '83.1%', zone: 'Green Zone', dist: '31.2 km' }
    ]
  },
  {
    id: 'V003',
    name: 'Gaurikund',
    avatar: 'G',
    coords: '30.609°N / 79.028°E',
    incidents: 1,
    zone: 'Red',
    population: '600',
    popNum: 600,
    households: '150 hh',
    mlProb: '82.4%',
    mlProbNum: 82.4,
    mlType: 'Debris Flow',
    estDemand: '~86 fams',
    estDemandNum: 86,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Short-term',
    finalRiskScore: '94.7%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (82.4%) = 0.947',
    householdDensity: '4.0 persons/hh',
    lat: '30.6090°N',
    lng: '79.0280°E',
    facilities: [
      { name: 'Gaurikund Primary Health Post', type: 'HOSPITAL', meta: '0.2 km' },
      { name: 'Govt High School Sonprayag', type: 'SCHOOL', meta: '4.8 km' },
      { name: 'Thermal Spring Water Reservoir', type: 'WATER SOURCE', meta: '0.5 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Triyuginarayan Safe Bench', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '86.2%', zone: 'Green Zone', dist: '12.0 km' }
    ]
  },
  {
    id: 'V004',
    name: 'Sonprayag',
    avatar: 'S',
    coords: '30.604°N / 78.650°E',
    incidents: 1,
    zone: 'Red',
    population: '1,200',
    popNum: 1200,
    households: '280 hh',
    mlProb: '79.8%',
    mlProbNum: 79.8,
    mlType: 'Rotational Slide',
    estDemand: '~130 fams',
    estDemandNum: 130,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Short-term',
    finalRiskScore: '93.8%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (79.8%) = 0.938',
    householdDensity: '4.3 persons/hh',
    lat: '30.6040°N',
    lng: '78.6500°E',
    facilities: [
      { name: 'Sonprayag Community Clinic', type: 'HOSPITAL', meta: '0.4 km' },
      { name: 'Govt Inter College Kund', type: 'SCHOOL', meta: '11.2 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Kund Upper Terrace Safe Zone', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '85.7%', zone: 'Green Zone', dist: '9.4 km' }
    ]
  },
  {
    id: 'V005',
    name: 'Rudraprayag Town',
    avatar: 'R',
    coords: '30.286°N / 78.981°E',
    incidents: 0,
    zone: 'Yellow',
    population: '5,500',
    popNum: 5500,
    households: '1,200 hh',
    mlProb: '34.5%',
    mlProbNum: 34.5,
    mlType: 'Rotational Slide',
    estDemand: '~46 fams',
    estDemandNum: 46,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Medium-term',
    finalRiskScore: '48.2%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (34.5%) = 0.482',
    householdDensity: '4.6 persons/hh',
    lat: '30.2860°N',
    lng: '78.9810°E',
    facilities: [
      { name: 'District Hospital Rudraprayag', type: 'HOSPITAL', meta: '1.1 km' },
      { name: 'Govt Degree College Rudraprayag', type: 'SCHOOL', meta: '2.4 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Srinagar North Expansion Zone', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '91.0%', zone: 'Green Zone', dist: '24.0 km' }
    ]
  },
  {
    id: 'V006',
    name: 'Agastyamuni',
    avatar: 'A',
    coords: '30.417°N / 79.000°E',
    incidents: 0,
    zone: 'Yellow',
    population: '4,200',
    popNum: 4200,
    households: '966 hh',
    mlProb: '32.0%',
    mlProbNum: 32.0,
    mlType: 'Rotational Slide',
    estDemand: '~30 fams',
    estDemandNum: 30,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Monitor',
    finalRiskScore: '41.5%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (32.0%) = 0.415',
    householdDensity: '4.3 persons/hh',
    lat: '30.4170°N',
    lng: '79.0000°E',
    facilities: [
      { name: 'Agastyamuni Community Health Centre', type: 'HOSPITAL', meta: '0.6 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Agastyamuni South Airstrip Ground', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '89.5%', zone: 'Green Zone', dist: '3.2 km' }
    ]
  },
  {
    id: 'V007',
    name: 'Chamoli Town',
    avatar: 'C',
    coords: '30.400°N / 79.320°E',
    incidents: 0,
    zone: 'Yellow',
    population: '3,900',
    popNum: 3900,
    households: '886 hh',
    mlProb: '36.0%',
    mlProbNum: 36.0,
    mlType: 'Rotational Slide',
    estDemand: '~30 fams',
    estDemandNum: 30,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Monitor',
    finalRiskScore: '43.0%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (36.0%) = 0.430',
    householdDensity: '4.4 persons/hh',
    lat: '30.4000°N',
    lng: '79.3200°E',
    facilities: [
      { name: 'Govt Inter College Chamoli', type: 'SCHOOL', meta: '0.5 km' },
      { name: 'Chamoli Town Water Works', type: 'WATER SOURCE', meta: '1.2 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Gopeshwar North Safe Ridge', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '88.1%', zone: 'Green Zone', dist: '7.8 km' }
    ]
  },
  {
    id: 'V008',
    name: 'Gopeshwar',
    avatar: 'G',
    coords: '30.382°N / 79.336°E',
    incidents: 0,
    zone: 'Yellow',
    population: '10,800',
    popNum: 10800,
    households: '2,400 hh',
    mlProb: '30.3%',
    mlProbNum: 30.3,
    mlType: 'Rock Fall',
    estDemand: '~49 fams',
    estDemandNum: 49,
    priorityScore: '0.4',
    priorityScoreNum: 0.4,
    priorityLevel: 'Medium-term',
    finalRiskScore: '45.8%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (30.3%) = 0.458',
    householdDensity: '4.5 persons/hh',
    lat: '30.3820°N',
    lng: '79.3360°E',
    facilities: [
      { name: 'District Hospital Gopeshwar', type: 'HOSPITAL', meta: '0.8 km' },
      { name: 'Govt PG College Gopeshwar', type: 'SCHOOL', meta: '1.5 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Gopeshwar East Tableland', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '90.2%', zone: 'Green Zone', dist: '4.5 km' }
    ]
  },
  {
    id: 'V009',
    name: 'Tapovan',
    avatar: 'T',
    coords: '30.600°N / 79.630°E',
    incidents: 1,
    zone: 'Red',
    population: '2,100',
    popNum: 2100,
    households: '480 hh',
    mlProb: '87.6%',
    mlProbNum: 87.6,
    mlType: 'Debris Flow',
    estDemand: '~210 fams',
    estDemandNum: 210,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Immediate',
    finalRiskScore: '96.3%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (87.6%) = 0.963',
    householdDensity: '4.4 persons/hh',
    lat: '30.6000°N',
    lng: '79.6300°E',
    facilities: [
      { name: 'Tapovan Sub-Centre Clinic', type: 'HOSPITAL', meta: '0.3 km' },
      { name: 'Dhauliganga Intake Station', type: 'WATER SOURCE', meta: '1.1 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Gauchar Plateau Sector B', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '86.5%', zone: 'Green Zone', dist: '42.0 km' }
    ]
  },
  {
    id: 'V010',
    name: 'Pipalkoti',
    avatar: 'P',
    coords: '30.200°N / 79.461°E',
    incidents: 0,
    zone: 'Yellow',
    population: '3,200',
    popNum: 3200,
    households: '720 hh',
    mlProb: '38.5%',
    mlProbNum: 38.5,
    mlType: 'Rotational Slide',
    estDemand: '~30 fams',
    estDemandNum: 30,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Monitor',
    finalRiskScore: '42.0%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (38.5%) = 0.420',
    householdDensity: '4.4 persons/hh',
    lat: '30.2000°N',
    lng: '79.4610°E',
    facilities: [
      { name: 'Govt Primary School Pipalkoti', type: 'SCHOOL', meta: '0.2 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Chamoli Southern Terrace', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '88.3%', zone: 'Green Zone', dist: '14.2 km' }
    ]
  },
  {
    id: 'V011',
    name: 'Karnaprayag',
    avatar: 'K',
    coords: '30.266°N / 79.216°E',
    incidents: 0,
    zone: 'Yellow',
    population: '7,300',
    popNum: 7300,
    households: '1,650 hh',
    mlProb: '36.0%',
    mlProbNum: 36.0,
    mlType: 'Rotational Slide',
    estDemand: '~57 fams',
    estDemandNum: 57,
    priorityScore: '0.3',
    priorityScoreNum: 0.3,
    priorityLevel: 'Medium-term',
    finalRiskScore: '46.5%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (36.0%) = 0.465',
    householdDensity: '4.4 persons/hh',
    lat: '30.2660°N',
    lng: '79.2160°E',
    facilities: [
      { name: 'Sub-District Hospital Karnaprayag', type: 'HOSPITAL', meta: '0.7 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Simli Buffer Zone Plateau', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '89.0%', zone: 'Green Zone', dist: '6.5 km' }
    ]
  },
  {
    id: 'V012',
    name: 'Nandprayag',
    avatar: 'N',
    coords: '30.328°N / 79.318°E',
    incidents: 0,
    zone: 'Yellow',
    population: '1,500',
    popNum: 1500,
    households: '340 hh',
    mlProb: '37.1%',
    mlProbNum: 37.1,
    mlType: 'Rotational Slide',
    estDemand: '~30 fams',
    estDemandNum: 30,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Monitor',
    finalRiskScore: '40.8%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (37.1%) = 0.408',
    householdDensity: '4.4 persons/hh',
    lat: '30.3280°N',
    lng: '79.3180°E',
    facilities: [
      { name: 'Nandprayag Primary Health Post', type: 'HOSPITAL', meta: '0.4 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Chamoli Upper Safe Bench', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '87.0%', zone: 'Green Zone', dist: '8.1 km' }
    ]
  },
  {
    id: 'V013',
    name: 'Guptkashi',
    avatar: 'G',
    coords: '30.530°N / 79.080°E',
    incidents: 0,
    zone: 'Yellow',
    population: '3,660',
    popNum: 3660,
    households: '820 hh',
    mlProb: '33.4%',
    mlProbNum: 33.4,
    mlType: 'Rotational Slide',
    estDemand: '~31 fams',
    estDemandNum: 31,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Monitor',
    finalRiskScore: '42.6%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (33.4%) = 0.426',
    householdDensity: '4.5 persons/hh',
    lat: '30.5300°N',
    lng: '79.0800°E',
    facilities: [
      { name: 'Guptkashi Community Health Center', type: 'HOSPITAL', meta: '0.6 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Agastyamuni North Terrace', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '88.4%', zone: 'Green Zone', dist: '16.2 km' }
    ]
  },
  {
    id: 'V014',
    name: 'Ukhimath',
    avatar: 'U',
    coords: '30.580°N / 79.100°E',
    incidents: 0,
    zone: 'Yellow',
    population: '2,800',
    popNum: 2800,
    households: '630 hh',
    mlProb: '34.3%',
    mlProbNum: 34.3,
    mlType: 'Rotational Slide',
    estDemand: '~30 fams',
    estDemandNum: 30,
    priorityScore: '0.2',
    priorityScoreNum: 0.2,
    priorityLevel: 'Monitor',
    finalRiskScore: '41.9%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (34.3%) = 0.419',
    householdDensity: '4.4 persons/hh',
    lat: '30.5800°N',
    lng: '79.1000°E',
    facilities: [
      { name: 'Govt Higher Secondary Ukhimath', type: 'SCHOOL', meta: '0.5 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Rudraprayag East Plateau', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '87.9%', zone: 'Green Zone', dist: '22.0 km' }
    ]
  },
  {
    id: 'V015',
    name: 'Devprayag',
    avatar: 'D',
    coords: '30.140°N / 78.598°E',
    incidents: 0,
    zone: 'Green',
    population: '3,360',
    popNum: 3360,
    households: '756 hh',
    mlProb: '24.5%',
    mlProbNum: 24.5,
    mlType: 'Rock Fall',
    estDemand: '~29 fams',
    estDemandNum: 29,
    priorityScore: '0.1',
    priorityScoreNum: 0.1,
    priorityLevel: 'Monitor',
    finalRiskScore: '26.4%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Low) + 0.30 × ML Landslide Probability (24.5%) = 0.264',
    householdDensity: '4.4 persons/hh',
    lat: '30.1400°N',
    lng: '78.5980°E',
    facilities: [
      { name: 'Devprayag Govt Hospital', type: 'HOSPITAL', meta: '0.8 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Rishikesh High Plateau', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '94.2%', zone: 'Green Zone', dist: '32.0 km' }
    ]
  },
  {
    id: 'V016',
    name: 'Chopta',
    avatar: 'C',
    coords: '30.460°N / 79.180°E',
    incidents: 1,
    zone: 'Red',
    population: '300',
    popNum: 300,
    households: '70 hh',
    mlProb: '80.8%',
    mlProbNum: 80.8,
    mlType: 'Rock Fall',
    estDemand: '~31 fams',
    estDemandNum: 31,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Short-term',
    finalRiskScore: '92.1%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (80.8%) = 0.921',
    householdDensity: '4.3 persons/hh',
    lat: '30.4600°N',
    lng: '79.1800°E',
    facilities: [
      { name: 'Chopta Forest Ranger Health Post', type: 'HOSPITAL', meta: '0.4 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Mandal South Plateau', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '86.0%', zone: 'Green Zone', dist: '8.4 km' }
    ]
  },
  {
    id: 'V017',
    name: 'Mandal',
    avatar: 'M',
    coords: '30.470°N / 79.210°E',
    incidents: 0,
    zone: 'Yellow',
    population: '900',
    popNum: 900,
    households: '206 hh',
    mlProb: '33.3%',
    mlProbNum: 33.3,
    mlType: 'Rotational Slide',
    estDemand: '~30 fams',
    estDemandNum: 30,
    priorityScore: '0.1',
    priorityScoreNum: 0.1,
    priorityLevel: 'Monitor',
    finalRiskScore: '38.5%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (Medium) + 0.30 × ML Landslide Probability (33.3%) = 0.385',
    householdDensity: '4.4 persons/hh',
    lat: '30.4700°N',
    lng: '79.2100°E',
    facilities: [
      { name: 'Mandal Govt Primary School', type: 'SCHOOL', meta: '0.3 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Gopeshwar North Tableland', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '88.8%', zone: 'Green Zone', dist: '11.0 km' }
    ]
  },
  {
    id: 'V018',
    name: 'Helang',
    avatar: 'H',
    coords: '30.570°N / 79.560°E',
    incidents: 1,
    zone: 'Red',
    population: '1,160',
    popNum: 1160,
    households: '266 hh',
    mlProb: '82.4%',
    mlProbNum: 82.4,
    mlType: 'Debris Flow',
    estDemand: '~113 fams',
    estDemandNum: 113,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Short-term',
    finalRiskScore: '94.7%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (82.4%) = 0.947',
    householdDensity: '4.4 persons/hh',
    lat: '30.5700°N',
    lng: '79.5600°E',
    facilities: [
      { name: 'Helang Emergency Aid Station', type: 'HOSPITAL', meta: '0.5 km' },
      { name: 'Alaknanda Hydro Intake', type: 'WATER SOURCE', meta: '1.4 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Pipalkoti North Terrace', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '87.2%', zone: 'Green Zone', dist: '18.0 km' }
    ]
  },
  {
    id: 'V019',
    name: 'Pandukeshwar',
    avatar: 'P',
    coords: '30.635°N / 79.580°E',
    incidents: 1,
    zone: 'Red',
    population: '700',
    popNum: 700,
    households: '160 hh',
    mlProb: '85.0%',
    mlProbNum: 85.0,
    mlType: 'Rock Fall',
    estDemand: '~75 fams',
    estDemandNum: 75,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Short-term',
    finalRiskScore: '95.4%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (85.0%) = 0.954',
    householdDensity: '4.4 persons/hh',
    lat: '30.6350°N',
    lng: '79.5800°E',
    facilities: [
      { name: 'Pandukeshwar Aid Clinic', type: 'HOSPITAL', meta: '0.3 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Joshimath Lower Safe Shelf', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '85.0%', zone: 'Green Zone', dist: '14.0 km' }
    ]
  },
  {
    id: 'V020',
    name: 'Badrinath Base Zone',
    avatar: 'B',
    coords: '30.743°N / 79.493°E',
    incidents: 1,
    zone: 'Red',
    population: '950',
    popNum: 950,
    households: '220 hh',
    mlProb: '86.2%',
    mlProbNum: 86.2,
    mlType: 'Avalanche / Debris',
    estDemand: '~95 fams',
    estDemandNum: 95,
    priorityScore: '0.6',
    priorityScoreNum: 0.6,
    priorityLevel: 'Immediate',
    finalRiskScore: '95.9%',
    riskFormula: 'Final Hazard Score = 0.70 × Deterministic Base (High + 1 inc) + 0.30 × ML Landslide Probability (86.2%) = 0.959',
    householdDensity: '4.3 persons/hh',
    lat: '30.7430°N',
    lng: '79.4930°E',
    facilities: [
      { name: 'Badrinath Govt Hospital', type: 'HOSPITAL', meta: '0.5 km' }
    ],
    safeSites: [
      { rank: '01', name: 'Mana Safe Plateau', tag: 'Top Recommendation', capacity: 'Capacity: Ready', score: '86.8%', zone: 'Green Zone', dist: '4.2 km' }
    ]
  }
];

export default function VulnerableHabitationsView() {
  const [currentView, setCurrentView] = useState('list'); // 'list' | 'detail' | 'safesites'
  const [selectedVillageId, setSelectedVillageId] = useState('V001');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const selectedVillage = useMemo(() => {
    return VILLAGES_DATA.find(v => v.id === selectedVillageId) || VILLAGES_DATA[0];
  }, [selectedVillageId]);

  const filteredVillages = useMemo(() => {
    return VILLAGES_DATA.filter(v => {
      const matchSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.coords.toLowerCase().includes(searchTerm.toLowerCase());
      const matchZone = zoneFilter === 'all' || v.zone.toLowerCase() === zoneFilter.toLowerCase();
      const matchPriority = priorityFilter === 'all' || v.priorityLevel.toLowerCase() === priorityFilter.toLowerCase();
      return matchSearch && matchZone && matchPriority;
    });
  }, [searchTerm, zoneFilter, priorityFilter]);

  const openVillageDetail = (id) => {
    setSelectedVillageId(id);
    setCurrentView('detail');
  };

  const openSafeSites = () => {
    setCurrentView('safesites');
  };

  /* ==========================================================
     VIEW 3: SAFE RELOCATION SITES (Image 3)
     ========================================================== */
  if (currentView === 'safesites') {
    return (
      <div className="vh-page-container">
        {/* Top Back Nav */}
        <div className="vh-back-nav-row">
          <button
            type="button"
            className="vh-back-btn"
            onClick={() => setCurrentView('detail')}
          >
            ← Back to Village Assessment
          </button>
        </div>

        {/* Header */}
        <div className="vh-page-header">
          <div className="vh-header-text-col">
            <span className="vh-eyebrow-tag">DECISION WORKFLOW &nbsp;•&nbsp; ML DEMAND → CAPACITY → AHP RANKING</span>
            <h1 className="vh-main-title">Safe Relocation Sites for {selectedVillage.name}</h1>
            <p className="vh-desc-para">
              Transparent multi-stage site recommendation: ML estimates relocation demand, carrying capacity filters viable ground, and explainable AHP ranks site suitability.
            </p>
          </div>
          <div className="vh-header-badge-col">
            <span className="vh-counter-badge">10 candidate sites</span>
          </div>
        </div>

        {/* Pipeline 4-Steps Row */}
        <div className="vh-pipeline-box">
          <span className="vh-pipeline-eyebrow">RELOCATION DECISION PIPELINE</span>
          <div className="vh-pipeline-steps-grid">
            <div className="vh-step-card step-active">
              <span className="vh-step-lbl">1. ML DEMAND</span>
              <span className="vh-step-val">{selectedVillage.estDemand.replace('fams', 'Families')}</span>
            </div>
            <div className="vh-step-card">
              <span className="vh-step-lbl">2. REQUIRED CAP</span>
              <span className="vh-step-val">{selectedVillage.population} People</span>
            </div>
            <div className="vh-step-card">
              <span className="vh-step-lbl">3. CAPACITY CHECK</span>
              <span className="vh-step-val">0 Ready &nbsp;•&nbsp; 3 Lim</span>
            </div>
            <div className="vh-step-card">
              <span className="vh-step-lbl">4. AHP SUITABILITY</span>
              <span className="vh-step-val">#1 Srinagar (Garhwal) Outskirts</span>
            </div>
          </div>
        </div>

        {/* 2-Card Row: Relocation Demand & AHP Formula */}
        <div className="vh-demand-formula-grid">
          {/* Left Dark Green Card */}
          <div className="vh-demand-olive-card">
            <div className="vh-doc-card-head">
              <span className="vh-card-eyebrow text-olive-light">RELOCATION DEMAND</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-olive-light">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </div>
            <h2 className="vh-demand-village-name">{selectedVillage.name}</h2>
            <div className="vh-demand-metrics-3col">
              <div className="vh-dm-item">
                <span className="vh-dm-lbl">ML EST. FAMILIES</span>
                <span className="vh-dm-val">{selectedVillage.estDemand.replace('fams', '')}</span>
              </div>
              <div className="vh-dm-item">
                <span className="vh-dm-lbl">TOTAL RESIDENTS</span>
                <span className="vh-dm-val">{selectedVillage.population}</span>
              </div>
              <div className="vh-dm-item">
                <span className="vh-dm-lbl">FINAL HAZARD</span>
                <span className="vh-dm-val">{selectedVillage.mlProb}</span>
              </div>
            </div>
          </div>

          {/* Right Formula Card */}
          <div className="vh-formula-white-card">
            <div className="vh-doc-card-head">
              <span className="vh-card-eyebrow">AHP CRITERIA WEIGHTS</span>
              <span className="vh-help-icon">?</span>
            </div>
            <h3 className="vh-ahp-card-title">Multi-Criteria Formula</h3>
            <div className="vh-ahp-weights-table">
              <div className="vh-ahp-row">
                <span>Hazard Zone</span>
                <span className="vh-ahp-pct">30%</span>
              </div>
              <div className="vh-ahp-row">
                <span>Land Availability</span>
                <span className="vh-ahp-pct">25%</span>
              </div>
              <div className="vh-ahp-row">
                <span>Distance To Road Km</span>
                <span className="vh-ahp-pct">15%</span>
              </div>
              <div className="vh-ahp-row">
                <span>Distance To Water Km</span>
                <span className="vh-ahp-pct">15%</span>
              </div>
              <div className="vh-ahp-row">
                <span>Distance To Healthcare Km</span>
                <span className="vh-ahp-pct">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2 Capacity Screening */}
        <div className="vh-stage-section">
          <div className="vh-stage-head-row">
            <div className="vh-stage-title-col">
              <span className="vh-stage-eyebrow">STAGE 2: CAPACITY SCREENING</span>
              <h3 className="vh-stage-title">Carrying Capacity Feasibility Check</h3>
            </div>
            <div className="vh-stage-pills-row">
              <span className="vh-cap-pill pill-ready">0 Ready</span>
              <span className="vh-cap-pill pill-limited">3 Limited</span>
              <span className="vh-cap-pill pill-insufficient">7 Insufficient</span>
            </div>
          </div>
          <p className="vh-stage-note">
            Candidate site available capacity (carrying_capacity - existing_population) is evaluated against village demand. Ready sites receive a feasibility incentive (+0.08 AHP boost), while insufficient sites receive a penalty (-0.12).
          </p>
        </div>

        {/* Stage 3 Ranked Sites List */}
        <div className="vh-stage-section">
          <div className="vh-stage-head-row">
            <div className="vh-stage-title-col">
              <span className="vh-stage-eyebrow">STAGE 3: AHP SITE SUITABILITY</span>
              <h3 className="vh-stage-title">Ranked Safe Relocation Sites</h3>
            </div>
            <span className="vh-top-match-indicator">
              Top match: <strong>Srinagar (Garhwal) Outskirts</strong> (AHP Score: 0.880)
            </span>
          </div>

          <div className="vh-candidate-sites-list">
            {selectedVillage.safeSites.map((site) => (
              <div key={site.rank} className="vh-site-item-card">
                <div className="vh-site-rank-tag">{site.rank}</div>
                <div className="vh-site-info-col">
                  <div className="vh-site-title-row">
                    <h4 className="vh-site-name">{site.name}</h4>
                    <span className="vh-site-badge-rec">{site.tag}</span>
                    <span className="vh-site-badge-cap">{site.capacity}</span>
                  </div>
                  <div className="vh-site-meta-row">
                    <span>{site.zone}</span>
                    <span>•</span>
                    <span>Distance: {site.dist}</span>
                  </div>
                </div>
                <div className="vh-site-score-box">
                  <span className="vh-score-lbl">AHP SUITABILITY SCORE</span>
                  <span className="vh-score-bold">{site.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  /* ==========================================================
     VIEW 2: VILLAGE ASSESSMENT DETAIL VIEW (Image 4 & 5)
     ========================================================== */
  if (currentView === 'detail') {
    return (
      <div className="vh-page-container">
        {/* Top Back Nav */}
        <div className="vh-back-nav-row">
          <button
            type="button"
            className="vh-back-btn"
            onClick={() => setCurrentView('list')}
          >
            ← Back to Village Register
          </button>
        </div>

        {/* Village Header */}
        <div className="vh-page-header">
          <div className="vh-header-text-col">
            <span className="vh-eyebrow-tag">VILLAGE ASSESSMENT &nbsp;•&nbsp; {selectedVillage.id}</span>
            <h1 className="vh-main-title">{selectedVillage.name}</h1>
            <p className="vh-desc-para">
              A transparent, data-driven view of multi-hazard risk indicators, ML landslide susceptibility, relocation demand, and operational relocation handoff.
            </p>
          </div>
          <div className="vh-detail-header-badges">
            <span className="vh-zone-pill-badge badge-red">{selectedVillage.zone} Zone</span>
            <span className="vh-zone-pill-badge badge-priority">Priority: {selectedVillage.priorityLevel}</span>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="vh-4cards-grid">
          {/* Card 1: Relocation Priority */}
          <div className="vh-stat-card card-priority-coral">
            <div className="vh-stat-card-head">
              <span className="vh-stat-card-eyebrow">RELOCATION PRIORITY</span>
              <span className="vh-stat-icon-wrap">ⓘ</span>
            </div>
            <h3 className="vh-stat-card-main-val text-coral">{selectedVillage.priorityLevel}</h3>
            <span className="vh-stat-card-sub text-coral">Score: {selectedVillage.priorityScore} / 100</span>
          </div>

          {/* Card 2: Final Risk Score */}
          <div className="vh-stat-card">
            <div className="vh-stat-card-head">
              <span className="vh-stat-card-eyebrow">FINAL RISK SCORE</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="vh-stat-card-main-val">{selectedVillage.finalRiskScore}</h3>
            <span className="vh-stat-card-sub">70% Det (100%) + 30% ML</span>
          </div>

          {/* Card 3: ML Landslide Prob */}
          <div className="vh-stat-card">
            <div className="vh-stat-card-head">
              <span className="vh-stat-card-eyebrow">ML LANDSLIDE PROB</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
              </svg>
            </div>
            <h3 className="vh-stat-card-main-val">{selectedVillage.mlProb}</h3>
            <span className="vh-stat-card-sub">{selectedVillage.mlType}</span>
          </div>

          {/* Card 4: Est. Relocation Demand */}
          <div className="vh-stat-card">
            <div className="vh-stat-card-head">
              <span className="vh-stat-card-eyebrow">EST. RELOCATION DEMAND</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 className="vh-stat-card-main-val">{selectedVillage.estDemandNum} <span className="text-sm-normal">families</span></h3>
            <span className="vh-stat-card-sub">{selectedVillage.population} people ({selectedVillage.households})</span>
          </div>
        </div>

        {/* 2-Column Split: Evidence Ledger vs Decision Support */}
        <div className="vh-evidence-split-grid">
          {/* Left: Evidence Ledger */}
          <div className="vh-evidence-card">
            <div className="vh-evidence-card-head">
              <span className="vh-card-eyebrow">EVIDENCE LEDGER</span>
              <span className="vh-auditable-tag">AUDITABLE / 100</span>
            </div>
            <h3 className="vh-evidence-title">Multi-Hazard & ML Risk Breakdown</h3>

            <div className="vh-ledger-bars-list">
              {/* Bar 1 */}
              <div className="vh-ledger-item">
                <div className="vh-ledger-top">
                  <span className="vh-ledger-lbl">Deterministic Base Hazard</span>
                  <span className="vh-ledger-metric">High band (1.00)</span>
                </div>
                <div className="vh-ledger-track">
                  <div className="vh-ledger-fill fill-red" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Bar 2 */}
              <div className="vh-ledger-item">
                <div className="vh-ledger-top">
                  <span className="vh-ledger-lbl">ML Landslide Intelligence</span>
                  <span className="vh-ledger-metric">{selectedVillage.mlProb} probability · {selectedVillage.mlType}</span>
                </div>
                <div className="vh-ledger-track">
                  <div className="vh-ledger-fill fill-orange" style={{ width: `${selectedVillage.mlProbNum}%` }}></div>
                </div>
              </div>

              {/* Bar 3 */}
              <div className="vh-ledger-item">
                <div className="vh-ledger-top">
                  <span className="vh-ledger-lbl">Population Impact Weight</span>
                  <span className="vh-ledger-metric">{selectedVillage.population} people in scope</span>
                </div>
                <div className="vh-ledger-track">
                  <div className="vh-ledger-fill fill-yellow" style={{ width: '95%' }}></div>
                </div>
              </div>

              {/* Bar 4 */}
              <div className="vh-ledger-item">
                <div className="vh-ledger-top">
                  <span className="vh-ledger-lbl">Historical Incident Impact</span>
                  <span className="vh-ledger-metric">{selectedVillage.incidents} past event(s)</span>
                </div>
                <div className="vh-ledger-track">
                  <div className="vh-ledger-fill fill-green" style={{ width: selectedVillage.incidents > 0 ? '45%' : '5%' }}></div>
                </div>
              </div>
            </div>

            {/* Formula box */}
            <div className="vh-formula-footer-box">
              <span className="vh-formula-lbl">RISK FUSION FORMULA</span>
              <p className="vh-formula-text">{selectedVillage.riskFormula}</p>
            </div>
          </div>

          {/* Right: Decision Support */}
          <div className="vh-evidence-card">
            <div className="vh-evidence-card-head">
              <span className="vh-card-eyebrow">DECISION SUPPORT</span>
            </div>
            <h3 className="vh-evidence-title">Why this village is prioritized</h3>

            <ul className="vh-priority-reasons-list">
              <li>High baseline hazard classification in district register</li>
              <li>{selectedVillage.incidents} recorded historical disaster incident(s)</li>
              <li>ML predicts elevated landslide susceptibility ({selectedVillage.mlProb})</li>
              <li>ML estimates approximately {selectedVillage.estDemandNum} families requiring relocation</li>
              <li>ML classifies movement pattern as {selectedVillage.mlType}</li>
            </ul>

            <div className="vh-decision-geo-footer">
              <div className="vh-geo-item">
                <span className="vh-geo-lbl">Geographic Coordinates:</span>
                <span className="vh-geo-val">{selectedVillage.lat}, {selectedVillage.lng}</span>
              </div>
              <div className="vh-geo-item">
                <span className="vh-geo-lbl">Household Density:</span>
                <span className="vh-geo-val">{selectedVillage.householdDensity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Infrastructure (within 35 km) */}
        <div className="vh-infra-section-card">
          <div className="vh-evidence-card-head">
            <span className="vh-card-eyebrow">CRITICAL INFRASTRUCTURE</span>
          </div>
          <h3 className="vh-evidence-title">Nearby Facilities (within 35 km)</h3>

          <div className="vh-facilities-grid">
            {selectedVillage.facilities.map((fac, idx) => (
              <div key={idx} className="vh-facility-unit">
                <div className="vh-fac-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#727D65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                  </svg>
                </div>
                <div className="vh-fac-details">
                  <h4 className="vh-fac-name">{fac.name}</h4>
                  <span className="vh-fac-type">{fac.type}</span>
                </div>
                <span className="vh-fac-meta">{fac.meta}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Decision Handoff Dark Olive Banner */}
        <div className="vh-handoff-banner">
          <div className="vh-handoff-text-col">
            <span className="vh-handoff-eyebrow">OPERATIONAL DECISION HANDOFF</span>
            <h3 className="vh-handoff-title">Move from exposure to a verified relocation option.</h3>
            <p className="vh-handoff-desc">
              Feed ML estimated relocation demand (~{selectedVillage.estDemandNum} families) into capacity screening, then evaluate candidate sites using multi-criteria AHP ranking.
            </p>
          </div>

          <button
            type="button"
            className="vh-btn-open-recommendation"
            onClick={openSafeSites}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span>Open Relocation Recommendation</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    );
  }

  /* ==========================================================
     VIEW 1: VILLAGE REGISTER MAIN TABLE (Image 1 & 2)
     ========================================================== */
  return (
    <div className="vh-page-container">
      {/* Header & Top Counter */}
      <div className="vh-page-header">
        <div className="vh-header-text-col">
          <span className="vh-eyebrow-tag">VILLAGE REGISTER &nbsp;•&nbsp; MULTI-HAZARD & ML ASSESSMENT</span>
          <h1 className="vh-main-title">Village Risk & Relocation Priority</h1>
          <p className="vh-desc-para">
            Search the regional register. Open any village record to see the transparent risk signals, ML landslide intelligence, and relocation demand estimate.
          </p>
        </div>

        <div className="vh-header-badge-col">
          <span className="vh-counter-badge">20 VILLAGES LISTED</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="vh-search-filter-bar">
        <div className="vh-search-input-wrap">
          <svg className="vh-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="vh-search-input"
            placeholder="Search by village name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="vh-dropdowns-wrap">
          <span className="vh-filter-lbl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A856D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filter:
          </span>

          <select
            className="vh-select-control"
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
          >
            <option value="all">All zones</option>
            <option value="red">Red Zone</option>
            <option value="yellow">Yellow Zone</option>
            <option value="green">Green Zone</option>
          </select>

          <select
            className="vh-select-control"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All priorities</option>
            <option value="immediate">Immediate</option>
            <option value="short-term">Short-term</option>
            <option value="medium-term">Medium-term</option>
            <option value="monitor">Monitor</option>
          </select>
        </div>
      </div>

      {/* Village Table Card */}
      <div className="vh-table-container-card">
        <table className="vh-register-table">
          <thead>
            <tr>
              <th className="th-village">VILLAGE</th>
              <th className="th-zone">HAZARD ZONE</th>
              <th className="th-pop">POPULATION</th>
              <th className="th-ml">ML LANDSLIDE PROB</th>
              <th className="th-demand">EST. DEMAND</th>
              <th className="th-priority">PRIORITY SCORE</th>
              <th className="th-action">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredVillages.map((v) => (
              <tr key={v.id} onClick={() => openVillageDetail(v.id)} className="vh-table-row">
                {/* Village column */}
                <td className="td-village">
                  <div className="vh-village-cell">
                    <div className="vh-avatar-circle">{v.avatar}</div>
                    <div className="vh-village-names">
                      <span className="vh-name-bold">{v.name}</span>
                      <span className="vh-coords-sub">{v.coords} &nbsp;•&nbsp; {v.incidents} Incident(s)</span>
                    </div>
                  </div>
                </td>

                {/* Hazard Zone */}
                <td className="td-zone">
                  <span className={`vh-badge-pill zone-${v.zone.toLowerCase()}`}>
                    {v.zone}
                  </span>
                </td>

                {/* Population */}
                <td className="td-pop">
                  <div className="vh-metric-cell">
                    <span className="vh-metric-main">{v.population}</span>
                    <span className="vh-metric-sub">{v.households}</span>
                  </div>
                </td>

                {/* ML Landslide Prob */}
                <td className="td-ml">
                  <div className="vh-metric-cell">
                    <span className="vh-metric-main">{v.mlProb}</span>
                    <span className="vh-metric-sub">{v.mlType}</span>
                  </div>
                </td>

                {/* Est. Demand */}
                <td className="td-demand">
                  <span className="vh-demand-val">{v.estDemand}</span>
                </td>

                {/* Priority Score */}
                <td className="td-priority">
                  <div className="vh-priority-cell">
                    <span className="vh-score-bold">{v.priorityScore}</span>
                    <span className="vh-priority-sub">{v.priorityLevel}</span>
                  </div>
                </td>

                {/* Action */}
                <td className="td-action">
                  <button
                    type="button"
                    className="vh-btn-action-view"
                    onClick={(e) => {
                      e.stopPropagation();
                      openVillageDetail(v.id);
                    }}
                    title={`View ${v.name} details`}
                  >
                    ↗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
