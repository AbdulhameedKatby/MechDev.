// ── Evidence & Source Types ──────────────────────────────────────────

export type CredibilityTier = 'primary' | 'secondary' | 'tertiary'

export type ClaimStatus = 'VERIFIED' | 'CALCULATED' | 'MODELED' | 'ESTIMATED' | 'INTERPRETED' | 'HISTORICAL' | 'USER INPUT'

export interface Source {
  tier: CredibilityTier
  publisher: string
  document: string
  type: string               // e.g. "Technical report with wind tunnel data"
  year: number
  credibility: string        // e.g. "NASA peer-reviewed research"
  quote?: string
  url?: string
}

export interface EvidenceRecord {
  id: string
  claim: string
  sources: Source[]
  disagreement?: string      // when sources conflict
}

// ── Specification Types ─────────────────────────────────────────────

export interface Specification {
  id: string
  label: string
  value: string
  unit?: string
  type: string               // "Measured" | "Operational limit" | "Design specification"
  status?: ClaimStatus
  source: string
  sourceDetail?: string
  date?: string
  conditions?: string
  credibility: string
  physics?: string           // physics explanation of the number
  whyMatters: string
  comparison?: string
  evidenceId?: string        // links to EvidenceRecord
}

// ── Design System Types ─────────────────────────────────────────────

export interface DesignSystem {
  id: string
  letter: string             // A, B, C, D, E
  name: string
  problem: string
  solution: string
  labSlug?: string           // link to interactive lab
  labName?: string
  realData: string[]
  sources: string[]
}

// ── Trade-Off Types ─────────────────────────────────────────────────

export interface TradeOff {
  aspect: string
  supersonicBenefit: string
  subsonicCost: string
}

// ── Trade-Off (Mission Level) ───────────────────────────────────────

export interface MissionTradeOff {
  label: string
  detail: string
}

// ── Aircraft Comparison Types ───────────────────────────────────────

export interface AircraftPoint {
  name: string
  slug?: string
  aspectRatio: number
  maxMach: number
  wingArea: number           // m²
  era: string                // "1960s" | "1980s" | "2000s"
  wingType: string
}

// ── Related Question Types ──────────────────────────────────────────

export interface RelatedQuestion {
  question: string
  url: string
  description: string
  conceptPage?: string
  labSlug?: string
}

// ── Lab Types ───────────────────────────────────────────────────────

export interface LabDefinition {
  slug: string
  title: string
  subtitle: string
  equation?: string
  concordeConnection: string
}

// ── Full Aircraft Data (for Concorde page) ──────────────────────────

export interface AircraftData {
  slug: string
  name: string
  subtitle: string
  role: string
  mission: {
    problem: string
    tradeOffs: MissionTradeOff[]
    provocativeQuestion: string
  }
  specifications: Specification[]
  designSystems: DesignSystem[]
  tradeOffs: TradeOff[]
  evidence: EvidenceRecord[]
  comparisonAircraft: AircraftPoint[]
  relatedQuestions: RelatedQuestion[]
  labs: LabDefinition[]
}
