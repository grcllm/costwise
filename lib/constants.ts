export const STORAGE_KEYS = {
  QUIZ_PROGRESS:  'costwise_quiz_progress',   // Record<moduleSlug, QuizProgress>
  QUIZ_SCORES:    'costwise_quiz_scores',     // Record<moduleSlug, QuizScore>
  TIP_BOOKMARKS:  'costwise_tip_bookmarks',   // string[] (tip IDs)
  AUTH_TOKEN:     'costwise_auth_token',
  AUTH_USER:      'costwise_auth_user',
} as const;

export const QUIZ_CONFIG = {
  MIN_QUESTIONS:           5,
  MIN_OPTIONS_PER_QUESTION: 3,
} as const;

export const TIP_CATEGORIES = [
  { value: 'all',             label: 'All Tips' },
  { value: 'palengke',        label: 'Palengke Tips' },
  { value: 'energy-saving',   label: 'Energy Saving' },
  { value: 'commuter-hacks',  label: 'Commuter Hacks' },
] as const;

export const SIMULATOR_CONFIG = {
  MIN_YEAR:   2000,
  TIMEOUT_MS: 2000,
} as const;

export const LEARN_MODULES = [
  { slug: 'what-is-inflation',  title: 'What is Inflation?' },
  { slug: 'purchasing-power',   title: 'Purchasing Power' },
  { slug: 'cpi-explained',      title: 'The Consumer Price Index (CPI) Explained' },
] as const;

export const HOUSEHOLD_ITEMS = [
  { id: 'nfa-rice-1kg',       label: '1 kg NFA Rice' },
  { id: 'diesel-1l',          label: '1 L Diesel Fuel' },
  { id: 'eggs-1dozen',        label: '1 Dozen Eggs' },
  { id: 'jeepney-fare',       label: 'Single Jeepney Fare' },
  { id: 'cooking-oil-1l',     label: '1 L Cooking Oil' },
] as const;

export const HEADER_HEIGHT = '64px';

// Password reset link expiry (hours)
export const PASSWORD_RESET_EXPIRY_HOURS = 1;
