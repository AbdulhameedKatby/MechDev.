import type { AircraftData } from '../../lib/types'

const a350: AircraftData = {
  slug: 'a350-efficiency',
  name: 'Airbus A350-1000',
  subtitle: 'Modern Efficiency — 53% CFRP airframe & 8,700 nm range',
  role: 'Long-range commercial transport',
  mission: {
    problem: 'Flying 8,700 nautical miles with 350+ passengers while reducing fuel burn per seat by 25% compared to older aluminum wide-bodies.',
    tradeOffs: [
      { label: 'High initial material cost', detail: 'Carbon fiber composite fabrication requires autoclave curing at 180°C/7 bar' },
      { label: 'Complex composite repair', detail: 'Requires non-destructive ultrasonic inspection and scarf patch repairs' },
    ],
    provocativeQuestion: 'How does the A350 fly farther than older aircraft using 25% less fuel?',
  },
  specifications: [
    {
      id: 'cfrp',
      label: 'CFRP Composite Fraction',
      value: '53%',
      unit: '',
      type: 'Measured',
      source: 'Airbus A350 XWB Technical Data Specification',
      conditions: 'Airframe mass distribution',
      credibility: 'Primary Source — Manufacturer Specification',
      physics: 'Specific strength of CFRP (2.45 MNm/kg) is 10x higher than 7075-T6 aluminum (0.23 MNm/kg).',
      whyMatters: 'Saves ~20% structural weight, enabling lower fuel burn and higher cabin humidity.',
    },
    {
      id: 'bpr',
      label: 'Engine Bypass Ratio',
      value: '9.3:1',
      unit: '',
      type: 'Design specification',
      source: 'Rolls-Royce Trent XWB-97 Engine Manual',
      conditions: 'ISA Cruise FL370',
      credibility: 'Primary Source — Rolls-Royce',
      physics: 'Bypass mass flow is 9.3x core flow, maximizing propulsive efficiency η_p = 2/(1 + V_j/V_a).',
      whyMatters: 'Achieves industry-leading specific fuel consumption TSFC = 0.58 kg/kg/hr.',
    },
  ],
  designSystems: [
    {
      id: 'structures',
      letter: 'A',
      name: '53% CFRP Composite Structure',
      problem: 'Aluminum fuselages suffer weight penalties and fatigue limits under repeated pressurization cycles.',
      solution: 'Single-piece CFRP fuselage panels and 32m wing spars cured at Airbus Nantes, resisting corrosion and fatigue.',
      labSlug: 'structural-stress',
      labName: 'Fuselage Hoop Stress',
      realData: ['CFRP mass fraction: 53%', 'Design life: 60,000 hrs', 'Cabin altitude: 6,000 ft'],
      sources: ['Airbus A350 Technical Specification'],
    },
  ],
  tradeOffs: [
    {
      aspect: '53% CFRP Composite Airframe',
      supersonicBenefit: '25% lower fuel burn & zero corrosion/fatigue',
      subsonicCost: 'High upfront manufacturing & complex ultrasonic inspection',
    },
  ],
  evidence: [
    {
      id: 'ev-a350-cert',
      claim: 'Airbus A350-1000 certified with 53% composite airframe and 8,700 nm range',
      sources: [
        {
          tier: 'primary',
          publisher: 'EASA / Airbus',
          document: 'EASA Type Certificate Data Sheet A.151',
          type: 'Type Certificate',
          year: 2017,
          credibility: 'Primary Source — EASA Certification',
          quote: 'Airbus A350-1000 certified MTOW: 319,000 kg. Range: 8,700 nm with 369 passengers.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Airbus A350-1000', slug: 'a350-efficiency', aspectRatio: 9.03, maxMach: 0.89, wingArea: 442, era: '2000s', wingType: 'Adaptive camber' },
    { name: 'Boeing 787', slug: 'boeing-787', aspectRatio: 10.2, maxMach: 0.85, wingArea: 377, era: '2000s', wingType: 'Swept (raked tips)' },
  ],
  relatedQuestions: [
    {
      question: 'How does the A350-1000 fly 8,700 nautical miles efficiently?',
      url: '/questions/a350-efficiency',
      description: 'Deep dive into adaptive wing camber, Trent XWB engines, and CFRP composites.',
    },
  ],
  labs: [
    {
      slug: 'structural-stress',
      title: 'Fuselage Hoop Stress',
      subtitle: 'Analyze CFRP vs Aluminum stress resistance.',
      concordeConnection: 'A350 uses 53% CFRP to allow lower 6,000 ft cabin pressurization altitude.',
    },
  ],
}

export default a350
