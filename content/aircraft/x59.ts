import type { AircraftData } from '../../lib/types'

const x59: AircraftData = {
  slug: 'x59-nose',
  name: 'NASA X-59 QueSST',
  subtitle: 'Quiet Supersonic Experiment — Shaped sonic boom (75 PLdB)',
  role: 'Experimental supersonic research',
  mission: {
    problem: 'Demonstrating quiet supersonic flight over land by suppressing the N-wave sonic boom to an acceptable 75 PLdB ground rumble.',
    tradeOffs: [
      { label: 'Extreme nose length', detail: '29.5 ft nose blocks forward pilot vision, requiring eXternal Vision System (XVS)' },
      { label: 'Weight penalty from fineness ratio', detail: 'Longer fuselage increases structural bending moments' },
    ],
    provocativeQuestion: "Why is the NASA X-59's nose nearly 30 feet long?",
  },
  specifications: [
    {
      id: 'boom',
      label: 'Ground Sonic Boom Level',
      value: '75',
      unit: 'PLdB',
      type: 'Calculated',
      source: 'NASA TM-20210018432 PCBoom Acoustic Modeling',
      conditions: 'Mach 1.4 cruise at 55,000 ft',
      credibility: 'Primary Source — NASA Technical Memorandum',
      physics: 'Prevents N-wave coalescing by separating nose, cockpit, and wing shocks in space.',
      whyMatters: 'Targeting FAA/ICAO rule change for commercial overland supersonic flight.',
    },
  ],
  designSystems: [
    {
      id: 'acoustics',
      letter: 'A',
      name: 'Low-Boom Shock Shaping',
      problem: 'Conventional supersonic aircraft shock waves coalesce into a loud double-boom (105 PLdB).',
      solution: '29.5 ft extended nose cone creates a continuous series of weak shock ramps that never merge.',
      labSlug: 'mach-number',
      labName: 'Mach Number ↔ Shock Waves',
      realData: ['Nose length: 29.5 ft', 'Fineness ratio: 5.36', 'Cruise speed: Mach 1.4'],
      sources: ['NASA TM-20210018432'],
    },
  ],
  tradeOffs: [
    {
      aspect: '29.5 ft Extended Nose',
      supersonicBenefit: 'Suppresses sonic boom from 105 PLdB to 75 PLdB rumble',
      subsonicCost: 'Completely blocks forward pilot vision (requires 4K XVS camera system)',
    },
  ],
  evidence: [
    {
      id: 'ev-x59-boom',
      claim: 'NASA X-59 target acoustic ground signature is 75 PLdB',
      sources: [
        {
          tier: 'primary',
          publisher: 'NASA',
          document: 'QueSST Flight Test Acoustic Target Memorandum',
          type: 'Technical Memorandum',
          year: 2021,
          credibility: 'Primary Source — NASA Research',
          quote: 'X-59 is designed to generate a 75 PLdB quiet sonic thump at ground level during Mach 1.4 cruise.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'NASA X-59 QueSST', slug: 'x59-nose', aspectRatio: 2.1, maxMach: 1.4, wingArea: 35, era: '2000s', wingType: 'Low-boom delta' },
    { name: 'Concorde', slug: 'concorde', aspectRatio: 1.83, maxMach: 2.04, wingArea: 358, era: '1960s', wingType: 'Ogival delta' },
  ],
  relatedQuestions: [
    {
      question: "Why is the NASA X-59's nose nearly 30 feet long?",
      url: '/questions/x59-nose',
      description: 'Deep dive into spatial shock separation and PCBoom modeling.',
    },
  ],
  labs: [
    {
      slug: 'mach-number',
      title: 'Mach Number ↔ Shock Waves',
      subtitle: 'Analyze Mach cone angle shock formation.',
      concordeConnection: 'X-59 shapes shock waves to eliminate the 105 PLdB N-wave sonic boom.',
    },
  ],
}

export default x59
