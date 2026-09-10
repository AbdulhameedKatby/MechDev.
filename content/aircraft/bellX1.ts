import type { AircraftData } from '../../lib/types'

const bellX1: AircraftData = {
  slug: 'bell-x1',
  name: 'Bell X-1',
  subtitle: 'Historic First — Breaking the sound barrier (October 14, 1947)',
  role: 'Historic rocket research aircraft',
  mission: {
    problem: 'Proving human survival and control authority beyond the sound barrier (Mach 1.0) in transonic flight.',
    tradeOffs: [
      { label: '5-minute rocket burn time', detail: 'Liquid rocket fuel limits powered flight to 2.5 minutes at full 6,000 lbf thrust' },
      { label: 'Air-launch required', detail: 'Must be dropped from a B-29 mothership at 23,000 ft' },
    ],
    provocativeQuestion: 'How did Chuck Yeager break the sound barrier in a bullet with wings?',
  },
  specifications: [
    {
      id: 'mach',
      label: 'Recorded Speed (Oct 14, 1947)',
      value: 'Mach 1.06',
      unit: '',
      type: 'Measured',
      source: 'USAF Flight Test Report No. 47-1 (Bell X-1)',
      conditions: 'FL430, rocket power, Chuck Yeager pilot',
      credibility: 'Primary Source — USAF Test Record',
      physics: 'Thin 8% thickness airfoil prevented shock wave detachment and violent control tuck.',
      whyMatters: 'First supersonic flight in human history.',
    },
  ],
  designSystems: [
    {
      id: 'aerodynamics',
      letter: 'A',
      name: 'Bullet Shape & Thin Airfoil',
      problem: 'Transonic drag rise and shock stall caused control surface lock-up in older aircraft.',
      solution: 'Patterned after a .50-caliber bullet known to be stable at Mach 1.5, with razor-thin 8% thickness wings.',
      labSlug: 'wing-sweep',
      labName: 'Wing Sweep ↔ Wave Drag',
      realData: ['Wing thickness: 8%', 'Rocket thrust: 6,000 lbf', 'Launch altitude: 23,000 ft'],
      sources: ['USAF Flight Test Report No. 47-1'],
    },
  ],
  tradeOffs: [
    {
      aspect: '50-Caliber Bullet Fuselage Shape',
      supersonicBenefit: 'Stable supersonic shock wave formation at Mach 1.06',
      subsonicCost: 'Unpowered glide landing required at 140 knots',
    },
  ],
  evidence: [
    {
      id: 'ev-x1-cert',
      claim: 'Bell X-1 achieved Mach 1.06 on October 14, 1947 piloted by Chuck Yeager',
      sources: [
        {
          tier: 'primary',
          publisher: 'United States Air Force / NACA',
          document: 'X-1 Supersonic Flight Certification Report',
          type: 'Flight Test Report',
          year: 1947,
          credibility: 'Primary Source',
          quote: 'On 14 October 1947, Captain Charles E. Yeager piloted the Bell X-1 to Mach 1.06 at 43,000 feet.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Bell X-1', slug: 'bell-x1', aspectRatio: 6.0, maxMach: 1.06, wingArea: 12.0, era: '1960s', wingType: 'Straight thin airfoil' },
    { name: 'Concorde', slug: 'concorde', aspectRatio: 1.83, maxMach: 2.04, wingArea: 358, era: '1960s', wingType: 'Ogival delta' },
  ],
  relatedQuestions: [
    {
      question: 'How did Chuck Yeager break the sound barrier?',
      url: '/concepts/supersonic-aerodynamics',
      description: 'Learn early supersonic physics and thin wing aerodynamics.',
    },
  ],
  labs: [
    {
      slug: 'wing-sweep',
      title: 'Wing Sweep ↔ Wave Drag',
      subtitle: 'Analyze critical Mach number delay.',
      concordeConnection: 'Bell X-1 used an 8% razor-thin straight wing to cross Mach 1 in 1947.',
    },
  ],
}

export default bellX1
