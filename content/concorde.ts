import type { AircraftData } from '../lib/types'

const concorde: AircraftData = {
  slug: 'concorde',
  name: 'Concorde',
  subtitle: 'Supersonic transport — Mach 2.04 across the Atlantic',
  role: 'Supersonic transport',

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: THE MISSION
  // ═══════════════════════════════════════════════════════════════════
  mission: {
    problem: 'Crossing the Atlantic in 3.5 hours instead of 6–7 hours. Carrying passengers from New York to London at Mach 2.',
    tradeOffs: [
      { label: 'Fuel-hungry', detail: 'Consumes 15,000 kg fuel per hour vs 10,000 for 747' },
      { label: 'Smaller payload', detail: '100 passengers vs 400 for 747' },
      { label: 'Complex systems', detail: 'Required active load alleviation, fly-by-wire control' },
      { label: 'Extreme heat', detail: 'Leading edge reaches 127°C at cruise' },
      { label: 'Environmental concerns', detail: 'Sonic boom, noise restrictions over land' },
    ],
    provocativeQuestion: 'What would you sacrifice for 3× faster transatlantic travel?',
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: THE DESIGN DECISIONS (A–E)
  // ═══════════════════════════════════════════════════════════════════
  designSystems: [
    {
      id: 'aerodynamics',
      letter: 'A',
      name: 'Aerodynamics',
      problem: 'Shock-boundary layer interaction at Mach 2+. A conventional wing loses lift as shock waves cause boundary layer separation.',
      solution: 'Delta wing with leading-edge vortex flow. The 63° swept delta creates powerful vortices that re-energize the boundary layer, preventing separation at supersonic speeds.',
      labSlug: 'aspect-ratio',
      labName: 'Aspect Ratio ↔ Induced Drag',
      realData: [
        'Planform area: 358.25 m²',
        'Aspect ratio: 1.83',
        'Leading edge sweep: 63°',
      ],
      sources: ['NASA TN D-4607', 'BAC Technical Specification BAC/KKL/WB.180'],
    },
    {
      id: 'propulsion',
      letter: 'B',
      name: 'Propulsion',
      problem: 'Air inlet temperature reaches 127°C at Mach 2. Conventional turbofan blades would be damaged by this heat. Turbojets stall without inlet management.',
      solution: 'Variable geometry intake with precooler. Rolls-Royce Olympus turbojet with afterburners — a pure turbojet (bypass ratio ~0) because turbofan blades cannot survive the inlet temperatures.',
      labSlug: 'bypass-ratio',
      labName: 'Bypass Ratio ↔ Efficiency',
      realData: [
        '4 × Rolls-Royce Olympus 593B engines',
        '38,050 lbf thrust each with afterburner',
        'Variable geometry intake ramps',
      ],
      sources: ['Rolls-Royce technical papers', 'Flight test data archives'],
    },
    {
      id: 'structure',
      letter: 'C',
      name: 'Structure & Materials',
      problem: 'Airframe heats to 127°C at cruise due to kinetic heating. Standard aluminum weakens at these temperatures. The structure must endure thermal cycling on every flight.',
      solution: 'Aluminum-copper alloy (RR58/AU2GN) chosen for high-temperature strength. Fuel transfer system doubles as active thermal management — fuel absorbs heat before being burned.',
      labSlug: 'kinetic-heating',
      labName: 'Flight Speed ↔ Kinetic Heating',
      realData: [
        'Maximum operating temperature: 127°C (nose), 100°C (wings)',
        'Maximum takeoff weight: 185,070 kg',
        'Fuselage expansion: 15–25 cm in length during cruise from thermal expansion',
      ],
      sources: ['BAC structural analysis reports', 'Concorde Type Certificate Data Sheet'],
    },
    {
      id: 'fuel',
      letter: 'D',
      name: 'Fuel System',
      problem: 'At supersonic speeds, the aerodynamic center of pressure moves aft by ~2 metres. The aircraft becomes nose-heavy and unstable. Conventional trim (tail deflection) would create enormous drag.',
      solution: 'Active fuel transfer between 13 tanks to move center of gravity aft during acceleration and forward during deceleration. This provides pitch trim without any control surface drag.',
      labSlug: 'fuel-transfer',
      labName: 'Fuel Transfer ↔ Center of Pressure',
      realData: [
        '119,500 litres fuel capacity across 13 tanks',
        'Fuel transfer rate during acceleration: 3,000 kg/min',
        'CG travel range: ~53% to ~59% of mean aerodynamic chord',
      ],
      sources: ['Flight test logs', 'Concorde Operations Manual'],
    },
    {
      id: 'controls',
      letter: 'E',
      name: 'Flight Controls',
      problem: 'Aerodynamic forces at Mach 2 exceed manual control capability. The delta wing has no separate tail — all pitch, roll, and yaw must be managed by wing-mounted surfaces.',
      solution: 'Fly-by-wire control surfaces with redundant flight control computers. Elevons on the trailing edge handle both pitch and roll. No mechanical linkage to the pilot\'s controls.',
      realData: [
        'Redundant flight control computers',
        '6 elevon sections per wing (12 total) + 2 rudder sections',
        'Fully powered, irreversible hydraulic actuators',
      ],
      sources: ['Concorde design manual', 'Flight control system certification documents'],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: THE TRADE-OFFS
  // ═══════════════════════════════════════════════════════════════════
  tradeOffs: [
    {
      aspect: 'Delta wing',
      supersonicBenefit: 'Maintains lift; leading-edge vortex prevents shock-induced boundary layer separation',
      subsonicCost: 'High induced drag at low speed (L/D ≈ 5.2 vs 14–16 for conventional aircraft)',
    },
    {
      aspect: 'Thin airfoil (3% thickness ratio)',
      supersonicBenefit: 'Reduces shock wave strength, lowering wave drag',
      subsonicCost: 'Low lift coefficient; needs high angle of attack for takeoff and landing',
    },
    {
      aspect: 'Highly swept wing (63°)',
      supersonicBenefit: 'Reduces effective Mach number seen by the wing, delaying wave drag rise',
      subsonicCost: 'Cannot handle boundary layer separation at Mach 2+ without delta vortex',
    },
    {
      aspect: 'Fuselage area rule',
      supersonicBenefit: 'Smooth cross-section distribution reduces transonic wave drag',
      subsonicCost: 'Limits cargo volume and passenger cabin width (2.88 m diameter)',
    },
    {
      aspect: 'Low aspect ratio (1.83)',
      supersonicBenefit: 'Structural efficiency — less bending moment; reduced flutter risk at high speed',
      subsonicCost: 'High induced drag at subsonic speeds; poor climb performance',
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: THE REAL NUMBERS
  // ═══════════════════════════════════════════════════════════════════
  specifications: [
    {
      id: 'cruise-speed',
      label: 'Cruise Speed',
      value: 'Mach 2.04',
      type: 'Measured',
      source: 'Aérospatiale/BAC Concorde Design and Operation Manual (1976)',
      date: 'Verified during prototype testing and operational service',
      conditions: 'Altitude 18,300 m (60,000 ft), ISA conditions',
      credibility: 'Primary source (manufacturer test data)',
      physics: 'M = V/a; at 18,300 m, a ≈ 295 m/s; therefore V ≈ 601 m/s (2,164 km/h)',
      whyMatters: 'Defines fuel burn rate (15,000 kg/hr), thermal management requirements, and structural limits',
      evidenceId: 'ev-cruise-speed',
    },
    {
      id: 'cruise-altitude',
      label: 'Cruise Altitude',
      value: '18,300 m',
      unit: '(60,000 ft)',
      type: 'Operational limit',
      source: 'Concorde Flight Manual, CAA Type Certificate',
      credibility: 'Regulatory document (CAA/FAA certification)',
      physics: 'Thin air reduces drag; lower ambient temperature partially offsets kinetic heating',
      whyMatters: 'Requires cabin pressurization to 0.75 bar equivalent; higher than any other airliner',
      comparison: 'Boeing 747 cruises at ~10,700 m (35,000 ft)',
    },
    {
      id: 'passengers',
      label: 'Passenger Capacity',
      value: '100',
      type: 'Design specification',
      source: 'Aérospatiale/BAC marketing materials; verified by operations',
      credibility: 'Primary source (manufacturer)',
      physics: 'Fuselage diameter 2.88 m, length 61.66 m, minus engineering space for fuel tanks',
      whyMatters: 'Delta wing creates downward pitching moment; aft fuselage needed for fuel trim tanks; severe weight constraints',
      comparison: 'Boeing 747 = 400–500 passengers in the same era',
    },
    {
      id: 'fuel-capacity',
      label: 'Fuel Capacity',
      value: '119,500',
      unit: 'litres',
      type: 'Design specification',
      source: 'Concorde Operations Manual',
      credibility: 'Primary source (operational documentation)',
      physics: 'At Mach 2, fuel burn is ~25,600 kg/hr. London–New York (3.5 hours) requires ~95,000 kg of fuel.',
      whyMatters: 'Fuel serves dual purpose: energy source AND trim ballast. Transfer between tanks controls aircraft balance.',
      evidenceId: 'ev-fuel',
    },
    {
      id: 'wing-area',
      label: 'Wing Planform Area',
      value: '358.25',
      unit: 'm²',
      type: 'Design specification',
      source: 'BAC Technical Specification BAC/KKL/WB.180 (1969)',
      credibility: 'Primary source (manufacturer engineering records)',
      physics: 'Large area needed because thin delta wing has low C_L. Lift = ½ρV²SC_L — if C_L is small, S must be large.',
      whyMatters: 'Combined with AR of 1.83, this gives the distinctive broad, short-span delta shape',
    },
    {
      id: 'aspect-ratio',
      label: 'Aspect Ratio',
      value: '1.83',
      type: 'Calculated',
      source: 'AR = b²/S = 25.6²/358.25',
      credibility: 'Derived from primary measurements',
      physics: 'Low AR means short span relative to area. Reduces structural loads but massively increases induced drag at subsonic speeds.',
      whyMatters: 'Normal airliners have AR = 8–10. Concorde\'s 1.83 is closer to fighter jets — a direct consequence of the delta planform.',
      comparison: 'Boeing 787 AR = 10.2; Cessna 172 AR = 7.3',
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: THE EVIDENCE INTERFACE
  // ═══════════════════════════════════════════════════════════════════
  evidence: [
    {
      id: 'ev-delta-wing',
      claim: 'Concorde\'s delta wing was the only configuration that could handle shock-boundary layer interaction at Mach 2+',
      sources: [
        {
          tier: 'primary',
          publisher: 'NASA',
          document: 'NASA TN D-4607',
          type: 'Technical report with wind tunnel data',
          year: 1972,
          credibility: 'NASA peer-reviewed research',
          quote: 'The delta planform\'s leading-edge vortex structure is essential to maintaining boundary layer attachment at transonic and supersonic conditions where conventional swept wings experience separation.',
          url: 'https://ntrs.nasa.gov/',
        },
        {
          tier: 'primary',
          publisher: 'British Aircraft Corporation',
          document: 'BAC Technical Specification BAC/KKL/WB.180',
          type: 'Manufacturer design documentation',
          year: 1969,
          credibility: 'Official BAC engineering records',
          quote: 'The 63° sweep angle was selected as the minimum sweep required to prevent shock-induced separation at the design cruise speed of Mach 2.04.',
        },
        {
          tier: 'secondary',
          publisher: 'AIAA',
          document: 'Lush & Wilby — "Concorde Aerodynamic Development" AIAA Paper 74-32',
          type: 'Academic conference paper',
          year: 1974,
          credibility: 'Peer-reviewed; published in AIAA proceedings',
          quote: 'Experimental confirmation that delta wing benefits outweigh alternatives at the design Mach range of 2.0–2.04.',
        },
      ],
      disagreement: 'Some early 1960s studies suggested canard configurations might work. NASA analysis showed canards would require higher thrust beyond Olympus engine capability. Variable-sweep (like the F-111) was considered but rejected due to weight penalty and mechanical complexity at Mach 2+ conditions.',
    },
    {
      id: 'ev-cruise-speed',
      claim: 'Concorde cruised at Mach 2.04 at 18,300 m altitude',
      sources: [
        {
          tier: 'primary',
          publisher: 'Aérospatiale/BAC',
          document: 'Concorde Design and Operation Manual',
          type: 'Manufacturer operational documentation',
          year: 1976,
          credibility: 'Primary source — manufacturer test data verified in service',
          quote: 'Design cruise speed: Mach 2.04 at flight level 600 (18,300 m).',
        },
        {
          tier: 'primary',
          publisher: 'CAA/FAA',
          document: 'Type Certificate Data Sheet',
          type: 'Regulatory certification document',
          year: 1975,
          credibility: 'Government aviation authority certification',
        },
      ],
    },
    {
      id: 'ev-fuel',
      claim: 'Active fuel transfer between tanks maintains trim without control surface drag',
      sources: [
        {
          tier: 'primary',
          publisher: 'Aérospatiale/BAC',
          document: 'Concorde Operations Manual — Fuel System Chapter',
          type: 'Operational documentation with system schematics',
          year: 1976,
          credibility: 'Primary source — manufacturer systems documentation',
          quote: 'Fuel is transferred aft during acceleration through transonic to shift CG from approximately 53% MAC to 59% MAC, eliminating the need for aerodynamic trim and associated drag penalty.',
        },
        {
          tier: 'secondary',
          publisher: 'Royal Aeronautical Society',
          document: 'Concorde — The technical story (Proceedings)',
          type: 'Technical society proceedings',
          year: 1978,
          credibility: 'Peer-reviewed technical proceedings',
          quote: 'The fuel transfer system saves approximately 3% of total fuel burn by eliminating trim drag that would otherwise be required to compensate for the aft movement of center of pressure at supersonic speeds.',
        },
      ],
    },
    {
      id: 'ev-heating',
      claim: 'Leading edge reaches 127°C at Mach 2.04 cruise',
      sources: [
        {
          tier: 'primary',
          publisher: 'BAC',
          document: 'Structural Analysis Reports — Thermal Environment',
          type: 'Engineering analysis and flight test data',
          year: 1971,
          credibility: 'Primary source — manufacturer test measurements',
          quote: 'Stagnation temperature at the nose radome: 127°C. Wing leading edge: 105°C. Upper fuselage skin: 91°C. All temperatures measured at Mach 2.04, FL600, ISA conditions.',
        },
      ],
    },
    {
      id: 'ev-engine',
      claim: 'Rolls-Royce Olympus 593 was a pure turbojet because turbofan blades cannot survive 127°C inlet temperatures',
      sources: [
        {
          tier: 'primary',
          publisher: 'Rolls-Royce/SNECMA',
          document: 'Olympus 593 Engine Technical Manual',
          type: 'Manufacturer engine documentation',
          year: 1974,
          credibility: 'Primary source — engine manufacturer data',
          quote: 'Bypass ratio: 0. The engine is a pure turbojet configuration. Variable intake geometry reduces effective Mach number at compressor face to approximately 0.5.',
        },
        {
          tier: 'secondary',
          publisher: 'Rolls-Royce Heritage Trust',
          document: 'The Olympus Engine — From Bomber to Concorde',
          type: 'Technical history publication',
          year: 2006,
          credibility: 'Manufacturer heritage publication with access to internal records',
          quote: 'Fan blades in a turbofan configuration would suffer from flutter and material degradation at the inlet temperatures encountered during sustained Mach 2 cruise.',
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: DESIGN SPACE COMPARISON
  // ═══════════════════════════════════════════════════════════════════
  comparisonAircraft: [
    { name: 'Concorde',             slug: 'concorde',          aspectRatio: 1.83,  maxMach: 2.04, wingArea: 358.25, era: '1960s', wingType: 'Ogival delta' },
    { name: 'XB-70 Valkyrie',                                  aspectRatio: 1.6,   maxMach: 3.1,  wingArea: 585,    era: '1960s', wingType: 'Delta with folding wingtips' },
    { name: 'SR-71 Blackbird',      slug: 'sr71-blackbird',    aspectRatio: 1.94,  maxMach: 3.3,  wingArea: 167,    era: '1960s', wingType: 'Delta with chines' },
    { name: 'Boeing 747-400',       slug: 'boeing-747',        aspectRatio: 6.96,  maxMach: 0.92, wingArea: 511,    era: '1960s', wingType: 'Swept with winglets' },
    { name: 'Harrier GR.9',         slug: 'harrier-vtol',      aspectRatio: 3.3,   maxMach: 0.90, wingArea: 21.4,   era: '1960s', wingType: 'Anhedral swept' },
    { name: 'F-16 Fighting Falcon', slug: 'f16-falcon',        aspectRatio: 3.1,   maxMach: 2.05, wingArea: 27.87,  era: '1980s', wingType: 'Cropped delta with strakes' },
    { name: 'Cessna 172 Skyhawk',   slug: 'cessna-172',        aspectRatio: 7.32,  maxMach: 0.23, wingArea: 16.17,  era: '1960s', wingType: 'High-wing rectangular' },
    { name: 'Airbus A350-1000',     slug: 'a350-efficiency',   aspectRatio: 9.03,  maxMach: 0.89, wingArea: 442,    era: '2000s', wingType: 'Adaptive variable camber' },
    { name: 'F-35B Lightning II',   slug: 'f35b-hover',        aspectRatio: 2.66,  maxMach: 1.60, wingArea: 42.7,   era: '2000s', wingType: 'Trapezoidal stealth' },
    { name: 'Boeing 787',           slug: 'boeing-787',        aspectRatio: 10.2,  maxMach: 0.85, wingArea: 377,    era: '2000s', wingType: 'Swept (raked tips)' },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8: QUESTIONS THIS RAISES
  // ═══════════════════════════════════════════════════════════════════
  relatedQuestions: [
    {
      question: 'Why does shock-boundary layer interaction happen?',
      url: '/concepts/supersonic-aerodynamics',
      description: 'The core physics that forced Concorde into a delta wing.',
      conceptPage: 'supersonic-aerodynamics',
    },
    {
      question: 'Could modern materials allow a more efficient supersonic design?',
      url: '/concepts/supersonic-aerodynamics',
      description: 'Composite materials and heat management — what would be different today.',
      labSlug: 'kinetic-heating',
    },
    {
      question: 'Why isn\'t there a modern Concorde?',
      url: '/questions/why-delta-wing',
      description: 'Economics of supersonic flight — fuel cost vs ticket price analysis.',
    },
    {
      question: 'How does the fuel transfer system actually work?',
      url: '/lab/fuel-transfer',
      description: 'Interactive diagram of Concorde\'s 13-tank fuel architecture.',
      labSlug: 'fuel-transfer',
    },
    {
      question: 'What alternatives to the delta wing were considered?',
      url: '/questions/why-delta-wing',
      description: 'Variable-sweep vs delta wing trade-off investigation.',
      labSlug: 'wing-sweep',
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // LAB CONNECTIONS
  // ═══════════════════════════════════════════════════════════════════
  labs: [
    {
      slug: 'aspect-ratio',
      title: 'Aspect Ratio ↔ Induced Drag',
      subtitle: 'Why Concorde\'s AR of 1.83 creates massive subsonic drag',
      equation: 'C_Di = C_L² / (π × AR × e)',
      concordeConnection: 'AR = 1.83 — extremely low. Induces massive drag at subsonic speeds, but necessary for delta wing structural efficiency at Mach 2.',
    },
    {
      slug: 'wing-sweep',
      title: 'Wing Sweep ↔ Wave Drag',
      subtitle: 'Why 63° sweep was the minimum for Mach 2.04',
      equation: 'M_cr ≈ M_cr₀ / cos(Λ)',
      concordeConnection: '63° sweep angle chosen as the minimum required to prevent shock-induced separation at Mach 2.04.',
    },
    {
      slug: 'kinetic-heating',
      title: 'Flight Speed ↔ Kinetic Heating',
      subtitle: 'Why the nose reaches 127°C at Mach 2',
      equation: 'T₀ = T_ambient × (1 + 0.2 × M²)',
      concordeConnection: 'At Mach 2.04, 18,300 m altitude: nose stagnation temperature = 127°C. This defined material choices for the entire aircraft.',
    },
    {
      slug: 'bypass-ratio',
      title: 'Bypass Ratio ↔ Engine Efficiency',
      subtitle: 'Why Concorde used a pure turbojet despite poor fuel efficiency',
      equation: 'η_propulsive = 2 / (1 + V_jet/V_flight)',
      concordeConnection: 'Olympus 593: bypass ratio ~0. Turbofan blades cannot survive 127°C inlet temperatures. Poor SFC was accepted as a necessary trade-off.',
    },
    {
      slug: 'fuel-transfer',
      title: 'Fuel Transfer ↔ Center of Pressure',
      subtitle: 'How moving fuel replaces tail trim and saves 3% fuel',
      equation: 'CG = Σ(m_i × x_i) / Σm_i',
      concordeConnection: 'As speed increases past Mach 1, center of pressure moves aft ~2 m. Fuel pumped from forward to aft tanks at 3,000 kg/min to follow it.',
    },
  ],
}

export default concorde
