import type { AircraftData } from '../../lib/types'

const harrier: AircraftData = {
  slug: 'harrier-vtol',
  name: 'Harrier GR.9',
  subtitle: 'Vectored Thrust VTOL — Runway-independent tactical strike',
  role: 'V/STOL strike fighter',
  mission: {
    problem: 'Operating from unprepared forward forest clearings and small ships without runways while maintaining 550 knot strike speed.',
    tradeOffs: [
      { label: 'Short combat radius', detail: 'Limited internal fuel (5,328 L) gives ~200 km hover-takeoff combat radius' },
      { label: 'High T/W requirement', detail: 'T/W = 1.04 in hover leaves minimal margin for payload' },
      { label: 'Bleed air reaction controls', detail: 'Puffer jets bleed 8% engine mass flow in hover' },
    ],
    provocativeQuestion: 'How does the Harrier take off vertically and cruise at 550 knots?',
  },
  specifications: [
    {
      id: 'thrust',
      label: 'Pegasus Engine Thrust',
      value: '21,500',
      unit: 'lbf',
      type: 'Measured',
      source: 'Rolls-Royce Pegasus 11-61 Technical Manual',
      conditions: 'Sea level static, max short lift rating',
      credibility: 'Primary Source — Engine Manufacturer',
      physics: 'Vector decomposition T_v = T sin(θ). At 90°, 21,500 lbf directly opposes 20,700 lbf takeoff weight.',
      whyMatters: 'Enables single-engine vertical hover without separate lift engines.',
    },
  ],
  designSystems: [
    {
      id: 'propulsion',
      letter: 'A',
      name: 'Pegasus 4-Nozzle Vectoring',
      problem: 'Achieving both hover lift and 550-knot forward cruise from a single turbofan engine.',
      solution: 'Four interconnected rotating nozzles (2 cold fan air front, 2 hot turbine exhaust rear) that vector thrust together from 0° to 98°.',
      labSlug: 'thrust-vectoring',
      labName: 'Thrust Vectoring ↔ Transition',
      realData: ['Nozzle rotation: 0° to 98°', 'Transition speed: 120-150 kts', 'Reaction jet pressure: 100 psi'],
      sources: ['Rolls-Royce Pegasus Manual', 'BAE Systems Harrier Data'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Vectored Thrust Nozzles',
      supersonicBenefit: 'Runway-independent takeoff & landing',
      subsonicCost: 'High fuel burn in hover & limited payload radius',
    },
  ],
  evidence: [
    {
      id: 'ev-harrier-manual',
      claim: 'Rolls-Royce Pegasus provides 21,500 lbf static hover thrust',
      sources: [
        {
          tier: 'primary',
          publisher: 'Rolls-Royce / BAE Systems',
          document: 'Harrier GR.9 Flight Operating Data Manual',
          type: 'Military Operating Manual',
          year: 2006,
          credibility: 'Primary Source',
          quote: 'Pegasus Mk 107 engine achieves 21,500 lbf max short lift rating at sea level ISA.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Harrier GR.9', slug: 'harrier-vtol', aspectRatio: 3.3, maxMach: 0.90, wingArea: 21.4, era: '1960s', wingType: 'Anhedral swept' },
    { name: 'F-35B Lightning II', slug: 'f35b-hover', aspectRatio: 2.66, maxMach: 1.60, wingArea: 42.7, era: '2000s', wingType: 'Trapezoidal stealth' },
  ],
  relatedQuestions: [
    {
      question: 'How does the Harrier take off vertically and cruise at 550 knots?',
      url: '/questions/harrier-vtol',
      description: 'Deep dive into Pegasus rotating nozzles and reaction controls.',
    },
  ],
  labs: [
    {
      slug: 'thrust-vectoring',
      title: 'Thrust Vectoring ↔ Transition',
      subtitle: 'Analyze nozzle angle vector decomposition.',
      concordeConnection: 'Harrier vectors 21,500 lbf thrust to hover without runways.',
    },
  ],
}

export default harrier
