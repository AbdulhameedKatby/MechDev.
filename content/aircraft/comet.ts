import type { AircraftData } from '../../lib/types'

const comet: AircraftData = {
  slug: 'comet-failure',
  name: 'De Havilland Comet',
  subtitle: 'Jet Age Pioneer — Structural fatigue & pressurization lessons',
  role: 'Pioneering commercial jetliner',
  mission: {
    problem: 'Pioneering passenger jet service in 1952 at 40,000 ft altitude with 0.57 bar cabin pressurization.',
    tradeOffs: [
      { label: 'Square window stress concentration', detail: 'Sharp window corners created local stress multiplier K_t ≈ 3.0' },
      { label: 'Unchecked metal fatigue', detail: 'Cyclic pressurization caused catastrophic mid-air fuselage rupture' },
    ],
    provocativeQuestion: 'Why did the Comet fail, and what did it teach modern aviation?',
  },
  specifications: [
    {
      id: 'stress',
      label: 'Window Corner Stress Factor',
      value: '3.0×',
      unit: 'K_t',
      type: 'Calculated',
      source: 'RAE Farnborough Comet Court of Inquiry Report (1955)',
      conditions: 'Square passenger window punch-out',
      credibility: 'Primary Source — Royal Aircraft Establishment Inquiry',
      physics: 'Inglis crack theory K_t = 1 + 2√(a/ρ). Sharp square corners (small ρ) tripled local hoop stress.',
      whyMatters: 'Changed all commercial airliners to round/oval windows forever.',
    },
  ],
  designSystems: [
    {
      id: 'structures',
      letter: 'A',
      name: 'Square Windows & Fatigue Cracks',
      problem: 'Repeated pressurization cycling (takeoff to FL400 to landing) caused fatigue crack growth.',
      solution: 'Full water-tank testing at RAE Farnborough identified stress concentration; modern airliners use rounded windows and fail-safe tear straps.',
      labSlug: 'structural-stress',
      labName: 'Fuselage Hoop Stress',
      realData: ['Cabin ΔP: 8.25 psi', 'Window shape: Square', 'Stress multiplier: 3.0x'],
      sources: ['RAE Farnborough Inquiry Report 1955'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Square Passenger Windows',
      supersonicBenefit: 'Pioneered 450 knot high-altitude passenger jet cruise in 1952',
      subsonicCost: 'High stress concentration K_t=3.0 led to catastrophic fuselage fatigue rupture',
    },
  ],
  evidence: [
    {
      id: 'ev-comet-inquiry',
      claim: 'RAE Farnborough Court of Inquiry determined square window stress fatigue caused Comet 1 breakups',
      sources: [
        {
          tier: 'primary',
          publisher: 'Royal Aircraft Establishment (RAE)',
          document: 'Report of the Court of Inquiry into the Accidents to Comet Aircraft',
          type: 'Official Investigation Report',
          year: 1955,
          credibility: 'Primary Source — Official Inquiry',
          quote: 'The failure of the pressure cabin was due to fatigue of the skin structure near the ADF window punch-outs.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'De Havilland Comet', slug: 'comet-failure', aspectRatio: 6.8, maxMach: 0.74, wingArea: 187, era: '1960s', wingType: 'Swept with buried engines' },
    { name: 'Boeing 707', aspectRatio: 7.0, maxMach: 0.88, wingArea: 268, era: '1960s', wingType: 'Swept podded engines' },
  ],
  relatedQuestions: [
    {
      question: 'Why did the Comet fail, and what did we learn?',
      url: '/concepts/structural-scaling',
      description: 'Learn structural fatigue, hoop stress, and stress concentration physics.',
    },
  ],
  labs: [
    {
      slug: 'structural-stress',
      title: 'Fuselage Hoop Stress',
      subtitle: 'Analyze square window stress concentration K_t.',
      concordeConnection: 'Comet failures forced all subsequent pressurized airliners to adopt oval windows.',
    },
  ],
}

export default comet
