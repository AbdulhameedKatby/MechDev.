import type { AircraftData } from '../../lib/types'

const piperCub: AircraftData = {
  slug: 'piper-cub',
  name: 'Piper J-3 Cub',
  subtitle: 'Ultra-Simple Pioneer — Welded steel tube, fabric & minimal systems',
  role: 'General aviation pioneer',
  mission: {
    problem: 'Providing basic, reliable, low-cost flight training with absolute mechanical simplicity.',
    tradeOffs: [
      { label: 'Minimal speed', detail: 'Cruise speed of only 75 mph (120 km/h)' },
      { label: 'Low payload', detail: 'Useful load of 180 kg allows pilot + 1 passenger' },
    ],
    provocativeQuestion: "What's the minimum complexity needed for human flight?",
  },
  specifications: [
    {
      id: 'weight',
      label: 'Empty Weight',
      value: '345',
      unit: 'kg',
      type: 'Measured',
      source: 'Piper J-3 Cub Specification Sheet (1938)',
      conditions: 'Unloaded basic airframe',
      credibility: 'Primary Source — Piper Aircraft',
      physics: 'Welded steel tube fuselage and fabric wing skin minimizes structural mass fraction.',
      whyMatters: 'Can operate from short grass strips with just 65 hp.',
    },
  ],
  designSystems: [
    {
      id: 'structure',
      letter: 'A',
      name: 'Steel Tube & Fabric Construction',
      problem: 'Stressed-skin aluminum manufacturing in 1938 was expensive and heavy for light trainers.',
      solution: 'SAE 1025 welded steel tube fuselage truss covered in doped fabric skin with external wing struts.',
      labSlug: 'wing-loading',
      labName: 'Wing Loading ↔ Stall Speed',
      realData: ['Empty weight: 345 kg', 'Engine power: 65 hp', 'Stall speed: 38 kts'],
      sources: ['Piper J-3 Cub Factory Specs'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Strut-Braced Fabric Wing',
      supersonicBenefit: 'Ultra-lightweight structure & low 38-knot stall speed',
      subsonicCost: 'High drag from external struts limits cruise speed to 75 mph',
    },
  ],
  evidence: [
    {
      id: 'ev-cub-spec',
      claim: 'Piper J-3 Cub achieved 345 kg empty weight using welded steel tubing',
      sources: [
        {
          tier: 'primary',
          publisher: 'Piper Aircraft Corporation',
          document: 'Piper J-3 Aircraft Specification Sheet',
          type: 'Factory Specification',
          year: 1938,
          credibility: 'Primary Source',
          quote: 'Empty Weight: 760 lbs (345 kg). Gross Weight: 1,220 lbs (553 kg).',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Piper Cub', slug: 'piper-cub', aspectRatio: 6.7, maxMach: 0.15, wingArea: 17.15, era: '1960s', wingType: 'Strut-braced high wing' },
    { name: 'Cessna 172 Skyhawk', slug: 'cessna-172', aspectRatio: 7.32, maxMach: 0.23, wingArea: 16.17, era: '1960s', wingType: 'High-wing rectangular' },
  ],
  relatedQuestions: [
    {
      question: "What's the minimum complexity needed for flight?",
      url: '/questions/cessna-172',
      description: 'Compare Piper Cub tube construction with Cessna 172 all-aluminum skin.',
    },
  ],
  labs: [
    {
      slug: 'wing-loading',
      title: 'Wing Loading ↔ Stall Speed',
      subtitle: 'Analyze 32 kg/m² wing loading.',
      concordeConnection: 'Piper Cub uses low wing loading for slow 38-knot landings without flaps.',
    },
  ],
}

export default piperCub
