// ── Auth ──────────────────────────────────────────────────────────────────────
export interface User {
  id:          string;
  displayName: string;
  email:       string;
  createdAt:   string;
}

export interface Session {
  userId:    string;
  token:     string;
  expiresAt: string;
}

// ── Quiz ──────────────────────────────────────────────────────────────────────
export interface QuizModule {
  slug:            string;
  title:           string;
  linkedLearnSlug: string;
  questions:       Question[];
}

export interface Question {
  id:           string;
  text:         string;
  options:      string[];
  correctIndex: number;
  explanation:  string;
}

export interface QuizProgress {
  moduleSlug:           string;
  currentQuestionIndex: number;
  answers:              (number | null)[];
}

export interface QuizScore {
  moduleSlug:  string;
  score:       number;
  total:       number;
  completedAt: string;
}

// ── Tips ──────────────────────────────────────────────────────────────────────
export interface Tip {
  id:       string;
  category: 'palengke' | 'energy-saving' | 'commuter-hacks' | string;
  title:    string;
  body:     string;
  url:      string;
}

// ── Simulator ─────────────────────────────────────────────────────────────────
export interface SimulatorInput {
  amount:          number;
  baseYear:        number;
  householdItemId?: string;
}

export interface SimulatorResult {
  adjustedValue: number;
  baseYear:      number;
  targetYear:    number;
  itemLabel?:    string;
}

export interface InflationRate {
  year:        number;
  annual_rate: number;
}

export interface HouseholdItem {
  id:          string;
  label:       string;
  base_prices: Record<string, number>;
}
