import type { AircraftData } from '../../lib/types'

const f16: AircraftData = {
  slug: 'f16-falcon',
  name: 'F-16 Fighting Falcon',
  subtitle: 'Unstable by Design — Relaxed static stability & 9G agility',
  role: 'Multirole fighter',
  mission: {
    problem: 'Achieving unprecedented turn rates, vertical climb acceleration, and dogfight agility by sacrificing aerodynamic stability.',
    tradeOffs: [
      { label: 'Aerodynamically unstable', detail: 'Negative static margin (−5% MAC) requires computer control' },
      { label: 'No mechanical backup', detail: 'Quad-redundant fly-by-wire system is single point of flight authority' },
      { label: 'High fuel burn in A/B', detail: 'Afterburner burns fuel at 1.2 kg/kg/hr' },
    ],
    provocativeQuestion: 'Why does the F-16 need a computer to fly itself?',
  },
  specifications: [
    {
      id: 'sm',
      label: 'Static Margin (Subsonic)',
      value: '-5.0%',
      unit: 'MAC',
      type: 'Calculated',
      source: 'USAF F-16 Flight Control System Technical Manual (TO 1F-16C-1)',
      conditions: 'Subsonic M 0.6–0.9, CG aft limit',
      credibility: 'Primary Source — USAF Technical Manual',
      physics: 'Aerodynamic center located forward of CG creates exponential nose-up divergence without computer correction.',
      whyMatters: 'Eliminates horizontal tail trim drag and maximizes instantaneous turn rate (28°/sec).',
    },
    {
      id: 'tw',
      label: 'Thrust-to-Weight Ratio',
      value: '1.09:1',
      unit: '',
      type: 'Measured',
      source: 'Lockheed Martin F-16 Block 50 Performance Standard',
      conditions: 'Combat takeoff weight 12,000 kg, Max A/B',
      credibility: 'Primary Source',
      physics: 'T/W > 1.0 enables vertical acceleration and sustained 9G turn maintenance.',
      whyMatters: 'Allows pilot to climb straight vertically without losing airspeed.',
    },
  ],
  designSystems: [
    {
      id: 'controls',
      letter: 'A',
      name: 'Fly-by-Wire & FLCC',
      problem: 'Flying an aircraft that diverges in pitch every 0.25 seconds.',
      solution: '40Hz Quad-redundant Flight Control Computers (FLCC) with rate gyro feedback that continuously command hydraulic elevons.',
      labSlug: 'thrust-to-weight',
      labName: 'Thrust-to-Weight ↔ Acceleration',
      realData: ['Reaction time: <25 ms', 'Max G-limit: 9.0G', 'Max turn rate: 28°/s'],
      sources: ['USAF TO 1F-16C-1'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Negative Static Margin',
      supersonicBenefit: 'Instantaneous 9G turn capability & zero trim drag',
      subsonicCost: 'Uncontrollable without electrical power',
    },
  ],
  evidence: [
    {
      id: 'ev-f16-fbw',
      claim: 'F-16 FLCC operates at 40Hz with quad-redundant voting',
      sources: [
        {
          tier: 'primary',
          publisher: 'United States Air Force',
          document: 'Technical Order 1F-16C-1 Flight Manual',
          type: 'Military Technical Order',
          year: 1996,
          credibility: 'Primary Source — USAF Flight Manual',
          quote: 'The Flight Control Computer processes pitch, roll, and yaw rate gyro inputs 40 times per second.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'F-16 Fighting Falcon', slug: 'f16-falcon', aspectRatio: 3.1, maxMach: 2.05, wingArea: 27.87, era: '1980s', wingType: 'Cropped delta with strakes' },
    { name: 'Cessna 172 Skyhawk', slug: 'cessna-172', aspectRatio: 7.32, maxMach: 0.23, wingArea: 16.17, era: '1960s', wingType: 'High-wing rectangular' },
    { name: 'Concorde', slug: 'concorde', aspectRatio: 1.83, maxMach: 2.04, wingArea: 358, era: '1960s', wingType: 'Ogival delta' },
  ],
  relatedQuestions: [
    {
      question: 'Why does the F-16 need a computer to fly?',
      url: '/questions/f16-falcon',
      description: 'Deep dive into fly-by-wire control laws and static margin.',
    },
  ],
  labs: [
    {
      slug: 'thrust-to-weight',
      title: 'Thrust-to-Weight ↔ Acceleration',
      subtitle: 'Analyze 1.09:1 T/W vertical acceleration.',
      concordeConnection: 'F-16 relies on T/W > 1.0 for vertical climb authority.',
    },
  ],
}

export default f16
