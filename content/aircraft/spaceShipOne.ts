import type { AircraftData } from '../../lib/types'

const spaceShipOne: AircraftData = {
  slug: 'spaceshipone',
  name: 'SpaceShipOne',
  subtitle: 'Suborbital Spaceflight — Feathering re-entry & hybrid rocket engine',
  role: 'Suborbital commercial spacecraft',
  mission: {
    problem: 'Climbing to 100 km altitude (the Kármán line boundary of space) and re-entering atmosphere safely without complex computer control.',
    tradeOffs: [
      { label: 'Air-launch requirement', detail: 'Must be carried to 46,000 ft by White Knight mothership before rocket ignition' },
      { label: 'Non-orbital', detail: 'Mach 3 speed is suborbital; orbital flight requires Mach 25' },
    ],
    provocativeQuestion: 'How does an aircraft reach space and re-enter safely without a computer?',
  },
  specifications: [
    {
      id: 'altitude',
      label: 'Record Altitude Achieved',
      value: '112.0',
      unit: 'km',
      type: 'Measured',
      source: 'Ansari X Prize Verification Flight Report (Oct 4, 2004)',
      conditions: 'Hybrid rocket burn, Brian Binnie pilot',
      credibility: 'Primary Source — FAI Official Record',
      physics: 'Crosses Kármán line (100 km) into space where aerodynamic control surfaces cease to function.',
      whyMatters: 'Won the $10M Ansari X Prize for non-governmental spaceflight.',
    },
  ],
  designSystems: [
    {
      id: 'aerodynamics',
      letter: 'A',
      name: 'Pneumatic Feathering Wing Re-Entry',
      problem: 'Re-entry from 100 km causes extreme aerodynamic instability and pitch tuck if misaligned.',
      solution: 'Pneumatic actuators rotate rear wing section up by 65°, creating high drag that automatically shuttlecocks the vehicle into proper heat-shield attitude.',
      labSlug: 'altitude-density',
      labName: 'Atmospheric Altitude & Density',
      realData: ['Feather angle: 65°', 'Apogee altitude: 112 km', 'Max speed: Mach 3.09'],
      sources: ['Scaled Composites Flight Log'],
    },
  ],
  tradeOffs: [
    {
      aspect: '65° Pneumatic Feathering System',
      supersonicBenefit: 'Self-righting aerodynamic re-entry stability without active RCS computers',
      subsonicCost: 'Requires high altitude release (46,000 ft) from White Knight carrier aircraft',
    },
  ],
  evidence: [
    {
      id: 'ev-sso-record',
      claim: 'SpaceShipOne reached 112.0 km altitude on October 4, 2004 winning the X Prize',
      sources: [
        {
          tier: 'primary',
          publisher: 'Fédération Aéronautique Internationale (FAI) / Scaled Composites',
          document: 'Official World Record Claim — Suborbital Spaceflight',
          type: 'Official Record Certification',
          year: 2004,
          credibility: 'Primary Source — FAI World Air Sports Federation',
          quote: 'SpaceShipOne achieved a maximum altitude of 112.0 km (367,442 ft), exceeding the 100 km space boundary.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'SpaceShipOne', slug: 'spaceshipone', aspectRatio: 6.7, maxMach: 3.09, wingArea: 18.3, era: '2000s', wingType: 'Feathering wing-tail' },
    { name: 'SR-71 Blackbird', slug: 'sr71-blackbird', aspectRatio: 1.94, maxMach: 3.3, wingArea: 167, era: '1960s', wingType: 'Delta with chines' },
  ],
  relatedQuestions: [
    {
      question: 'How does an aircraft reach space?',
      url: '/lab/altitude-density',
      description: 'Explore atmospheric density drop and suborbital rocket physics.',
    },
  ],
  labs: [
    {
      slug: 'altitude-density',
      title: 'Atmospheric Altitude & Density',
      subtitle: 'Analyze 100 km Kármán line transition.',
      concordeConnection: 'SpaceShipOne uses a pneumatic feathering wing to re-enter from 112 km altitude.',
    },
  ],
}

export default spaceShipOne
