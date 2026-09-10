import type { AircraftData } from '../../lib/types'

const f35b: AircraftData = {
  slug: 'f35b-hover',
  name: 'F-35B Lightning II',
  subtitle: 'Modern STOVL Fighter — Stealth, Mach 1.6 & 40,000 lbf shaft lift',
  role: 'Fifth-generation STOVL stealth fighter',
  mission: {
    problem: 'Combining stealth radar evasion, Mach 1.6 supersonic performance, and vertical landing on amphib assault ships.',
    tradeOffs: [
      { label: 'Weight penalty from lift fan', detail: 'Shaft-driven lift fan adds ~1,800 kg dead weight during supersonic cruise' },
      { label: 'Reduced internal fuel capacity', detail: 'Lift fan bay occupies space, reducing internal fuel to 6,125 kg vs 8,270 kg for F-35A' },
    ],
    provocativeQuestion: 'How does the F-35B hover without melting runways?',
  },
  specifications: [
    {
      id: 'fan-thrust',
      label: 'Lift Fan Vertical Thrust',
      value: '20,000',
      unit: 'lbf',
      type: 'Measured',
      source: 'Pratt & Whitney F135-PW-600 Propulsion System Specification',
      conditions: 'Sea level static, 29,000 shp shaft input',
      credibility: 'Primary Source — Pratt & Whitney',
      physics: 'Shaft-driven lift fan provides 20,000 lbf cool air (40°C) thrust forward of CG.',
      whyMatters: 'Prevents hot gas ingestion (HGI) into main engine inlet during hover.',
    },
  ],
  designSystems: [
    {
      id: 'propulsion',
      letter: 'A',
      name: 'Shaft-Driven Lift Fan & 3BSD Nozzle',
      problem: 'Directing 1,500°C main exhaust downward scorches asphalt and stalls the engine via hot gas ingestion.',
      solution: 'Rolls-Royce LiftSystem uses a clutch-driven 2-stage fan producing 20,000 lbf of cool bypass air forward, balanced by a 3-bearing swivel duct (3BSD) rearward.',
      labSlug: 'thrust-vectoring',
      labName: 'Thrust Vectoring ↔ Transition',
      realData: ['Lift fan thrust: 20,000 lbf', '3BSD thrust: 18,000 lbf', 'Roll post thrust: 2 × 1,950 lbf'],
      sources: ['Pratt & Whitney F135 Spec'],
    },
  ],
  tradeOffs: [
    {
      aspect: 'Shaft-Driven Lift Fan',
      supersonicBenefit: 'Cool air hover preventing hot gas ingestion',
      subsonicCost: '1,800 kg structural dead weight in supersonic cruise',
    },
  ],
  evidence: [
    {
      id: 'ev-f35b-spec',
      claim: 'F135-PW-600 lift fan delivers 20,000 lbf thrust driven by 29,000 shp main shaft',
      sources: [
        {
          tier: 'primary',
          publisher: 'Pratt & Whitney / Rolls-Royce',
          document: 'F135 STOVL Propulsion System Overview',
          type: 'Technical Specification',
          year: 2012,
          credibility: 'Primary Source — Propulsion Consortium',
          quote: 'The shaft-driven lift fan absorbs 29,000 shp from the low-pressure turbine to generate 20,000 lbf of cold lift thrust.',
        },
      ],
    },
  ],
  comparisonAircraft: [
    { name: 'F-35B Lightning II', slug: 'f35b-hover', aspectRatio: 2.66, maxMach: 1.60, wingArea: 42.7, era: '2000s', wingType: 'Trapezoidal stealth' },
    { name: 'Harrier GR.9', slug: 'harrier-vtol', aspectRatio: 3.3, maxMach: 0.90, wingArea: 21.4, era: '1960s', wingType: 'Anhedral swept' },
  ],
  relatedQuestions: [
    {
      question: 'How does the F-35B hover without melting runways?',
      url: '/questions/f35b-hover',
      description: 'Deep dive into 3BSD vectoring, 29,000 shp lift fan shaft, and HGI physics.',
    },
  ],
  labs: [
    {
      slug: 'thrust-vectoring',
      title: 'Thrust Vectoring ↔ Transition',
      subtitle: 'Analyze 3BSD vectoring and lift fan force balance.',
      concordeConnection: 'F-35B balances 40,000 lbf total vertical thrust using cold lift fan air forward.',
    },
  ],
}

export default f35b
