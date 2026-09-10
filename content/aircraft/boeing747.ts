import type { AircraftData } from '../../lib/types'

const boeing747: AircraftData = {
  slug: 'boeing-747',
  name: 'Boeing 747-400',
  subtitle: 'The Wide-Body Revolution — Transatlantic scale & efficiency',
  role: 'Long-range commercial transport',
  mission: {
    problem: 'Carrying 400+ passengers across intercontinental distances at high subsonic speed with viable per-seat economics.',
    tradeOffs: [
      { label: 'Enormous mass', detail: 'MTOW of 412,775 kg requires massive structural wing spars' },
      { label: 'Complex pressurization', detail: '6.5m diameter fuselage creates 97.5 MPa hoop stress at 11 psi ΔP' },
      { label: 'Airport constraints', detail: '64.4m wingspan requires Class E airport gate compatibility' },
      { label: 'Engine maintenance', detail: 'Four high-bypass turbofans require double engine servicing vs twins' },
    ],
    provocativeQuestion: 'Why did making an aircraft twice as big actually make it twice as efficient?',
  },
  specifications: [
    {
      id: 'mtow',
      label: 'Max Takeoff Weight',
      value: '412,775',
      unit: 'kg',
      type: 'Measured',
      source: 'Boeing 747-400 Type Certificate Data Sheet (TCDS A20WE)',
      conditions: 'Max structural limit at brake release',
      credibility: 'Primary Source — FAA Certification',
      physics: 'Requires 174,000 lbf total thrust for sea-level takeoff acceleration.',
      whyMatters: 'Dictates wing planform area (511 m²) and landing gear wheel counts.',
    },
    {
      id: 'bpr',
      label: 'Engine Bypass Ratio',
      value: '5.0:1',
      unit: '',
      type: 'Design specification',
      source: 'Pratt & Whitney JT9D Engine Operating Manual',
      conditions: 'ISA Cruise FL350',
      credibility: 'Primary Source — Manufacturer Data',
      physics: 'Bypass air provides 80% of total thrust with 20% lower SFC than turbojets.',
      whyMatters: 'Pioneered high-bypass turbofan economics on long-haul routes.',
    },
    {
      id: 'range',
      label: 'Maximum Range',
      value: '13,450',
      unit: 'km',
      type: 'Operational limit',
      source: 'Boeing Commercial Airplane Performance Specs',
      conditions: '416 pax + reserves',
      credibility: 'Primary Source — Operation Specs',
      physics: 'Breguet range equation R = (V/g)(L/D)(1/SFC) ln(W_i/W_f).',
      whyMatters: 'Opened non-stop transpacific routes (Tokyo to LA).',
    },
    {
      id: 'fuselage',
      label: 'Fuselage Diameter',
      value: '6.50',
      unit: 'm',
      type: 'Measured',
      source: 'Boeing 747 Airport Compatibility Document',
      conditions: 'External shell measurement',
      credibility: 'Primary Source',
      physics: 'Double-deck seating layout creates high hoop stress σ = ΔP·r/t.',
      whyMatters: 'Pioneered twin-aisle wide-body passenger cabin architecture.',
    },
  ],
  designSystems: [
    {
      id: 'aerodynamics',
      letter: 'A',
      name: 'Aerodynamics & Hump Design',
      problem: 'Balancing a 6.5m wide fuselage with Mach 0.85 transonic cruise capability without wave drag penalties.',
      solution: '37.5° wing sweep combined with an aerodynamically contoured upper-deck hump that acts as an area-rule body.',
      labSlug: 'aspect-ratio',
      labName: 'Aspect Ratio ↔ Induced Drag',
      realData: ['Wing area: 511 m²', 'Aspect ratio: 6.96', 'Wing sweep: 37.5°'],
      sources: ['Boeing Technical Report D6-13000', 'NASA CR-114402'],
    },
    {
      id: 'propulsion',
      letter: 'B',
      name: 'High-Bypass Turbofans',
      problem: 'Older turbojets (BPR 0) burned too much fuel for a 400-ton aircraft to fly across the Pacific.',
      solution: 'Pratt & Whitney JT9D / GE CF6 turbofans with 5:1 bypass ratio, routing most mass flow around the hot core.',
      labSlug: 'bypass-ratio',
      labName: 'Bypass Ratio ↔ Efficiency',
      realData: ['4 × 43,500 lbf engines', 'Fan diameter: 2.36 m', 'TSFC: 0.68 kg/kg/hr'],
      sources: ['Pratt & Whitney JT9D Tech Summary'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Fuselage Diameter (6.5m)',
      supersonicBenefit: 'Carries 400+ passengers with twin aisles',
      subsonicCost: 'High pressurization hoop stress & weight',
    },
    {
      aspect: 'High Bypass Ratio (5:1)',
      supersonicBenefit: '20% better fuel efficiency per seat-mile',
      subsonicCost: 'Limits max speed to Mach 0.92',
    },
  ],
  evidence: [
    {
      id: 'ev-747-tcds',
      claim: 'Boeing 747-400 MTOW certified at 412,775 kg',
      sources: [
        {
          tier: 'primary',
          publisher: 'Federal Aviation Administration (FAA)',
          document: 'Type Certificate Data Sheet A20WE',
          type: 'Regulatory certification document',
          year: 1989,
          credibility: 'Primary Source — Regulatory Agency',
          quote: 'Maximum Takeoff Weight: 910,000 lbs (412,775 kg) for 747-400 variant.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Boeing 747-400', slug: 'boeing-747', aspectRatio: 6.96, maxMach: 0.92, wingArea: 511, era: '1960s', wingType: 'Swept with winglets' },
    { name: 'Concorde', slug: 'concorde', aspectRatio: 1.83, maxMach: 2.04, wingArea: 358, era: '1960s', wingType: 'Ogival delta' },
    { name: 'Airbus A350-1000', slug: 'a350-efficiency', aspectRatio: 9.03, maxMach: 0.89, wingArea: 442, era: '2000s', wingType: 'Adaptive camber' },
  ],
  relatedQuestions: [
    {
      question: 'How did the 747 change aviation with efficiency at scale?',
      url: '/questions/boeing-747',
      description: 'Deep dive into 747 structural engineering and hoop stress.',
    },
  ],
  labs: [
    {
      slug: 'aspect-ratio',
      title: 'Aspect Ratio ↔ Induced Drag',
      subtitle: 'Compare 747 high AR wing vs Concorde delta wing.',
      concordeConnection: '747 uses AR 6.96 to minimize induced drag during subsonic cruise.',
    },
    {
      slug: 'structural-stress',
      title: 'Fuselage Hoop Stress ↔ Pressurization',
      subtitle: 'Analyze 6.5m diameter fuselage stress.',
      concordeConnection: '747 wide-body radius multiplies skin tension.',
    },
  ],
}

export default boeing747
