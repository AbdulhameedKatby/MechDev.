import type { AircraftData } from '../../lib/types'

const a380: AircraftData = {
  slug: 'a380-scale',
  name: 'Airbus A380-800',
  subtitle: 'Massive Scale — 575,000 kg MTOW double-deck mega-liner',
  role: 'Ultra-large commercial transport',
  mission: {
    problem: 'Transporting up to 853 passengers in a double-deck layout on high-density hub-to-hub global routes.',
    tradeOffs: [
      { label: 'Extreme wing loading', detail: 'MTOW of 575,000 kg requires 845 m² wing area and 20-wheel landing gear' },
      { label: 'Airport gate incompatibility', detail: 'Requires Code F airport infrastructure with dual-deck loading bridges' },
    ],
    provocativeQuestion: 'How do you design an aircraft that weighs 575,000 kg and carries 800 passengers?',
  },
  specifications: [
    {
      id: 'mtow',
      label: 'Max Takeoff Weight',
      value: '575,000',
      unit: 'kg',
      type: 'Measured',
      source: 'EASA Type Certificate Data Sheet A.110 (A380)',
      conditions: 'Max structural takeoff limit',
      credibility: 'Primary Source — EASA',
      physics: 'Generates 280,000 lbf total thrust from 4 Trent 900 / GP7200 turbofans.',
      whyMatters: 'Heaviest passenger airliner ever built.',
    },
  ],
  designSystems: [
    {
      id: 'structures',
      letter: 'A',
      name: 'Double-Deck Fuselage & GLARE Laminates',
      problem: 'Managing cabin pressurization loads in a 7.15m wide oval double-deck fuselage.',
      solution: 'GLARE (Glass Laminate Aluminum Reinforced Epoxy) skin panels that arrest fatigue crack growth.',
      labSlug: 'structural-stress',
      labName: 'Fuselage Hoop Stress',
      realData: ['Fuselage width: 7.15 m', 'Wing area: 845 m²', 'Wheel count: 22 wheels'],
      sources: ['EASA TCDS A.110'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Full Double-Deck Fuselage',
      supersonicBenefit: 'Max seat capacity (853 pax) & lowest fuel burn per seat-mile',
      subsonicCost: 'Massive structural weight & restricted airport gate access',
    },
  ],
  evidence: [
    {
      id: 'ev-a380-cert',
      claim: 'Airbus A380-800 certified MTOW is 575,000 kg with 845 m² wing area',
      sources: [
        {
          tier: 'primary',
          publisher: 'EASA',
          document: 'Type Certificate Data Sheet EASA.A.110',
          type: 'Type Certificate',
          year: 2006,
          credibility: 'Primary Source — Regulatory Certification',
          quote: 'Airbus A380-800 Max Takeoff Weight: 575,000 kg. Wing reference area: 845 m².',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Airbus A380-800', slug: 'a380-scale', aspectRatio: 7.53, maxMach: 0.89, wingArea: 845, era: '2000s', wingType: 'Swept with winglets' },
    { name: 'Boeing 747-400', slug: 'boeing-747', aspectRatio: 6.96, maxMach: 0.92, wingArea: 511, era: '1960s', wingType: 'Swept with winglets' },
  ],
  relatedQuestions: [
    {
      question: 'How do you design an aircraft that weighs 575,000 kg?',
      url: '/questions/boeing-747',
      description: 'Compare A380 and 747 structural scaling and double-deck hoop stress.',
    },
  ],
  labs: [
    {
      slug: 'structural-stress',
      title: 'Fuselage Hoop Stress',
      subtitle: 'Analyze 7.15m double-deck pressure stress.',
      concordeConnection: 'A380 uses GLARE composite-aluminum laminates to handle 575-ton MTOW pressurization loads.',
    },
  ],
}

export default a380
