import type { AircraftData } from '../../lib/types'

const b2: AircraftData = {
  slug: 'b2-spirit',
  name: 'B-2 Spirit',
  subtitle: 'Stealth Flying Wing — Unconventional aerodynamics & radar stealth',
  role: 'Stealth strategic bomber',
  mission: {
    problem: 'Penetrating dense integrated air defense networks undetected while carrying 18,000 kg payload.',
    tradeOffs: [
      { label: 'No vertical tail', detail: 'Zero directional stability requiring elevon drag rudders and FBW stabilization' },
      { label: 'Extreme cost', detail: '$2.2 billion per aircraft due to radar-absorbing materials and low production run' },
    ],
    provocativeQuestion: 'How do you fly an aircraft with no tail and make it invisible to radar?',
  },
  specifications: [
    {
      id: 'rcs',
      label: 'Radar Cross Section (RCS)',
      value: '0.001',
      unit: 'm²',
      type: 'Estimated',
      source: 'USAF B-2 Stealth Evaluation Technical Summary',
      conditions: 'X-band radar threat sector',
      credibility: 'Primary Source — USAF Evaluation',
      physics: 'Continuous curved blended wing eliminates 99.9% of corner reflections.',
      whyMatters: 'Renders a 170-ton bomber smaller than a small bird on radar screens.',
    },
  ],
  designSystems: [
    {
      id: 'aerodynamics',
      letter: 'A',
      name: 'Flying Wing & Drag Rudders',
      problem: 'Eliminating vertical tails for radar stealth removes directional yaw stability.',
      solution: 'Split elevons at the wingtips act as drag rudders, opened differential by the FBW computer to maintain yaw alignment.',
      labSlug: 'wing-sweep',
      labName: 'Wing Sweep ↔ Wave Drag',
      realData: ['Wing area: 504 m²', 'Aspect ratio: 4.2', 'RCS: ~0.001 m²'],
      sources: ['USAF B-2 Flight Manual'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Tailless Flying Wing Geometry',
      supersonicBenefit: 'Radar invisible (<0.001 m² RCS) & highly efficient span loading',
      subsonicCost: 'Requires continuous fly-by-wire computer stabilization',
    },
  ],
  evidence: [
    {
      id: 'ev-b2-stealth',
      claim: 'B-2 Spirit tailless flying wing layout reduces radar cross-section below 0.001 m²',
      sources: [
        {
          tier: 'primary',
          publisher: 'United States Air Force / Northrop Grumman',
          document: 'B-2 Spirit Stealth System Integration Overview',
          type: 'Technical Overview',
          year: 1997,
          credibility: 'Primary Source',
          quote: 'The blended flying wing configuration eliminates vertical tail radar reflections.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'B-2 Spirit', slug: 'b2-spirit', aspectRatio: 4.2, maxMach: 0.85, wingArea: 504, era: '1980s', wingType: 'Blended flying wing' },
    { name: 'Boeing 747-400', slug: 'boeing-747', aspectRatio: 6.96, maxMach: 0.92, wingArea: 511, era: '1960s', wingType: 'Swept with winglets' },
  ],
  relatedQuestions: [
    {
      question: 'How do you fly an aircraft with no tail?',
      url: '/concepts/fly-by-wire',
      description: 'Explore flying wing stability and split elevon drag rudders.',
    },
  ],
  labs: [
    {
      slug: 'wing-sweep',
      title: 'Wing Sweep ↔ Wave Drag',
      subtitle: 'Analyze 33° serrated wing sweep.',
      concordeConnection: 'B-2 Spirit uses a 33° serrated trailing edge to direct radar reflections away.',
    },
  ],
}

export default b2
