import type { AircraftData } from '../../lib/types'

const cessna172: AircraftData = {
  slug: 'cessna-172',
  name: 'Cessna 172 Skyhawk',
  subtitle: 'Simple & Stable — The most produced aircraft in history (44,000+)',
  role: 'General aviation & trainer',
  mission: {
    problem: 'Providing docile, safe, and highly forgiving flight characteristics for pilot training.',
    tradeOffs: [
      { label: 'Low speed', detail: 'Max speed of 126 knots (230 km/h)' },
      { label: 'High drag fixed gear', detail: 'Tricycle landing gear causes 10% drag penalty' },
      { label: 'Minimal automation', detail: 'Direct mechanical cable control requiring manual trim' },
    ],
    provocativeQuestion: 'Why is the Cessna 172 the most forgiving aircraft ever built?',
  },
  specifications: [
    {
      id: 'stall',
      label: 'Stall Speed (Flaps Down)',
      value: '47',
      unit: 'kts',
      type: 'Measured',
      source: 'Cessna 172S NAV III Pilot Operating Handbook (POH)',
      conditions: 'Power off, max weight 1,157 kg',
      credibility: 'Primary Source — Certified POH',
      physics: 'Low wing loading (63.8 kg/m²) yields slow stall speed V_s = √(2W/(ρSC_Lmax)).',
      whyMatters: 'Gives student pilots ample time to recognize and recover from inadvertent stalls.',
    },
    {
      id: 'sm',
      label: 'Static Margin',
      value: '+3.0%',
      unit: 'MAC',
      type: 'Calculated',
      source: 'Cessna Aircraft Company Aerodynamic Design Report',
      conditions: 'Forward CG envelope',
      credibility: 'Primary Source',
      physics: 'CG located ahead of wing aerodynamic center creates automatic pitch restoration.',
      whyMatters: 'Aircraft naturally returns to trimmed airspeed if controls are released.',
    },
  ],
  designSystems: [
    {
      id: 'aerodynamics',
      letter: 'A',
      name: 'High-Wing Dihedral & Washout',
      problem: 'Preventing tip stalls that cause wing-drop spin entries during student pilot errors.',
      solution: 'High wing placement provides pendulum stability, while -3° wingtip washout ensures wing root stalls first.',
      labSlug: 'wing-loading',
      labName: 'Wing Loading ↔ Stall Speed',
      realData: ['Wing area: 16.17 m²', 'Aspect ratio: 7.32', 'Wing loading: 63.8 kg/m²'],
      sources: ['Cessna 172 POH Section 7'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'High Wing Placement',
      supersonicBenefit: 'Inherent pendulum stability & ground visibility',
      subsonicCost: 'Upward visibility blocked in steep bank turns',
    },
  ],
  evidence: [
    {
      id: 'ev-172-poh',
      claim: 'Cessna 172S stall speed certified at 47 KCAS with full flaps',
      sources: [
        {
          tier: 'primary',
          publisher: 'Cessna Aircraft Company',
          document: 'Model 172S Pilot Operating Handbook',
          type: 'Certified Flight Manual',
          year: 2005,
          credibility: 'Primary Source — Manufacturer POH',
          quote: 'Stall Speed in Landing Configuration (V_S0): 47 KCAS at 2,550 lbs MTOW.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'Cessna 172 Skyhawk', slug: 'cessna-172', aspectRatio: 7.32, maxMach: 0.23, wingArea: 16.17, era: '1960s', wingType: 'High-wing rectangular' },
    { name: 'Piper Cub', slug: 'piper-cub', aspectRatio: 6.7, maxMach: 0.15, wingArea: 17.15, era: '1960s', wingType: 'Strut-braced high wing' },
    { name: 'Concorde', slug: 'concorde', aspectRatio: 1.83, maxMach: 2.04, wingArea: 358, era: '1960s', wingType: 'Ogival delta' },
  ],
  relatedQuestions: [
    {
      question: 'Why is the Cessna 172 the most forgiving aircraft ever built?',
      url: '/questions/cessna-172',
      description: 'Deep dive into wing washout, static margin, and stall physics.',
    },
  ],
  labs: [
    {
      slug: 'wing-loading',
      title: 'Wing Loading ↔ Stall Speed',
      subtitle: 'Analyze 63.8 kg/m² low wing loading.',
      concordeConnection: 'Cessna 172 relies on low wing loading for docile low-speed handling.',
    },
  ],
}

export default cessna172
