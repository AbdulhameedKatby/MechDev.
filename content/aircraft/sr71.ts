import type { AircraftData } from '../../lib/types'

const sr71: AircraftData = {
  slug: 'sr71-blackbird',
  name: 'SR-71 Blackbird',
  subtitle: 'Extreme Conditions — Mach 3.2+ cruise at 85,000 ft',
  role: 'Strategic reconnaissance',
  mission: {
    problem: 'Sustaining Mach 3.2+ flight at 85,000 ft where airframe kinetic friction reaches 316°C (600°F).',
    tradeOffs: [
      { label: 'Thermal expansion', detail: 'Fuselage grows 8.4 cm in flight; fuel tanks leak on the ground' },
      { label: 'Exotic materials', detail: '85% Beta-titanium construction, extremely difficult to machine' },
      { label: 'Complex fuel system', detail: 'JP-7 fuel used as a heat sink to cool airframe before burning' },
    ],
    provocativeQuestion: 'How can an aircraft survive flying at Mach 3.2 when the airframe reaches 316°C?',
  },
  specifications: [
    {
      id: 'mach',
      label: 'Maximum Cruise Speed',
      value: 'Mach 3.20',
      unit: '',
      type: 'Measured',
      source: 'Lockheed SR-71 Flight Manual (TO 1SR-71A-1)',
      conditions: 'FL800, ISA conditions',
      credibility: 'Primary Source — USAF Flight Manual',
      physics: 'Stagnation temperature T_0 = T_∞(1 + 0.2 M²) reaches 388°C at nose tip.',
      whyMatters: 'Outran every surface-to-air missile fired at it during 30 years of service.',
    },
    {
      id: 'ceiling',
      label: 'Service Ceiling',
      value: '85,000',
      unit: 'ft',
      type: 'Operational limit',
      source: 'Lockheed SR-71 Performance Curves',
      conditions: 'ISA, steady cruise',
      credibility: 'Primary Source',
      physics: 'Air density is less than 3% of sea level; relies on J58 ramjet-mode pressure recovery.',
      whyMatters: 'Flew above 99% of Earth atmospheric mass.',
    },
  ],
  designSystems: [
    {
      id: 'thermal',
      letter: 'A',
      name: 'Titanium & Fuel Heat-Sink',
      problem: 'Aluminum melts at SR-71 skin stagnation temperatures (316°C).',
      solution: 'Beta-C120VCA titanium alloy skin combined with circulating JP-7 fuel through airframe heat exchangers to absorb thermal energy before injection into engine afterburners.',
      labSlug: 'kinetic-heating',
      labName: 'Kinetic Heating ↔ Stagnation Recovery',
      realData: ['Leading edge temp: 316°C', 'Thermal expansion: 8.4 cm', 'Titanium content: 85%'],
      sources: ['Lockheed SR-71 TO 1SR-71A-1', 'NASA TN D-6847'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Titanium Structure & JP-7 Heat Sink',
      supersonicBenefit: 'Survives sustained Mach 3.2 thermal heating',
      subsonicCost: 'High cost, leaks fuel on tarmac before thermal expansion seals gaps',
    },
  ],
  evidence: [
    {
      id: 'ev-sr71-manual',
      claim: 'SR-71 flight envelope limits cruise stagnation temp to 427°C (800°F)',
      sources: [
        {
          tier: 'primary',
          publisher: 'Lockheed / United States Air Force',
          document: 'SR-71A Flight Manual (TO 1SR-71A-1)',
          type: 'Military Technical Order',
          year: 1989,
          credibility: 'Primary Source — Official Flight Manual',
          quote: 'Maximum Total Temperature limit: 427°C (800°F). Maximum continuous cruise speed: Mach 3.2.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'SR-71 Blackbird', slug: 'sr71-blackbird', aspectRatio: 1.94, maxMach: 3.3, wingArea: 167, era: '1960s', wingType: 'Delta with chines' },
    { name: 'Concorde', slug: 'concorde', aspectRatio: 1.83, maxMach: 2.04, wingArea: 358, era: '1960s', wingType: 'Ogival delta' },
    { name: 'XB-70 Valkyrie', aspectRatio: 1.6, maxMach: 3.1, wingArea: 585, era: '1960s', wingType: 'Delta' },
  ],
  relatedQuestions: [
    {
      question: 'How does the SR-71 survive Mach 3.2 when the airframe reaches 300°C?',
      url: '/questions/sr71-blackbird',
      description: 'Deep dive into titanium thermal management and inlet spikes.',
    },
  ],
  labs: [
    {
      slug: 'kinetic-heating',
      title: 'Kinetic Heating ↔ Stagnation Recovery',
      subtitle: 'Analyze Mach 3.2 stagnation heating.',
      concordeConnection: 'SR-71 uses titanium and JP-7 fuel cooling for 300°C temperatures.',
    },
  ],
}

export default sr71
